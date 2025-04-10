import '/auth/firebase_auth/auth_util.dart';
import '/backend/backend.dart';
import '/components/job_seeker_mobile_nav_bar/job_seeker_mobile_nav_bar_widget.dart';
import '/components/main_header_widget.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/custom_code/widgets/index.dart' as custom_widgets;
import 'package:flutter/material.dart';
import 'healthcare_providers_availability_and_calendar_model.dart';
export 'healthcare_providers_availability_and_calendar_model.dart';

class HealthcareProvidersAvailabilityAndCalendarWidget extends StatefulWidget {
  const HealthcareProvidersAvailabilityAndCalendarWidget({super.key});

  static String routeName = 'HealthcareProvidersAvailabilityAndCalendar';
  static String routePath = '/healthcareProvidersAvailabilityAndCalendar';

  @override
  State<HealthcareProvidersAvailabilityAndCalendarWidget> createState() =>
      _HealthcareProvidersAvailabilityAndCalendarWidgetState();
}

class _HealthcareProvidersAvailabilityAndCalendarWidgetState
    extends State<HealthcareProvidersAvailabilityAndCalendarWidget> {
  late HealthcareProvidersAvailabilityAndCalendarModel _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(
        context, () => HealthcareProvidersAvailabilityAndCalendarModel());

    WidgetsBinding.instance.addPostFrameCallback((_) => safeSetState(() {}));
  }

  @override
  void dispose() {
    _model.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
        FocusManager.instance.primaryFocus?.unfocus();
      },
      child: Scaffold(
        key: scaffoldKey,
        backgroundColor: FlutterFlowTheme.of(context).primaryBackground,
        body: SafeArea(
          top: true,
          child: Stack(
            children: [
              StreamBuilder<List<JobDetailsRecord>>(
                stream: queryJobDetailsRecord(
                  queryBuilder: (jobDetailsRecord) => jobDetailsRecord.where(
                    'HiredApplicant',
                    isEqualTo: currentUserReference,
                  ),
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
                  List<JobDetailsRecord> containerJobDetailsRecordList =
                      snapshot.data!;

                  return Container(
                    decoration: BoxDecoration(),
                    child: Column(
                      mainAxisSize: MainAxisSize.max,
                      children: [
                        wrapWithModel(
                          model: _model.mainHeaderModel,
                          updateCallback: () => safeSetState(() {}),
                          child: MainHeaderWidget(),
                        ),
                        Expanded(
                          child: SingleChildScrollView(
                            child: Column(
                              mainAxisSize: MainAxisSize.max,
                              children: [
                                Container(
                                  width: double.infinity,
                                  height: 400.0,
                                  child: custom_widgets.CustomCalendarCopy(
                                    width: double.infinity,
                                    height: 400.0,
                                    startDate: containerJobDetailsRecordList
                                        .map((e) => e.startDate)
                                        .withoutNulls
                                        .toList(),
                                    endDate: containerJobDetailsRecordList
                                        .map((e) => e.endDate)
                                        .withoutNulls
                                        .toList(),
                                    jobName: containerJobDetailsRecordList
                                        .map((e) => e.jobName)
                                        .toList(),
                                  ),
                                ),
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      20.0, 25.0, 20.0, 0.0),
                                  child: Builder(
                                    builder: (context) {
                                      final data = containerJobDetailsRecordList
                                          .toList();

                                      return Column(
                                        mainAxisSize: MainAxisSize.min,
                                        children: List.generate(data.length,
                                                (dataIndex) {
                                          final dataItem = data[dataIndex];
                                          return Card(
                                            clipBehavior:
                                                Clip.antiAliasWithSaveLayer,
                                            color: FlutterFlowTheme.of(context)
                                                .secondaryBackground,
                                            elevation: 3.0,
                                            shape: RoundedRectangleBorder(
                                              borderRadius:
                                                  BorderRadius.circular(8.0),
                                            ),
                                            child: Padding(
                                              padding: EdgeInsets.all(10.0),
                                              child: Column(
                                                mainAxisSize: MainAxisSize.max,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.start,
                                                children: [
                                                  Text(
                                                    dataItem.jobName,
                                                    style: FlutterFlowTheme.of(
                                                            context)
                                                        .bodyMedium
                                                        .override(
                                                          fontFamily: 'DM Sans',
                                                          color: FlutterFlowTheme
                                                                  .of(context)
                                                              .primary,
                                                          fontSize: 18.0,
                                                          letterSpacing: 0.0,
                                                          fontWeight:
                                                              FontWeight.bold,
                                                        ),
                                                  ),
                                                  Row(
                                                    mainAxisSize:
                                                        MainAxisSize.max,
                                                    children: [
                                                      Text(
                                                        'Start Date : ',
                                                        style:
                                                            FlutterFlowTheme.of(
                                                                    context)
                                                                .bodyMedium
                                                                .override(
                                                                  fontFamily:
                                                                      'DM Sans',
                                                                  letterSpacing:
                                                                      0.0,
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .w500,
                                                                ),
                                                      ),
                                                      Text(
                                                        dateTimeFormat(
                                                          "yMMMd",
                                                          dataItem.startDate!,
                                                          locale:
                                                              FFLocalizations.of(
                                                                      context)
                                                                  .languageCode,
                                                        ),
                                                        style:
                                                            FlutterFlowTheme.of(
                                                                    context)
                                                                .bodyMedium
                                                                .override(
                                                                  fontFamily:
                                                                      'DM Sans',
                                                                  color: FlutterFlowTheme.of(
                                                                          context)
                                                                      .primary,
                                                                  letterSpacing:
                                                                      0.0,
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .w500,
                                                                ),
                                                      ),
                                                    ],
                                                  ),
                                                  Row(
                                                    mainAxisSize:
                                                        MainAxisSize.max,
                                                    children: [
                                                      Text(
                                                        'End Date : ',
                                                        style:
                                                            FlutterFlowTheme.of(
                                                                    context)
                                                                .bodyMedium
                                                                .override(
                                                                  fontFamily:
                                                                      'DM Sans',
                                                                  letterSpacing:
                                                                      0.0,
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .w500,
                                                                ),
                                                      ),
                                                      Text(
                                                        dateTimeFormat(
                                                          "yMMMd",
                                                          dataItem.endDate!,
                                                          locale:
                                                              FFLocalizations.of(
                                                                      context)
                                                                  .languageCode,
                                                        ),
                                                        style:
                                                            FlutterFlowTheme.of(
                                                                    context)
                                                                .bodyMedium
                                                                .override(
                                                                  fontFamily:
                                                                      'DM Sans',
                                                                  color: FlutterFlowTheme.of(
                                                                          context)
                                                                      .primary,
                                                                  letterSpacing:
                                                                      0.0,
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .w500,
                                                                ),
                                                      ),
                                                    ],
                                                  ),
                                                ].divide(SizedBox(height: 5.0)),
                                              ),
                                            ),
                                          );
                                        })
                                            .divide(SizedBox(height: 10.0))
                                            .addToEnd(SizedBox(height: 150.0)),
                                      );
                                    },
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
              Align(
                alignment: AlignmentDirectional(0.0, 1.0),
                child: wrapWithModel(
                  model: _model.jobSeekerMobileNavBarModel,
                  updateCallback: () => safeSetState(() {}),
                  child: JobSeekerMobileNavBarWidget(
                    index: 1,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
