// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class ServiceAgreementPreferenceStruct extends FFFirebaseStruct {
  ServiceAgreementPreferenceStruct({
    String? professionalsneeded,
    String? skillscertifications,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _professionalsneeded = professionalsneeded,
        _skillscertifications = skillscertifications,
        super(firestoreUtilData);

  // "Professionalsneeded" field.
  String? _professionalsneeded;
  String get professionalsneeded => _professionalsneeded ?? '';
  set professionalsneeded(String? val) => _professionalsneeded = val;

  bool hasProfessionalsneeded() => _professionalsneeded != null;

  // "Skillscertifications" field.
  String? _skillscertifications;
  String get skillscertifications => _skillscertifications ?? '';
  set skillscertifications(String? val) => _skillscertifications = val;

  bool hasSkillscertifications() => _skillscertifications != null;

  static ServiceAgreementPreferenceStruct fromMap(Map<String, dynamic> data) =>
      ServiceAgreementPreferenceStruct(
        professionalsneeded: data['Professionalsneeded'] as String?,
        skillscertifications: data['Skillscertifications'] as String?,
      );

  static ServiceAgreementPreferenceStruct? maybeFromMap(dynamic data) => data
          is Map
      ? ServiceAgreementPreferenceStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'Professionalsneeded': _professionalsneeded,
        'Skillscertifications': _skillscertifications,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'Professionalsneeded': serializeParam(
          _professionalsneeded,
          ParamType.String,
        ),
        'Skillscertifications': serializeParam(
          _skillscertifications,
          ParamType.String,
        ),
      }.withoutNulls;

  static ServiceAgreementPreferenceStruct fromSerializableMap(
          Map<String, dynamic> data) =>
      ServiceAgreementPreferenceStruct(
        professionalsneeded: deserializeParam(
          data['Professionalsneeded'],
          ParamType.String,
          false,
        ),
        skillscertifications: deserializeParam(
          data['Skillscertifications'],
          ParamType.String,
          false,
        ),
      );

  @override
  String toString() => 'ServiceAgreementPreferenceStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is ServiceAgreementPreferenceStruct &&
        professionalsneeded == other.professionalsneeded &&
        skillscertifications == other.skillscertifications;
  }

  @override
  int get hashCode =>
      const ListEquality().hash([professionalsneeded, skillscertifications]);
}

ServiceAgreementPreferenceStruct createServiceAgreementPreferenceStruct({
  String? professionalsneeded,
  String? skillscertifications,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    ServiceAgreementPreferenceStruct(
      professionalsneeded: professionalsneeded,
      skillscertifications: skillscertifications,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

ServiceAgreementPreferenceStruct? updateServiceAgreementPreferenceStruct(
  ServiceAgreementPreferenceStruct? serviceAgreementPreference, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    serviceAgreementPreference
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addServiceAgreementPreferenceStructData(
  Map<String, dynamic> firestoreData,
  ServiceAgreementPreferenceStruct? serviceAgreementPreference,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (serviceAgreementPreference == null) {
    return;
  }
  if (serviceAgreementPreference.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields = !forFieldValue &&
      serviceAgreementPreference.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final serviceAgreementPreferenceData =
      getServiceAgreementPreferenceFirestoreData(
          serviceAgreementPreference, forFieldValue);
  final nestedData = serviceAgreementPreferenceData
      .map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields =
      serviceAgreementPreference.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getServiceAgreementPreferenceFirestoreData(
  ServiceAgreementPreferenceStruct? serviceAgreementPreference, [
  bool forFieldValue = false,
]) {
  if (serviceAgreementPreference == null) {
    return {};
  }
  final firestoreData = mapToFirestore(serviceAgreementPreference.toMap());

  // Add any Firestore field values
  serviceAgreementPreference.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getServiceAgreementPreferenceListFirestoreData(
  List<ServiceAgreementPreferenceStruct>? serviceAgreementPreferences,
) =>
    serviceAgreementPreferences
        ?.map((e) => getServiceAgreementPreferenceFirestoreData(e, true))
        .toList() ??
    [];
