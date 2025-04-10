import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '/backend/backend.dart';

import '/auth/base_auth_user_provider.dart';

import '/backend/push_notifications/push_notifications_handler.dart'
    show PushNotificationsHandler;
import '/flutter_flow/flutter_flow_util.dart';

import '/index.dart';

export 'package:go_router/go_router.dart';
export 'serialization_util.dart';

const kTransitionInfoKey = '__transition_info__';

GlobalKey<NavigatorState> appNavigatorKey = GlobalKey<NavigatorState>();

class AppStateNotifier extends ChangeNotifier {
  AppStateNotifier._();

  static AppStateNotifier? _instance;
  static AppStateNotifier get instance => _instance ??= AppStateNotifier._();

  BaseAuthUser? initialUser;
  BaseAuthUser? user;
  bool showSplashImage = true;
  String? _redirectLocation;

  /// Determines whether the app will refresh and build again when a sign
  /// in or sign out happens. This is useful when the app is launched or
  /// on an unexpected logout. However, this must be turned off when we
  /// intend to sign in/out and then navigate or perform any actions after.
  /// Otherwise, this will trigger a refresh and interrupt the action(s).
  bool notifyOnAuthChange = true;

  bool get loading => user == null || showSplashImage;
  bool get loggedIn => user?.loggedIn ?? false;
  bool get initiallyLoggedIn => initialUser?.loggedIn ?? false;
  bool get shouldRedirect => loggedIn && _redirectLocation != null;

  String getRedirectLocation() => _redirectLocation!;
  bool hasRedirect() => _redirectLocation != null;
  void setRedirectLocationIfUnset(String loc) => _redirectLocation ??= loc;
  void clearRedirectLocation() => _redirectLocation = null;

  /// Mark as not needing to notify on a sign in / out when we intend
  /// to perform subsequent actions (such as navigation) afterwards.
  void updateNotifyOnAuthChange(bool notify) => notifyOnAuthChange = notify;

  void update(BaseAuthUser newUser) {
    final shouldUpdate =
        user?.uid == null || newUser.uid == null || user?.uid != newUser.uid;
    initialUser ??= newUser;
    user = newUser;
    // Refresh the app on auth change unless explicitly marked otherwise.
    // No need to update unless the user has changed.
    if (notifyOnAuthChange && shouldUpdate) {
      notifyListeners();
    }
    // Once again mark the notifier as needing to update on auth change
    // (in order to catch sign in / out events).
    updateNotifyOnAuthChange(true);
  }

  void stopShowingSplashImage() {
    showSplashImage = false;
    notifyListeners();
  }
}

