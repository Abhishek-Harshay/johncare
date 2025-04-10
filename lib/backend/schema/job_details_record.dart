import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/enums/enums.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class JobDetailsRecord extends FirestoreRecord {
  JobDetailsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "JobId" field.
  String? _jobId;
  String get jobId => _jobId ?? '';
  bool hasJobId() => _jobId != null;

  // "JobName" field.
  String? _jobName;
  String get jobName => _jobName ?? '';
  bool hasJobName() => _jobName != null;

  // "FromBusiness" field.
  String? _fromBusiness;
  String get fromBusiness => _fromBusiness ?? '';
  bool hasFromBusiness() => _fromBusiness != null;

  // "Position" field.
  int? _position;
  int get position => _position ?? 0;
  bool hasPosition() => _position != null;

  // "HourlyPay" field.
  int? _hourlyPay;
  int get hourlyPay => _hourlyPay ?? 0;
  bool hasHourlyPay() => _hourlyPay != null;

  // "Description" field.
  String? _description;
  String get description => _description ?? '';
  bool hasDescription() => _description != null;

  // "Location" field.
  LatLng? _location;
  LatLng? get location => _location;
  bool hasLocation() => _location != null;

  // "JobStatus" field.
  String? _jobStatus;
  String get jobStatus => _jobStatus ?? '';
  bool hasJobStatus() => _jobStatus != null;

  // "Business" field.
  DocumentReference? _business;
  DocumentReference? get business => _business;
  bool hasBusiness() => _business != null;

  // "paymentType" field.
  String? _paymentType;
  String get paymentType => _paymentType ?? '';
  bool hasPaymentType() => _paymentType != null;

  // "paymentDate" field.
  DateTime? _paymentDate;
  DateTime? get paymentDate => _paymentDate;
  bool hasPaymentDate() => _paymentDate != null;

  // "created_at" field.
  DateTime? _createdAt;
  DateTime? get createdAt => _createdAt;
  bool hasCreatedAt() => _createdAt != null;

  // "jobcurrentstatus" field.
  JobStatus? _jobcurrentstatus;
  JobStatus? get jobcurrentstatus => _jobcurrentstatus;
  bool hasJobcurrentstatus() => _jobcurrentstatus != null;

  // "HiredApplicant" field.
  DocumentReference? _hiredApplicant;
  DocumentReference? get hiredApplicant => _hiredApplicant;
  bool hasHiredApplicant() => _hiredApplicant != null;

  // "HospitalName" field.
  String? _hospitalName;
  String get hospitalName => _hospitalName ?? '';
  bool hasHospitalName() => _hospitalName != null;

  // "YearOfExperience" field.
  int? _yearOfExperience;
  int get yearOfExperience => _yearOfExperience ?? 0;
  bool hasYearOfExperience() => _yearOfExperience != null;

  // "Profession" field.
  String? _profession;
  String get profession => _profession ?? '';
  bool hasProfession() => _profession != null;

  // "SpecialtyArea" field.
  String? _specialtyArea;
  String get specialtyArea => _specialtyArea ?? '';
  bool hasSpecialtyArea() => _specialtyArea != null;

  // "StartDate" field.
  DateTime? _startDate;
  DateTime? get startDate => _startDate;
  bool hasStartDate() => _startDate != null;

  // "EndDate" field.
  DateTime? _endDate;
  DateTime? get endDate => _endDate;
  bool hasEndDate() => _endDate != null;

  // "FullAddress" field.
  String? _fullAddress;
  String get fullAddress => _fullAddress ?? '';
  bool hasFullAddress() => _fullAddress != null;

  // "ZipCode" field.
  int? _zipCode;
  int get zipCode => _zipCode ?? 0;
  bool hasZipCode() => _zipCode != null;

  // "isUrgentJob" field.
  bool? _isUrgentJob;
  bool get isUrgentJob => _isUrgentJob ?? false;
  bool hasIsUrgentJob() => _isUrgentJob != null;

  // "created_by" field.
  DocumentReference? _createdBy;
  DocumentReference? get createdBy => _createdBy;
  bool hasCreatedBy() => _createdBy != null;

  // "ProviderApplied" field.
  List<DocumentReference>? _providerApplied;
  List<DocumentReference> get providerApplied => _providerApplied ?? const [];
  bool hasProviderApplied() => _providerApplied != null;

  // "review_rating" field.
  double? _reviewRating;
  double get reviewRating => _reviewRating ?? 0.0;
  bool hasReviewRating() => _reviewRating != null;

  // "latlng" field.
  LatLng? _latlng;
  LatLng? get latlng => _latlng;
  bool hasLatlng() => _latlng != null;

  // "chat" field.
  DocumentReference? _chat;
  DocumentReference? get chat => _chat;
  bool hasChat() => _chat != null;

  // "Timing" field.
  TimingStruct? _timing;
  TimingStruct get timing => _timing ?? TimingStruct();
  bool hasTiming() => _timing != null;

  // "Duration" field.
  double? _duration;
  double get duration => _duration ?? 0.0;
  bool hasDuration() => _duration != null;

  // "TotalPay" field.
  double? _totalPay;
  double get totalPay => _totalPay ?? 0.0;
  bool hasTotalPay() => _totalPay != null;

  // "SkillCriteria" field.
  List<String>? _skillCriteria;
  List<String> get skillCriteria => _skillCriteria ?? const [];
  bool hasSkillCriteria() => _skillCriteria != null;

  // "reviewMessage" field.
  String? _reviewMessage;
  String get reviewMessage => _reviewMessage ?? '';
  bool hasReviewMessage() => _reviewMessage != null;

  // "AttendanceJob" field.
  List<AttendanceStruct>? _attendanceJob;
  List<AttendanceStruct> get attendanceJob => _attendanceJob ?? const [];
  bool hasAttendanceJob() => _attendanceJob != null;

  // "subRole" field.
  String? _subRole;
  String get subRole => _subRole ?? '';
  bool hasSubRole() => _subRole != null;

  // "chatsUser" field.
  List<DocumentReference>? _chatsUser;
  List<DocumentReference> get chatsUser => _chatsUser ?? const [];
  bool hasChatsUser() => _chatsUser != null;

  // "customDate" field.
  bool? _customDate;
  bool get customDate => _customDate ?? false;
  bool hasCustomDate() => _customDate != null;

  // "childJob" field.
  List<DocumentReference>? _childJob;
  List<DocumentReference> get childJob => _childJob ?? const [];
  bool hasChildJob() => _childJob != null;

  // "perentJob" field.
  DocumentReference? _perentJob;
  DocumentReference? get perentJob => _perentJob;
  bool hasPerentJob() => _perentJob != null;

  // "isChildJob" field.
  bool? _isChildJob;
  bool get isChildJob => _isChildJob ?? false;
  bool hasIsChildJob() => _isChildJob != null;

  void _initializeFields() {
    _jobId = snapshotData['JobId'] as String?;
    _jobName = snapshotData['JobName'] as String?;
    _fromBusiness = snapshotData['FromBusiness'] as String?;
    _position = castToType<int>(snapshotData['Position']);
    _hourlyPay = castToType<int>(snapshotData['HourlyPay']);
    _description = snapshotData['Description'] as String?;
    _location = snapshotData['Location'] as LatLng?;
    _jobStatus = snapshotData['JobStatus'] as String?;
    _business = snapshotData['Business'] as DocumentReference?;
    _paymentType = snapshotData['paymentType'] as String?;
    _paymentDate = snapshotData['paymentDate'] as DateTime?;
    _createdAt = snapshotData['created_at'] as DateTime?;
    _jobcurrentstatus = snapshotData['jobcurrentstatus'] is JobStatus
        ? snapshotData['jobcurrentstatus']
        : deserializeEnum<JobStatus>(snapshotData['jobcurrentstatus']);
    _hiredApplicant = snapshotData['HiredApplicant'] as DocumentReference?;
    _hospitalName = snapshotData['HospitalName'] as String?;
    _yearOfExperience = castToType<int>(snapshotData['YearOfExperience']);
    _profession = snapshotData['Profession'] as String?;
    _specialtyArea = snapshotData['SpecialtyArea'] as String?;
    _startDate = snapshotData['StartDate'] as DateTime?;
    _endDate = snapshotData['EndDate'] as DateTime?;
    _fullAddress = snapshotData['FullAddress'] as String?;
    _zipCode = castToType<int>(snapshotData['ZipCode']);
    _isUrgentJob = snapshotData['isUrgentJob'] as bool?;
    _createdBy = snapshotData['created_by'] as DocumentReference?;
    _providerApplied = getDataList(snapshotData['ProviderApplied']);
    _reviewRating = castToType<double>(snapshotData['review_rating']);
    _latlng = snapshotData['latlng'] as LatLng?;
    _chat = snapshotData['chat'] as DocumentReference?;
    _timing = snapshotData['Timing'] is TimingStruct
        ? snapshotData['Timing']
        : TimingStruct.maybeFromMap(snapshotData['Timing']);
    _duration = castToType<double>(snapshotData['Duration']);
    _totalPay = castToType<double>(snapshotData['TotalPay']);
    _skillCriteria = getDataList(snapshotData['SkillCriteria']);
    _reviewMessage = snapshotData['reviewMessage'] as String?;
    _attendanceJob = getStructList(
      snapshotData['AttendanceJob'],
      AttendanceStruct.fromMap,
    );
    _subRole = snapshotData['subRole'] as String?;
    _chatsUser = getDataList(snapshotData['chatsUser']);
    _customDate = snapshotData['customDate'] as bool?;
    _childJob = getDataList(snapshotData['childJob']);
    _perentJob = snapshotData['perentJob'] as DocumentReference?;
    _isChildJob = snapshotData['isChildJob'] as bool?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('JobDetails');

  static Stream<JobDetailsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => JobDetailsRecord.fromSnapshot(s));

  static Future<JobDetailsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => JobDetailsRecord.fromSnapshot(s));

  static JobDetailsRecord fromSnapshot(DocumentSnapshot snapshot) =>
      JobDetailsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static JobDetailsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      JobDetailsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'JobDetailsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is JobDetailsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createJobDetailsRecordData({
  String? jobId,
  String? jobName,
  String? fromBusiness,
  int? position,
  int? hourlyPay,
  String? description,
  LatLng? location,
  String? jobStatus,
  DocumentReference? business,
  String? paymentType,
  DateTime? paymentDate,
  DateTime? createdAt,
  JobStatus? jobcurrentstatus,
  DocumentReference? hiredApplicant,
  String? hospitalName,
  int? yearOfExperience,
  String? profession,
  String? specialtyArea,
  DateTime? startDate,
  DateTime? endDate,
  String? fullAddress,
  int? zipCode,
  bool? isUrgentJob,
  DocumentReference? createdBy,
  double? reviewRating,
  LatLng? latlng,
  DocumentReference? chat,
  TimingStruct? timing,
  double? duration,
  double? totalPay,
  String? reviewMessage,
  String? subRole,
  bool? customDate,
  DocumentReference? perentJob,
  bool? isChildJob,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'JobId': jobId,
      'JobName': jobName,
      'FromBusiness': fromBusiness,
      'Position': position,
      'HourlyPay': hourlyPay,
      'Description': description,
      'Location': location,
      'JobStatus': jobStatus,
      'Business': business,
      'paymentType': paymentType,
      'paymentDate': paymentDate,
      'created_at': createdAt,
      'jobcurrentstatus': jobcurrentstatus,
      'HiredApplicant': hiredApplicant,
      'HospitalName': hospitalName,
      'YearOfExperience': yearOfExperience,
      'Profession': profession,
      'SpecialtyArea': specialtyArea,
      'StartDate': startDate,
      'EndDate': endDate,
      'FullAddress': fullAddress,
      'ZipCode': zipCode,
      'isUrgentJob': isUrgentJob,
      'created_by': createdBy,
      'review_rating': reviewRating,
      'latlng': latlng,
      'chat': chat,
      'Timing': TimingStruct().toMap(),
      'Duration': duration,
      'TotalPay': totalPay,
      'reviewMessage': reviewMessage,
      'subRole': subRole,
      'customDate': customDate,
      'perentJob': perentJob,
      'isChildJob': isChildJob,
    }.withoutNulls,
  );

  // Handle nested data for "Timing" field.
  addTimingStructData(firestoreData, timing, 'Timing');

  return firestoreData;
}

