// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class PersonalinformationStruct extends FFFirebaseStruct {
  PersonalinformationStruct({
    String? firstName,
    String? lastName,
    String? email,
    String? phoneNumber,
    String? gender,
    String? homeAddress,
    String? dob,
    bool? workAuthorization,
    String? profession,
    String? specialtyArea,
    int? yearsOfExperience,
    List<String>? languageSpoken,
    String? professionalSummary,
    String? availablefor,
    LatLng? homeLatLng,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _firstName = firstName,
        _lastName = lastName,
        _email = email,
        _phoneNumber = phoneNumber,
        _gender = gender,
        _homeAddress = homeAddress,
        _dob = dob,
        _workAuthorization = workAuthorization,
        _profession = profession,
        _specialtyArea = specialtyArea,
        _yearsOfExperience = yearsOfExperience,
        _languageSpoken = languageSpoken,
        _professionalSummary = professionalSummary,
        _availablefor = availablefor,
        _homeLatLng = homeLatLng,
        super(firestoreUtilData);

  // "FirstName" field.
  String? _firstName;
  String get firstName => _firstName ?? '';
  set firstName(String? val) => _firstName = val;

  bool hasFirstName() => _firstName != null;

  // "LastName" field.
  String? _lastName;
  String get lastName => _lastName ?? '';
  set lastName(String? val) => _lastName = val;

  bool hasLastName() => _lastName != null;

  // "Email" field.
  String? _email;
  String get email => _email ?? '';
  set email(String? val) => _email = val;

  bool hasEmail() => _email != null;

  // "PhoneNumber" field.
  String? _phoneNumber;
  String get phoneNumber => _phoneNumber ?? '';
  set phoneNumber(String? val) => _phoneNumber = val;

  bool hasPhoneNumber() => _phoneNumber != null;

  // "Gender" field.
  String? _gender;
  String get gender => _gender ?? '';
  set gender(String? val) => _gender = val;

  bool hasGender() => _gender != null;

  // "HomeAddress" field.
  String? _homeAddress;
  String get homeAddress => _homeAddress ?? '';
  set homeAddress(String? val) => _homeAddress = val;

  bool hasHomeAddress() => _homeAddress != null;

  // "Dob" field.
  String? _dob;
  String get dob => _dob ?? '';
  set dob(String? val) => _dob = val;

  bool hasDob() => _dob != null;

  // "WorkAuthorization" field.
  bool? _workAuthorization;
  bool get workAuthorization => _workAuthorization ?? false;
  set workAuthorization(bool? val) => _workAuthorization = val;

  bool hasWorkAuthorization() => _workAuthorization != null;

  // "Profession" field.
  String? _profession;
  String get profession => _profession ?? '';
  set profession(String? val) => _profession = val;

  bool hasProfession() => _profession != null;

  // "SpecialtyArea" field.
  String? _specialtyArea;
  String get specialtyArea => _specialtyArea ?? '';
  set specialtyArea(String? val) => _specialtyArea = val;

  bool hasSpecialtyArea() => _specialtyArea != null;

  // "YearsOfExperience" field.
  int? _yearsOfExperience;
  int get yearsOfExperience => _yearsOfExperience ?? 0;
  set yearsOfExperience(int? val) => _yearsOfExperience = val;

  void incrementYearsOfExperience(int amount) =>
      yearsOfExperience = yearsOfExperience + amount;

  bool hasYearsOfExperience() => _yearsOfExperience != null;

  // "LanguageSpoken" field.
  List<String>? _languageSpoken;
  List<String> get languageSpoken => _languageSpoken ?? const [];
  set languageSpoken(List<String>? val) => _languageSpoken = val;

  void updateLanguageSpoken(Function(List<String>) updateFn) {
    updateFn(_languageSpoken ??= []);
  }

  bool hasLanguageSpoken() => _languageSpoken != null;

  // "ProfessionalSummary" field.
  String? _professionalSummary;
  String get professionalSummary => _professionalSummary ?? '';
  set professionalSummary(String? val) => _professionalSummary = val;

  bool hasProfessionalSummary() => _professionalSummary != null;

  // "Availablefor" field.
  String? _availablefor;
  String get availablefor => _availablefor ?? '';
  set availablefor(String? val) => _availablefor = val;

  bool hasAvailablefor() => _availablefor != null;

  // "HomeLatLng" field.
  LatLng? _homeLatLng;
  LatLng? get homeLatLng => _homeLatLng;
  set homeLatLng(LatLng? val) => _homeLatLng = val;

  bool hasHomeLatLng() => _homeLatLng != null;

  static PersonalinformationStruct fromMap(Map<String, dynamic> data) =>
      PersonalinformationStruct(
        firstName: data['FirstName'] as String?,
        lastName: data['LastName'] as String?,
        email: data['Email'] as String?,
        phoneNumber: data['PhoneNumber'] as String?,
        gender: data['Gender'] as String?,
        homeAddress: data['HomeAddress'] as String?,
        dob: data['Dob'] as String?,
        workAuthorization: data['WorkAuthorization'] as bool?,
        profession: data['Profession'] as String?,
        specialtyArea: data['SpecialtyArea'] as String?,
        yearsOfExperience: castToType<int>(data['YearsOfExperience']),
        languageSpoken: getDataList(data['LanguageSpoken']),
        professionalSummary: data['ProfessionalSummary'] as String?,
        availablefor: data['Availablefor'] as String?,
        homeLatLng: data['HomeLatLng'] as LatLng?,
      );

  static PersonalinformationStruct? maybeFromMap(dynamic data) => data is Map
      ? PersonalinformationStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'FirstName': _firstName,
        'LastName': _lastName,
        'Email': _email,
        'PhoneNumber': _phoneNumber,
        'Gender': _gender,
        'HomeAddress': _homeAddress,
        'Dob': _dob,
        'WorkAuthorization': _workAuthorization,
        'Profession': _profession,
        'SpecialtyArea': _specialtyArea,
        'YearsOfExperience': _yearsOfExperience,
        'LanguageSpoken': _languageSpoken,
        'ProfessionalSummary': _professionalSummary,
        'Availablefor': _availablefor,
        'HomeLatLng': _homeLatLng,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'FirstName': serializeParam(
          _firstName,
          ParamType.String,
        ),
        'LastName': serializeParam(
          _lastName,
          ParamType.String,
        ),
        'Email': serializeParam(
          _email,
          ParamType.String,
        ),
        'PhoneNumber': serializeParam(
          _phoneNumber,
          ParamType.String,
        ),
        'Gender': serializeParam(
          _gender,
          ParamType.String,
        ),
        'HomeAddress': serializeParam(
          _homeAddress,
          ParamType.String,
        ),
        'Dob': serializeParam(
          _dob,
          ParamType.String,
        ),
        'WorkAuthorization': serializeParam(
          _workAuthorization,
          ParamType.bool,
        ),
        'Profession': serializeParam(
          _profession,
          ParamType.String,
        ),
        'SpecialtyArea': serializeParam(
          _specialtyArea,
          ParamType.String,
        ),
        'YearsOfExperience': serializeParam(
          _yearsOfExperience,
          ParamType.int,
        ),
        'LanguageSpoken': serializeParam(
          _languageSpoken,
          ParamType.String,
          isList: true,
        ),
        'ProfessionalSummary': serializeParam(
          _professionalSummary,
          ParamType.String,
        ),
        'Availablefor': serializeParam(
          _availablefor,
          ParamType.String,
        ),
        'HomeLatLng': serializeParam(
          _homeLatLng,
          ParamType.LatLng,
        ),
      }.withoutNulls;

  static PersonalinformationStruct fromSerializableMap(
          Map<String, dynamic> data) =>
      PersonalinformationStruct(
        firstName: deserializeParam(
          data['FirstName'],
          ParamType.String,
          false,
        ),
        lastName: deserializeParam(
          data['LastName'],
          ParamType.String,
          false,
        ),
        email: deserializeParam(
          data['Email'],
          ParamType.String,
          false,
        ),
        phoneNumber: deserializeParam(
          data['PhoneNumber'],
          ParamType.String,
          false,
        ),
        gender: deserializeParam(
          data['Gender'],
          ParamType.String,
          false,
        ),
        homeAddress: deserializeParam(
          data['HomeAddress'],
          ParamType.String,
          false,
        ),
        dob: deserializeParam(
          data['Dob'],
          ParamType.String,
          false,
        ),
        workAuthorization: deserializeParam(
          data['WorkAuthorization'],
          ParamType.bool,
          false,
        ),
        profession: deserializeParam(
          data['Profession'],
          ParamType.String,
          false,
        ),
        specialtyArea: deserializeParam(
          data['SpecialtyArea'],
          ParamType.String,
          false,
        ),
        yearsOfExperience: deserializeParam(
          data['YearsOfExperience'],
          ParamType.int,
          false,
        ),
        languageSpoken: deserializeParam<String>(
          data['LanguageSpoken'],
          ParamType.String,
          true,
        ),
        professionalSummary: deserializeParam(
          data['ProfessionalSummary'],
          ParamType.String,
          false,
        ),
        availablefor: deserializeParam(
          data['Availablefor'],
          ParamType.String,
          false,
        ),
        homeLatLng: deserializeParam(
          data['HomeLatLng'],
          ParamType.LatLng,
          false,
        ),
      );

  @override
  String toString() => 'PersonalinformationStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    const listEquality = ListEquality();
    return other is PersonalinformationStruct &&
        firstName == other.firstName &&
        lastName == other.lastName &&
        email == other.email &&
        phoneNumber == other.phoneNumber &&
        gender == other.gender &&
        homeAddress == other.homeAddress &&
        dob == other.dob &&
        workAuthorization == other.workAuthorization &&
        profession == other.profession &&
        specialtyArea == other.specialtyArea &&
        yearsOfExperience == other.yearsOfExperience &&
        listEquality.equals(languageSpoken, other.languageSpoken) &&
        professionalSummary == other.professionalSummary &&
        availablefor == other.availablefor &&
        homeLatLng == other.homeLatLng;
  }

  @override
  int get hashCode => const ListEquality().hash([
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        homeAddress,
        dob,
        workAuthorization,
        profession,
        specialtyArea,
        yearsOfExperience,
        languageSpoken,
        professionalSummary,
        availablefor,
        homeLatLng
      ]);
}

