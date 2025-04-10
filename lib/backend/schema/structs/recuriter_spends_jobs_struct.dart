// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class RecuriterSpendsJobsStruct extends FFFirebaseStruct {
  RecuriterSpendsJobsStruct({
    DocumentReference? job,
    String? hProvidersname,
    DateTime? paymentDate,
    double? hourlyRate,
    double? payment,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _job = job,
        _hProvidersname = hProvidersname,
        _paymentDate = paymentDate,
        _hourlyRate = hourlyRate,
        _payment = payment,
        super(firestoreUtilData);

  // "Job" field.
  DocumentReference? _job;
  DocumentReference? get job => _job;
  set job(DocumentReference? val) => _job = val;

  bool hasJob() => _job != null;

  // "HProvidersname" field.
  String? _hProvidersname;
  String get hProvidersname => _hProvidersname ?? '';
  set hProvidersname(String? val) => _hProvidersname = val;

  bool hasHProvidersname() => _hProvidersname != null;

  // "PaymentDate" field.
  DateTime? _paymentDate;
  DateTime? get paymentDate => _paymentDate;
  set paymentDate(DateTime? val) => _paymentDate = val;

  bool hasPaymentDate() => _paymentDate != null;

  // "HourlyRate" field.
  double? _hourlyRate;
  double get hourlyRate => _hourlyRate ?? 0.0;
  set hourlyRate(double? val) => _hourlyRate = val;

  void incrementHourlyRate(double amount) => hourlyRate = hourlyRate + amount;

  bool hasHourlyRate() => _hourlyRate != null;

  // "Payment" field.
  double? _payment;
  double get payment => _payment ?? 0.0;
  set payment(double? val) => _payment = val;

  void incrementPayment(double amount) => payment = payment + amount;

  bool hasPayment() => _payment != null;

  static RecuriterSpendsJobsStruct fromMap(Map<String, dynamic> data) =>
      RecuriterSpendsJobsStruct(
        job: data['Job'] as DocumentReference?,
        hProvidersname: data['HProvidersname'] as String?,
        paymentDate: data['PaymentDate'] as DateTime?,
        hourlyRate: castToType<double>(data['HourlyRate']),
        payment: castToType<double>(data['Payment']),
      );

  static RecuriterSpendsJobsStruct? maybeFromMap(dynamic data) => data is Map
      ? RecuriterSpendsJobsStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'Job': _job,
        'HProvidersname': _hProvidersname,
        'PaymentDate': _paymentDate,
        'HourlyRate': _hourlyRate,
        'Payment': _payment,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'Job': serializeParam(
          _job,
          ParamType.DocumentReference,
        ),
        'HProvidersname': serializeParam(
          _hProvidersname,
          ParamType.String,
        ),
        'PaymentDate': serializeParam(
          _paymentDate,
          ParamType.DateTime,
        ),
        'HourlyRate': serializeParam(
          _hourlyRate,
          ParamType.double,
        ),
        'Payment': serializeParam(
          _payment,
          ParamType.double,
        ),
      }.withoutNulls;

  static RecuriterSpendsJobsStruct fromSerializableMap(
          Map<String, dynamic> data) =>
      RecuriterSpendsJobsStruct(
        job: deserializeParam(
          data['Job'],
          ParamType.DocumentReference,
          false,
          collectionNamePath: ['JobDetails'],
        ),
        hProvidersname: deserializeParam(
          data['HProvidersname'],
          ParamType.String,
          false,
        ),
        paymentDate: deserializeParam(
          data['PaymentDate'],
          ParamType.DateTime,
          false,
        ),
        hourlyRate: deserializeParam(
          data['HourlyRate'],
          ParamType.double,
          false,
        ),
        payment: deserializeParam(
          data['Payment'],
          ParamType.double,
          false,
        ),
      );

  @override
  String toString() => 'RecuriterSpendsJobsStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is RecuriterSpendsJobsStruct &&
        job == other.job &&
        hProvidersname == other.hProvidersname &&
        paymentDate == other.paymentDate &&
        hourlyRate == other.hourlyRate &&
        payment == other.payment;
  }

  @override
  int get hashCode => const ListEquality()
      .hash([job, hProvidersname, paymentDate, hourlyRate, payment]);
}

RecuriterSpendsJobsStruct createRecuriterSpendsJobsStruct({
  DocumentReference? job,
  String? hProvidersname,
  DateTime? paymentDate,
  double? hourlyRate,
  double? payment,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    RecuriterSpendsJobsStruct(
      job: job,
      hProvidersname: hProvidersname,
      paymentDate: paymentDate,
      hourlyRate: hourlyRate,
      payment: payment,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

RecuriterSpendsJobsStruct? updateRecuriterSpendsJobsStruct(
  RecuriterSpendsJobsStruct? recuriterSpendsJobs, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    recuriterSpendsJobs
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addRecuriterSpendsJobsStructData(
  Map<String, dynamic> firestoreData,
  RecuriterSpendsJobsStruct? recuriterSpendsJobs,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (recuriterSpendsJobs == null) {
    return;
  }
  if (recuriterSpendsJobs.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && recuriterSpendsJobs.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final recuriterSpendsJobsData =
      getRecuriterSpendsJobsFirestoreData(recuriterSpendsJobs, forFieldValue);
  final nestedData =
      recuriterSpendsJobsData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields =
      recuriterSpendsJobs.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getRecuriterSpendsJobsFirestoreData(
  RecuriterSpendsJobsStruct? recuriterSpendsJobs, [
  bool forFieldValue = false,
]) {
  if (recuriterSpendsJobs == null) {
    return {};
  }
  final firestoreData = mapToFirestore(recuriterSpendsJobs.toMap());

  // Add any Firestore field values
  recuriterSpendsJobs.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getRecuriterSpendsJobsListFirestoreData(
  List<RecuriterSpendsJobsStruct>? recuriterSpendsJobss,
) =>
    recuriterSpendsJobss
        ?.map((e) => getRecuriterSpendsJobsFirestoreData(e, true))
        .toList() ??
    [];
