// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class UserCompletedJobStruct extends FFFirebaseStruct {
  UserCompletedJobStruct({
    DocumentReference? job,
    String? paymentType,
    double? workedhours,
    DateTime? paymentDate,
    double? payment,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _job = job,
        _paymentType = paymentType,
        _workedhours = workedhours,
        _paymentDate = paymentDate,
        _payment = payment,
        super(firestoreUtilData);

  // "Job" field.
  DocumentReference? _job;
  DocumentReference? get job => _job;
  set job(DocumentReference? val) => _job = val;

  bool hasJob() => _job != null;

  // "PaymentType" field.
  String? _paymentType;
  String get paymentType => _paymentType ?? '';
  set paymentType(String? val) => _paymentType = val;

  bool hasPaymentType() => _paymentType != null;

  // "Workedhours" field.
  double? _workedhours;
  double get workedhours => _workedhours ?? 0.0;
  set workedhours(double? val) => _workedhours = val;

  void incrementWorkedhours(double amount) =>
      workedhours = workedhours + amount;

  bool hasWorkedhours() => _workedhours != null;

  // "PaymentDate" field.
  DateTime? _paymentDate;
  DateTime? get paymentDate => _paymentDate;
  set paymentDate(DateTime? val) => _paymentDate = val;

  bool hasPaymentDate() => _paymentDate != null;

  // "Payment" field.
  double? _payment;
  double get payment => _payment ?? 0.0;
  set payment(double? val) => _payment = val;

  void incrementPayment(double amount) => payment = payment + amount;

  bool hasPayment() => _payment != null;

  static UserCompletedJobStruct fromMap(Map<String, dynamic> data) =>
      UserCompletedJobStruct(
        job: data['Job'] as DocumentReference?,
        paymentType: data['PaymentType'] as String?,
        workedhours: castToType<double>(data['Workedhours']),
        paymentDate: data['PaymentDate'] as DateTime?,
        payment: castToType<double>(data['Payment']),
      );

  static UserCompletedJobStruct? maybeFromMap(dynamic data) => data is Map
      ? UserCompletedJobStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'Job': _job,
        'PaymentType': _paymentType,
        'Workedhours': _workedhours,
        'PaymentDate': _paymentDate,
        'Payment': _payment,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'Job': serializeParam(
          _job,
          ParamType.DocumentReference,
        ),
        'PaymentType': serializeParam(
          _paymentType,
          ParamType.String,
        ),
        'Workedhours': serializeParam(
          _workedhours,
          ParamType.double,
        ),
        'PaymentDate': serializeParam(
          _paymentDate,
          ParamType.DateTime,
        ),
        'Payment': serializeParam(
          _payment,
          ParamType.double,
        ),
      }.withoutNulls;

  static UserCompletedJobStruct fromSerializableMap(
          Map<String, dynamic> data) =>
      UserCompletedJobStruct(
        job: deserializeParam(
          data['Job'],
          ParamType.DocumentReference,
          false,
          collectionNamePath: ['JobDetails'],
        ),
        paymentType: deserializeParam(
          data['PaymentType'],
          ParamType.String,
          false,
        ),
        workedhours: deserializeParam(
          data['Workedhours'],
          ParamType.double,
          false,
        ),
        paymentDate: deserializeParam(
          data['PaymentDate'],
          ParamType.DateTime,
          false,
        ),
        payment: deserializeParam(
          data['Payment'],
          ParamType.double,
          false,
        ),
      );

  @override
  String toString() => 'UserCompletedJobStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is UserCompletedJobStruct &&
        job == other.job &&
        paymentType == other.paymentType &&
        workedhours == other.workedhours &&
        paymentDate == other.paymentDate &&
        payment == other.payment;
  }

  @override
  int get hashCode => const ListEquality()
      .hash([job, paymentType, workedhours, paymentDate, payment]);
}

UserCompletedJobStruct createUserCompletedJobStruct({
  DocumentReference? job,
  String? paymentType,
  double? workedhours,
  DateTime? paymentDate,
  double? payment,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    UserCompletedJobStruct(
      job: job,
      paymentType: paymentType,
      workedhours: workedhours,
      paymentDate: paymentDate,
      payment: payment,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

UserCompletedJobStruct? updateUserCompletedJobStruct(
  UserCompletedJobStruct? userCompletedJob, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    userCompletedJob
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addUserCompletedJobStructData(
  Map<String, dynamic> firestoreData,
  UserCompletedJobStruct? userCompletedJob,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (userCompletedJob == null) {
    return;
  }
  if (userCompletedJob.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && userCompletedJob.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final userCompletedJobData =
      getUserCompletedJobFirestoreData(userCompletedJob, forFieldValue);
  final nestedData =
      userCompletedJobData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields = userCompletedJob.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getUserCompletedJobFirestoreData(
  UserCompletedJobStruct? userCompletedJob, [
  bool forFieldValue = false,
]) {
  if (userCompletedJob == null) {
    return {};
  }
  final firestoreData = mapToFirestore(userCompletedJob.toMap());

  // Add any Firestore field values
  userCompletedJob.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getUserCompletedJobListFirestoreData(
  List<UserCompletedJobStruct>? userCompletedJobs,
) =>
    userCompletedJobs
        ?.map((e) => getUserCompletedJobFirestoreData(e, true))
        .toList() ??
    [];