PersonalinformationStruct createPersonalinformationStruct({
  String? firstName,
  String? lastName,
  String? email,
  String? phoneNumber,
  String? gender,
  String? homeAddress,
  String? dob,
  bool? workAuthorization,
  String? profession,
  String? specialtyArea,
  int? yearsOfExperience,
  String? professionalSummary,
  String? availablefor,
  LatLng? homeLatLng,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    PersonalinformationStruct(
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      gender: gender,
      homeAddress: homeAddress,
      dob: dob,
      workAuthorization: workAuthorization,
      profession: profession,
      specialtyArea: specialtyArea,
      yearsOfExperience: yearsOfExperience,
      professionalSummary: professionalSummary,
      availablefor: availablefor,
      homeLatLng: homeLatLng,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

PersonalinformationStruct? updatePersonalinformationStruct(
  PersonalinformationStruct? personalinformation, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    personalinformation
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addPersonalinformationStructData(
  Map<String, dynamic> firestoreData,
  PersonalinformationStruct? personalinformation,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (personalinformation == null) {
    return;
  }
  if (personalinformation.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && personalinformation.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final personalinformationData =
      getPersonalinformationFirestoreData(personalinformation, forFieldValue);
  final nestedData =
      personalinformationData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields =
      personalinformation.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getPersonalinformationFirestoreData(
  PersonalinformationStruct? personalinformation, [
  bool forFieldValue = false,
]) {
  if (personalinformation == null) {
    return {};
  }
  final firestoreData = mapToFirestore(personalinformation.toMap());

  // Add any Firestore field values
  personalinformation.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getPersonalinformationListFirestoreData(
  List<PersonalinformationStruct>? personalinformations,
) =>
    personalinformations
        ?.map((e) => getPersonalinformationFirestoreData(e, true))
        .toList() ??
    [];
