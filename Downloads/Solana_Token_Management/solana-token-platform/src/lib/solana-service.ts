import { Connection, PublicKey, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js';
import { 
  createInitializeMintInstruction, 
  createMint, 
  createAssociatedTokenAccountInstruction, 
  createMintToInstruction, 
  getAssociatedTokenAddress, 
  MINT_SIZE, 
  TOKEN_PROGRAM_ID, 
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createSetAuthorityInstruction,
  AuthorityType
} from '@solana/spl-token';
import { createCreateMetadataAccountV3Instruction } from '@metaplex-foundation/mpl-token-metadata';

export interface TokenCreationParams {
  name: string;
  symbol: string;
  description: string;
  decimals: number;
  supply: number;
  image?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
}

export interface TokenCreationResult {
  success: boolean;
  mintAddress?: string;
  signature?: string;
  error?: string;
}

class SolanaTokenService {
  private connection: Connection;
  private rpcEndpoints: string[];
  private currentRpcIndex: number = 0;

  constructor() {
    this.rpcEndpoints = [
      `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY_1}`,
      `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY_2}`,
      `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY_3}`,
      process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'
    ].filter(endpoint => !endpoint.includes('undefined'));

    this.connection = new Connection(this.rpcEndpoints[0], 'confirmed');
  }

  // RPC rotation for better reliability
  private rotateRPC() {
    this.currentRpcIndex = (this.currentRpcIndex + 1) % this.rpcEndpoints.length;
    this.connection = new Connection(this.rpcEndpoints[this.currentRpcIndex], 'confirmed');
    console.log(`Switched to RPC endpoint: ${this.currentRpcIndex + 1}`);
  }

  // Create SPL Token with Metadata
  async createToken(params: TokenCreationParams, payerPrivateKey: string): Promise<TokenCreationResult> {
    try {
      const payer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(payerPrivateKey)));
      
      // Create mint account
      const mintKeypair = Keypair.generate();
      const mint = mintKeypair.publicKey;

      console.log('Creating token with mint address:', mint.toString());

      // Create mint account instruction
      const lamports = await this.connection.getMinimumBalanceForRentExemption(MINT_SIZE);
      
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: payer.publicKey,
          newAccountPubkey: mint,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
          mint,
          params.decimals,
          payer.publicKey,
          payer.publicKey,
          TOKEN_PROGRAM_ID
        )
      );

      // Get associated token account for the payer
      const associatedTokenAccount = await getAssociatedTokenAddress(mint, payer.publicKey);

      // Create associated token account
      transaction.add(
        createAssociatedTokenAccountInstruction(
          payer.publicKey,
          associatedTokenAccount,
          payer.publicKey,
          mint,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
      );

      // Mint tokens to the associated token account
      if (params.supply > 0) {
        transaction.add(
          createMintToInstruction(
            mint,
            associatedTokenAccount,
            payer.publicKey,
            params.supply * Math.pow(10, params.decimals)
          )
        );
      }

      // Create metadata account
      const metadataAddress = await this.getMetadataAddress(mint);
      
      const metadata = {
        name: params.name,
        symbol: params.symbol,
        uri: await this.uploadMetadata(params),
        creators: null,
        sellerFeeBasisPoints: 0,
        uses: null,
        collection: null,
      };

      transaction.add(
        createCreateMetadataAccountV3Instruction(
          {
            metadata: metadataAddress,
            mint: mint,
            mintAuthority: payer.publicKey,
            payer: payer.publicKey,
            updateAuthority: payer.publicKey,
          },
          {
            createMetadataAccountArgsV3: {
              data: metadata,
              isMutable: true,
              collectionDetails: null,
            },
          }
        )
      );

      // Send and confirm transaction
      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [payer, mintKeypair],
        {
          commitment: 'confirmed',
          maxRetries: 3,
        }
      );

      console.log('Token created successfully:', {
        mintAddress: mint.toString(),
        signature,
        associatedTokenAccount: associatedTokenAccount.toString()
      });

      return {
        success: true,
        mintAddress: mint.toString(),
        signature
      };

    } catch (error: any) {
      console.error('Token creation failed:', error);
      
      // Retry with different RPC if network error
      if (error.message.includes('network') || error.message.includes('timeout')) {
        this.rotateRPC();
        // Could implement retry logic here
      }

      return {
        success: false,
        error: error.message || 'Token creation failed'
      };
    }
  }

  // Revoke mint authority
  async revokeMintAuthority(mintAddress: string, payerPrivateKey: string): Promise<TokenCreationResult> {
    try {
      const payer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(payerPrivateKey)));
      const mint = new PublicKey(mintAddress);

      const transaction = new Transaction().add(
        createSetAuthorityInstruction(
          mint,
          payer.publicKey,
          AuthorityType.MintTokens,
          null // Setting authority to null revokes it
        )
      );

      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [payer],
        { commitment: 'confirmed' }
      );

      return {
        success: true,
        signature
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to revoke mint authority'
      };
    }
  }

  // Revoke freeze authority
  async revokeFreezeAuthority(mintAddress: string, payerPrivateKey: string): Promise<TokenCreationResult> {
    try {
      const payer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(payerPrivateKey)));
      const mint = new PublicKey(mintAddress);

      const transaction = new Transaction().add(
        createSetAuthorityInstruction(
          mint,
          payer.publicKey,
          AuthorityType.FreezeAccount,
          null // Setting authority to null revokes it
        )
      );

      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [payer],
        { commitment: 'confirmed' }
      );

      return {
        success: true,
        signature
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to revoke freeze authority'
      };
    }
  }

  // Get metadata address for a mint
  private async getMetadataAddress(mint: PublicKey): Promise<PublicKey> {
    const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
    
    const [metadataAddress] = await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    );
    
    return metadataAddress;
  }

  // Upload metadata to IPFS or other storage (simplified version)
  private async uploadMetadata(params: TokenCreationParams): Promise<string> {
    const metadata = {
      name: params.name,
      symbol: params.symbol,
      description: params.description,
      image: params.image || '',
      external_url: params.website || '',
      attributes: [
        {
          trait_type: "Creator",
          value: "SolX Engine"
        }
      ],
      properties: {
        files: params.image ? [
          {
            uri: params.image,
            type: "image/png"
          }
        ] : [],
        category: "image",
      },
      social: {
        twitter: params.twitter || '',
        telegram: params.telegram || ''
      }
    };

    // In a real implementation, you would upload to IPFS
    // For now, we'll return a placeholder URI
    // You could integrate with services like Pinata, NFT.Storage, etc.
    
    const metadataString = JSON.stringify(metadata, null, 2);
    console.log('Metadata to upload:', metadataString);
    
    // Placeholder URI - in production, upload to IPFS and return the hash
    return `https://gateway.pinata.cloud/ipfs/placeholder-${params.symbol.toLowerCase()}`;
  }

  // Check SOL balance
  async getBalance(publicKey: string): Promise<number> {
    try {
      const pubKey = new PublicKey(publicKey);
      const balance = await this.connection.getBalance(pubKey);
      return balance / 1e9; // Convert lamports to SOL
    } catch (error) {
      console.error('Failed to get balance:', error);
      return 0;
    }
  }

  // Batch balance check
  async getBulkBalances(publicKeys: string[]): Promise<Array<{address: string, balance: number}>> {
    const results = [];
    
    for (const address of publicKeys) {
      try {
        const balance = await this.getBalance(address);
        results.push({ address, balance });
      } catch (error) {
        results.push({ address, balance: 0 });
      }
    }

    return results;
  }
}

export default new SolanaTokenService();
