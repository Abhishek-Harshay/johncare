// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class ProfessionsStruct extends FFFirebaseStruct {
  ProfessionsStruct({
    String? name,
    List<SpecialityAreaStruct>? specialtyArea,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _name = name,
        _specialtyArea = specialtyArea,
        super(firestoreUtilData);

  // "name" field.
  String? _name;
  String get name => _name ?? '';
  set name(String? val) => _name = val;

  bool hasName() => _name != null;

  // "specialtyArea" field.
  List<SpecialityAreaStruct>? _specialtyArea;
  List<SpecialityAreaStruct> get specialtyArea => _specialtyArea ?? const [];
  set specialtyArea(List<SpecialityAreaStruct>? val) => _specialtyArea = val;

  void updateSpecialtyArea(Function(List<SpecialityAreaStruct>) updateFn) {
    updateFn(_specialtyArea ??= []);
  }

  bool hasSpecialtyArea() => _specialtyArea != null;

  static ProfessionsStruct fromMap(Map<String, dynamic> data) =>
      ProfessionsStruct(
        name: data['name'] as String?,
        specialtyArea: getStructList(
          data['specialtyArea'],
          SpecialityAreaStruct.fromMap,
        ),
      );

  static ProfessionsStruct? maybeFromMap(dynamic data) => data is Map
      ? ProfessionsStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'name': _name,
        'specialtyArea': _specialtyArea?.map((e) => e.toMap()).toList(),
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'name': serializeParam(
          _name,
          ParamType.String,
        ),
        'specialtyArea': serializeParam(
          _specialtyArea,
          ParamType.DataStruct,
          isList: true,
        ),
      }.withoutNulls;

  static ProfessionsStruct fromSerializableMap(Map<String, dynamic> data) =>
      ProfessionsStruct(
        name: deserializeParam(
          data['name'],
          ParamType.String,
          false,
        ),
        specialtyArea: deserializeStructParam<SpecialityAreaStruct>(
          data['specialtyArea'],
          ParamType.DataStruct,
          true,
          structBuilder: SpecialityAreaStruct.fromSerializableMap,
        ),
      );

  @override
  String toString() => 'ProfessionsStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    const listEquality = ListEquality();
    return other is ProfessionsStruct &&
        name == other.name &&
        listEquality.equals(specialtyArea, other.specialtyArea);
  }

  @override
  int get hashCode => const ListEquality().hash([name, specialtyArea]);
}

ProfessionsStruct createProfessionsStruct({
  String? name,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    ProfessionsStruct(
      name: name,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

ProfessionsStruct? updateProfessionsStruct(
  ProfessionsStruct? professions, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    professions
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addProfessionsStructData(
  Map<String, dynamic> firestoreData,
  ProfessionsStruct? professions,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (professions == null) {
    return;
  }
  if (professions.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && professions.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final professionsData =
      getProfessionsFirestoreData(professions, forFieldValue);
  final nestedData =
      professionsData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields = professions.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getProfessionsFirestoreData(
  ProfessionsStruct? professions, [
  bool forFieldValue = false,
]) {
  if (professions == null) {
    return {};
  }
  final firestoreData = mapToFirestore(professions.toMap());

  // Add any Firestore field values
  professions.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getProfessionsListFirestoreData(
  List<ProfessionsStruct>? professionss,
) =>
    professionss?.map((e) => getProfessionsFirestoreData(e, true)).toList() ??
    [];
