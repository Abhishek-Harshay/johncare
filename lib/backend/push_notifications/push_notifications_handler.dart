import 'dart:async';

import 'serialization_util.dart';
import '/backend/backend.dart';
import '../../flutter_flow/flutter_flow_util.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';


final _handledMessageIds = <String?>{};

class PushNotificationsHandler extends StatefulWidget {
  const PushNotificationsHandler({Key? key, required this.child})
      : super(key: key);

  final Widget child;

  @override
  _PushNotificationsHandlerState createState() =>
      _PushNotificationsHandlerState();
}

class _PushNotificationsHandlerState extends State<PushNotificationsHandler> {
  bool _loading = false;

  Future handleOpenedPushNotification() async {
    if (isWeb) {
      return;
    }

    final notification = await FirebaseMessaging.instance.getInitialMessage();
    if (notification != null) {
      await _handlePushNotification(notification);
    }
    FirebaseMessaging.onMessageOpenedApp.listen(_handlePushNotification);
  }

  Future _handlePushNotification(RemoteMessage message) async {
    if (_handledMessageIds.contains(message.messageId)) {
      return;
    }
    _handledMessageIds.add(message.messageId);

    safeSetState(() => _loading = true);
    try {
      final initialPageName = message.data['initialPageName'] as String;
      final initialParameterData = getInitialParameterData(message.data);
      final parametersBuilder = parametersBuilderMap[initialPageName];
      if (parametersBuilder != null) {
        final parameterData = await parametersBuilder(initialParameterData);
        if (mounted) {
          context.pushNamed(
            initialPageName,
            pathParameters: parameterData.pathParameters,
            extra: parameterData.extra,
          );
        } else {
          appNavigatorKey.currentContext?.pushNamed(
            initialPageName,
            pathParameters: parameterData.pathParameters,
            extra: parameterData.extra,
          );
        }
      }
    } catch (e) {
      print('Error: $e');
    } finally {
      safeSetState(() => _loading = false);
    }
  }

  @override
  void initState() {
    super.initState();
    SchedulerBinding.instance.addPostFrameCallback((_) {
      handleOpenedPushNotification();
    });
  }

  @override
  Widget build(BuildContext context) => _loading
      ? Container(
          color: Colors.transparent,
          child: Center(
            child: Image.asset(
              'assets/images/Logo.png',
              width: 200.0,
              fit: BoxFit.contain,
            ),
          ),
        )
      : widget.child;
}

class ParameterData {
  const ParameterData(
      {this.requiredParams = const {}, this.allParams = const {}});
  final Map<String, String?> requiredParams;
  final Map<String, dynamic> allParams;

  Map<String, String> get pathParameters => Map.fromEntries(
        requiredParams.entries
            .where((e) => e.value != null)
            .map((e) => MapEntry(e.key, e.value!)),
      );
  Map<String, dynamic> get extra => Map.fromEntries(
        allParams.entries.where((e) => e.value != null),
      );

  static Future<ParameterData> Function(Map<String, dynamic>) none() =>
      (data) async => ParameterData();
}

