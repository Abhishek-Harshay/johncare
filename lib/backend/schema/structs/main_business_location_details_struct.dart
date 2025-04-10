// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class MainBusinessLocationDetailsStruct extends FFFirebaseStruct {
  MainBusinessLocationDetailsStruct({
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

  static MainBusinessLocationDetailsStruct fromMap(Map<String, dynamic> data) =>
      MainBusinessLocationDetailsStruct(
        street: data['Street'] as String?,
        cityname: data['Cityname'] as String?,
        province: data['Province'] as String?,
        postalcode: data['Postalcode'] as String?,
        latlng: data['latlng'] as LatLng?,
      );

  static MainBusinessLocationDetailsStruct? maybeFromMap(dynamic data) => data
          is Map
      ? MainBusinessLocationDetailsStruct.fromMap(data.cast<String, dynamic>())
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

  static MainBusinessLocationDetailsStruct fromSerializableMap(
          Map<String, dynamic> data) =>
      MainBusinessLocationDetailsStruct(
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
  String toString() => 'MainBusinessLocationDetailsStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is MainBusinessLocationDetailsStruct &&
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

MainBusinessLocationDetailsStruct createMainBusinessLocationDetailsStruct({
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
    MainBusinessLocationDetailsStruct(
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

MainBusinessLocationDetailsStruct? updateMainBusinessLocationDetailsStruct(
  MainBusinessLocationDetailsStruct? mainBusinessLocationDetails, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    mainBusinessLocationDetails
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addMainBusinessLocationDetailsStructData(
  Map<String, dynamic> firestoreData,
  MainBusinessLocationDetailsStruct? mainBusinessLocationDetails,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (mainBusinessLocationDetails == null) {
    return;
  }
  if (mainBusinessLocationDetails.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields = !forFieldValue &&
      mainBusinessLocationDetails.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final mainBusinessLocationDetailsData =
      getMainBusinessLocationDetailsFirestoreData(
          mainBusinessLocationDetails, forFieldValue);
  final nestedData = mainBusinessLocationDetailsData
      .map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields =
      mainBusinessLocationDetails.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getMainBusinessLocationDetailsFirestoreData(
  MainBusinessLocationDetailsStruct? mainBusinessLocationDetails, [
  bool forFieldValue = false,
]) {
  if (mainBusinessLocationDetails == null) {
    return {};
  }
  final firestoreData = mapToFirestore(mainBusinessLocationDetails.toMap());

  // Add any Firestore field values
  mainBusinessLocationDetails.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getMainBusinessLocationDetailsListFirestoreData(
  List<MainBusinessLocationDetailsStruct>? mainBusinessLocationDetailss,
) =>
    mainBusinessLocationDetailss
        ?.map((e) => getMainBusinessLocationDetailsFirestoreData(e, true))
        .toList() ??
    [];