GoRouter createRouter(AppStateNotifier appStateNotifier) => GoRouter(
      initialLocation: '/',
      debugLogDiagnostics: true,
      refreshListenable: appStateNotifier,
      navigatorKey: appNavigatorKey,
      errorBuilder: (context, state) =>
          appStateNotifier.loggedIn ? WelcomeWidget() : SignInPageWidget(),
      routes: [
        FFRoute(
          name: '_initialize',
          path: '/',
          builder: (context, _) =>
              appStateNotifier.loggedIn ? WelcomeWidget() : SignInPageWidget(),
        ),
        FFRoute(
          name: HealthcareProvidersAvailabilityAndCalendarWidget.routeName,
          path: HealthcareProvidersAvailabilityAndCalendarWidget.routePath,
          builder: (context, params) =>
              HealthcareProvidersAvailabilityAndCalendarWidget(),
        ),
        FFRoute(
          name: SignupWidget.routeName,
          path: SignupWidget.routePath,
          builder: (context, params) => SignupWidget(
            role: params.getParam(
              'role',
              ParamType.String,
            ),
            subRole: params.getParam(
              'subRole',
              ParamType.String,
            ),
          ),
        ),
        FFRoute(
          name: ClinicSideRegistrationbusinessWidget.routeName,
          path: ClinicSideRegistrationbusinessWidget.routePath,
          builder: (context, params) => ClinicSideRegistrationbusinessWidget(),
        ),
        FFRoute(
          name: OnboardingClinicWidget.routeName,
          path: OnboardingClinicWidget.routePath,
          requireAuth: true,
          builder: (context, params) => OnboardingClinicWidget(),
        ),
        FFRoute(
          name: OnboardingHealthcareWidget.routeName,
          path: OnboardingHealthcareWidget.routePath,
          builder: (context, params) => OnboardingHealthcareWidget(),
        ),
        FFRoute(
          name: HealthCareProviderRegistrationWidget.routeName,
          path: HealthCareProviderRegistrationWidget.routePath,
          builder: (context, params) => HealthCareProviderRegistrationWidget(),
        ),
        FFRoute(
          name: JobseekerDashboardWidget.routeName,
          path: JobseekerDashboardWidget.routePath,
          requireAuth: true,
          builder: (context, params) => JobseekerDashboardWidget(
            currentApplied: params.getParam(
              'currentApplied',
              ParamType.DocumentReference,
              isList: false,
              collectionNamePath: ['AppliedJob'],
            ),
            index: params.getParam(
              'index',
              ParamType.int,
            ),
          ),
        ),
        FFRoute(
          name: HealthCareProvidersReviewWidget.routeName,
          path: HealthCareProvidersReviewWidget.routePath,
          builder: (context, params) => HealthCareProvidersReviewWidget(),
        ),
        FFRoute(
          name: FilterMobilePageWidget.routeName,
          path: FilterMobilePageWidget.routePath,
          builder: (context, params) => FilterMobilePageWidget(),
        ),
        FFRoute(
          name: HealthCareProvidersProfileManagementWidget.routeName,
          path: HealthCareProvidersProfileManagementWidget.routePath,
          builder: (context, params) =>
              HealthCareProvidersProfileManagementWidget(),
        ),
        FFRoute(
          name: HelpandsupportWidget.routeName,
          path: HelpandsupportWidget.routePath,
          builder: (context, params) => HelpandsupportWidget(),
        ),
        FFRoute(
          name: HealthCareProvidersMyEarningPageWidget.routeName,
          path: HealthCareProvidersMyEarningPageWidget.routePath,
          builder: (context, params) =>
              HealthCareProvidersMyEarningPageWidget(),
        ),
        FFRoute(
          name: ClinicSideSubscriptionPlanWidget.routeName,
          path: ClinicSideSubscriptionPlanWidget.routePath,
          requireAuth: true,
          builder: (context, params) => ClinicSideSubscriptionPlanWidget(),
        ),
        FFRoute(
          name: ClinicSidePaymentDetailsWidget.routeName,
          path: ClinicSidePaymentDetailsWidget.routePath,
          builder: (context, params) => ClinicSidePaymentDetailsWidget(),
        ),
        FFRoute(
          name: ReviewCandidateJobWidget.routeName,
          path: ReviewCandidateJobWidget.routePath,
          builder: (context, params) => ReviewCandidateJobWidget(
            job: params.getParam(
              'job',
              ParamType.DocumentReference,
              isList: false,
              collectionNamePath: ['JobDetails'],
            ),
          ),
        ),
        FFRoute(
          name: AdminBuisnessInformationWidget.routeName,
          path: AdminBuisnessInformationWidget.routePath,
          builder: (context, params) => AdminBuisnessInformationWidget(),
        ),
        FFRoute(
          name: HealthCareProviderSubscriptionPlanWidget.routeName,
          path: HealthCareProviderSubscriptionPlanWidget.routePath,
          builder: (context, params) =>
              HealthCareProviderSubscriptionPlanWidget(),
        ),
        FFRoute(
          name: HealthcareProvidersPaymentDetailsWidget.routeName,
          path: HealthcareProvidersPaymentDetailsWidget.routePath,
          builder: (context, params) =>
              HealthcareProvidersPaymentDetailsWidget(),
        ),
        FFRoute(
          name: RecruiterJobBoardDashboardWidget.routeName,
          path: RecruiterJobBoardDashboardWidget.routePath,
          requireAuth: true,
          builder: (context, params) => RecruiterJobBoardDashboardWidget(),
        ),
        FFRoute(
          name: AdminJobBoardCreateJobPostWidget.routeName,
          path: AdminJobBoardCreateJobPostWidget.routePath,
          builder: (context, params) => AdminJobBoardCreateJobPostWidget(),
        ),
        FFRoute(
          name: ProfileManagementWidget.routeName,
          path: ProfileManagementWidget.routePath,
          builder: (context, params) => ProfileManagementWidget(),
        ),
        FFRoute(
          name: JobseekerregistrationcompleteWidget.routeName,
          path: JobseekerregistrationcompleteWidget.routePath,
          builder: (context, params) => JobseekerregistrationcompleteWidget(),
        ),
        FFRoute(
          name: AdminJobManagementWidget.routeName,
          path: AdminJobManagementWidget.routePath,
          builder: (context, params) => AdminJobManagementWidget(),
        ),
        FFRoute(
          name: AdminProvidersDetailsClinicWidget.routeName,
          path: AdminProvidersDetailsClinicWidget.routePath,
          builder: (context, params) => AdminProvidersDetailsClinicWidget(),
        ),
        FFRoute(
          name: ActiveJobPostsWidget.routeName,
          path: ActiveJobPostsWidget.routePath,
          builder: (context, params) => ActiveJobPostsWidget(),
        ),
        FFRoute(
          name: AdminHomeForUserWidget.routeName,
          path: AdminHomeForUserWidget.routePath,
          builder: (context, params) => AdminHomeForUserWidget(),
        ),
        FFRoute(
          name: AdminHomeForClinicWidget.routeName,
          path: AdminHomeForClinicWidget.routePath,
          builder: (context, params) => AdminHomeForClinicWidget(),
        ),
        FFRoute(
          name: AdminJobBoardJobPostDetailsExpiredWidget.routeName,
          path: AdminJobBoardJobPostDetailsExpiredWidget.routePath,
          builder: (context, params) =>
              AdminJobBoardJobPostDetailsExpiredWidget(),
        ),
        FFRoute(
          name: AdminAlljobWidget.routeName,
          path: AdminAlljobWidget.routePath,
          builder: (context, params) => AdminAlljobWidget(
            jobid: params.getParam(
              'jobid',
              ParamType.DocumentReference,
              isList: false,
              collectionNamePath: ['JobDetails'],
            ),
          ),
        ),
        FFRoute(
          name: AdminAlljobExpiredWidget.routeName,
          path: AdminAlljobExpiredWidget.routePath,
          builder: (context, params) => AdminAlljobExpiredWidget(),
        ),
        FFRoute(
          name: AdminAlljobInprogressWidget.routeName,
          path: AdminAlljobInprogressWidget.routePath,
          builder: (context, params) => AdminAlljobInprogressWidget(),
        ),
        FFRoute(
          name: AdminDashboardWidget.routeName,
          path: AdminDashboardWidget.routePath,
          builder: (context, params) => AdminDashboardWidget(),
        ),
        FFRoute(
          name: AdminJobManagementActivePostDetailsWidget.routeName,
          path: AdminJobManagementActivePostDetailsWidget.routePath,
          builder: (context, params) =>
              AdminJobManagementActivePostDetailsWidget(),
        ),
        FFRoute(
          name: AdminJobsManagementInProgressjobDetailsWidget.routeName,
          path: AdminJobsManagementInProgressjobDetailsWidget.routePath,
          builder: (context, params) =>
              AdminJobsManagementInProgressjobDetailsWidget(),
        ),
        FFRoute(
          name: AdminJobsManagementExpiredJobDetailsWidget.routeName,
          path: AdminJobsManagementExpiredJobDetailsWidget.routePath,
          builder: (context, params) =>
              AdminJobsManagementExpiredJobDetailsWidget(),
        ),
        FFRoute(
          name: WelcomeWidget.routeName,
          path: WelcomeWidget.routePath,
          requireAuth: true,
          builder: (context, params) => WelcomeWidget(),
        ),
        FFRoute(
          name: ForgotPasswordWidget.routeName,
          path: ForgotPasswordWidget.routePath,
          builder: (context, params) => ForgotPasswordWidget(),
        ),
        FFRoute(
          name: SignInPageWidget.routeName,
          path: SignInPageWidget.routePath,
          builder: (context, params) => SignInPageWidget(),
        ),
        FFRoute(
          name: WelcomeCopyWidget.routeName,
          path: WelcomeCopyWidget.routePath,
          builder: (context, params) => WelcomeCopyWidget(),
        ),
        FFRoute(
          name: ClinicSideTotalSpendWidget.routeName,
          path: ClinicSideTotalSpendWidget.routePath,
          requireAuth: true,
          builder: (context, params) => ClinicSideTotalSpendWidget(),
        ),
        FFRoute(
          name: ProfilemanagementJobSeekerWidget.routeName,
          path: ProfilemanagementJobSeekerWidget.routePath,
          requireAuth: true,
          builder: (context, params) => ProfilemanagementJobSeekerWidget(
            currentApplied: params.getParam(
              'currentApplied',
              ParamType.DocumentReference,
              isList: false,
              collectionNamePath: ['AppliedJob'],
            ),
          ),
        ),
        FFRoute(
          name: ProfileFillingForJobSeekerWidget.routeName,
          path: ProfileFillingForJobSeekerWidget.routePath,
          builder: (context, params) => ProfileFillingForJobSeekerWidget(
            index: params.getParam(
              'index',
              ParamType.int,
            ),
          ),
        ),
        FFRoute(
          name: SubscriptionPlanJobSeekerWidget.routeName,
          path: SubscriptionPlanJobSeekerWidget.routePath,
          requireAuth: true,
          builder: (context, params) => SubscriptionPlanJobSeekerWidget(
            currentApplied: params.getParam(
              'currentApplied',
              ParamType.DocumentReference,
              isList: false,
              collectionNamePath: ['AppliedJob'],
            ),
          ),
        ),
        FFRoute(
          name: PaymentDetailsJobSeekerWidget.routeName,
          path: PaymentDetailsJobSeekerWidget.routePath,
          requireAuth: true,
          builder: (context, params) => PaymentDetailsJobSeekerWidget(
            currentApplied: params.getParam(
              'currentApplied',
              ParamType.DocumentReference,
              isList: false,
              collectionNamePath: ['AppliedJob'],
            ),
          ),
        ),
        FFRoute(
          name: NotificationScreenWidget.routeName,
          path: NotificationScreenWidget.routePath,
          requireAuth: true,
          builder: (context, params) => NotificationScreenWidget(
            currentApplied: params.getParam(
              'currentApplied',
              ParamType.DocumentReference,
              isList: false,
              collectionNamePath: ['AppliedJob'],
            ),
          ),
        ),
        FFRoute(
          name: ProfilemanagementClinicWidget.routeName,
          path: ProfilemanagementClinicWidget.routePath,
          requireAuth: true,
          builder: (context, params) => ProfilemanagementClinicWidget(
            currentApplied: params.getParam(
              'currentApplied',
              ParamType.DocumentReference,
              isList: false,
              collectionNamePath: ['AppliedJob'],
            ),
          ),
        ),
        FFRoute(
          name: ProfileFillimgForClinicWidget.routeName,
          path: ProfileFillimgForClinicWidget.routePath,
          builder: (context, params) => ProfileFillimgForClinicWidget(
            index: params.getParam(
              'index',
              ParamType.int,
            ),
          ),
        ),
        FFRoute(
          name: AdminJobBoardEditJobPostWidget.routeName,
          path: AdminJobBoardEditJobPostWidget.routePath,
          asyncParams: {
            'job': getDoc(['JobDetails'], JobDetailsRecord.fromSnapshot),
          },
          builder: (context, params) => AdminJobBoardEditJobPostWidget(
            job: params.getParam(
              'job',
              ParamType.Document,
            ),
          ),
        ),
        FFRoute(
          name: AdminFinancialManagementWidget.routeName,
          path: AdminFinancialManagementWidget.routePath,
          builder: (context, params) => AdminFinancialManagementWidget(),
        ),
        FFRoute(
          name: MarkCompletedPaymentReleaseWidget.routeName,
          path: MarkCompletedPaymentReleaseWidget.routePath,
          requireAuth: true,
          builder: (context, params) => MarkCompletedPaymentReleaseWidget(
            job: params.getParam(
              'job',
              ParamType.DocumentReference,
              isList: false,
              collectionNamePath: ['JobDetails'],
            ),
          ),
        ),
        FFRoute(
          name: AdminJobDetailsWidget.routeName,
          path: AdminJobDetailsWidget.routePath,
          asyncParams: {
            'job': getDoc(['JobDetails'], JobDetailsRecord.fromSnapshot),
          },
          builder: (context, params) => AdminJobDetailsWidget(
            job: params.getParam(
              'job',
              ParamType.Document,
            ),
          ),
        ),
        FFRoute(
          name: AdminProfileManagmentClinicWidget.routeName,
          path: AdminProfileManagmentClinicWidget.routePath,
          asyncParams: {
            'user': getDoc(['users'], UsersRecord.fromSnapshot),
            'buniessDetails':
                getDoc(['Businessdetail'], BusinessdetailRecord.fromSnapshot),
          },
          builder: (context, params) => AdminProfileManagmentClinicWidget(
            user: params.getParam(
              'user',
              ParamType.Document,
            ),
            buniessDetails: params.getParam(
              'buniessDetails',
              ParamType.Document,
            ),
          ),
        ),
        FFRoute(
          name: AdminProfileManagmentHealthProviderWidget.routeName,
          path: AdminProfileManagmentHealthProviderWidget.routePath,
          asyncParams: {
            'user': getDoc(['users'], UsersRecord.fromSnapshot),
            'providerDetails':
                getDoc(['ProviderDetail'], ProviderDetailRecord.fromSnapshot),
          },
          builder: (context, params) =>
              AdminProfileManagmentHealthProviderWidget(
            user: params.getParam(
              'user',
              ParamType.Document,
            ),
            providerDetails: params.getParam(
              'providerDetails',
              ParamType.Document,
            ),
          ),
        ),
        FFRoute(
          name: DashboardRecuriterWebWidget.routeName,
          path: DashboardRecuriterWebWidget.routePath,
          builder: (context, params) => DashboardRecuriterWebWidget(),
        ),
        FFRoute(
          name: CreateNewPostRecuriterWebWidget.routeName,
          path: CreateNewPostRecuriterWebWidget.routePath,
          builder: (context, params) => CreateNewPostRecuriterWebWidget(),
        ),
        FFRoute(
          name: EditPostRecuriterWebWidget.routeName,
          path: EditPostRecuriterWebWidget.routePath,
          asyncParams: {
            'job': getDoc(['JobDetails'], JobDetailsRecord.fromSnapshot),
          },
          builder: (context, params) => EditPostRecuriterWebWidget(
            job: params.getParam(
              'job',
              ParamType.Document,
            ),
          ),
        ),
        FFRoute(
          name: JobDetailsRecuriterWebWidget.routeName,
          path: JobDetailsRecuriterWebWidget.routePath,
          asyncParams: {
            'job': getDoc(['JobDetails'], JobDetailsRecord.fromSnapshot),
          },
          builder: (context, params) => JobDetailsRecuriterWebWidget(
            job: params.getParam(
              'job',
              ParamType.Document,
            ),
          ),
        ),
        FFRoute(
          name: TotalSpendRecuriterWebWidget.routeName,
          path: TotalSpendRecuriterWebWidget.routePath,
          builder: (context, params) => TotalSpendRecuriterWebWidget(),
        ),
        FFRoute(
          name: ProfileManagementRecuriterWebWidget.routeName,
          path: ProfileManagementRecuriterWebWidget.routePath,
          builder: (context, params) => ProfileManagementRecuriterWebWidget(),
        ),
        FFRoute(
          name: HelpSupportRecuriterWebWidget.routeName,
          path: HelpSupportRecuriterWebWidget.routePath,
          builder: (context, params) => HelpSupportRecuriterWebWidget(),
        ),
        FFRoute(
          name: AllChatsScreenWidget.routeName,
          path: AllChatsScreenWidget.routePath,
          requireAuth: true,
          builder: (context, params) => AllChatsScreenWidget(),
        ),
        FFRoute(
          name: MessageScreenWidget.routeName,
          path: MessageScreenWidget.routePath,
          requireAuth: true,
          builder: (context, params) => MessageScreenWidget(
            chat: params.getParam(
              'chat',
              ParamType.DocumentReference,
              isList: false,
              collectionNamePath: ['chats'],
            ),
            name: params.getParam(
              'name',
              ParamType.String,
            ),
          ),
        ),
        FFRoute(
          name: AllChatRecuriterWebWidget.routeName,
          path: AllChatRecuriterWebWidget.routePath,
          builder: (context, params) => AllChatRecuriterWebWidget(),
        ),
        FFRoute(
          name: ClinicSideRegistrationIndividualWidget.routeName,
          path: ClinicSideRegistrationIndividualWidget.routePath,
          builder: (context, params) =>
              ClinicSideRegistrationIndividualWidget(),
        ),
        FFRoute(
          name: ChooseRoleWidget.routeName,
          path: ChooseRoleWidget.routePath,
          builder: (context, params) => ChooseRoleWidget(),
        ),
        FFRoute(
          name: DemoPlacePIckerWidget.routeName,
          path: DemoPlacePIckerWidget.routePath,
          builder: (context, params) => DemoPlacePIckerWidget(),
        ),
        FFRoute(
          name: FirstTimeProfileFllingRecuWebWidget.routeName,
          path: FirstTimeProfileFllingRecuWebWidget.routePath,
          builder: (context, params) => FirstTimeProfileFllingRecuWebWidget(),
        )
      ].map((r) => r.toRoute(appStateNotifier)).toList(),
    );

