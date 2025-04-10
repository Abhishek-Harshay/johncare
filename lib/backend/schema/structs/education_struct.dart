// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class EducationStruct extends FFFirebaseStruct {
  EducationStruct({
    String? highestDegreeObtained,
    String? institutionName,
    int? yearGraduated,
    String? additionalTrainingOrCourses,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _highestDegreeObtained = highestDegreeObtained,
        _institutionName = institutionName,
        _yearGraduated = yearGraduated,
        _additionalTrainingOrCourses = additionalTrainingOrCourses,
        super(firestoreUtilData);

  // "HighestDegreeObtained" field.
  String? _highestDegreeObtained;
  String get highestDegreeObtained => _highestDegreeObtained ?? '';
  set highestDegreeObtained(String? val) => _highestDegreeObtained = val;

  bool hasHighestDegreeObtained() => _highestDegreeObtained != null;

  // "InstitutionName" field.
  String? _institutionName;
  String get institutionName => _institutionName ?? '';
  set institutionName(String? val) => _institutionName = val;

  bool hasInstitutionName() => _institutionName != null;

  // "YearGraduated" field.
  int? _yearGraduated;
  int get yearGraduated => _yearGraduated ?? 0;
  set yearGraduated(int? val) => _yearGraduated = val;

  void incrementYearGraduated(int amount) =>
      yearGraduated = yearGraduated + amount;

  bool hasYearGraduated() => _yearGraduated != null;

  // "AdditionalTrainingOrCourses" field.
  String? _additionalTrainingOrCourses;
  String get additionalTrainingOrCourses => _additionalTrainingOrCourses ?? '';
  set additionalTrainingOrCourses(String? val) =>
      _additionalTrainingOrCourses = val;

  bool hasAdditionalTrainingOrCourses() => _additionalTrainingOrCourses != null;

  static EducationStruct fromMap(Map<String, dynamic> data) => EducationStruct(
        highestDegreeObtained: data['HighestDegreeObtained'] as String?,
        institutionName: data['InstitutionName'] as String?,
        yearGraduated: castToType<int>(data['YearGraduated']),
        additionalTrainingOrCourses:
            data['AdditionalTrainingOrCourses'] as String?,
      );

  static EducationStruct? maybeFromMap(dynamic data) => data is Map
      ? EducationStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'HighestDegreeObtained': _highestDegreeObtained,
        'InstitutionName': _institutionName,
        'YearGraduated': _yearGraduated,
        'AdditionalTrainingOrCourses': _additionalTrainingOrCourses,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'HighestDegreeObtained': serializeParam(
          _highestDegreeObtained,
          ParamType.String,
        ),
        'InstitutionName': serializeParam(
          _institutionName,
          ParamType.String,
        ),
        'YearGraduated': serializeParam(
          _yearGraduated,
          ParamType.int,
        ),
        'AdditionalTrainingOrCourses': serializeParam(
          _additionalTrainingOrCourses,
          ParamType.String,
        ),
      }.withoutNulls;

  static EducationStruct fromSerializableMap(Map<String, dynamic> data) =>
      EducationStruct(
        highestDegreeObtained: deserializeParam(
          data['HighestDegreeObtained'],
          ParamType.String,
          false,
        ),
        institutionName: deserializeParam(
          data['InstitutionName'],
          ParamType.String,
          false,
        ),
        yearGraduated: deserializeParam(
          data['YearGraduated'],
          ParamType.int,
          false,
        ),
        additionalTrainingOrCourses: deserializeParam(
          data['AdditionalTrainingOrCourses'],
          ParamType.String,
          false,
        ),
      );

  @override
  String toString() => 'EducationStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is EducationStruct &&
        highestDegreeObtained == other.highestDegreeObtained &&
        institutionName == other.institutionName &&
        yearGraduated == other.yearGraduated &&
        additionalTrainingOrCourses == other.additionalTrainingOrCourses;
  }

  @override
  int get hashCode => const ListEquality().hash([
        highestDegreeObtained,
        institutionName,
        yearGraduated,
        additionalTrainingOrCourses
      ]);
}

EducationStruct createEducationStruct({
  String? highestDegreeObtained,
  String? institutionName,
  int? yearGraduated,
  String? additionalTrainingOrCourses,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    EducationStruct(
      highestDegreeObtained: highestDegreeObtained,
      institutionName: institutionName,
      yearGraduated: yearGraduated,
      additionalTrainingOrCourses: additionalTrainingOrCourses,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

EducationStruct? updateEducationStruct(
  EducationStruct? education, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    education
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addEducationStructData(
  Map<String, dynamic> firestoreData,
  EducationStruct? education,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (education == null) {
    return;
  }
  if (education.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && education.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final educationData = getEducationFirestoreData(education, forFieldValue);
  final nestedData = educationData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields = education.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getEducationFirestoreData(
  EducationStruct? education, [
  bool forFieldValue = false,
]) {
  if (education == null) {
    return {};
  }
  final firestoreData = mapToFirestore(education.toMap());

  // Add any Firestore field values
  education.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getEducationListFirestoreData(
  List<EducationStruct>? educations,
) =>
    educations?.map((e) => getEducationFirestoreData(e, true)).toList() ?? [];
