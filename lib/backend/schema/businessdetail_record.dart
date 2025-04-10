import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class BusinessdetailRecord extends FirestoreRecord {
  BusinessdetailRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "BusinessName" field.
  String? _businessName;
  String get businessName => _businessName ?? '';
  bool hasBusinessName() => _businessName != null;

  // "BusinessID" field.
  int? _businessID;
  int get businessID => _businessID ?? 0;
  bool hasBusinessID() => _businessID != null;

  // "TypeofBusiness" field.
  String? _typeofBusiness;
  String get typeofBusiness => _typeofBusiness ?? '';
  bool hasTypeofBusiness() => _typeofBusiness != null;

  // "NoOfLocation" field.
  int? _noOfLocation;
  int get noOfLocation => _noOfLocation ?? 0;
  bool hasNoOfLocation() => _noOfLocation != null;

  // "PrimaryContactName" field.
  String? _primaryContactName;
  String get primaryContactName => _primaryContactName ?? '';
  bool hasPrimaryContactName() => _primaryContactName != null;

  // "users" field.
  DocumentReference? _users;
  DocumentReference? get users => _users;
  bool hasUsers() => _users != null;

  // "Position" field.
  String? _position;
  String get position => _position ?? '';
  bool hasPosition() => _position != null;

  // "AlternativeContactno" field.
  int? _alternativeContactno;
  int get alternativeContactno => _alternativeContactno ?? 0;
  bool hasAlternativeContactno() => _alternativeContactno != null;

  // "BusinessRegNo" field.
  String? _businessRegNo;
  String get businessRegNo => _businessRegNo ?? '';
  bool hasBusinessRegNo() => _businessRegNo != null;

  // "firstName" field.
  String? _firstName;
  String get firstName => _firstName ?? '';
  bool hasFirstName() => _firstName != null;

  // "lastName" field.
  String? _lastName;
  String get lastName => _lastName ?? '';
  bool hasLastName() => _lastName != null;

  // "emailAddress" field.
  String? _emailAddress;
  String get emailAddress => _emailAddress ?? '';
  bool hasEmailAddress() => _emailAddress != null;

  // "phoneNo" field.
  int? _phoneNo;
  int get phoneNo => _phoneNo ?? 0;
  bool hasPhoneNo() => _phoneNo != null;

  // "positionTitle" field.
  String? _positionTitle;
  String get positionTitle => _positionTitle ?? '';
  bool hasPositionTitle() => _positionTitle != null;

  // "alternativeContact" field.
  String? _alternativeContact;
  String get alternativeContact => _alternativeContact ?? '';
  bool hasAlternativeContact() => _alternativeContact != null;

  // "street" field.
  String? _street;
  String get street => _street ?? '';
  bool hasStreet() => _street != null;

  // "cityName" field.
  String? _cityName;
  String get cityName => _cityName ?? '';
  bool hasCityName() => _cityName != null;

  // "province" field.
  String? _province;
  String get province => _province ?? '';
  bool hasProvince() => _province != null;

  // "postalCode" field.
  int? _postalCode;
  int get postalCode => _postalCode ?? 0;
  bool hasPostalCode() => _postalCode != null;

  // "cityNameAlternative" field.
  String? _cityNameAlternative;
  String get cityNameAlternative => _cityNameAlternative ?? '';
  bool hasCityNameAlternative() => _cityNameAlternative != null;

  // "streetNameAlternative" field.
  String? _streetNameAlternative;
  String get streetNameAlternative => _streetNameAlternative ?? '';
  bool hasStreetNameAlternative() => _streetNameAlternative != null;

  // "provinceAlternative" field.
  String? _provinceAlternative;
  String get provinceAlternative => _provinceAlternative ?? '';
  bool hasProvinceAlternative() => _provinceAlternative != null;

  // "postalCodeAlternative" field.
  String? _postalCodeAlternative;
  String get postalCodeAlternative => _postalCodeAlternative ?? '';
  bool hasPostalCodeAlternative() => _postalCodeAlternative != null;

  // "professionalNeeded" field.
  String? _professionalNeeded;
  String get professionalNeeded => _professionalNeeded ?? '';
  bool hasProfessionalNeeded() => _professionalNeeded != null;

  // "typicalShiftDuration" field.
  int? _typicalShiftDuration;
  int get typicalShiftDuration => _typicalShiftDuration ?? 0;
  bool hasTypicalShiftDuration() => _typicalShiftDuration != null;

  // "expectedFrequencyOfUse" field.
  String? _expectedFrequencyOfUse;
  String get expectedFrequencyOfUse => _expectedFrequencyOfUse ?? '';
  bool hasExpectedFrequencyOfUse() => _expectedFrequencyOfUse != null;

  // "taxIDorGSTNo" field.
  int? _taxIDorGSTNo;
  int get taxIDorGSTNo => _taxIDorGSTNo ?? 0;
  bool hasTaxIDorGSTNo() => _taxIDorGSTNo != null;

  // "IndustryLicensesorAccreditation" field.
  String? _industryLicensesorAccreditation;
  String get industryLicensesorAccreditation =>
      _industryLicensesorAccreditation ?? '';
  bool hasIndustryLicensesorAccreditation() =>
      _industryLicensesorAccreditation != null;

  // "InsuranceInformation" field.
  String? _insuranceInformation;
  String get insuranceInformation => _insuranceInformation ?? '';
  bool hasInsuranceInformation() => _insuranceInformation != null;

  // "UploadBusinessLicenseOrRegistrationDocument" field.
  String? _uploadBusinessLicenseOrRegistrationDocument;
  String get uploadBusinessLicenseOrRegistrationDocument =>
      _uploadBusinessLicenseOrRegistrationDocument ?? '';
  bool hasUploadBusinessLicenseOrRegistrationDocument() =>
      _uploadBusinessLicenseOrRegistrationDocument != null;

  // "languageSkills" field.
  String? _languageSkills;
  String get languageSkills => _languageSkills ?? '';
  bool hasLanguageSkills() => _languageSkills != null;

  // "skillsCertifications" field.
  String? _skillsCertifications;
  String get skillsCertifications => _skillsCertifications ?? '';
  bool hasSkillsCertifications() => _skillsCertifications != null;

  // "termsAndConditionAgreed" field.
  bool? _termsAndConditionAgreed;
  bool get termsAndConditionAgreed => _termsAndConditionAgreed ?? false;
  bool hasTermsAndConditionAgreed() => _termsAndConditionAgreed != null;

  // "consentAgreed" field.
  bool? _consentAgreed;
  bool get consentAgreed => _consentAgreed ?? false;
  bool hasConsentAgreed() => _consentAgreed != null;

  // "signature" field.
  String? _signature;
  String get signature => _signature ?? '';
  bool hasSignature() => _signature != null;

  // "BusinessInformation" field.
  BusinessInformationStruct? _businessInformation;
  BusinessInformationStruct get businessInformation =>
      _businessInformation ?? BusinessInformationStruct();
  bool hasBusinessInformation() => _businessInformation != null;

  // "PrimaryContactInformation" field.
  PrimaryContactInformationStruct? _primaryContactInformation;
  PrimaryContactInformationStruct get primaryContactInformation =>
      _primaryContactInformation ?? PrimaryContactInformationStruct();
  bool hasPrimaryContactInformation() => _primaryContactInformation != null;

  // "MainBusinessAddress" field.
  MainBusinessLocationDetailsStruct? _mainBusinessAddress;
  MainBusinessLocationDetailsStruct get mainBusinessAddress =>
      _mainBusinessAddress ?? MainBusinessLocationDetailsStruct();
  bool hasMainBusinessAddress() => _mainBusinessAddress != null;

  // "AdditionalBusinessAddress" field.
  AdditionalBusinessLocationDetailsStruct? _additionalBusinessAddress;
  AdditionalBusinessLocationDetailsStruct get additionalBusinessAddress =>
      _additionalBusinessAddress ?? AdditionalBusinessLocationDetailsStruct();
  bool hasAdditionalBusinessAddress() => _additionalBusinessAddress != null;

  // "StaffingNeeds" field.
  StaffingNeedsStruct? _staffingNeeds;
  StaffingNeedsStruct get staffingNeeds =>
      _staffingNeeds ?? StaffingNeedsStruct();
  bool hasStaffingNeeds() => _staffingNeeds != null;

  // "BusinessDetailsForVerification" field.
  BusinessDetailsForVerificationStruct? _businessDetailsForVerification;
  BusinessDetailsForVerificationStruct get businessDetailsForVerification =>
      _businessDetailsForVerification ?? BusinessDetailsForVerificationStruct();
  bool hasBusinessDetailsForVerification() =>
      _businessDetailsForVerification != null;

  // "ServiceAgreementPreference" field.
  ServiceAgreementPreferenceStruct? _serviceAgreementPreference;
  ServiceAgreementPreferenceStruct get serviceAgreementPreference =>
      _serviceAgreementPreference ?? ServiceAgreementPreferenceStruct();
  bool hasServiceAgreementPreference() => _serviceAgreementPreference != null;

  // "AgreementConsent" field.
  AgreementconsentStruct? _agreementConsent;
  AgreementconsentStruct get agreementConsent =>
      _agreementConsent ?? AgreementconsentStruct();
  bool hasAgreementConsent() => _agreementConsent != null;

  // "Paymentandbillinginfo" field.
  PaymentandbillinginfoStruct? _paymentandbillinginfo;
  PaymentandbillinginfoStruct get paymentandbillinginfo =>
      _paymentandbillinginfo ?? PaymentandbillinginfoStruct();
  bool hasPaymentandbillinginfo() => _paymentandbillinginfo != null;

  void _initializeFields() {
    _businessName = snapshotData['BusinessName'] as String?;
    _businessID = castToType<int>(snapshotData['BusinessID']);
    _typeofBusiness = snapshotData['TypeofBusiness'] as String?;
    _noOfLocation = castToType<int>(snapshotData['NoOfLocation']);
    _primaryContactName = snapshotData['PrimaryContactName'] as String?;
    _users = snapshotData['users'] as DocumentReference?;
    _position = snapshotData['Position'] as String?;
    _alternativeContactno =
        castToType<int>(snapshotData['AlternativeContactno']);
    _businessRegNo = snapshotData['BusinessRegNo'] as String?;
    _firstName = snapshotData['firstName'] as String?;
    _lastName = snapshotData['lastName'] as String?;
    _emailAddress = snapshotData['emailAddress'] as String?;
    _phoneNo = castToType<int>(snapshotData['phoneNo']);
    _positionTitle = snapshotData['positionTitle'] as String?;
    _alternativeContact = snapshotData['alternativeContact'] as String?;
    _street = snapshotData['street'] as String?;
    _cityName = snapshotData['cityName'] as String?;
    _province = snapshotData['province'] as String?;
    _postalCode = castToType<int>(snapshotData['postalCode']);
    _cityNameAlternative = snapshotData['cityNameAlternative'] as String?;
    _streetNameAlternative = snapshotData['streetNameAlternative'] as String?;
    _provinceAlternative = snapshotData['provinceAlternative'] as String?;
    _postalCodeAlternative = snapshotData['postalCodeAlternative'] as String?;
    _professionalNeeded = snapshotData['professionalNeeded'] as String?;
    _typicalShiftDuration =
        castToType<int>(snapshotData['typicalShiftDuration']);
    _expectedFrequencyOfUse = snapshotData['expectedFrequencyOfUse'] as String?;
    _taxIDorGSTNo = castToType<int>(snapshotData['taxIDorGSTNo']);
    _industryLicensesorAccreditation =
        snapshotData['IndustryLicensesorAccreditation'] as String?;
    _insuranceInformation = snapshotData['InsuranceInformation'] as String?;
    _uploadBusinessLicenseOrRegistrationDocument =
        snapshotData['UploadBusinessLicenseOrRegistrationDocument'] as String?;
    _languageSkills = snapshotData['languageSkills'] as String?;
    _skillsCertifications = snapshotData['skillsCertifications'] as String?;
    _termsAndConditionAgreed = snapshotData['termsAndConditionAgreed'] as bool?;
    _consentAgreed = snapshotData['consentAgreed'] as bool?;
    _signature = snapshotData['signature'] as String?;
    _businessInformation =
        snapshotData['BusinessInformation'] is BusinessInformationStruct
            ? snapshotData['BusinessInformation']
            : BusinessInformationStruct.maybeFromMap(
                snapshotData['BusinessInformation']);
    _primaryContactInformation = snapshotData['PrimaryContactInformation']
            is PrimaryContactInformationStruct
        ? snapshotData['PrimaryContactInformation']
        : PrimaryContactInformationStruct.maybeFromMap(
            snapshotData['PrimaryContactInformation']);
    _mainBusinessAddress =
        snapshotData['MainBusinessAddress'] is MainBusinessLocationDetailsStruct
            ? snapshotData['MainBusinessAddress']
            : MainBusinessLocationDetailsStruct.maybeFromMap(
                snapshotData['MainBusinessAddress']);
    _additionalBusinessAddress = snapshotData['AdditionalBusinessAddress']
            is AdditionalBusinessLocationDetailsStruct
        ? snapshotData['AdditionalBusinessAddress']
        : AdditionalBusinessLocationDetailsStruct.maybeFromMap(
            snapshotData['AdditionalBusinessAddress']);
    _staffingNeeds = snapshotData['StaffingNeeds'] is StaffingNeedsStruct
        ? snapshotData['StaffingNeeds']
        : StaffingNeedsStruct.maybeFromMap(snapshotData['StaffingNeeds']);
    _businessDetailsForVerification =
        snapshotData['BusinessDetailsForVerification']
                is BusinessDetailsForVerificationStruct
            ? snapshotData['BusinessDetailsForVerification']
            : BusinessDetailsForVerificationStruct.maybeFromMap(
                snapshotData['BusinessDetailsForVerification']);
    _serviceAgreementPreference = snapshotData['ServiceAgreementPreference']
            is ServiceAgreementPreferenceStruct
        ? snapshotData['ServiceAgreementPreference']
        : ServiceAgreementPreferenceStruct.maybeFromMap(
            snapshotData['ServiceAgreementPreference']);
    _agreementConsent = snapshotData['AgreementConsent']
            is AgreementconsentStruct
        ? snapshotData['AgreementConsent']
        : AgreementconsentStruct.maybeFromMap(snapshotData['AgreementConsent']);
    _paymentandbillinginfo =
        snapshotData['Paymentandbillinginfo'] is PaymentandbillinginfoStruct
            ? snapshotData['Paymentandbillinginfo']
            : PaymentandbillinginfoStruct.maybeFromMap(
                snapshotData['Paymentandbillinginfo']);
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('Businessdetail');

  static Stream<BusinessdetailRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => BusinessdetailRecord.fromSnapshot(s));

  static Future<BusinessdetailRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => BusinessdetailRecord.fromSnapshot(s));

  static BusinessdetailRecord fromSnapshot(DocumentSnapshot snapshot) =>
      BusinessdetailRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static BusinessdetailRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      BusinessdetailRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'BusinessdetailRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is BusinessdetailRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createBusinessdetailRecordData({
  String? businessName,
  int? businessID,
  String? typeofBusiness,
  int? noOfLocation,
  String? primaryContactName,
  DocumentReference? users,
  String? position,
  int? alternativeContactno,
  String? businessRegNo,
  String? firstName,
  String? lastName,
  String? emailAddress,
  int? phoneNo,
  String? positionTitle,
  String? alternativeContact,
  String? street,
  String? cityName,
  String? province,
  int? postalCode,
  String? cityNameAlternative,
  String? streetNameAlternative,
  String? provinceAlternative,
  String? postalCodeAlternative,
  String? professionalNeeded,
  int? typicalShiftDuration,
  String? expectedFrequencyOfUse,
  int? taxIDorGSTNo,
  String? industryLicensesorAccreditation,
  String? insuranceInformation,
  String? uploadBusinessLicenseOrRegistrationDocument,
  String? languageSkills,
  String? skillsCertifications,
  bool? termsAndConditionAgreed,
  bool? consentAgreed,
  String? signature,
  BusinessInformationStruct? businessInformation,
  PrimaryContactInformationStruct? primaryContactInformation,
  MainBusinessLocationDetailsStruct? mainBusinessAddress,
  AdditionalBusinessLocationDetailsStruct? additionalBusinessAddress,
  StaffingNeedsStruct? staffingNeeds,
  BusinessDetailsForVerificationStruct? businessDetailsForVerification,
  ServiceAgreementPreferenceStruct? serviceAgreementPreference,
  AgreementconsentStruct? agreementConsent,
  PaymentandbillinginfoStruct? paymentandbillinginfo,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'BusinessName': businessName,
      'BusinessID': businessID,
      'TypeofBusiness': typeofBusiness,
      'NoOfLocation': noOfLocation,
      'PrimaryContactName': primaryContactName,
      'users': users,
      'Position': position,
      'AlternativeContactno': alternativeContactno,
      'BusinessRegNo': businessRegNo,
      'firstName': firstName,
      'lastName': lastName,
      'emailAddress': emailAddress,
      'phoneNo': phoneNo,
      'positionTitle': positionTitle,
      'alternativeContact': alternativeContact,
      'street': street,
      'cityName': cityName,
      'province': province,
      'postalCode': postalCode,
      'cityNameAlternative': cityNameAlternative,
      'streetNameAlternative': streetNameAlternative,
      'provinceAlternative': provinceAlternative,
      'postalCodeAlternative': postalCodeAlternative,
      'professionalNeeded': professionalNeeded,
      'typicalShiftDuration': typicalShiftDuration,
      'expectedFrequencyOfUse': expectedFrequencyOfUse,
      'taxIDorGSTNo': taxIDorGSTNo,
      'IndustryLicensesorAccreditation': industryLicensesorAccreditation,
      'InsuranceInformation': insuranceInformation,
      'UploadBusinessLicenseOrRegistrationDocument':
          uploadBusinessLicenseOrRegistrationDocument,
      'languageSkills': languageSkills,
      'skillsCertifications': skillsCertifications,
      'termsAndConditionAgreed': termsAndConditionAgreed,
      'consentAgreed': consentAgreed,
      'signature': signature,
      'BusinessInformation': BusinessInformationStruct().toMap(),
      'PrimaryContactInformation': PrimaryContactInformationStruct().toMap(),
      'MainBusinessAddress': MainBusinessLocationDetailsStruct().toMap(),
      'AdditionalBusinessAddress':
          AdditionalBusinessLocationDetailsStruct().toMap(),
      'StaffingNeeds': StaffingNeedsStruct().toMap(),
      'BusinessDetailsForVerification':
          BusinessDetailsForVerificationStruct().toMap(),
      'ServiceAgreementPreference': ServiceAgreementPreferenceStruct().toMap(),
      'AgreementConsent': AgreementconsentStruct().toMap(),
      'Paymentandbillinginfo': PaymentandbillinginfoStruct().toMap(),
    }.withoutNulls,
  );

  // Handle nested data for "BusinessInformation" field.
  addBusinessInformationStructData(
      firestoreData, businessInformation, 'BusinessInformation');

  // Handle nested data for "PrimaryContactInformation" field.
  addPrimaryContactInformationStructData(
      firestoreData, primaryContactInformation, 'PrimaryContactInformation');

  // Handle nested data for "MainBusinessAddress" field.
  addMainBusinessLocationDetailsStructData(
      firestoreData, mainBusinessAddress, 'MainBusinessAddress');

  // Handle nested data for "AdditionalBusinessAddress" field.
  addAdditionalBusinessLocationDetailsStructData(
      firestoreData, additionalBusinessAddress, 'AdditionalBusinessAddress');

  // Handle nested data for "StaffingNeeds" field.
  addStaffingNeedsStructData(firestoreData, staffingNeeds, 'StaffingNeeds');

  // Handle nested data for "BusinessDetailsForVerification" field.
  addBusinessDetailsForVerificationStructData(firestoreData,
      businessDetailsForVerification, 'BusinessDetailsForVerification');

  // Handle nested data for "ServiceAgreementPreference" field.
  addServiceAgreementPreferenceStructData(
      firestoreData, serviceAgreementPreference, 'ServiceAgreementPreference');

  // Handle nested data for "AgreementConsent" field.
  addAgreementconsentStructData(
      firestoreData, agreementConsent, 'AgreementConsent');

  // Handle nested data for "Paymentandbillinginfo" field.
  addPaymentandbillinginfoStructData(
      firestoreData, paymentandbillinginfo, 'Paymentandbillinginfo');

  return firestoreData;
}

