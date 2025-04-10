import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class ProfessionsRecord extends FirestoreRecord {
  ProfessionsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "profession" field.
  String? _profession;
  String get profession => _profession ?? '';
  bool hasProfession() => _profession != null;

  // "spealityArea" field.
  List<String>? _spealityArea;
  List<String> get spealityArea => _spealityArea ?? const [];
  bool hasSpealityArea() => _spealityArea != null;

  void _initializeFields() {
    _profession = snapshotData['profession'] as String?;
    _spealityArea = getDataList(snapshotData['spealityArea']);
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('professions');

  static Stream<ProfessionsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => ProfessionsRecord.fromSnapshot(s));

  static Future<ProfessionsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => ProfessionsRecord.fromSnapshot(s));

  static ProfessionsRecord fromSnapshot(DocumentSnapshot snapshot) =>
      ProfessionsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static ProfessionsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      ProfessionsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'ProfessionsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is ProfessionsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createProfessionsRecordData({
  String? profession,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'profession': profession,
    }.withoutNulls,
  );

  return firestoreData;
}

class ProfessionsRecordDocumentEquality implements Equality<ProfessionsRecord> {
  const ProfessionsRecordDocumentEquality();

  @override
  bool equals(ProfessionsRecord? e1, ProfessionsRecord? e2) {
    const listEquality = ListEquality();
    return e1?.profession == e2?.profession &&
        listEquality.equals(e1?.spealityArea, e2?.spealityArea);
  }

  @override
  int hash(ProfessionsRecord? e) =>
      const ListEquality().hash([e?.profession, e?.spealityArea]);

  @override
  bool isValidKey(Object? o) => o is ProfessionsRecord;
}
