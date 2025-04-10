import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class SubscriptionsRecord extends FirestoreRecord {
  SubscriptionsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "role" field.
  String? _role;
  String get role => _role ?? '';
  bool hasRole() => _role != null;

  // "user" field.
  DocumentReference? _user;
  DocumentReference? get user => _user;
  bool hasUser() => _user != null;

  // "SubscriptionType" field.
  String? _subscriptionType;
  String get subscriptionType => _subscriptionType ?? '';
  bool hasSubscriptionType() => _subscriptionType != null;

  // "Startdate" field.
  DateTime? _startdate;
  DateTime? get startdate => _startdate;
  bool hasStartdate() => _startdate != null;

  // "Enddate" field.
  DateTime? _enddate;
  DateTime? get enddate => _enddate;
  bool hasEnddate() => _enddate != null;

  // "Amount" field.
  double? _amount;
  double get amount => _amount ?? 0.0;
  bool hasAmount() => _amount != null;

  // "Status" field.
  String? _status;
  String get status => _status ?? '';
  bool hasStatus() => _status != null;

  // "created_time" field.
  DateTime? _createdTime;
  DateTime? get createdTime => _createdTime;
  bool hasCreatedTime() => _createdTime != null;

  // "provider" field.
  DocumentReference? _provider;
  DocumentReference? get provider => _provider;
  bool hasProvider() => _provider != null;

  // "business" field.
  DocumentReference? _business;
  DocumentReference? get business => _business;
  bool hasBusiness() => _business != null;

  void _initializeFields() {
    _role = snapshotData['role'] as String?;
    _user = snapshotData['user'] as DocumentReference?;
    _subscriptionType = snapshotData['SubscriptionType'] as String?;
    _startdate = snapshotData['Startdate'] as DateTime?;
    _enddate = snapshotData['Enddate'] as DateTime?;
    _amount = castToType<double>(snapshotData['Amount']);
    _status = snapshotData['Status'] as String?;
    _createdTime = snapshotData['created_time'] as DateTime?;
    _provider = snapshotData['provider'] as DocumentReference?;
    _business = snapshotData['business'] as DocumentReference?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('Subscriptions');

  static Stream<SubscriptionsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => SubscriptionsRecord.fromSnapshot(s));

  static Future<SubscriptionsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => SubscriptionsRecord.fromSnapshot(s));

  static SubscriptionsRecord fromSnapshot(DocumentSnapshot snapshot) =>
      SubscriptionsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static SubscriptionsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      SubscriptionsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'SubscriptionsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is SubscriptionsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createSubscriptionsRecordData({
  String? role,
  DocumentReference? user,
  String? subscriptionType,
  DateTime? startdate,
  DateTime? enddate,
  double? amount,
  String? status,
  DateTime? createdTime,
  DocumentReference? provider,
  DocumentReference? business,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'role': role,
      'user': user,
      'SubscriptionType': subscriptionType,
      'Startdate': startdate,
      'Enddate': enddate,
      'Amount': amount,
      'Status': status,
      'created_time': createdTime,
      'provider': provider,
      'business': business,
    }.withoutNulls,
  );

  return firestoreData;
}

class SubscriptionsRecordDocumentEquality
    implements Equality<SubscriptionsRecord> {
  const SubscriptionsRecordDocumentEquality();

  @override
  bool equals(SubscriptionsRecord? e1, SubscriptionsRecord? e2) {
    return e1?.role == e2?.role &&
        e1?.user == e2?.user &&
        e1?.subscriptionType == e2?.subscriptionType &&
        e1?.startdate == e2?.startdate &&
        e1?.enddate == e2?.enddate &&
        e1?.amount == e2?.amount &&
        e1?.status == e2?.status &&
        e1?.createdTime == e2?.createdTime &&
        e1?.provider == e2?.provider &&
        e1?.business == e2?.business;
  }

  @override
  int hash(SubscriptionsRecord? e) => const ListEquality().hash([
        e?.role,
        e?.user,
        e?.subscriptionType,
        e?.startdate,
        e?.enddate,
        e?.amount,
        e?.status,
        e?.createdTime,
        e?.provider,
        e?.business
      ]);

  @override
  bool isValidKey(Object? o) => o is SubscriptionsRecord;
}
