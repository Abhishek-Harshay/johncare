// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class AttendanceStruct extends FFFirebaseStruct {
  AttendanceStruct({
    DateTime? date,
    DateTime? arrivalTime,
    bool? isConfirmedArrived,
    bool? isSendRequest,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _date = date,
        _arrivalTime = arrivalTime,
        _isConfirmedArrived = isConfirmedArrived,
        _isSendRequest = isSendRequest,
        super(firestoreUtilData);

  // "Date" field.
  DateTime? _date;
  DateTime? get date => _date;
  set date(DateTime? val) => _date = val;

  bool hasDate() => _date != null;

  // "ArrivalTime" field.
  DateTime? _arrivalTime;
  DateTime? get arrivalTime => _arrivalTime;
  set arrivalTime(DateTime? val) => _arrivalTime = val;

  bool hasArrivalTime() => _arrivalTime != null;

  // "isConfirmedArrived" field.
  bool? _isConfirmedArrived;
  bool get isConfirmedArrived => _isConfirmedArrived ?? false;
  set isConfirmedArrived(bool? val) => _isConfirmedArrived = val;

  bool hasIsConfirmedArrived() => _isConfirmedArrived != null;

  // "isSendRequest" field.
  bool? _isSendRequest;
  bool get isSendRequest => _isSendRequest ?? false;
  set isSendRequest(bool? val) => _isSendRequest = val;

  bool hasIsSendRequest() => _isSendRequest != null;

  static AttendanceStruct fromMap(Map<String, dynamic> data) =>
      AttendanceStruct(
        date: data['Date'] as DateTime?,
        arrivalTime: data['ArrivalTime'] as DateTime?,
        isConfirmedArrived: data['isConfirmedArrived'] as bool?,
        isSendRequest: data['isSendRequest'] as bool?,
      );

  static AttendanceStruct? maybeFromMap(dynamic data) => data is Map
      ? AttendanceStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'Date': _date,
        'ArrivalTime': _arrivalTime,
        'isConfirmedArrived': _isConfirmedArrived,
        'isSendRequest': _isSendRequest,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'Date': serializeParam(
          _date,
          ParamType.DateTime,
        ),
        'ArrivalTime': serializeParam(
          _arrivalTime,
          ParamType.DateTime,
        ),
        'isConfirmedArrived': serializeParam(
          _isConfirmedArrived,
          ParamType.bool,
        ),
        'isSendRequest': serializeParam(
          _isSendRequest,
          ParamType.bool,
        ),
      }.withoutNulls;

  static AttendanceStruct fromSerializableMap(Map<String, dynamic> data) =>
      AttendanceStruct(
        date: deserializeParam(
          data['Date'],
          ParamType.DateTime,
          false,
        ),
        arrivalTime: deserializeParam(
          data['ArrivalTime'],
          ParamType.DateTime,
          false,
        ),
        isConfirmedArrived: deserializeParam(
          data['isConfirmedArrived'],
          ParamType.bool,
          false,
        ),
        isSendRequest: deserializeParam(
          data['isSendRequest'],
          ParamType.bool,
          false,
        ),
      );

  @override
  String toString() => 'AttendanceStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is AttendanceStruct &&
        date == other.date &&
        arrivalTime == other.arrivalTime &&
        isConfirmedArrived == other.isConfirmedArrived &&
        isSendRequest == other.isSendRequest;
  }

  @override
  int get hashCode => const ListEquality()
      .hash([date, arrivalTime, isConfirmedArrived, isSendRequest]);
}

AttendanceStruct createAttendanceStruct({
  DateTime? date,
  DateTime? arrivalTime,
  bool? isConfirmedArrived,
  bool? isSendRequest,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    AttendanceStruct(
      date: date,
      arrivalTime: arrivalTime,
      isConfirmedArrived: isConfirmedArrived,
      isSendRequest: isSendRequest,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

AttendanceStruct? updateAttendanceStruct(
  AttendanceStruct? attendance, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    attendance
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addAttendanceStructData(
  Map<String, dynamic> firestoreData,
  AttendanceStruct? attendance,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (attendance == null) {
    return;
  }
  if (attendance.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && attendance.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final attendanceData = getAttendanceFirestoreData(attendance, forFieldValue);
  final nestedData = attendanceData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields = attendance.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getAttendanceFirestoreData(
  AttendanceStruct? attendance, [
  bool forFieldValue = false,
]) {
  if (attendance == null) {
    return {};
  }
  final firestoreData = mapToFirestore(attendance.toMap());

  // Add any Firestore field values
  attendance.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getAttendanceListFirestoreData(
  List<AttendanceStruct>? attendances,
) =>
    attendances?.map((e) => getAttendanceFirestoreData(e, true)).toList() ?? [];