class JobDetailsRecordDocumentEquality implements Equality<JobDetailsRecord> {
  const JobDetailsRecordDocumentEquality();

  @override
  bool equals(JobDetailsRecord? e1, JobDetailsRecord? e2) {
    const listEquality = ListEquality();
    return e1?.jobId == e2?.jobId &&
        e1?.jobName == e2?.jobName &&
        e1?.fromBusiness == e2?.fromBusiness &&
        e1?.position == e2?.position &&
        e1?.hourlyPay == e2?.hourlyPay &&
        e1?.description == e2?.description &&
        e1?.location == e2?.location &&
        e1?.jobStatus == e2?.jobStatus &&
        e1?.business == e2?.business &&
        e1?.paymentType == e2?.paymentType &&
        e1?.paymentDate == e2?.paymentDate &&
        e1?.createdAt == e2?.createdAt &&
        e1?.jobcurrentstatus == e2?.jobcurrentstatus &&
        e1?.hiredApplicant == e2?.hiredApplicant &&
        e1?.hospitalName == e2?.hospitalName &&
        e1?.yearOfExperience == e2?.yearOfExperience &&
        e1?.profession == e2?.profession &&
        e1?.specialtyArea == e2?.specialtyArea &&
        e1?.startDate == e2?.startDate &&
        e1?.endDate == e2?.endDate &&
        e1?.fullAddress == e2?.fullAddress &&
        e1?.zipCode == e2?.zipCode &&
        e1?.isUrgentJob == e2?.isUrgentJob &&
        e1?.createdBy == e2?.createdBy &&
        listEquality.equals(e1?.providerApplied, e2?.providerApplied) &&
        e1?.reviewRating == e2?.reviewRating &&
        e1?.latlng == e2?.latlng &&
        e1?.chat == e2?.chat &&
        e1?.timing == e2?.timing &&
        e1?.duration == e2?.duration &&
        e1?.totalPay == e2?.totalPay &&
        listEquality.equals(e1?.skillCriteria, e2?.skillCriteria) &&
        e1?.reviewMessage == e2?.reviewMessage &&
        listEquality.equals(e1?.attendanceJob, e2?.attendanceJob) &&
        e1?.subRole == e2?.subRole &&
        listEquality.equals(e1?.chatsUser, e2?.chatsUser) &&
        e1?.customDate == e2?.customDate &&
        listEquality.equals(e1?.childJob, e2?.childJob) &&
        e1?.perentJob == e2?.perentJob &&
        e1?.isChildJob == e2?.isChildJob;
  }

  @override
  int hash(JobDetailsRecord? e) => const ListEquality().hash([
        e?.jobId,
        e?.jobName,
        e?.fromBusiness,
        e?.position,
        e?.hourlyPay,
        e?.description,
        e?.location,
        e?.jobStatus,
        e?.business,
        e?.paymentType,
        e?.paymentDate,
        e?.createdAt,
        e?.jobcurrentstatus,
        e?.hiredApplicant,
        e?.hospitalName,
        e?.yearOfExperience,
        e?.profession,
        e?.specialtyArea,
        e?.startDate,
        e?.endDate,
        e?.fullAddress,
        e?.zipCode,
        e?.isUrgentJob,
        e?.createdBy,
        e?.providerApplied,
        e?.reviewRating,
        e?.latlng,
        e?.chat,
        e?.timing,
        e?.duration,
        e?.totalPay,
        e?.skillCriteria,
        e?.reviewMessage,
        e?.attendanceJob,
        e?.subRole,
        e?.chatsUser,
        e?.customDate,
        e?.childJob,
        e?.perentJob,
        e?.isChildJob
      ]);

  @override
  bool isValidKey(Object? o) => o is JobDetailsRecord;
}
