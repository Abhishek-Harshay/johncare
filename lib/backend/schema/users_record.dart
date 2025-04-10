import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class UsersRecord extends FirestoreRecord {
  UsersRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "email" field.
  String? _email;
  String get email => _email ?? '';
  bool hasEmail() => _email != null;

  // "display_name" field.
  String? _displayName;
  String get displayName => _displayName ?? '';
  bool hasDisplayName() => _displayName != null;

  // "photo_url" field.
  String? _photoUrl;
  String get photoUrl => _photoUrl ?? '';
  bool hasPhotoUrl() => _photoUrl != null;

  // "uid" field.
  String? _uid;
  String get uid => _uid ?? '';
  bool hasUid() => _uid != null;

  // "created_time" field.
  DateTime? _createdTime;
  DateTime? get createdTime => _createdTime;
  bool hasCreatedTime() => _createdTime != null;

  // "phone_number" field.
  String? _phoneNumber;
  String get phoneNumber => _phoneNumber ?? '';
  bool hasPhoneNumber() => _phoneNumber != null;

  // "role" field.
  String? _role;
  String get role => _role ?? '';
  bool hasRole() => _role != null;

  // "admin" field.
  bool? _admin;
  bool get admin => _admin ?? false;
  bool hasAdmin() => _admin != null;

  // "subscription" field.
  bool? _subscription;
  bool get subscription => _subscription ?? false;
  bool hasSubscription() => _subscription != null;

  // "subscriptionpackage" field.
  String? _subscriptionpackage;
  String get subscriptionpackage => _subscriptionpackage ?? '';
  bool hasSubscriptionpackage() => _subscriptionpackage != null;

  // "userstatus" field.
  String? _userstatus;
  String get userstatus => _userstatus ?? '';
  bool hasUserstatus() => _userstatus != null;

  // "isprofilecompleted" field.
  bool? _isprofilecompleted;
  bool get isprofilecompleted => _isprofilecompleted ?? false;
  bool hasIsprofilecompleted() => _isprofilecompleted != null;

  // "Buisnessdetail" field.
  DocumentReference? _buisnessdetail;
  DocumentReference? get buisnessdetail => _buisnessdetail;
  bool hasBuisnessdetail() => _buisnessdetail != null;

  // "Firsttimelogin" field.
  bool? _firsttimelogin;
  bool get firsttimelogin => _firsttimelogin ?? false;
  bool hasFirsttimelogin() => _firsttimelogin != null;

  // "providerdetail" field.
  DocumentReference? _providerdetail;
  DocumentReference? get providerdetail => _providerdetail;
  bool hasProviderdetail() => _providerdetail != null;

  // "currentSubscription" field.
  SubscriptionDetailsStruct? _currentSubscription;
  SubscriptionDetailsStruct get currentSubscription =>
      _currentSubscription ?? SubscriptionDetailsStruct();
  bool hasCurrentSubscription() => _currentSubscription != null;

  // "userCompletedJobs" field.
  List<UserCompletedJobStruct>? _userCompletedJobs;
  List<UserCompletedJobStruct> get userCompletedJobs =>
      _userCompletedJobs ?? const [];
  bool hasUserCompletedJobs() => _userCompletedJobs != null;

  // "SpendsJobs" field.
  List<RecuriterSpendsJobsStruct>? _spendsJobs;
  List<RecuriterSpendsJobsStruct> get spendsJobs => _spendsJobs ?? const [];
  bool hasSpendsJobs() => _spendsJobs != null;

  // "bookedSolts" field.
  List<SlotsStruct>? _bookedSolts;
  List<SlotsStruct> get bookedSolts => _bookedSolts ?? const [];
  bool hasBookedSolts() => _bookedSolts != null;

  // "isGoogle" field.
  bool? _isGoogle;
  bool get isGoogle => _isGoogle ?? false;
  bool hasIsGoogle() => _isGoogle != null;

  // "subRole" field.
  String? _subRole;
  String get subRole => _subRole ?? '';
  bool hasSubRole() => _subRole != null;

  // "onHold" field.
  double? _onHold;
  double get onHold => _onHold ?? 0.0;
  bool hasOnHold() => _onHold != null;

  // "Wallet" field.
  double? _wallet;
  double get wallet => _wallet ?? 0.0;
  bool hasWallet() => _wallet != null;

  // "totalSpends" field.
  double? _totalSpends;
  double get totalSpends => _totalSpends ?? 0.0;
  bool hasTotalSpends() => _totalSpends != null;

  void _initializeFields() {
    _email = snapshotData['email'] as String?;
    _displayName = snapshotData['display_name'] as String?;
    _photoUrl = snapshotData['photo_url'] as String?;
    _uid = snapshotData['uid'] as String?;
    _createdTime = snapshotData['created_time'] as DateTime?;
    _phoneNumber = snapshotData['phone_number'] as String?;
    _role = snapshotData['role'] as String?;
    _admin = snapshotData['admin'] as bool?;
    _subscription = snapshotData['subscription'] as bool?;
    _subscriptionpackage = snapshotData['subscriptionpackage'] as String?;
    _userstatus = snapshotData['userstatus'] as String?;
    _isprofilecompleted = snapshotData['isprofilecompleted'] as bool?;
    _buisnessdetail = snapshotData['Buisnessdetail'] as DocumentReference?;
    _firsttimelogin = snapshotData['Firsttimelogin'] as bool?;
    _providerdetail = snapshotData['providerdetail'] as DocumentReference?;
    _currentSubscription =
        snapshotData['currentSubscription'] is SubscriptionDetailsStruct
            ? snapshotData['currentSubscription']
            : SubscriptionDetailsStruct.maybeFromMap(
                snapshotData['currentSubscription']);
    _userCompletedJobs = getStructList(
      snapshotData['userCompletedJobs'],
      UserCompletedJobStruct.fromMap,
    );
    _spendsJobs = getStructList(
      snapshotData['SpendsJobs'],
      RecuriterSpendsJobsStruct.fromMap,
    );
    _bookedSolts = getStructList(
      snapshotData['bookedSolts'],
      SlotsStruct.fromMap,
    );
    _isGoogle = snapshotData['isGoogle'] as bool?;
    _subRole = snapshotData['subRole'] as String?;
    _onHold = castToType<double>(snapshotData['onHold']);
    _wallet = castToType<double>(snapshotData['Wallet']);
    _totalSpends = castToType<double>(snapshotData['totalSpends']);
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('users');

  static Stream<UsersRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => UsersRecord.fromSnapshot(s));

  static Future<UsersRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => UsersRecord.fromSnapshot(s));

  static UsersRecord fromSnapshot(DocumentSnapshot snapshot) => UsersRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static UsersRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      UsersRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'UsersRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is UsersRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createUsersRecordData({
  String? email,
  String? displayName,
  String? photoUrl,
  String? uid,
  DateTime? createdTime,
  String? phoneNumber,
  String? role,
  bool? admin,
  bool? subscription,
  String? subscriptionpackage,
  String? userstatus,
  bool? isprofilecompleted,
  DocumentReference? buisnessdetail,
  bool? firsttimelogin,
  DocumentReference? providerdetail,
  SubscriptionDetailsStruct? currentSubscription,
  bool? isGoogle,
  String? subRole,
  double? onHold,
  double? wallet,
  double? totalSpends,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'email': email,
      'display_name': displayName,
      'photo_url': photoUrl,
      'uid': uid,
      'created_time': createdTime,
      'phone_number': phoneNumber,
      'role': role,
      'admin': admin,
      'subscription': subscription,
      'subscriptionpackage': subscriptionpackage,
      'userstatus': userstatus,
      'isprofilecompleted': isprofilecompleted,
      'Buisnessdetail': buisnessdetail,
      'Firsttimelogin': firsttimelogin,
      'providerdetail': providerdetail,
      'currentSubscription': SubscriptionDetailsStruct().toMap(),
      'isGoogle': isGoogle,
      'subRole': subRole,
      'onHold': onHold,
      'Wallet': wallet,
      'totalSpends': totalSpends,
    }.withoutNulls,
  );

  // Handle nested data for "currentSubscription" field.
  addSubscriptionDetailsStructData(
      firestoreData, currentSubscription, 'currentSubscription');

  return firestoreData;
}

