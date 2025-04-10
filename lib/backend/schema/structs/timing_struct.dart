// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class TimingStruct extends FFFirebaseStruct {
  TimingStruct({
    DateTime? startTime,
    DateTime? endTime,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _startTime = startTime,
        _endTime = endTime,
        super(firestoreUtilData);

  // "startTime" field.
  DateTime? _startTime;
  DateTime? get startTime => _startTime;
  set startTime(DateTime? val) => _startTime = val;

  bool hasStartTime() => _startTime != null;

  // "endTime" field.
  DateTime? _endTime;
  DateTime? get endTime => _endTime;
  set endTime(DateTime? val) => _endTime = val;

  bool hasEndTime() => _endTime != null;

  static TimingStruct fromMap(Map<String, dynamic> data) => TimingStruct(
        startTime: data['startTime'] as DateTime?,
        endTime: data['endTime'] as DateTime?,
      );

  static TimingStruct? maybeFromMap(dynamic data) =>
      data is Map ? TimingStruct.fromMap(data.cast<String, dynamic>()) : null;

  Map<String, dynamic> toMap() => {
        'startTime': _startTime,
        'endTime': _endTime,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'startTime': serializeParam(
          _startTime,
          ParamType.DateTime,
        ),
        'endTime': serializeParam(
          _endTime,
          ParamType.DateTime,
        ),
      }.withoutNulls;

  static TimingStruct fromSerializableMap(Map<String, dynamic> data) =>
      TimingStruct(
        startTime: deserializeParam(
          data['startTime'],
          ParamType.DateTime,
          false,
        ),
        endTime: deserializeParam(
          data['endTime'],
          ParamType.DateTime,
          false,
        ),
      );

  @override
  String toString() => 'TimingStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is TimingStruct &&
        startTime == other.startTime &&
        endTime == other.endTime;
  }

  @override
  int get hashCode => const ListEquality().hash([startTime, endTime]);
}

TimingStruct createTimingStruct({
  DateTime? startTime,
  DateTime? endTime,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    TimingStruct(
      startTime: startTime,
      endTime: endTime,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

TimingStruct? updateTimingStruct(
  TimingStruct? timing, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    timing
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addTimingStructData(
  Map<String, dynamic> firestoreData,
  TimingStruct? timing,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (timing == null) {
    return;
  }
  if (timing.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && timing.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final timingData = getTimingFirestoreData(timing, forFieldValue);
  final nestedData = timingData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields = timing.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getTimingFirestoreData(
  TimingStruct? timing, [
  bool forFieldValue = false,
]) {
  if (timing == null) {
    return {};
  }
  final firestoreData = mapToFirestore(timing.toMap());

  // Add any Firestore field values
  timing.firestoreUtilData.fieldValues.forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getTimingListFirestoreData(
  List<TimingStruct>? timings,
) =>
    timings?.map((e) => getTimingFirestoreData(e, true)).toList() ?? [];
