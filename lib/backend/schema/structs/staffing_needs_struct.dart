// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class StaffingNeedsStruct extends FFFirebaseStruct {
  StaffingNeedsStruct({
    String? professionalsneeded,
    String? typesofshiftsrequired,
    int? typicalshiftduration,
    String? expectedfrequencyofuse,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _professionalsneeded = professionalsneeded,
        _typesofshiftsrequired = typesofshiftsrequired,
        _typicalshiftduration = typicalshiftduration,
        _expectedfrequencyofuse = expectedfrequencyofuse,
        super(firestoreUtilData);

  // "Professionalsneeded" field.
  String? _professionalsneeded;
  String get professionalsneeded => _professionalsneeded ?? '';
  set professionalsneeded(String? val) => _professionalsneeded = val;

  bool hasProfessionalsneeded() => _professionalsneeded != null;

  // "Typesofshiftsrequired" field.
  String? _typesofshiftsrequired;
  String get typesofshiftsrequired => _typesofshiftsrequired ?? '';
  set typesofshiftsrequired(String? val) => _typesofshiftsrequired = val;

  bool hasTypesofshiftsrequired() => _typesofshiftsrequired != null;

  // "Typicalshiftduration" field.
  int? _typicalshiftduration;
  int get typicalshiftduration => _typicalshiftduration ?? 0;
  set typicalshiftduration(int? val) => _typicalshiftduration = val;

  void incrementTypicalshiftduration(int amount) =>
      typicalshiftduration = typicalshiftduration + amount;

  bool hasTypicalshiftduration() => _typicalshiftduration != null;

  // "Expectedfrequencyofuse" field.
  String? _expectedfrequencyofuse;
  String get expectedfrequencyofuse => _expectedfrequencyofuse ?? '';
  set expectedfrequencyofuse(String? val) => _expectedfrequencyofuse = val;

  bool hasExpectedfrequencyofuse() => _expectedfrequencyofuse != null;

  static StaffingNeedsStruct fromMap(Map<String, dynamic> data) =>
      StaffingNeedsStruct(
        professionalsneeded: data['Professionalsneeded'] as String?,
        typesofshiftsrequired: data['Typesofshiftsrequired'] as String?,
        typicalshiftduration: castToType<int>(data['Typicalshiftduration']),
        expectedfrequencyofuse: data['Expectedfrequencyofuse'] as String?,
      );

  static StaffingNeedsStruct? maybeFromMap(dynamic data) => data is Map
      ? StaffingNeedsStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'Professionalsneeded': _professionalsneeded,
        'Typesofshiftsrequired': _typesofshiftsrequired,
        'Typicalshiftduration': _typicalshiftduration,
        'Expectedfrequencyofuse': _expectedfrequencyofuse,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'Professionalsneeded': serializeParam(
          _professionalsneeded,
          ParamType.String,
        ),
        'Typesofshiftsrequired': serializeParam(
          _typesofshiftsrequired,
          ParamType.String,
        ),
        'Typicalshiftduration': serializeParam(
          _typicalshiftduration,
          ParamType.int,
        ),
        'Expectedfrequencyofuse': serializeParam(
          _expectedfrequencyofuse,
          ParamType.String,
        ),
      }.withoutNulls;

  static StaffingNeedsStruct fromSerializableMap(Map<String, dynamic> data) =>
      StaffingNeedsStruct(
        professionalsneeded: deserializeParam(
          data['Professionalsneeded'],
          ParamType.String,
          false,
        ),
        typesofshiftsrequired: deserializeParam(
          data['Typesofshiftsrequired'],
          ParamType.String,
          false,
        ),
        typicalshiftduration: deserializeParam(
          data['Typicalshiftduration'],
          ParamType.int,
          false,
        ),
        expectedfrequencyofuse: deserializeParam(
          data['Expectedfrequencyofuse'],
          ParamType.String,
          false,
        ),
      );

  @override
  String toString() => 'StaffingNeedsStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is StaffingNeedsStruct &&
        professionalsneeded == other.professionalsneeded &&
        typesofshiftsrequired == other.typesofshiftsrequired &&
        typicalshiftduration == other.typicalshiftduration &&
        expectedfrequencyofuse == other.expectedfrequencyofuse;
  }

  @override
  int get hashCode => const ListEquality().hash([
        professionalsneeded,
        typesofshiftsrequired,
        typicalshiftduration,
        expectedfrequencyofuse
      ]);
}

StaffingNeedsStruct createStaffingNeedsStruct({
  String? professionalsneeded,
  String? typesofshiftsrequired,
  int? typicalshiftduration,
  String? expectedfrequencyofuse,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    StaffingNeedsStruct(
      professionalsneeded: professionalsneeded,
      typesofshiftsrequired: typesofshiftsrequired,
      typicalshiftduration: typicalshiftduration,
      expectedfrequencyofuse: expectedfrequencyofuse,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

StaffingNeedsStruct? updateStaffingNeedsStruct(
  StaffingNeedsStruct? staffingNeeds, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    staffingNeeds
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addStaffingNeedsStructData(
  Map<String, dynamic> firestoreData,
  StaffingNeedsStruct? staffingNeeds,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (staffingNeeds == null) {
    return;
  }
  if (staffingNeeds.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && staffingNeeds.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final staffingNeedsData =
      getStaffingNeedsFirestoreData(staffingNeeds, forFieldValue);
  final nestedData =
      staffingNeedsData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields = staffingNeeds.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getStaffingNeedsFirestoreData(
  StaffingNeedsStruct? staffingNeeds, [
  bool forFieldValue = false,
]) {
  if (staffingNeeds == null) {
    return {};
  }
  final firestoreData = mapToFirestore(staffingNeeds.toMap());

  // Add any Firestore field values
  staffingNeeds.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getStaffingNeedsListFirestoreData(
  List<StaffingNeedsStruct>? staffingNeedss,
) =>
    staffingNeedss
        ?.map((e) => getStaffingNeedsFirestoreData(e, true))
        .toList() ??
    [];
