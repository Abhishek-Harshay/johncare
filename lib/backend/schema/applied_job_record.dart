import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class AppliedJobRecord extends FirestoreRecord {
  AppliedJobRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "job" field.
  DocumentReference? _job;
  DocumentReference? get job => _job;
  bool hasJob() => _job != null;

  // "user" field.
  DocumentReference? _user;
  DocumentReference? get user => _user;
  bool hasUser() => _user != null;

  // "iscompleted" field.
  bool? _iscompleted;
  bool get iscompleted => _iscompleted ?? false;
  bool hasIscompleted() => _iscompleted != null;

  // "Buisness" field.
  DocumentReference? _buisness;
  DocumentReference? get buisness => _buisness;
  bool hasBuisness() => _buisness != null;

  // "providerdetail" field.
  DocumentReference? _providerdetail;
  DocumentReference? get providerdetail => _providerdetail;
  bool hasProviderdetail() => _providerdetail != null;

  // "Createdat" field.
  DateTime? _createdat;
  DateTime? get createdat => _createdat;
  bool hasCreatedat() => _createdat != null;

  // "AppliedJobStatus" field.
  String? _appliedJobStatus;
  String get appliedJobStatus => _appliedJobStatus ?? '';
  bool hasAppliedJobStatus() => _appliedJobStatus != null;

  void _initializeFields() {
    _job = snapshotData['job'] as DocumentReference?;
    _user = snapshotData['user'] as DocumentReference?;
    _iscompleted = snapshotData['iscompleted'] as bool?;
    _buisness = snapshotData['Buisness'] as DocumentReference?;
    _providerdetail = snapshotData['providerdetail'] as DocumentReference?;
    _createdat = snapshotData['Createdat'] as DateTime?;
    _appliedJobStatus = snapshotData['AppliedJobStatus'] as String?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('AppliedJob');

  static Stream<AppliedJobRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => AppliedJobRecord.fromSnapshot(s));

  static Future<AppliedJobRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => AppliedJobRecord.fromSnapshot(s));

  static AppliedJobRecord fromSnapshot(DocumentSnapshot snapshot) =>
      AppliedJobRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static AppliedJobRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      AppliedJobRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'AppliedJobRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is AppliedJobRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createAppliedJobRecordData({
  DocumentReference? job,
  DocumentReference? user,
  bool? iscompleted,
  DocumentReference? buisness,
  DocumentReference? providerdetail,
  DateTime? createdat,
  String? appliedJobStatus,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'job': job,
      'user': user,
      'iscompleted': iscompleted,
      'Buisness': buisness,
      'providerdetail': providerdetail,
      'Createdat': createdat,
      'AppliedJobStatus': appliedJobStatus,
    }.withoutNulls,
  );

  return firestoreData;
}

class AppliedJobRecordDocumentEquality implements Equality<AppliedJobRecord> {
  const AppliedJobRecordDocumentEquality();

  @override
  bool equals(AppliedJobRecord? e1, AppliedJobRecord? e2) {
    return e1?.job == e2?.job &&
        e1?.user == e2?.user &&
        e1?.iscompleted == e2?.iscompleted &&
        e1?.buisness == e2?.buisness &&
        e1?.providerdetail == e2?.providerdetail &&
        e1?.createdat == e2?.createdat &&
        e1?.appliedJobStatus == e2?.appliedJobStatus;
  }

  @override
  int hash(AppliedJobRecord? e) => const ListEquality().hash([
        e?.job,
        e?.user,
        e?.iscompleted,
        e?.buisness,
        e?.providerdetail,
        e?.createdat,
        e?.appliedJobStatus
      ]);

  @override
  bool isValidKey(Object? o) => o is AppliedJobRecord;
}
