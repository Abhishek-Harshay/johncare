import 'package:flutter/material.dart';
import 'flutter_flow/request_manager.dart';
import '/backend/backend.dart';
import 'package:shared_preferences/shared_preferences.dart';

class FFAppState extends ChangeNotifier {
  static FFAppState _instance = FFAppState._internal();

  factory FFAppState() {
    return _instance;
  }

  FFAppState._internal();

  static void reset() {
    _instance = FFAppState._internal();
  }

  Future initializePersistedState() async {
    prefs = await SharedPreferences.getInstance();
    _safeInit(() {
      _urgentJob = prefs.getBool('ff_urgentJob') ?? _urgentJob;
    });
  }

  void update(VoidCallback callback) {
    callback();
    notifyListeners();
  }

  late SharedPreferences prefs;

  List<String> _JobStatusRecruiterState = ['Active', 'In Progress', 'Expired'];
  List<String> get JobStatusRecruiterState => _JobStatusRecruiterState;
  set JobStatusRecruiterState(List<String> value) {
    _JobStatusRecruiterState = value;
  }

  void addToJobStatusRecruiterState(String value) {
    JobStatusRecruiterState.add(value);
  }

  void removeFromJobStatusRecruiterState(String value) {
    JobStatusRecruiterState.remove(value);
  }

  void removeAtIndexFromJobStatusRecruiterState(int index) {
    JobStatusRecruiterState.removeAt(index);
  }

  void updateJobStatusRecruiterStateAtIndex(
    int index,
    String Function(String) updateFn,
  ) {
    JobStatusRecruiterState[index] = updateFn(_JobStatusRecruiterState[index]);
  }

  void insertAtIndexInJobStatusRecruiterState(int index, String value) {
    JobStatusRecruiterState.insert(index, value);
  }

  bool _urgentJob = false;
  bool get urgentJob => _urgentJob;
  set urgentJob(bool value) {
    _urgentJob = value;
    prefs.setBool('ff_urgentJob', value);
  }

  DateTime? _StartDate;
  DateTime? get StartDate => _StartDate;
  set StartDate(DateTime? value) {
    _StartDate = value;
  }

  DateTime? _EndDate;
  DateTime? get EndDate => _EndDate;
  set EndDate(DateTime? value) {
    _EndDate = value;
  }

  DateTime? _FilterStartDate;
  DateTime? get FilterStartDate => _FilterStartDate;
  set FilterStartDate(DateTime? value) {
    _FilterStartDate = value;
  }

  DateTime? _FilterEndDate;
  DateTime? get FilterEndDate => _FilterEndDate;
  set FilterEndDate(DateTime? value) {
    _FilterEndDate = value;
  }

  List<String> _skills = [];
  List<String> get skills => _skills;
  set skills(List<String> value) {
    _skills = value;
  }

  void addToSkills(String value) {
    skills.add(value);
  }

  void removeFromSkills(String value) {
    skills.remove(value);
  }

  void removeAtIndexFromSkills(int index) {
    skills.removeAt(index);
  }

  void updateSkillsAtIndex(
    int index,
    String Function(String) updateFn,
  ) {
    skills[index] = updateFn(_skills[index]);
  }

  void insertAtIndexInSkills(int index, String value) {
    skills.insert(index, value);
  }

  String _sortFilter = 'nto';
  String get sortFilter => _sortFilter;
  set sortFilter(String value) {
    _sortFilter = value;
  }

  String _chooseType = 'Worker';
  String get chooseType => _chooseType;
  set chooseType(String value) {
    _chooseType = value;
  }

  String _chooseSubType = 'business';
  String get chooseSubType => _chooseSubType;
  set chooseSubType(String value) {
    _chooseSubType = value;
  }

  String _addressJob = '';
  String get addressJob => _addressJob;
  set addressJob(String value) {
    _addressJob = value;
  }

  final _usersClinicManager = StreamRequestManager<List<UsersRecord>>();
  Stream<List<UsersRecord>> usersClinic({
    String? uniqueQueryKey,
    bool? overrideCache,
    required Stream<List<UsersRecord>> Function() requestFn,
  }) =>
      _usersClinicManager.performRequest(
        uniqueQueryKey: uniqueQueryKey,
        overrideCache: overrideCache,
        requestFn: requestFn,
      );
  void clearUsersClinicCache() => _usersClinicManager.clear();
  void clearUsersClinicCacheKey(String? uniqueKey) =>
      _usersClinicManager.clearRequest(uniqueKey);