extension NavParamExtensions on Map<String, String?> {
  Map<String, String> get withoutNulls => Map.fromEntries(
        entries
            .where((e) => e.value != null)
            .map((e) => MapEntry(e.key, e.value!)),
      );
}

extension NavigationExtensions on BuildContext {
  void goNamedAuth(
    String name,
    bool mounted, {
    Map<String, String> pathParameters = const <String, String>{},
    Map<String, String> queryParameters = const <String, String>{},
    Object? extra,
    bool ignoreRedirect = false,
  }) =>
      !mounted || GoRouter.of(this).shouldRedirect(ignoreRedirect)
          ? null
          : goNamed(
              name,
              pathParameters: pathParameters,
              queryParameters: queryParameters,
              extra: extra,
            );

  void pushNamedAuth(
    String name,
    bool mounted, {
    Map<String, String> pathParameters = const <String, String>{},
    Map<String, String> queryParameters = const <String, String>{},
    Object? extra,
    bool ignoreRedirect = false,
  }) =>
      !mounted || GoRouter.of(this).shouldRedirect(ignoreRedirect)
          ? null
          : pushNamed(
              name,
              pathParameters: pathParameters,
              queryParameters: queryParameters,
              extra: extra,
            );

  void safePop() {
    // If there is only one route on the stack, navigate to the initial
    // page instead of popping.
    if (canPop()) {
      pop();
    } else {
      go('/');
    }
  }
}

