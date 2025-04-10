// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class WorkEligibilityStruct extends FFFirebaseStruct {
  WorkEligibilityStruct({
    String? legalStatus,
    String? sin,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _legalStatus = legalStatus,
        _sin = sin,
        super(firestoreUtilData);

  // "LegalStatus" field.
  String? _legalStatus;
  String get legalStatus => _legalStatus ?? '';
  set legalStatus(String? val) => _legalStatus = val;

  bool hasLegalStatus() => _legalStatus != null;

  // "Sin" field.
  String? _sin;
  String get sin => _sin ?? '';
  set sin(String? val) => _sin = val;

  bool hasSin() => _sin != null;

  static WorkEligibilityStruct fromMap(Map<String, dynamic> data) =>
      WorkEligibilityStruct(
        legalStatus: data['LegalStatus'] as String?,
        sin: data['Sin'] as String?,
      );

  static WorkEligibilityStruct? maybeFromMap(dynamic data) => data is Map
      ? WorkEligibilityStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'LegalStatus': _legalStatus,
        'Sin': _sin,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'LegalStatus': serializeParam(
          _legalStatus,
          ParamType.String,
        ),
        'Sin': serializeParam(
          _sin,
          ParamType.String,
        ),
      }.withoutNulls;

  static WorkEligibilityStruct fromSerializableMap(Map<String, dynamic> data) =>
      WorkEligibilityStruct(
        legalStatus: deserializeParam(
          data['LegalStatus'],
          ParamType.String,
          false,
        ),
        sin: deserializeParam(
          data['Sin'],
          ParamType.String,
          false,
        ),
      );

  @override
  String toString() => 'WorkEligibilityStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is WorkEligibilityStruct &&
        legalStatus == other.legalStatus &&
        sin == other.sin;
  }

  @override
  int get hashCode => const ListEquality().hash([legalStatus, sin]);
}

WorkEligibilityStruct createWorkEligibilityStruct({
  String? legalStatus,
  String? sin,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    WorkEligibilityStruct(
      legalStatus: legalStatus,
      sin: sin,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

WorkEligibilityStruct? updateWorkEligibilityStruct(
  WorkEligibilityStruct? workEligibility, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    workEligibility
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addWorkEligibilityStructData(
  Map<String, dynamic> firestoreData,
  WorkEligibilityStruct? workEligibility,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (workEligibility == null) {
    return;
  }
  if (workEligibility.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && workEligibility.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final workEligibilityData =
      getWorkEligibilityFirestoreData(workEligibility, forFieldValue);
  final nestedData =
      workEligibilityData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields = workEligibility.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getWorkEligibilityFirestoreData(
  WorkEligibilityStruct? workEligibility, [
  bool forFieldValue = false,
]) {
  if (workEligibility == null) {
    return {};
  }
  final firestoreData = mapToFirestore(workEligibility.toMap());

  // Add any Firestore field values
  workEligibility.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getWorkEligibilityListFirestoreData(
  List<WorkEligibilityStruct>? workEligibilitys,
) =>
    workEligibilitys
        ?.map((e) => getWorkEligibilityFirestoreData(e, true))
        .toList() ??
    [];
