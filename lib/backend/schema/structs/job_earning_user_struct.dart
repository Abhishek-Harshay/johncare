// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class JobEarningUserStruct extends FFFirebaseStruct {
  JobEarningUserStruct({
    double? workinprogress,
    double? pending,
    double? last12month,
    double? totalearing,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _workinprogress = workinprogress,
        _pending = pending,
        _last12month = last12month,
        _totalearing = totalearing,
        super(firestoreUtilData);

  // "Workinprogress" field.
  double? _workinprogress;
  double get workinprogress => _workinprogress ?? 0.0;
  set workinprogress(double? val) => _workinprogress = val;

  void incrementWorkinprogress(double amount) =>
      workinprogress = workinprogress + amount;

  bool hasWorkinprogress() => _workinprogress != null;

  // "Pending" field.
  double? _pending;
  double get pending => _pending ?? 0.0;
  set pending(double? val) => _pending = val;

  void incrementPending(double amount) => pending = pending + amount;

  bool hasPending() => _pending != null;

  // "Last12month" field.
  double? _last12month;
  double get last12month => _last12month ?? 0.0;
  set last12month(double? val) => _last12month = val;

  void incrementLast12month(double amount) =>
      last12month = last12month + amount;

  bool hasLast12month() => _last12month != null;

  // "Totalearing" field.
  double? _totalearing;
  double get totalearing => _totalearing ?? 0.0;
  set totalearing(double? val) => _totalearing = val;

  void incrementTotalearing(double amount) =>
      totalearing = totalearing + amount;

  bool hasTotalearing() => _totalearing != null;

  static JobEarningUserStruct fromMap(Map<String, dynamic> data) =>
      JobEarningUserStruct(
        workinprogress: castToType<double>(data['Workinprogress']),
        pending: castToType<double>(data['Pending']),
        last12month: castToType<double>(data['Last12month']),
        totalearing: castToType<double>(data['Totalearing']),
      );

  static JobEarningUserStruct? maybeFromMap(dynamic data) => data is Map
      ? JobEarningUserStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'Workinprogress': _workinprogress,
        'Pending': _pending,
        'Last12month': _last12month,
        'Totalearing': _totalearing,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'Workinprogress': serializeParam(
          _workinprogress,
          ParamType.double,
        ),
        'Pending': serializeParam(
          _pending,
          ParamType.double,
        ),
        'Last12month': serializeParam(
          _last12month,
          ParamType.double,
        ),
        'Totalearing': serializeParam(
          _totalearing,
          ParamType.double,
        ),
      }.withoutNulls;

  static JobEarningUserStruct fromSerializableMap(Map<String, dynamic> data) =>
      JobEarningUserStruct(
        workinprogress: deserializeParam(
          data['Workinprogress'],
          ParamType.double,
          false,
        ),
        pending: deserializeParam(
          data['Pending'],
          ParamType.double,
          false,
        ),
        last12month: deserializeParam(
          data['Last12month'],
          ParamType.double,
          false,
        ),
        totalearing: deserializeParam(
          data['Totalearing'],
          ParamType.double,
          false,
        ),
      );

  @override
  String toString() => 'JobEarningUserStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is JobEarningUserStruct &&
        workinprogress == other.workinprogress &&
        pending == other.pending &&
        last12month == other.last12month &&
        totalearing == other.totalearing;
  }

  @override
  int get hashCode => const ListEquality()
      .hash([workinprogress, pending, last12month, totalearing]);
}

JobEarningUserStruct createJobEarningUserStruct({
  double? workinprogress,
  double? pending,
  double? last12month,
  double? totalearing,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    JobEarningUserStruct(
      workinprogress: workinprogress,
      pending: pending,
      last12month: last12month,
      totalearing: totalearing,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

JobEarningUserStruct? updateJobEarningUserStruct(
  JobEarningUserStruct? jobEarningUser, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    jobEarningUser
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addJobEarningUserStructData(
  Map<String, dynamic> firestoreData,
  JobEarningUserStruct? jobEarningUser,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (jobEarningUser == null) {
    return;
  }
  if (jobEarningUser.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && jobEarningUser.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final jobEarningUserData =
      getJobEarningUserFirestoreData(jobEarningUser, forFieldValue);
  final nestedData =
      jobEarningUserData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields = jobEarningUser.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getJobEarningUserFirestoreData(
  JobEarningUserStruct? jobEarningUser, [
  bool forFieldValue = false,
]) {
  if (jobEarningUser == null) {
    return {};
  }
  final firestoreData = mapToFirestore(jobEarningUser.toMap());

  // Add any Firestore field values
  jobEarningUser.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getJobEarningUserListFirestoreData(
  List<JobEarningUserStruct>? jobEarningUsers,
) =>
    jobEarningUsers
        ?.map((e) => getJobEarningUserFirestoreData(e, true))
        .toList() ??
    [];
