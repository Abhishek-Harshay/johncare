// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class PrimaryContactInformationStruct extends FFFirebaseStruct {
  PrimaryContactInformationStruct({
    String? emailaddress,
    String? phonenumber,
    String? positionTitle,
    String? alternativecontact,
    String? firstName,
    String? lastName,
    DateTime? dob,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _emailaddress = emailaddress,
        _phonenumber = phonenumber,
        _positionTitle = positionTitle,
        _alternativecontact = alternativecontact,
        _firstName = firstName,
        _lastName = lastName,
        _dob = dob,
        super(firestoreUtilData);

  // "Emailaddress" field.
  String? _emailaddress;
  String get emailaddress => _emailaddress ?? '';
  set emailaddress(String? val) => _emailaddress = val;

  bool hasEmailaddress() => _emailaddress != null;

  // "Phonenumber" field.
  String? _phonenumber;
  String get phonenumber => _phonenumber ?? '';
  set phonenumber(String? val) => _phonenumber = val;

  bool hasPhonenumber() => _phonenumber != null;

  // "PositionTitle" field.
  String? _positionTitle;
  String get positionTitle => _positionTitle ?? '';
  set positionTitle(String? val) => _positionTitle = val;

  bool hasPositionTitle() => _positionTitle != null;

  // "Alternativecontact" field.
  String? _alternativecontact;
  String get alternativecontact => _alternativecontact ?? '';
  set alternativecontact(String? val) => _alternativecontact = val;

  bool hasAlternativecontact() => _alternativecontact != null;

  // "firstName" field.
  String? _firstName;
  String get firstName => _firstName ?? '';
  set firstName(String? val) => _firstName = val;

  bool hasFirstName() => _firstName != null;

  // "lastName" field.
  String? _lastName;
  String get lastName => _lastName ?? '';
  set lastName(String? val) => _lastName = val;

  bool hasLastName() => _lastName != null;

  // "dob" field.
  DateTime? _dob;
  DateTime? get dob => _dob;
  set dob(DateTime? val) => _dob = val;

  bool hasDob() => _dob != null;

  static PrimaryContactInformationStruct fromMap(Map<String, dynamic> data) =>
      PrimaryContactInformationStruct(
        emailaddress: data['Emailaddress'] as String?,
        phonenumber: data['Phonenumber'] as String?,
        positionTitle: data['PositionTitle'] as String?,
        alternativecontact: data['Alternativecontact'] as String?,
        firstName: data['firstName'] as String?,
        lastName: data['lastName'] as String?,
        dob: data['dob'] as DateTime?,
      );

  static PrimaryContactInformationStruct? maybeFromMap(dynamic data) => data
          is Map
      ? PrimaryContactInformationStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'Emailaddress': _emailaddress,
        'Phonenumber': _phonenumber,
        'PositionTitle': _positionTitle,
        'Alternativecontact': _alternativecontact,
        'firstName': _firstName,
        'lastName': _lastName,
        'dob': _dob,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'Emailaddress': serializeParam(
          _emailaddress,
          ParamType.String,
        ),
        'Phonenumber': serializeParam(
          _phonenumber,
          ParamType.String,
        ),
        'PositionTitle': serializeParam(
          _positionTitle,
          ParamType.String,
        ),
        'Alternativecontact': serializeParam(
          _alternativecontact,
          ParamType.String,
        ),
        'firstName': serializeParam(
          _firstName,
          ParamType.String,
        ),
        'lastName': serializeParam(
          _lastName,
          ParamType.String,
        ),
        'dob': serializeParam(
          _dob,
          ParamType.DateTime,
        ),
      }.withoutNulls;

  static PrimaryContactInformationStruct fromSerializableMap(
          Map<String, dynamic> data) =>
      PrimaryContactInformationStruct(
        emailaddress: deserializeParam(
          data['Emailaddress'],
          ParamType.String,
          false,
        ),
        phonenumber: deserializeParam(
          data['Phonenumber'],
          ParamType.String,
          false,
        ),
        positionTitle: deserializeParam(
          data['PositionTitle'],
          ParamType.String,
          false,
        ),
        alternativecontact: deserializeParam(
          data['Alternativecontact'],
          ParamType.String,
          false,
        ),
        firstName: deserializeParam(
          data['firstName'],
          ParamType.String,
          false,
        ),
        lastName: deserializeParam(
          data['lastName'],
          ParamType.String,
          false,
        ),
        dob: deserializeParam(
          data['dob'],
          ParamType.DateTime,
          false,
        ),
      );

  @override
  String toString() => 'PrimaryContactInformationStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is PrimaryContactInformationStruct &&
        emailaddress == other.emailaddress &&
        phonenumber == other.phonenumber &&
        positionTitle == other.positionTitle &&
        alternativecontact == other.alternativecontact &&
        firstName == other.firstName &&
        lastName == other.lastName &&
        dob == other.dob;
  }

  @override
  int get hashCode => const ListEquality().hash([
        emailaddress,
        phonenumber,
        positionTitle,
        alternativecontact,
        firstName,
        lastName,
        dob
      ]);
}

PrimaryContactInformationStruct createPrimaryContactInformationStruct({
  String? emailaddress,
  String? phonenumber,
  String? positionTitle,
  String? alternativecontact,
  String? firstName,
  String? lastName,
  DateTime? dob,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    PrimaryContactInformationStruct(
      emailaddress: emailaddress,
      phonenumber: phonenumber,
      positionTitle: positionTitle,
      alternativecontact: alternativecontact,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

PrimaryContactInformationStruct? updatePrimaryContactInformationStruct(
  PrimaryContactInformationStruct? primaryContactInformation, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    primaryContactInformation
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addPrimaryContactInformationStructData(
  Map<String, dynamic> firestoreData,
  PrimaryContactInformationStruct? primaryContactInformation,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (primaryContactInformation == null) {
    return;
  }
  if (primaryContactInformation.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields = !forFieldValue &&
      primaryContactInformation.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final primaryContactInformationData =
      getPrimaryContactInformationFirestoreData(
          primaryContactInformation, forFieldValue);
  final nestedData =
      primaryContactInformationData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields =
      primaryContactInformation.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getPrimaryContactInformationFirestoreData(
  PrimaryContactInformationStruct? primaryContactInformation, [
  bool forFieldValue = false,
]) {
  if (primaryContactInformation == null) {
    return {};
  }
  final firestoreData = mapToFirestore(primaryContactInformation.toMap());

  // Add any Firestore field values
  primaryContactInformation.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getPrimaryContactInformationListFirestoreData(
  List<PrimaryContactInformationStruct>? primaryContactInformations,
) =>
    primaryContactInformations
        ?.map((e) => getPrimaryContactInformationFirestoreData(e, true))
        .toList() ??
    [];
