// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class ProfiledetailsforclientsStruct extends FFFirebaseStruct {
  ProfiledetailsforclientsStruct({
    double? hourlyrate,
    String? languagespoken,
    String? willingnesstotravel,
    String? profilePicture,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _hourlyrate = hourlyrate,
        _languagespoken = languagespoken,
        _willingnesstotravel = willingnesstotravel,
        _profilePicture = profilePicture,
        super(firestoreUtilData);

  // "Hourlyrate" field.
  double? _hourlyrate;
  double get hourlyrate => _hourlyrate ?? 0.0;
  set hourlyrate(double? val) => _hourlyrate = val;

  void incrementHourlyrate(double amount) => hourlyrate = hourlyrate + amount;

  bool hasHourlyrate() => _hourlyrate != null;

  // "Languagespoken" field.
  String? _languagespoken;
  String get languagespoken => _languagespoken ?? '';
  set languagespoken(String? val) => _languagespoken = val;

  bool hasLanguagespoken() => _languagespoken != null;

  // "Willingnesstotravel" field.
  String? _willingnesstotravel;
  String get willingnesstotravel => _willingnesstotravel ?? '';
  set willingnesstotravel(String? val) => _willingnesstotravel = val;

  bool hasWillingnesstotravel() => _willingnesstotravel != null;

  // "profilePicture" field.
  String? _profilePicture;
  String get profilePicture => _profilePicture ?? '';
  set profilePicture(String? val) => _profilePicture = val;

  bool hasProfilePicture() => _profilePicture != null;

  static ProfiledetailsforclientsStruct fromMap(Map<String, dynamic> data) =>
      ProfiledetailsforclientsStruct(
        hourlyrate: castToType<double>(data['Hourlyrate']),
        languagespoken: data['Languagespoken'] as String?,
        willingnesstotravel: data['Willingnesstotravel'] as String?,
        profilePicture: data['profilePicture'] as String?,
      );

  static ProfiledetailsforclientsStruct? maybeFromMap(dynamic data) =>
      data is Map
          ? ProfiledetailsforclientsStruct.fromMap(data.cast<String, dynamic>())
          : null;

  Map<String, dynamic> toMap() => {
        'Hourlyrate': _hourlyrate,
        'Languagespoken': _languagespoken,
        'Willingnesstotravel': _willingnesstotravel,
        'profilePicture': _profilePicture,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'Hourlyrate': serializeParam(
          _hourlyrate,
          ParamType.double,
        ),
        'Languagespoken': serializeParam(
          _languagespoken,
          ParamType.String,
        ),
        'Willingnesstotravel': serializeParam(
          _willingnesstotravel,
          ParamType.String,
        ),
        'profilePicture': serializeParam(
          _profilePicture,
          ParamType.String,
        ),
      }.withoutNulls;

  static ProfiledetailsforclientsStruct fromSerializableMap(
          Map<String, dynamic> data) =>
      ProfiledetailsforclientsStruct(
        hourlyrate: deserializeParam(
          data['Hourlyrate'],
          ParamType.double,
          false,
        ),
        languagespoken: deserializeParam(
          data['Languagespoken'],
          ParamType.String,
          false,
        ),
        willingnesstotravel: deserializeParam(
          data['Willingnesstotravel'],
          ParamType.String,
          false,
        ),
        profilePicture: deserializeParam(
          data['profilePicture'],
          ParamType.String,
          false,
        ),
      );

  @override
  String toString() => 'ProfiledetailsforclientsStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is ProfiledetailsforclientsStruct &&
        hourlyrate == other.hourlyrate &&
        languagespoken == other.languagespoken &&
        willingnesstotravel == other.willingnesstotravel &&
        profilePicture == other.profilePicture;
  }

  @override
  int get hashCode => const ListEquality()
      .hash([hourlyrate, languagespoken, willingnesstotravel, profilePicture]);
}

ProfiledetailsforclientsStruct createProfiledetailsforclientsStruct({
  double? hourlyrate,
  String? languagespoken,
  String? willingnesstotravel,
  String? profilePicture,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    ProfiledetailsforclientsStruct(
      hourlyrate: hourlyrate,
      languagespoken: languagespoken,
      willingnesstotravel: willingnesstotravel,
      profilePicture: profilePicture,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

ProfiledetailsforclientsStruct? updateProfiledetailsforclientsStruct(
  ProfiledetailsforclientsStruct? profiledetailsforclients, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    profiledetailsforclients
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addProfiledetailsforclientsStructData(
  Map<String, dynamic> firestoreData,
  ProfiledetailsforclientsStruct? profiledetailsforclients,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (profiledetailsforclients == null) {
    return;
  }
  if (profiledetailsforclients.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields = !forFieldValue &&
      profiledetailsforclients.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final profiledetailsforclientsData = getProfiledetailsforclientsFirestoreData(
      profiledetailsforclients, forFieldValue);
  final nestedData =
      profiledetailsforclientsData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields =
      profiledetailsforclients.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getProfiledetailsforclientsFirestoreData(
  ProfiledetailsforclientsStruct? profiledetailsforclients, [
  bool forFieldValue = false,
]) {
  if (profiledetailsforclients == null) {
    return {};
  }
  final firestoreData = mapToFirestore(profiledetailsforclients.toMap());

  // Add any Firestore field values
  profiledetailsforclients.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getProfiledetailsforclientsListFirestoreData(
  List<ProfiledetailsforclientsStruct>? profiledetailsforclientss,
) =>
    profiledetailsforclientss
        ?.map((e) => getProfiledetailsforclientsFirestoreData(e, true))
        .toList() ??
    [];