class BusinessdetailRecordDocumentEquality
    implements Equality<BusinessdetailRecord> {
  const BusinessdetailRecordDocumentEquality();

  @override
  bool equals(BusinessdetailRecord? e1, BusinessdetailRecord? e2) {
    return e1?.businessName == e2?.businessName &&
        e1?.businessID == e2?.businessID &&
        e1?.typeofBusiness == e2?.typeofBusiness &&
        e1?.noOfLocation == e2?.noOfLocation &&
        e1?.primaryContactName == e2?.primaryContactName &&
        e1?.users == e2?.users &&
        e1?.position == e2?.position &&
        e1?.alternativeContactno == e2?.alternativeContactno &&
        e1?.businessRegNo == e2?.businessRegNo &&
        e1?.firstName == e2?.firstName &&
        e1?.lastName == e2?.lastName &&
        e1?.emailAddress == e2?.emailAddress &&
        e1?.phoneNo == e2?.phoneNo &&
        e1?.positionTitle == e2?.positionTitle &&
        e1?.alternativeContact == e2?.alternativeContact &&
        e1?.street == e2?.street &&
        e1?.cityName == e2?.cityName &&
        e1?.province == e2?.province &&
        e1?.postalCode == e2?.postalCode &&
        e1?.cityNameAlternative == e2?.cityNameAlternative &&
        e1?.streetNameAlternative == e2?.streetNameAlternative &&
        e1?.provinceAlternative == e2?.provinceAlternative &&
        e1?.postalCodeAlternative == e2?.postalCodeAlternative &&
        e1?.professionalNeeded == e2?.professionalNeeded &&
        e1?.typicalShiftDuration == e2?.typicalShiftDuration &&
        e1?.expectedFrequencyOfUse == e2?.expectedFrequencyOfUse &&
        e1?.taxIDorGSTNo == e2?.taxIDorGSTNo &&
        e1?.industryLicensesorAccreditation ==
            e2?.industryLicensesorAccreditation &&
        e1?.insuranceInformation == e2?.insuranceInformation &&
        e1?.uploadBusinessLicenseOrRegistrationDocument ==
            e2?.uploadBusinessLicenseOrRegistrationDocument &&
        e1?.languageSkills == e2?.languageSkills &&
        e1?.skillsCertifications == e2?.skillsCertifications &&
        e1?.termsAndConditionAgreed == e2?.termsAndConditionAgreed &&
        e1?.consentAgreed == e2?.consentAgreed &&
        e1?.signature == e2?.signature &&
        e1?.businessInformation == e2?.businessInformation &&
        e1?.primaryContactInformation == e2?.primaryContactInformation &&
        e1?.mainBusinessAddress == e2?.mainBusinessAddress &&
        e1?.additionalBusinessAddress == e2?.additionalBusinessAddress &&
        e1?.staffingNeeds == e2?.staffingNeeds &&
        e1?.businessDetailsForVerification ==
            e2?.businessDetailsForVerification &&
        e1?.serviceAgreementPreference == e2?.serviceAgreementPreference &&
        e1?.agreementConsent == e2?.agreementConsent &&
        e1?.paymentandbillinginfo == e2?.paymentandbillinginfo;
  }

  @override
  int hash(BusinessdetailRecord? e) => const ListEquality().hash([
        e?.businessName,
        e?.businessID,
        e?.typeofBusiness,
        e?.noOfLocation,
        e?.primaryContactName,
        e?.users,
        e?.position,
        e?.alternativeContactno,
        e?.businessRegNo,
        e?.firstName,
        e?.lastName,
        e?.emailAddress,
        e?.phoneNo,
        e?.positionTitle,
        e?.alternativeContact,
        e?.street,
        e?.cityName,
        e?.province,
        e?.postalCode,
        e?.cityNameAlternative,
        e?.streetNameAlternative,
        e?.provinceAlternative,
        e?.postalCodeAlternative,
        e?.professionalNeeded,
        e?.typicalShiftDuration,
        e?.expectedFrequencyOfUse,
        e?.taxIDorGSTNo,
        e?.industryLicensesorAccreditation,
        e?.insuranceInformation,
        e?.uploadBusinessLicenseOrRegistrationDocument,
        e?.languageSkills,
        e?.skillsCertifications,
        e?.termsAndConditionAgreed,
        e?.consentAgreed,
        e?.signature,
        e?.businessInformation,
        e?.primaryContactInformation,
        e?.mainBusinessAddress,
        e?.additionalBusinessAddress,
        e?.staffingNeeds,
        e?.businessDetailsForVerification,
        e?.serviceAgreementPreference,
        e?.agreementConsent,
        e?.paymentandbillinginfo
      ]);

  @override
  bool isValidKey(Object? o) => o is BusinessdetailRecord;
}
