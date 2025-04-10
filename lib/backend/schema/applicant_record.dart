import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class ApplicantRecord extends FirestoreRecord {
  ApplicantRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "Applicant" field.
  DocumentReference? _applicant;
  DocumentReference? get applicant => _applicant;
  bool hasApplicant() => _applicant != null;

  // "job" field.
  DocumentReference? _job;
  DocumentReference? get job => _job;
  bool hasJob() => _job != null;

  // "Status" field.
  String? _status;
  String get status => _status ?? '';
  bool hasStatus() => _status != null;

  void _initializeFields() {
    _applicant = snapshotData['Applicant'] as DocumentReference?;
    _job = snapshotData['job'] as DocumentReference?;
    _status = snapshotData['Status'] as String?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('Applicant');

  static Stream<ApplicantRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => ApplicantRecord.fromSnapshot(s));

  static Future<ApplicantRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => ApplicantRecord.fromSnapshot(s));

  static ApplicantRecord fromSnapshot(DocumentSnapshot snapshot) =>
      ApplicantRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static ApplicantRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      ApplicantRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'ApplicantRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is ApplicantRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createApplicantRecordData({
  DocumentReference? applicant,
  DocumentReference? job,
  String? status,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'Applicant': applicant,
      'job': job,
      'Status': status,
    }.withoutNulls,
  );

  return firestoreData;
}

class ApplicantRecordDocumentEquality implements Equality<ApplicantRecord> {
  const ApplicantRecordDocumentEquality();

  @override
  bool equals(ApplicantRecord? e1, ApplicantRecord? e2) {
    return e1?.applicant == e2?.applicant &&
        e1?.job == e2?.job &&
        e1?.status == e2?.status;
  }

  @override
  int hash(ApplicantRecord? e) =>
      const ListEquality().hash([e?.applicant, e?.job, e?.status]);

  @override
  bool isValidKey(Object? o) => o is ApplicantRecord;
}