extension GoRouterExtensions on GoRouter {
  AppStateNotifier get appState => AppStateNotifier.instance;
  void prepareAuthEvent([bool ignoreRedirect = false]) =>
      appState.hasRedirect() && !ignoreRedirect
          ? null
          : appState.updateNotifyOnAuthChange(false);
  bool shouldRedirect(bool ignoreRedirect) =>
      !ignoreRedirect && appState.hasRedirect();
  void clearRedirectLocation() => appState.clearRedirectLocation();
  void setRedirectLocationIfUnset(String location) =>
      appState.updateNotifyOnAuthChange(false);
}

extension _GoRouterStateExtensions on GoRouterState {
  Map<String, dynamic> get extraMap =>
      extra != null ? extra as Map<String, dynamic> : {};
  Map<String, dynamic> get allParams => <String, dynamic>{}
    ..addAll(pathParameters)
    ..addAll(uri.queryParameters)
    ..addAll(extraMap);
  TransitionInfo get transitionInfo => extraMap.containsKey(kTransitionInfoKey)
      ? extraMap[kTransitionInfoKey] as TransitionInfo
      : TransitionInfo.appDefault();
}

class FFParameters {
  FFParameters(this.state, [this.asyncParams = const {}]);

  final GoRouterState state;
  final Map<String, Future<dynamic> Function(String)> asyncParams;

