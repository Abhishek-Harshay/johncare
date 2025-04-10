// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class WorkExperienceStruct extends FFFirebaseStruct {
  WorkExperienceStruct({
    String? employerName,
    String? position,
    String? endDate,
    String? startDate,
    String? responsibilities,
    String? uploadResume,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _employerName = employerName,
        _position = position,
        _endDate = endDate,
        _startDate = startDate,
        _responsibilities = responsibilities,
        _uploadResume = uploadResume,
        super(firestoreUtilData);

  // "EmployerName" field.
  String? _employerName;
  String get employerName => _employerName ?? '';
  set employerName(String? val) => _employerName = val;

  bool hasEmployerName() => _employerName != null;

  // "Position" field.
  String? _position;
  String get position => _position ?? '';
  set position(String? val) => _position = val;

  bool hasPosition() => _position != null;

  // "EndDate" field.
  String? _endDate;
  String get endDate => _endDate ?? '';
  set endDate(String? val) => _endDate = val;

  bool hasEndDate() => _endDate != null;

  // "StartDate" field.
  String? _startDate;
  String get startDate => _startDate ?? '';
  set startDate(String? val) => _startDate = val;

  bool hasStartDate() => _startDate != null;

  // "Responsibilities" field.
  String? _responsibilities;
  String get responsibilities => _responsibilities ?? '';
  set responsibilities(String? val) => _responsibilities = val;

  bool hasResponsibilities() => _responsibilities != null;

  // "UploadResume" field.
  String? _uploadResume;
  String get uploadResume => _uploadResume ?? '';
  set uploadResume(String? val) => _uploadResume = val;

  bool hasUploadResume() => _uploadResume != null;

  static WorkExperienceStruct fromMap(Map<String, dynamic> data) =>
      WorkExperienceStruct(
        employerName: data['EmployerName'] as String?,
        position: data['Position'] as String?,
        endDate: data['EndDate'] as String?,
        startDate: data['StartDate'] as String?,
        responsibilities: data['Responsibilities'] as String?,
        uploadResume: data['UploadResume'] as String?,
      );

  static WorkExperienceStruct? maybeFromMap(dynamic data) => data is Map
      ? WorkExperienceStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'EmployerName': _employerName,
        'Position': _position,
        'EndDate': _endDate,
        'StartDate': _startDate,
        'Responsibilities': _responsibilities,
        'UploadResume': _uploadResume,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'EmployerName': serializeParam(
          _employerName,
          ParamType.String,
        ),
        'Position': serializeParam(
          _position,
          ParamType.String,
        ),
        'EndDate': serializeParam(
          _endDate,
          ParamType.String,
        ),
        'StartDate': serializeParam(
          _startDate,
          ParamType.String,
        ),
        'Responsibilities': serializeParam(
          _responsibilities,
          ParamType.String,
        ),
        'UploadResume': serializeParam(
          _uploadResume,
          ParamType.String,
        ),
      }.withoutNulls;

  static WorkExperienceStruct fromSerializableMap(Map<String, dynamic> data) =>
      WorkExperienceStruct(
        employerName: deserializeParam(
          data['EmployerName'],
          ParamType.String,
          false,
        ),
        position: deserializeParam(
          data['Position'],
          ParamType.String,
          false,
        ),
        endDate: deserializeParam(
          data['EndDate'],
          ParamType.String,
          false,
        ),
        startDate: deserializeParam(
          data['StartDate'],
          ParamType.String,
          false,
        ),
        responsibilities: deserializeParam(
          data['Responsibilities'],
          ParamType.String,
          false,
        ),
        uploadResume: deserializeParam(
          data['UploadResume'],
          ParamType.String,
          false,
        ),
      );

  @override
  String toString() => 'WorkExperienceStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is WorkExperienceStruct &&
        employerName == other.employerName &&
        position == other.position &&
        endDate == other.endDate &&
        startDate == other.startDate &&
        responsibilities == other.responsibilities &&
        uploadResume == other.uploadResume;
  }

  @override
  int get hashCode => const ListEquality().hash([
        employerName,
        position,
        endDate,
        startDate,
        responsibilities,
        uploadResume
      ]);
}

WorkExperienceStruct createWorkExperienceStruct({
  String? employerName,
  String? position,
  String? endDate,
  String? startDate,
  String? responsibilities,
  String? uploadResume,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    WorkExperienceStruct(
      employerName: employerName,
      position: position,
      endDate: endDate,
      startDate: startDate,
      responsibilities: responsibilities,
      uploadResume: uploadResume,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

WorkExperienceStruct? updateWorkExperienceStruct(
  WorkExperienceStruct? workExperience, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    workExperience
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addWorkExperienceStructData(
  Map<String, dynamic> firestoreData,
  WorkExperienceStruct? workExperience,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (workExperience == null) {
    return;
  }
  if (workExperience.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && workExperience.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final workExperienceData =
      getWorkExperienceFirestoreData(workExperience, forFieldValue);
  final nestedData =
      workExperienceData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields = workExperience.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getWorkExperienceFirestoreData(
  WorkExperienceStruct? workExperience, [
  bool forFieldValue = false,
]) {
  if (workExperience == null) {
    return {};
  }
  final firestoreData = mapToFirestore(workExperience.toMap());

  // Add any Firestore field values
  workExperience.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getWorkExperienceListFirestoreData(
  List<WorkExperienceStruct>? workExperiences,
) =>
    workExperiences
        ?.map((e) => getWorkExperienceFirestoreData(e, true))
        .toList() ??
    [];
