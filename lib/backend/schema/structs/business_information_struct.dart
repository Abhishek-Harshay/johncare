// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class BusinessInformationStruct extends FFFirebaseStruct {
  BusinessInformationStruct({
    String? businessName,
    String? typeofBusiness,
    String? businessregistrationnumber,
    int? numbersOfLocations,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _businessName = businessName,
        _typeofBusiness = typeofBusiness,
        _businessregistrationnumber = businessregistrationnumber,
        _numbersOfLocations = numbersOfLocations,
        super(firestoreUtilData);

  // "BusinessName" field.
  String? _businessName;
  String get businessName => _businessName ?? '';
  set businessName(String? val) => _businessName = val;

  bool hasBusinessName() => _businessName != null;

  // "TypeofBusiness" field.
  String? _typeofBusiness;
  String get typeofBusiness => _typeofBusiness ?? '';
  set typeofBusiness(String? val) => _typeofBusiness = val;

  bool hasTypeofBusiness() => _typeofBusiness != null;

  // "Businessregistrationnumber" field.
  String? _businessregistrationnumber;
  String get businessregistrationnumber => _businessregistrationnumber ?? '';
  set businessregistrationnumber(String? val) =>
      _businessregistrationnumber = val;

  bool hasBusinessregistrationnumber() => _businessregistrationnumber != null;

  // "NumbersOfLocations" field.
  int? _numbersOfLocations;
  int get numbersOfLocations => _numbersOfLocations ?? 0;
  set numbersOfLocations(int? val) => _numbersOfLocations = val;

  void incrementNumbersOfLocations(int amount) =>
      numbersOfLocations = numbersOfLocations + amount;

  bool hasNumbersOfLocations() => _numbersOfLocations != null;

  static BusinessInformationStruct fromMap(Map<String, dynamic> data) =>
      BusinessInformationStruct(
        businessName: data['BusinessName'] as String?,
        typeofBusiness: data['TypeofBusiness'] as String?,
        businessregistrationnumber:
            data['Businessregistrationnumber'] as String?,
        numbersOfLocations: castToType<int>(data['NumbersOfLocations']),
      );

  static BusinessInformationStruct? maybeFromMap(dynamic data) => data is Map
      ? BusinessInformationStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'BusinessName': _businessName,
        'TypeofBusiness': _typeofBusiness,
        'Businessregistrationnumber': _businessregistrationnumber,
        'NumbersOfLocations': _numbersOfLocations,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'BusinessName': serializeParam(
          _businessName,
          ParamType.String,
        ),
        'TypeofBusiness': serializeParam(
          _typeofBusiness,
          ParamType.String,
        ),
        'Businessregistrationnumber': serializeParam(
          _businessregistrationnumber,
          ParamType.String,
        ),
        'NumbersOfLocations': serializeParam(
          _numbersOfLocations,
          ParamType.int,
        ),
      }.withoutNulls;

  static BusinessInformationStruct fromSerializableMap(
          Map<String, dynamic> data) =>
      BusinessInformationStruct(
        businessName: deserializeParam(
          data['BusinessName'],
          ParamType.String,
          false,
        ),
        typeofBusiness: deserializeParam(
          data['TypeofBusiness'],
          ParamType.String,
          false,
        ),
        businessregistrationnumber: deserializeParam(
          data['Businessregistrationnumber'],
          ParamType.String,
          false,
        ),
        numbersOfLocations: deserializeParam(
          data['NumbersOfLocations'],
          ParamType.int,
          false,
        ),
      );

  @override
  String toString() => 'BusinessInformationStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is BusinessInformationStruct &&
        businessName == other.businessName &&
        typeofBusiness == other.typeofBusiness &&
        businessregistrationnumber == other.businessregistrationnumber &&
        numbersOfLocations == other.numbersOfLocations;
  }

  @override
  int get hashCode => const ListEquality().hash([
        businessName,
        typeofBusiness,
        businessregistrationnumber,
        numbersOfLocations
      ]);
}

BusinessInformationStruct createBusinessInformationStruct({
  String? businessName,
  String? typeofBusiness,
  String? businessregistrationnumber,
  int? numbersOfLocations,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    BusinessInformationStruct(
      businessName: businessName,
      typeofBusiness: typeofBusiness,
      businessregistrationnumber: businessregistrationnumber,
      numbersOfLocations: numbersOfLocations,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

BusinessInformationStruct? updateBusinessInformationStruct(
  BusinessInformationStruct? businessInformation, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    businessInformation
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addBusinessInformationStructData(
  Map<String, dynamic> firestoreData,
  BusinessInformationStruct? businessInformation,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (businessInformation == null) {
    return;
  }
  if (businessInformation.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && businessInformation.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final businessInformationData =
      getBusinessInformationFirestoreData(businessInformation, forFieldValue);
  final nestedData =
      businessInformationData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields =
      businessInformation.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getBusinessInformationFirestoreData(
  BusinessInformationStruct? businessInformation, [
  bool forFieldValue = false,
]) {
  if (businessInformation == null) {
    return {};
  }
  final firestoreData = mapToFirestore(businessInformation.toMap());

  // Add any Firestore field values
  businessInformation.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getBusinessInformationListFirestoreData(
  List<BusinessInformationStruct>? businessInformations,
) =>
    businessInformations
        ?.map((e) => getBusinessInformationFirestoreData(e, true))
        .toList() ??
    [];