  Map<String, dynamic> futureParamValues = {};

  // Parameters are empty if the params map is empty or if the only parameter
  // present is the special extra parameter reserved for the transition info.
  bool get isEmpty =>
      state.allParams.isEmpty ||
      (state.allParams.length == 1 &&
          state.extraMap.containsKey(kTransitionInfoKey));
  bool isAsyncParam(MapEntry<String, dynamic> param) =>
      asyncParams.containsKey(param.key) && param.value is String;
  bool get hasFutures => state.allParams.entries.any(isAsyncParam);
  Future<bool> completeFutures() => Future.wait(
        state.allParams.entries.where(isAsyncParam).map(
          (param) async {
            final doc = await asyncParams[param.key]!(param.value)
                .onError((_, __) => null);
            if (doc != null) {
              futureParamValues[param.key] = doc;
              return true;
            }
            return false;
          },
        ),
      ).onError((_, __) => [false]).then((v) => v.every((e) => e));

  dynamic getParam<T>(
    String paramName,
    ParamType type, {
    bool isList = false,
    List<String>? collectionNamePath,
    StructBuilder<T>? structBuilder,
  }) {
    if (futureParamValues.containsKey(paramName)) {
      return futureParamValues[paramName];
    }
    if (!state.allParams.containsKey(paramName)) {
      return null;
    }
    final param = state.allParams[paramName];
    // Got parameter from `extras`, so just directly return it.
    if (param is! String) {
      return param;
    }
    // Return serialized value.
    return deserializeParam<T>(
      param,
      type,
      isList,
      collectionNamePath: collectionNamePath,
      structBuilder: structBuilder,
    );
  }
}

