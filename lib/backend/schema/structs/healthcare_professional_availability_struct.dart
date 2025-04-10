// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class HealthcareProfessionalAvailabilityStruct extends FFFirebaseStruct {
  HealthcareProfessionalAvailabilityStruct({
    String? selectdaysforshifts,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _selectdaysforshifts = selectdaysforshifts,
        super(firestoreUtilData);

  // "Selectdaysforshifts" field.
  String? _selectdaysforshifts;
  String get selectdaysforshifts => _selectdaysforshifts ?? '';
  set selectdaysforshifts(String? val) => _selectdaysforshifts = val;

  bool hasSelectdaysforshifts() => _selectdaysforshifts != null;

  static HealthcareProfessionalAvailabilityStruct fromMap(
          Map<String, dynamic> data) =>
      HealthcareProfessionalAvailabilityStruct(
        selectdaysforshifts: data['Selectdaysforshifts'] as String?,
      );

  static HealthcareProfessionalAvailabilityStruct? maybeFromMap(dynamic data) =>
      data is Map
          ? HealthcareProfessionalAvailabilityStruct.fromMap(
              data.cast<String, dynamic>())
          : null;

  Map<String, dynamic> toMap() => {
        'Selectdaysforshifts': _selectdaysforshifts,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'Selectdaysforshifts': serializeParam(
          _selectdaysforshifts,
          ParamType.String,
        ),
      }.withoutNulls;

  static HealthcareProfessionalAvailabilityStruct fromSerializableMap(
          Map<String, dynamic> data) =>
      HealthcareProfessionalAvailabilityStruct(
        selectdaysforshifts: deserializeParam(
          data['Selectdaysforshifts'],
          ParamType.String,
          false,
        ),
      );

  @override
  String toString() => 'HealthcareProfessionalAvailabilityStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is HealthcareProfessionalAvailabilityStruct &&
        selectdaysforshifts == other.selectdaysforshifts;
  }

  @override
  int get hashCode => const ListEquality().hash([selectdaysforshifts]);
}

HealthcareProfessionalAvailabilityStruct
    createHealthcareProfessionalAvailabilityStruct({
  String? selectdaysforshifts,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
        HealthcareProfessionalAvailabilityStruct(
          selectdaysforshifts: selectdaysforshifts,
          firestoreUtilData: FirestoreUtilData(
            clearUnsetFields: clearUnsetFields,
            create: create,
            delete: delete,
            fieldValues: fieldValues,
          ),
        );

HealthcareProfessionalAvailabilityStruct?
    updateHealthcareProfessionalAvailabilityStruct(
  HealthcareProfessionalAvailabilityStruct?
      healthcareProfessionalAvailability, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
        healthcareProfessionalAvailability
          ?..firestoreUtilData = FirestoreUtilData(
            clearUnsetFields: clearUnsetFields,
            create: create,
          );

void addHealthcareProfessionalAvailabilityStructData(
  Map<String, dynamic> firestoreData,
  HealthcareProfessionalAvailabilityStruct? healthcareProfessionalAvailability,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (healthcareProfessionalAvailability == null) {
    return;
  }
  if (healthcareProfessionalAvailability.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields = !forFieldValue &&
      healthcareProfessionalAvailability.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final healthcareProfessionalAvailabilityData =
      getHealthcareProfessionalAvailabilityFirestoreData(
          healthcareProfessionalAvailability, forFieldValue);
  final nestedData = healthcareProfessionalAvailabilityData
      .map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields =
      healthcareProfessionalAvailability.firestoreUtilData.create ||
          clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getHealthcareProfessionalAvailabilityFirestoreData(
  HealthcareProfessionalAvailabilityStruct?
      healthcareProfessionalAvailability, [
  bool forFieldValue = false,
]) {
  if (healthcareProfessionalAvailability == null) {
    return {};
  }
  final firestoreData =
      mapToFirestore(healthcareProfessionalAvailability.toMap());

  // Add any Firestore field values
  healthcareProfessionalAvailability.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>>
    getHealthcareProfessionalAvailabilityListFirestoreData(
  List<HealthcareProfessionalAvailabilityStruct>?
      healthcareProfessionalAvailabilitys,
) =>
        healthcareProfessionalAvailabilitys
            ?.map((e) =>
                getHealthcareProfessionalAvailabilityFirestoreData(e, true))
            .toList() ??
        [];
