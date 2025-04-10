import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class TransactionsRecord extends FirestoreRecord {
  TransactionsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "Review" field.
  double? _review;
  double get review => _review ?? 0.0;
  bool hasReview() => _review != null;

  // "Clinicsname" field.
  String? _clinicsname;
  String get clinicsname => _clinicsname ?? '';
  bool hasClinicsname() => _clinicsname != null;

  // "Providersname" field.
  String? _providersname;
  String get providersname => _providersname ?? '';
  bool hasProvidersname() => _providersname != null;

  // "Jobtitle" field.
  String? _jobtitle;
  String get jobtitle => _jobtitle ?? '';
  bool hasJobtitle() => _jobtitle != null;

  // "JobID" field.
  String? _jobID;
  String get jobID => _jobID ?? '';
  bool hasJobID() => _jobID != null;

  // "Enddate" field.
  DateTime? _enddate;
  DateTime? get enddate => _enddate;
  bool hasEnddate() => _enddate != null;

  // "Payment" field.
  String? _payment;
  String get payment => _payment ?? '';
  bool hasPayment() => _payment != null;

  // "Totalamount" field.
  double? _totalamount;
  double get totalamount => _totalamount ?? 0.0;
  bool hasTotalamount() => _totalamount != null;

  // "Commissionamount" field.
  double? _commissionamount;
  double get commissionamount => _commissionamount ?? 0.0;
  bool hasCommissionamount() => _commissionamount != null;

  // "Status" field.
  String? _status;
  String get status => _status ?? '';
  bool hasStatus() => _status != null;

  // "user" field.
  DocumentReference? _user;
  DocumentReference? get user => _user;
  bool hasUser() => _user != null;

  // "job" field.
  DocumentReference? _job;
  DocumentReference? get job => _job;
  bool hasJob() => _job != null;

  // "created_time" field.
  DateTime? _createdTime;
  DateTime? get createdTime => _createdTime;
  bool hasCreatedTime() => _createdTime != null;

  void _initializeFields() {
    _review = castToType<double>(snapshotData['Review']);
    _clinicsname = snapshotData['Clinicsname'] as String?;
    _providersname = snapshotData['Providersname'] as String?;
    _jobtitle = snapshotData['Jobtitle'] as String?;
    _jobID = snapshotData['JobID'] as String?;
    _enddate = snapshotData['Enddate'] as DateTime?;
    _payment = snapshotData['Payment'] as String?;
    _totalamount = castToType<double>(snapshotData['Totalamount']);
    _commissionamount = castToType<double>(snapshotData['Commissionamount']);
    _status = snapshotData['Status'] as String?;
    _user = snapshotData['user'] as DocumentReference?;
    _job = snapshotData['job'] as DocumentReference?;
    _createdTime = snapshotData['created_time'] as DateTime?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('Transactions');

  static Stream<TransactionsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => TransactionsRecord.fromSnapshot(s));

  static Future<TransactionsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => TransactionsRecord.fromSnapshot(s));

  static TransactionsRecord fromSnapshot(DocumentSnapshot snapshot) =>
      TransactionsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static TransactionsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      TransactionsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'TransactionsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is TransactionsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createTransactionsRecordData({
  double? review,
  String? clinicsname,
  String? providersname,
  String? jobtitle,
  String? jobID,
  DateTime? enddate,
  String? payment,
  double? totalamount,
  double? commissionamount,
  String? status,
  DocumentReference? user,
  DocumentReference? job,
  DateTime? createdTime,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'Review': review,
      'Clinicsname': clinicsname,
      'Providersname': providersname,
      'Jobtitle': jobtitle,
      'JobID': jobID,
      'Enddate': enddate,
      'Payment': payment,
      'Totalamount': totalamount,
      'Commissionamount': commissionamount,
      'Status': status,
      'user': user,
      'job': job,
      'created_time': createdTime,
    }.withoutNulls,
  );

  return firestoreData;
}

class TransactionsRecordDocumentEquality
    implements Equality<TransactionsRecord> {
  const TransactionsRecordDocumentEquality();

  @override
  bool equals(TransactionsRecord? e1, TransactionsRecord? e2) {
    return e1?.review == e2?.review &&
        e1?.clinicsname == e2?.clinicsname &&
        e1?.providersname == e2?.providersname &&
        e1?.jobtitle == e2?.jobtitle &&
        e1?.jobID == e2?.jobID &&
        e1?.enddate == e2?.enddate &&
        e1?.payment == e2?.payment &&
        e1?.totalamount == e2?.totalamount &&
        e1?.commissionamount == e2?.commissionamount &&
        e1?.status == e2?.status &&
        e1?.user == e2?.user &&
        e1?.job == e2?.job &&
        e1?.createdTime == e2?.createdTime;
  }

  @override
  int hash(TransactionsRecord? e) => const ListEquality().hash([
        e?.review,
        e?.clinicsname,
        e?.providersname,
        e?.jobtitle,
        e?.jobID,
        e?.enddate,
        e?.payment,
        e?.totalamount,
        e?.commissionamount,
        e?.status,
        e?.user,
        e?.job,
        e?.createdTime
      ]);

  @override
  bool isValidKey(Object? o) => o is TransactionsRecord;
}