class FFRoute {
  const FFRoute({
    required this.name,
    required this.path,
    required this.builder,
    this.requireAuth = false,
    this.asyncParams = const {},
    this.routes = const [],
  });

  final String name;
  final String path;
  final bool requireAuth;
  final Map<String, Future<dynamic> Function(String)> asyncParams;
  final Widget Function(BuildContext, FFParameters) builder;
  final List<GoRoute> routes;

  GoRoute toRoute(AppStateNotifier appStateNotifier) => GoRoute(
        name: name,
        path: path,
        redirect: (context, state) {
          if (appStateNotifier.shouldRedirect) {
            final redirectLocation = appStateNotifier.getRedirectLocation();
            appStateNotifier.clearRedirectLocation();
            return redirectLocation;
          }

          if (requireAuth && !appStateNotifier.loggedIn) {
            appStateNotifier.setRedirectLocationIfUnset(state.uri.toString());
            return '/signInPage';
          }
          return null;
        },
        pageBuilder: (context, state) {
          fixStatusBarOniOS16AndBelow(context);
          final ffParams = FFParameters(state, asyncParams);
          final page = ffParams.hasFutures
              ? FutureBuilder(
                  future: ffParams.completeFutures(),
                  builder: (context, _) => builder(context, ffParams),
                )
              : builder(context, ffParams);
          final child = appStateNotifier.loading
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
              : PushNotificationsHandler(child: page);

          final transitionInfo = state.transitionInfo;
          return transitionInfo.hasTransition
              ? CustomTransitionPage(
                  key: state.pageKey,
                  child: child,
                  transitionDuration: transitionInfo.duration,
                  transitionsBuilder:
                      (context, animation, secondaryAnimation, child) =>
                          PageTransition(
                    type: transitionInfo.transitionType,
                    duration: transitionInfo.duration,
                    reverseDuration: transitionInfo.duration,
                    alignment: transitionInfo.alignment,
                    child: child,
                  ).buildTransitions(
                    context,
                    animation,
                    secondaryAnimation,
                    child,
                  ),
                )
              : MaterialPage(key: state.pageKey, child: child);
        },
        routes: routes,
      );
}