  final _userProviderManager = StreamRequestManager<List<UsersRecord>>();
  Stream<List<UsersRecord>> userProvider({
    String? uniqueQueryKey,
    bool? overrideCache,
    required Stream<List<UsersRecord>> Function() requestFn,
  }) =>
      _userProviderManager.performRequest(
        uniqueQueryKey: uniqueQueryKey,
        overrideCache: overrideCache,
        requestFn: requestFn,
      );
  void clearUserProviderCache() => _userProviderManager.clear();
  void clearUserProviderCacheKey(String? uniqueKey) =>
      _userProviderManager.clearRequest(uniqueKey);

  final _jobsManager = StreamRequestManager<List<JobDetailsRecord>>();
  Stream<List<JobDetailsRecord>> jobs({
    String? uniqueQueryKey,
    bool? overrideCache,
    required Stream<List<JobDetailsRecord>> Function() requestFn,
  }) =>
      _jobsManager.performRequest(
        uniqueQueryKey: uniqueQueryKey,
        overrideCache: overrideCache,
        requestFn: requestFn,
      );
  void clearJobsCache() => _jobsManager.clear();
  void clearJobsCacheKey(String? uniqueKey) =>
      _jobsManager.clearRequest(uniqueKey);

  final _clinicFinManager = StreamRequestManager<List<UsersRecord>>();
  Stream<List<UsersRecord>> clinicFin({
    String? uniqueQueryKey,
    bool? overrideCache,
    required Stream<List<UsersRecord>> Function() requestFn,
  }) =>
      _clinicFinManager.performRequest(
        uniqueQueryKey: uniqueQueryKey,
        overrideCache: overrideCache,
        requestFn: requestFn,
      );
  void clearClinicFinCache() => _clinicFinManager.clear();
  void clearClinicFinCacheKey(String? uniqueKey) =>
      _clinicFinManager.clearRequest(uniqueKey);

  final _healthFinManager = StreamRequestManager<List<UsersRecord>>();
  Stream<List<UsersRecord>> healthFin({
    String? uniqueQueryKey,
    bool? overrideCache,
    required Stream<List<UsersRecord>> Function() requestFn,
  }) =>
      _healthFinManager.performRequest(
        uniqueQueryKey: uniqueQueryKey,
        overrideCache: overrideCache,
        requestFn: requestFn,
      );
  void clearHealthFinCache() => _healthFinManager.clear();
  void clearHealthFinCacheKey(String? uniqueKey) =>
      _healthFinManager.clearRequest(uniqueKey);

  final _transectionsManager = StreamRequestManager<List<TransactionsRecord>>();
  Stream<List<TransactionsRecord>> transections({
    String? uniqueQueryKey,
    bool? overrideCache,
    required Stream<List<TransactionsRecord>> Function() requestFn,
  }) =>
      _transectionsManager.performRequest(
        uniqueQueryKey: uniqueQueryKey,
        overrideCache: overrideCache,
        requestFn: requestFn,
      );
  void clearTransectionsCache() => _transectionsManager.clear();
  void clearTransectionsCacheKey(String? uniqueKey) =>
      _transectionsManager.clearRequest(uniqueKey);

  final _subClinicsManager = StreamRequestManager<List<SubscriptionsRecord>>();
  Stream<List<SubscriptionsRecord>> subClinics({
    String? uniqueQueryKey,
    bool? overrideCache,
    required Stream<List<SubscriptionsRecord>> Function() requestFn,
  }) =>
      _subClinicsManager.performRequest(
        uniqueQueryKey: uniqueQueryKey,
        overrideCache: overrideCache,
        requestFn: requestFn,
      );
  void clearSubClinicsCache() => _subClinicsManager.clear();
  void clearSubClinicsCacheKey(String? uniqueKey) =>
      _subClinicsManager.clearRequest(uniqueKey);

  final _subHealthManager = StreamRequestManager<List<SubscriptionsRecord>>();
  Stream<List<SubscriptionsRecord>> subHealth({
    String? uniqueQueryKey,
    bool? overrideCache,
    required Stream<List<SubscriptionsRecord>> Function() requestFn,
  }) =>
      _subHealthManager.performRequest(
        uniqueQueryKey: uniqueQueryKey,
        overrideCache: overrideCache,
        requestFn: requestFn,
      );
  void clearSubHealthCache() => _subHealthManager.clear();
  void clearSubHealthCacheKey(String? uniqueKey) =>
      _subHealthManager.clearRequest(uniqueKey);
}

void _safeInit(Function() initializeField) {
  try {
    initializeField();
  } catch (_) {}
}

Future _safeInitAsync(Function() initializeField) async {
  try {
    await initializeField();
  } catch (_) {}
}
