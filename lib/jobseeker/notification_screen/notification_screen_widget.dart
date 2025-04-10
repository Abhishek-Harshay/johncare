import '/auth/firebase_auth/auth_util.dart';
import '/backend/backend.dart';
import '/components/custom_appbar_widget.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/custom_code/actions/index.dart' as actions;
import '/index.dart';
import 'package:flutter/material.dart';
import 'notification_screen_model.dart';
export 'notification_screen_model.dart';

class NotificationScreenWidget extends StatefulWidget {
  const NotificationScreenWidget({
    super.key,
    this.currentApplied,
  });

  final DocumentReference? currentApplied;

  static String routeName = 'NotificationScreen';
  static String routePath = '/NotificationScreen';

  @override
  State<NotificationScreenWidget> createState() =>
      _NotificationScreenWidgetState();
}

class _NotificationScreenWidgetState extends State<NotificationScreenWidget> {
  late NotificationScreenModel _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => NotificationScreenModel());

    WidgetsBinding.instance.addPostFrameCallback((_) => safeSetState(() {}));
  }

  @override
  void dispose() {
    _model.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: scaffoldKey,
      body: SafeArea(
        top: true,
        child: StreamBuilder<List<NotificationsRecord>>(
          stream: queryNotificationsRecord(
            queryBuilder: (notificationsRecord) => notificationsRecord
                .where(
                  'toUsers',
                  arrayContains: currentUserReference,
                )
                .orderBy('time', descending: true),
          ),
          builder: (context, snapshot) {
            // Customize what your widget looks like when it's loading.
            if (!snapshot.hasData) {
              return Center(
                child: SizedBox(
                  width: 50.0,
                  height: 50.0,
                  child: CircularProgressIndicator(
                    valueColor: AlwaysStoppedAnimation<Color>(
                      FlutterFlowTheme.of(context).primary,
                    ),
                  ),
                ),
              );
            }
            List<NotificationsRecord> containerNotificationsRecordList =
                snapshot.data!;

            return Container(
              decoration: BoxDecoration(),
              child: Column(
                mainAxisSize: MainAxisSize.max,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  wrapWithModel(
                    model: _model.customAppbarModel,
                    updateCallback: () => safeSetState(() {}),
                    child: CustomAppbarWidget(
                      title: 'Notification',
                    ),
                  ),
                  Align(
                    alignment: AlignmentDirectional(1.0, 0.0),
                    child: Padding(
                      padding:
                          EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 25.0, 0.0),
                      child: InkWell(
                        splashColor: Colors.transparent,
                        focusColor: Colors.transparent,
                        hoverColor: Colors.transparent,
                        highlightColor: Colors.transparent,
                        onTap: () async {
                          await actions.clearNotification(
                            containerNotificationsRecordList
                                .map((e) => e.reference)
                                .toList(),
                          );
                        },
                        child: Text(
                          'Clear All',
                          style:
                              FlutterFlowTheme.of(context).bodyMedium.override(
                                    fontFamily: 'DM Sans',
                                    fontSize: 16.0,
                                    letterSpacing: 0.0,
                                    fontWeight: FontWeight.w500,
                                    decoration: TextDecoration.underline,
                                  ),
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Padding(
                      padding:
                          EdgeInsetsDirectional.fromSTEB(20.0, 20.0, 20.0, 0.0),
                      child: Builder(
                        builder: (context) {
                          final containerVar =
                              containerNotificationsRecordList.toList();

                          return SingleChildScrollView(
                            child: Column(
                              mainAxisSize: MainAxisSize.max,
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: List.generate(containerVar.length,
                                  (containerVarIndex) {
                                final containerVarItem =
                                    containerVar[containerVarIndex];
                                return Stack(
                                  alignment: AlignmentDirectional(1.0, -1.0),
                                  children: [
                                    Padding(
                                      padding: EdgeInsetsDirectional.fromSTEB(
                                          0.0, 5.0, 5.0, 0.0),
                                      child: InkWell(
                                        splashColor: Colors.transparent,
                                        focusColor: Colors.transparent,
                                        hoverColor: Colors.transparent,
                                        highlightColor: Colors.transparent,
                                        onTap: () async {
                                          if (valueOrDefault(
                                                  currentUserDocument?.role,
                                                  '') ==
                                              'Worker') {
                                            if (containerVarItem.type ==
                                                'Recommendation') {
                                              if (isWeb) {
                                                context.pushNamed(
                                                    DashboardRecuriterWebWidget
                                                        .routeName);
                                              } else {
                                                context.pushNamed(
                                                  JobseekerDashboardWidget
                                                      .routeName,
                                                  queryParameters: {
                                                    'index': serializeParam(
                                                      0,
                                                      ParamType.int,
                                                    ),
                                                  }.withoutNulls,
                                                );
                                              }
                                            } else if (containerVarItem.type ==
                                                'Completed') {
                                              if (isWeb) {
                                                context.pushNamed(
                                                    DashboardRecuriterWebWidget
                                                        .routeName);
                                              } else {
                                                context.pushNamed(
                                                  JobseekerDashboardWidget
                                                      .routeName,
                                                  queryParameters: {
                                                    'index': serializeParam(
                                                      2,
                                                      ParamType.int,
                                                    ),
                                                  }.withoutNulls,
                                                );
                                              }
                                            } else if ((containerVarItem.type ==
                                                    'Reject') ||
                                                (containerVarItem.type ==
                                                    'Approve')) {
                                              if (isWeb) {
                                                context.pushNamed(
                                                    DashboardRecuriterWebWidget
                                                        .routeName);
                                              } else {
                                                context.pushNamed(
                                                  JobseekerDashboardWidget
                                                      .routeName,
                                                  queryParameters: {
                                                    'index': serializeParam(
                                                      2,
                                                      ParamType.int,
                                                    ),
                                                  }.withoutNulls,
                                                );
                                              }
                                            }
                                          } else {
                                            if (isWeb) {
                                              _model.job =
                                                  await JobDetailsRecord
                                                      .getDocumentOnce(
                                                          containerVarItem
                                                              .job!);

                                              context.pushNamed(
                                                JobDetailsRecuriterWebWidget
                                                    .routeName,
                                                queryParameters: {
                                                  'job': serializeParam(
                                                    _model.job,
                                                    ParamType.Document,
                                                  ),
                                                }.withoutNulls,
                                                extra: <String, dynamic>{
                                                  'job': _model.job,
                                                },
                                              );
                                            } else {
                                              context.pushNamed(
                                                AdminAlljobWidget.routeName,
                                                queryParameters: {
                                                  'jobid': serializeParam(
                                                    containerVarItem.job,
                                                    ParamType.DocumentReference,
                                                  ),
                                                }.withoutNulls,
                                              );
                                            }
                                          }

                                          safeSetState(() {});
                                        },
                                        child: Container(
                                          width: double.infinity,
                                          decoration: BoxDecoration(
                                            color: FlutterFlowTheme.of(context)
                                                .secondaryBackground,
                                            borderRadius:
                                                BorderRadius.circular(15.0),
                                            border: Border.all(
                                              color: Color(0xFFE8E8EC),
                                              width: 1.0,
                                            ),
                                          ),
                                          child: Padding(
                                            padding: EdgeInsets.all(12.0),
                                            child: Row(
                                              mainAxisSize: MainAxisSize.max,
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              children: [
                                                Container(
                                                  width: 42.0,
                                                  height: 42.0,
                                                  clipBehavior: Clip.antiAlias,
                                                  decoration: BoxDecoration(
                                                    shape: BoxShape.circle,
                                                  ),
                                                  child: Image.network(
                                                    containerVarItem.image,
                                                    fit: BoxFit.cover,
                                                  ),
                                                ),
                                                Expanded(
                                                  child: Column(
                                                    mainAxisSize:
                                                        MainAxisSize.max,
                                                    crossAxisAlignment:
                                                        CrossAxisAlignment
                                                            .start,
                                                    children: [
                                                      Row(
                                                        mainAxisSize:
                                                            MainAxisSize.max,
                                                        mainAxisAlignment:
                                                            MainAxisAlignment
                                                                .spaceBetween,
                                                        crossAxisAlignment:
                                                            CrossAxisAlignment
                                                                .start,
                                                        children: [
                                                          Flexible(
                                                            child: Text(
                                                              containerVarItem
                                                                  .subject,
                                                              style: FlutterFlowTheme
                                                                      .of(context)
                                                                  .bodyMedium
                                                                  .override(
                                                                    fontFamily:
                                                                        'DM Sans',
                                                                    fontSize:
                                                                        16.0,
                                                                    letterSpacing:
                                                                        0.0,
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .w600,
                                                                  ),
                                                            ),
                                                          ),
                                                          Flexible(
                                                            child: Text(
                                                              dateTimeFormat(
                                                                "relative",
                                                                containerVarItem
                                                                    .time!,
                                                                locale: FFLocalizations.of(
                                                                        context)
                                                                    .languageCode,
                                                              ),
                                                              style: FlutterFlowTheme
                                                                      .of(context)
                                                                  .bodyMedium
                                                                  .override(
                                                                    fontFamily:
                                                                        'DM Sans',
                                                                    color: Color(
                                                                        0xFF89969F),
                                                                    letterSpacing:
                                                                        0.0,
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .w500,
                                                                  ),
                                                            ),
                                                          ),
                                                        ].divide(SizedBox(
                                                            width: 10.0)),
                                                      ),
                                                      Text(
                                                        containerVarItem
                                                            .message,
                                                        style: FlutterFlowTheme
                                                                .of(context)
                                                            .bodyMedium
                                                            .override(
                                                              fontFamily:
                                                                  'DM Sans',
                                                              color: Color(
                                                                  0xFF89969F),
                                                              fontSize: 14.0,
                                                              letterSpacing:
                                                                  0.0,
                                                              fontWeight:
                                                                  FontWeight
                                                                      .w500,
                                                              lineHeight: 1.2,
                                                            ),
                                                      ),
                                                    ].divide(
                                                        SizedBox(height: 5.0)),
                                                  ),
                                                ),
                                              ].divide(SizedBox(width: 10.0)),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                    InkWell(
                                      splashColor: Colors.transparent,
                                      focusColor: Colors.transparent,
                                      hoverColor: Colors.transparent,
                                      highlightColor: Colors.transparent,
                                      onTap: () async {
                                        await containerVarItem.reference
                                            .delete();
                                      },
                                      child: Icon(
                                        Icons.remove_circle,
                                        color:
                                            FlutterFlowTheme.of(context).error,
                                        size: 24.0,
                                      ),
                                    ),
                                  ],
                                );
                              }).divide(SizedBox(height: 18.0)),
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
