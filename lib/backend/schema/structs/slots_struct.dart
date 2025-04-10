// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class SlotsStruct extends FFFirebaseStruct {
  SlotsStruct({
    String? startDate,
    String? endDate,
    DocumentReference? job,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _startDate = startDate,
        _endDate = endDate,
        _job = job,
        super(firestoreUtilData);

  // "startDate" field.
  String? _startDate;
  String get startDate => _startDate ?? '';
  set startDate(String? val) => _startDate = val;

  bool hasStartDate() => _startDate != null;

  // "endDate" field.
  String? _endDate;
  String get endDate => _endDate ?? '';
  set endDate(String? val) => _endDate = val;

  bool hasEndDate() => _endDate != null;

  // "job" field.
  DocumentReference? _job;
  DocumentReference? get job => _job;
  set job(DocumentReference? val) => _job = val;

  bool hasJob() => _job != null;

  static SlotsStruct fromMap(Map<String, dynamic> data) => SlotsStruct(
        startDate: data['startDate'] as String?,
        endDate: data['endDate'] as String?,
        job: data['job'] as DocumentReference?,
      );

  static SlotsStruct? maybeFromMap(dynamic data) =>
      data is Map ? SlotsStruct.fromMap(data.cast<String, dynamic>()) : null;

  Map<String, dynamic> toMap() => {
        'startDate': _startDate,
        'endDate': _endDate,
        'job': _job,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'startDate': serializeParam(
          _startDate,
          ParamType.String,
        ),
        'endDate': serializeParam(
          _endDate,
          ParamType.String,
        ),
        'job': serializeParam(
          _job,
          ParamType.DocumentReference,
        ),
      }.withoutNulls;

  static SlotsStruct fromSerializableMap(Map<String, dynamic> data) =>
      SlotsStruct(
        startDate: deserializeParam(
          data['startDate'],
          ParamType.String,
          false,
        ),
        endDate: deserializeParam(
          data['endDate'],
          ParamType.String,
          false,
        ),
        job: deserializeParam(
          data['job'],
          ParamType.DocumentReference,
          false,
          collectionNamePath: ['JobDetails'],
        ),
      );

  @override
  String toString() => 'SlotsStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is SlotsStruct &&
        startDate == other.startDate &&
        endDate == other.endDate &&
        job == other.job;
  }

  @override
  int get hashCode => const ListEquality().hash([startDate, endDate, job]);
}

SlotsStruct createSlotsStruct({
  String? startDate,
  String? endDate,
  DocumentReference? job,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    SlotsStruct(
      startDate: startDate,
      endDate: endDate,
      job: job,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

SlotsStruct? updateSlotsStruct(
  SlotsStruct? slots, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    slots
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addSlotsStructData(
  Map<String, dynamic> firestoreData,
  SlotsStruct? slots,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (slots == null) {
    return;
  }
  if (slots.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && slots.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final slotsData = getSlotsFirestoreData(slots, forFieldValue);
  final nestedData = slotsData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields = slots.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getSlotsFirestoreData(
  SlotsStruct? slots, [
  bool forFieldValue = false,
]) {
  if (slots == null) {
    return {};
  }
  final firestoreData = mapToFirestore(slots.toMap());

  // Add any Firestore field values
  slots.firestoreUtilData.fieldValues.forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getSlotsListFirestoreData(
  List<SlotsStruct>? slotss,
) =>
    slotss?.map((e) => getSlotsFirestoreData(e, true)).toList() ?? [];
