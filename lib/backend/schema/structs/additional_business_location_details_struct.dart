// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class AdditionalBusinessLocationDetailsStruct extends FFFirebaseStruct {
  AdditionalBusinessLocationDetailsStruct({
    String? street,
    String? cityname,
    String? province,
    String? postalcode,
    LatLng? latlng,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _street = street,
        _cityname = cityname,
        _province = province,
        _postalcode = postalcode,
        _latlng = latlng,
        super(firestoreUtilData);

  // "Street" field.
  String? _street;
  String get street => _street ?? '';
  set street(String? val) => _street = val;

  bool hasStreet() => _street != null;

  // "Cityname" field.
  String? _cityname;
  String get cityname => _cityname ?? '';
  set cityname(String? val) => _cityname = val;

  bool hasCityname() => _cityname != null;

  // "Province" field.
  String? _province;
  String get province => _province ?? '';
  set province(String? val) => _province = val;

  bool hasProvince() => _province != null;

  // "Postalcode" field.
  String? _postalcode;
  String get postalcode => _postalcode ?? '';
  set postalcode(String? val) => _postalcode = val;

  bool hasPostalcode() => _postalcode != null;

  // "latlng" field.
  LatLng? _latlng;
  LatLng? get latlng => _latlng;
  set latlng(LatLng? val) => _latlng = val;

  bool hasLatlng() => _latlng != null;

  static AdditionalBusinessLocationDetailsStruct fromMap(
          Map<String, dynamic> data) =>
      AdditionalBusinessLocationDetailsStruct(
        street: data['Street'] as String?,
        cityname: data['Cityname'] as String?,
        province: data['Province'] as String?,
        postalcode: data['Postalcode'] as String?,
        latlng: data['latlng'] as LatLng?,
      );

  static AdditionalBusinessLocationDetailsStruct? maybeFromMap(dynamic data) =>
      data is Map
          ? AdditionalBusinessLocationDetailsStruct.fromMap(
              data.cast<String, dynamic>())
          : null;

  Map<String, dynamic> toMap() => {
        'Street': _street,
        'Cityname': _cityname,
        'Province': _province,
        'Postalcode': _postalcode,
        'latlng': _latlng,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'Street': serializeParam(
          _street,
          ParamType.String,
        ),
        'Cityname': serializeParam(
          _cityname,
          ParamType.String,
        ),
        'Province': serializeParam(
          _province,
          ParamType.String,
        ),
        'Postalcode': serializeParam(
          _postalcode,
          ParamType.String,
        ),
        'latlng': serializeParam(
          _latlng,
          ParamType.LatLng,
        ),
      }.withoutNulls;

  static AdditionalBusinessLocationDetailsStruct fromSerializableMap(
          Map<String, dynamic> data) =>
      AdditionalBusinessLocationDetailsStruct(
        street: deserializeParam(
          data['Street'],
          ParamType.String,
          false,
        ),
        cityname: deserializeParam(
          data['Cityname'],
          ParamType.String,
          false,
        ),
        province: deserializeParam(
          data['Province'],
          ParamType.String,
          false,
        ),
        postalcode: deserializeParam(
          data['Postalcode'],
          ParamType.String,
          false,
        ),
        latlng: deserializeParam(
          data['latlng'],
          ParamType.LatLng,
          false,
        ),
      );

  @override
  String toString() => 'AdditionalBusinessLocationDetailsStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is AdditionalBusinessLocationDetailsStruct &&
        street == other.street &&
        cityname == other.cityname &&
        province == other.province &&
        postalcode == other.postalcode &&
        latlng == other.latlng;
  }

  @override
  int get hashCode => const ListEquality()
      .hash([street, cityname, province, postalcode, latlng]);
}

AdditionalBusinessLocationDetailsStruct
    createAdditionalBusinessLocationDetailsStruct({
  String? street,
  String? cityname,
  String? province,
  String? postalcode,
  LatLng? latlng,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
        AdditionalBusinessLocationDetailsStruct(
          street: street,
          cityname: cityname,
          province: province,
          postalcode: postalcode,
          latlng: latlng,
          firestoreUtilData: FirestoreUtilData(
            clearUnsetFields: clearUnsetFields,
            create: create,
            delete: delete,
            fieldValues: fieldValues,
          ),
        );

AdditionalBusinessLocationDetailsStruct?
    updateAdditionalBusinessLocationDetailsStruct(
  AdditionalBusinessLocationDetailsStruct? additionalBusinessLocationDetails, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
        additionalBusinessLocationDetails
          ?..firestoreUtilData = FirestoreUtilData(
            clearUnsetFields: clearUnsetFields,
            create: create,
          );

void addAdditionalBusinessLocationDetailsStructData(
  Map<String, dynamic> firestoreData,
  AdditionalBusinessLocationDetailsStruct? additionalBusinessLocationDetails,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (additionalBusinessLocationDetails == null) {
    return;
  }
  if (additionalBusinessLocationDetails.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields = !forFieldValue &&
      additionalBusinessLocationDetails.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final additionalBusinessLocationDetailsData =
      getAdditionalBusinessLocationDetailsFirestoreData(
          additionalBusinessLocationDetails, forFieldValue);
  final nestedData = additionalBusinessLocationDetailsData
      .map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields =
      additionalBusinessLocationDetails.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getAdditionalBusinessLocationDetailsFirestoreData(
  AdditionalBusinessLocationDetailsStruct? additionalBusinessLocationDetails, [
  bool forFieldValue = false,
]) {
  if (additionalBusinessLocationDetails == null) {
    return {};
  }
  final firestoreData =
      mapToFirestore(additionalBusinessLocationDetails.toMap());

  // Add any Firestore field values
  additionalBusinessLocationDetails.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<
    Map<String, dynamic>> getAdditionalBusinessLocationDetailsListFirestoreData(
  List<AdditionalBusinessLocationDetailsStruct>?
      additionalBusinessLocationDetailss,
) =>
    additionalBusinessLocationDetailss
        ?.map((e) => getAdditionalBusinessLocationDetailsFirestoreData(e, true))
        .toList() ??
    [];