class TransitionInfo {
  const TransitionInfo({
    required this.hasTransition,
    this.transitionType = PageTransitionType.fade,
    this.duration = const Duration(milliseconds: 300),
    this.alignment,
  });

  final bool hasTransition;
  final PageTransitionType transitionType;
  final Duration duration;
  final Alignment? alignment;

  static TransitionInfo appDefault() => TransitionInfo(hasTransition: false);
}

class RootPageContext {
  const RootPageContext(this.isRootPage, [this.errorRoute]);
  final bool isRootPage;
  final String? errorRoute;

  static bool isInactiveRootPage(BuildContext context) {
    final rootPageContext = context.read<RootPageContext?>();
    final isRootPage = rootPageContext?.isRootPage ?? false;
    final location = GoRouterState.of(context).uri.toString();
    return isRootPage &&
        location != '/' &&
        location != rootPageContext?.errorRoute;
  }

  static Widget wrap(Widget child, {String? errorRoute}) => Provider.value(
        value: RootPageContext(true, errorRoute),
        child: child,
      );
}

extension GoRouterLocationExtension on GoRouter {
  String getCurrentLocation() {
    final RouteMatch lastMatch = routerDelegate.currentConfiguration.last;
    final RouteMatchList matchList = lastMatch is ImperativeRouteMatch
        ? lastMatch.matches
        : routerDelegate.currentConfiguration;
    return matchList.uri.toString();
  }
}
