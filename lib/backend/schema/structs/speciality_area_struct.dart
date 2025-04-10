// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class SpecialityAreaStruct extends FFFirebaseStruct {
  SpecialityAreaStruct({
    String? name,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _name = name,
        super(firestoreUtilData);

  // "name" field.
  String? _name;
  String get name => _name ?? '';
  set name(String? val) => _name = val;

  bool hasName() => _name != null;

  static SpecialityAreaStruct fromMap(Map<String, dynamic> data) =>
      SpecialityAreaStruct(
        name: data['name'] as String?,
      );

  static SpecialityAreaStruct? maybeFromMap(dynamic data) => data is Map
      ? SpecialityAreaStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'name': _name,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'name': serializeParam(
          _name,
          ParamType.String,
        ),
      }.withoutNulls;

  static SpecialityAreaStruct fromSerializableMap(Map<String, dynamic> data) =>
      SpecialityAreaStruct(
        name: deserializeParam(
          data['name'],
          ParamType.String,
          false,
        ),
      );

  @override
  String toString() => 'SpecialityAreaStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is SpecialityAreaStruct && name == other.name;
  }

  @override
  int get hashCode => const ListEquality().hash([name]);
}

SpecialityAreaStruct createSpecialityAreaStruct({
  String? name,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    SpecialityAreaStruct(
      name: name,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

SpecialityAreaStruct? updateSpecialityAreaStruct(
  SpecialityAreaStruct? specialityArea, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    specialityArea
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addSpecialityAreaStructData(
  Map<String, dynamic> firestoreData,
  SpecialityAreaStruct? specialityArea,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (specialityArea == null) {
    return;
  }
  if (specialityArea.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && specialityArea.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final specialityAreaData =
      getSpecialityAreaFirestoreData(specialityArea, forFieldValue);
  final nestedData =
      specialityAreaData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields = specialityArea.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getSpecialityAreaFirestoreData(
  SpecialityAreaStruct? specialityArea, [
  bool forFieldValue = false,
]) {
  if (specialityArea == null) {
    return {};
  }
  final firestoreData = mapToFirestore(specialityArea.toMap());

  // Add any Firestore field values
  specialityArea.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getSpecialityAreaListFirestoreData(
  List<SpecialityAreaStruct>? specialityAreas,
) =>
    specialityAreas
        ?.map((e) => getSpecialityAreaFirestoreData(e, true))
        .toList() ??
    [];