class UsersRecordDocumentEquality implements Equality<UsersRecord> {
  const UsersRecordDocumentEquality();

  @override
  bool equals(UsersRecord? e1, UsersRecord? e2) {
    const listEquality = ListEquality();
    return e1?.email == e2?.email &&
        e1?.displayName == e2?.displayName &&
        e1?.photoUrl == e2?.photoUrl &&
        e1?.uid == e2?.uid &&
        e1?.createdTime == e2?.createdTime &&
        e1?.phoneNumber == e2?.phoneNumber &&
        e1?.role == e2?.role &&
        e1?.admin == e2?.admin &&
        e1?.subscription == e2?.subscription &&
        e1?.subscriptionpackage == e2?.subscriptionpackage &&
        e1?.userstatus == e2?.userstatus &&
        e1?.isprofilecompleted == e2?.isprofilecompleted &&
        e1?.buisnessdetail == e2?.buisnessdetail &&
        e1?.firsttimelogin == e2?.firsttimelogin &&
        e1?.providerdetail == e2?.providerdetail &&
        e1?.currentSubscription == e2?.currentSubscription &&
        listEquality.equals(e1?.userCompletedJobs, e2?.userCompletedJobs) &&
        listEquality.equals(e1?.spendsJobs, e2?.spendsJobs) &&
        listEquality.equals(e1?.bookedSolts, e2?.bookedSolts) &&
        e1?.isGoogle == e2?.isGoogle &&
        e1?.subRole == e2?.subRole &&
        e1?.onHold == e2?.onHold &&
        e1?.wallet == e2?.wallet &&
        e1?.totalSpends == e2?.totalSpends;
  }

  @override
  int hash(UsersRecord? e) => const ListEquality().hash([
        e?.email,
        e?.displayName,
        e?.photoUrl,
        e?.uid,
        e?.createdTime,
        e?.phoneNumber,
        e?.role,
        e?.admin,
        e?.subscription,
        e?.subscriptionpackage,
        e?.userstatus,
        e?.isprofilecompleted,
        e?.buisnessdetail,
        e?.firsttimelogin,
        e?.providerdetail,
        e?.currentSubscription,
        e?.userCompletedJobs,
        e?.spendsJobs,
        e?.bookedSolts,
        e?.isGoogle,
        e?.subRole,
        e?.onHold,
        e?.wallet,
        e?.totalSpends
      ]);

  @override
  bool isValidKey(Object? o) => o is UsersRecord;
}
