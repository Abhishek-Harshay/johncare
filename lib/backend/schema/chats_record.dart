import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class ChatsRecord extends FirestoreRecord {
  ChatsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "worker" field.
  DocumentReference? _worker;
  DocumentReference? get worker => _worker;
  bool hasWorker() => _worker != null;

  // "recruiter" field.
  DocumentReference? _recruiter;
  DocumentReference? get recruiter => _recruiter;
  bool hasRecruiter() => _recruiter != null;

  // "job" field.
  DocumentReference? _job;
  DocumentReference? get job => _job;
  bool hasJob() => _job != null;

  // "created_at" field.
  DateTime? _createdAt;
  DateTime? get createdAt => _createdAt;
  bool hasCreatedAt() => _createdAt != null;

  // "name" field.
  String? _name;
  String get name => _name ?? '';
  bool hasName() => _name != null;

  // "last_Message" field.
  String? _lastMessage;
  String get lastMessage => _lastMessage ?? '';
  bool hasLastMessage() => _lastMessage != null;

  // "isChatDisable" field.
  bool? _isChatDisable;
  bool get isChatDisable => _isChatDisable ?? false;
  bool hasIsChatDisable() => _isChatDisable != null;

  void _initializeFields() {
    _worker = snapshotData['worker'] as DocumentReference?;
    _recruiter = snapshotData['recruiter'] as DocumentReference?;
    _job = snapshotData['job'] as DocumentReference?;
    _createdAt = snapshotData['created_at'] as DateTime?;
    _name = snapshotData['name'] as String?;
    _lastMessage = snapshotData['last_Message'] as String?;
    _isChatDisable = snapshotData['isChatDisable'] as bool?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('chats');

  static Stream<ChatsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => ChatsRecord.fromSnapshot(s));

  static Future<ChatsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => ChatsRecord.fromSnapshot(s));

  static ChatsRecord fromSnapshot(DocumentSnapshot snapshot) => ChatsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static ChatsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      ChatsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'ChatsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is ChatsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createChatsRecordData({
  DocumentReference? worker,
  DocumentReference? recruiter,
  DocumentReference? job,
  DateTime? createdAt,
  String? name,
  String? lastMessage,
  bool? isChatDisable,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'worker': worker,
      'recruiter': recruiter,
      'job': job,
      'created_at': createdAt,
      'name': name,
      'last_Message': lastMessage,
      'isChatDisable': isChatDisable,
    }.withoutNulls,
  );

  return firestoreData;
}

class ChatsRecordDocumentEquality implements Equality<ChatsRecord> {
  const ChatsRecordDocumentEquality();

  @override
  bool equals(ChatsRecord? e1, ChatsRecord? e2) {
    return e1?.worker == e2?.worker &&
        e1?.recruiter == e2?.recruiter &&
        e1?.job == e2?.job &&
        e1?.createdAt == e2?.createdAt &&
        e1?.name == e2?.name &&
        e1?.lastMessage == e2?.lastMessage &&
        e1?.isChatDisable == e2?.isChatDisable;
  }

  @override
  int hash(ChatsRecord? e) => const ListEquality().hash([
        e?.worker,
        e?.recruiter,
        e?.job,
        e?.createdAt,
        e?.name,
        e?.lastMessage,
        e?.isChatDisable
      ]);

  @override
  bool isValidKey(Object? o) => o is ChatsRecord;
}