final parametersBuilderMap =
    <String, Future<ParameterData> Function(Map<String, dynamic>)>{
  'HealthcareProvidersAvailabilityAndCalendar': ParameterData.none(),
  'Signup': (data) async => ParameterData(
        allParams: {
          'role': getParameter<String>(data, 'role'),
          'subRole': getParameter<String>(data, 'subRole'),
        },
      ),
  'ClinicSideRegistrationbusiness': ParameterData.none(),
  'onboardingClinic': ParameterData.none(),
  'onboardingHealthcare': ParameterData.none(),
  'HealthCareProviderRegistration': ParameterData.none(),
  'JobseekerDashboard': (data) async => ParameterData(
        allParams: {
          'currentApplied':
              getParameter<DocumentReference>(data, 'currentApplied'),
          'index': getParameter<int>(data, 'index'),
        },
      ),
  'HealthCareProvidersReview': ParameterData.none(),
  'FilterMobilePage': ParameterData.none(),
  'HealthCareProvidersProfileManagement': ParameterData.none(),
  'Helpandsupport': ParameterData.none(),
  'HealthCareProvidersMyEarningPage': ParameterData.none(),
  'ClinicSideSubscriptionPlan': ParameterData.none(),
  'ClinicSidePaymentDetails': ParameterData.none(),
  'ReviewCandidateJob': (data) async => ParameterData(
        allParams: {
          'job': getParameter<DocumentReference>(data, 'job'),
        },
      ),
  'AdminBuisnessInformation': ParameterData.none(),
  'HealthCareProviderSubscriptionPlan': ParameterData.none(),
  'HealthcareProvidersPaymentDetails': ParameterData.none(),
  'RecruiterJobBoardDashboard': ParameterData.none(),
  'AdminJobBoardCreateJobPost': ParameterData.none(),
  'ProfileManagement': ParameterData.none(),
  'jobseekerregistrationcomplete': ParameterData.none(),
  'AdminJobManagement': ParameterData.none(),
  'AdminProvidersDetailsClinic': ParameterData.none(),
  'ActiveJobPosts': ParameterData.none(),
  'adminHomeForUser': ParameterData.none(),
  'adminHomeForClinic': ParameterData.none(),
  'AdminJobBoardJobPostDetailsExpired': ParameterData.none(),
  'AdminAlljob': (data) async => ParameterData(
        allParams: {
          'jobid': getParameter<DocumentReference>(data, 'jobid'),
        },
      ),
  'AdminAlljobExpired': ParameterData.none(),
  'AdminAlljobInprogress': ParameterData.none(),
  'AdminDashboard': ParameterData.none(),
  'AdminJobManagementActivePostDetails': ParameterData.none(),
  'AdminJobsManagementInProgressjobDetails': ParameterData.none(),
  'AdminJobsManagementExpiredJobDetails': ParameterData.none(),
  'Welcome': ParameterData.none(),
  'ForgotPassword': ParameterData.none(),
  'SignInPage': ParameterData.none(),
  'WelcomeCopy': ParameterData.none(),
  'ClinicSideTotalSpend': ParameterData.none(),
  'ProfilemanagementJobSeeker': (data) async => ParameterData(
        allParams: {
          'currentApplied':
              getParameter<DocumentReference>(data, 'currentApplied'),
        },
      ),
  'ProfileFillingForJobSeeker': (data) async => ParameterData(
        allParams: {
          'index': getParameter<int>(data, 'index'),
        },
      ),
  'SubscriptionPlanJobSeeker': (data) async => ParameterData(
        allParams: {
          'currentApplied':
              getParameter<DocumentReference>(data, 'currentApplied'),
        },
      ),
  'PaymentDetailsJobSeeker': (data) async => ParameterData(
        allParams: {
          'currentApplied':
              getParameter<DocumentReference>(data, 'currentApplied'),
        },
      ),
  'NotificationScreen': (data) async => ParameterData(
        allParams: {
          'currentApplied':
              getParameter<DocumentReference>(data, 'currentApplied'),
        },
      ),
  'ProfilemanagementClinic': (data) async => ParameterData(
        allParams: {
          'currentApplied':
              getParameter<DocumentReference>(data, 'currentApplied'),
        },
      ),
  'ProfileFillimgForClinic': (data) async => ParameterData(
        allParams: {
          'index': getParameter<int>(data, 'index'),
        },
      ),
  'AdminJobBoardEditJobPost': (data) async => ParameterData(
        allParams: {
          'job': await getDocumentParameter<JobDetailsRecord>(
              data, 'job', JobDetailsRecord.fromSnapshot),
        },
      ),
  'AdminFinancialManagement': ParameterData.none(),
  'MarkCompletedPaymentRelease': (data) async => ParameterData(
        allParams: {
          'job': getParameter<DocumentReference>(data, 'job'),
        },
      ),
  'AdminJobDetails': (data) async => ParameterData(
        allParams: {
          'job': await getDocumentParameter<JobDetailsRecord>(
              data, 'job', JobDetailsRecord.fromSnapshot),
        },
      ),
  'AdminProfileManagmentClinic': (data) async => ParameterData(
        allParams: {
          'user': await getDocumentParameter<UsersRecord>(
              data, 'user', UsersRecord.fromSnapshot),
          'buniessDetails': await getDocumentParameter<BusinessdetailRecord>(
              data, 'buniessDetails', BusinessdetailRecord.fromSnapshot),
        },
      ),
  'AdminProfileManagmentHealthProvider': (data) async => ParameterData(
        allParams: {
          'user': await getDocumentParameter<UsersRecord>(
              data, 'user', UsersRecord.fromSnapshot),
          'providerDetails': await getDocumentParameter<ProviderDetailRecord>(
              data, 'providerDetails', ProviderDetailRecord.fromSnapshot),
        },
      ),
  'DashboardRecuriterWeb': ParameterData.none(),
  'CreateNewPostRecuriterWeb': ParameterData.none(),
  'EditPostRecuriterWeb': (data) async => ParameterData(
        allParams: {
          'job': await getDocumentParameter<JobDetailsRecord>(
              data, 'job', JobDetailsRecord.fromSnapshot),
        },
      ),
  'JobDetailsRecuriterWeb': (data) async => ParameterData(
        allParams: {
          'job': await getDocumentParameter<JobDetailsRecord>(
              data, 'job', JobDetailsRecord.fromSnapshot),
        },
      ),
  'TotalSpendRecuriterWeb': ParameterData.none(),
  'ProfileManagementRecuriterWeb': ParameterData.none(),
  'HelpSupportRecuriterWeb': ParameterData.none(),
  'AllChatsScreen': ParameterData.none(),
  'MessageScreen': (data) async => ParameterData(
        allParams: {
          'chat': getParameter<DocumentReference>(data, 'chat'),
          'name': getParameter<String>(data, 'name'),
        },
      ),
  'AllChatRecuriterWeb': ParameterData.none(),
  'ClinicSideRegistrationIndividual': ParameterData.none(),
  'chooseRole': ParameterData.none(),
  'DemoPlacePIcker': ParameterData.none(),
  'firstTimeProfileFllingRecuWeb': ParameterData.none(),
};

Map<String, dynamic> getInitialParameterData(Map<String, dynamic> data) {
  try {
    final parameterDataStr = data['parameterData'];
    if (parameterDataStr == null ||
        parameterDataStr is! String ||
        parameterDataStr.isEmpty) {
      return {};
    }
    return jsonDecode(parameterDataStr) as Map<String, dynamic>;
  } catch (e) {
    print('Error parsing parameter data: $e');
    return {};
  }
}
