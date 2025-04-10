import '/auth/firebase_auth/auth_util.dart';
import '/backend/backend.dart';
import '/backend/push_notifications/push_notifications_util.dart';
import '/components/custom_map_widget.dart';
import '/components/empty_widget.dart';
import '/components/job_seeker_mobile_nav_bar/job_seeker_mobile_nav_bar_widget.dart';
import '/components/main_header_widget.dart';
import '/components/side_nav_bar_healthcare/side_nav_bar_healthcare_widget.dart';
import '/flutter_flow/flutter_flow_button_tabbar.dart';
import '/flutter_flow/flutter_flow_drop_down.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/flutter_flow/form_field_controller.dart';
import '/flutter_flow/custom_functions.dart' as functions;
import '/index.dart';
import 'package:collection/collection.dart';
import 'package:easy_debounce/easy_debounce.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import 'jobseeker_dashboard_model.dart';
export 'jobseeker_dashboard_model.dart';

class JobseekerDashboardWidget extends StatefulWidget {
  const JobseekerDashboardWidget({
    super.key,
    this.currentApplied,
    int? index,
  }) : this.index = index ?? 0;

  final DocumentReference? currentApplied;
  final int index;

  static String routeName = 'JobseekerDashboard';
  static String routePath = '/JobseekerDashboard';

  @override
  State<JobseekerDashboardWidget> createState() =>
      _JobseekerDashboardWidgetState();
}

class _JobseekerDashboardWidgetState extends State<JobseekerDashboardWidget>
    with TickerProviderStateMixin {
  late JobseekerDashboardModel _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => JobseekerDashboardModel());

    _model.switchValue = false;
    _model.tabBarController = TabController(
      vsync: this,
      length: 4,
      initialIndex: min(
          valueOrDefault<int>(
            widget.index,
            0,
          ),
          3),
    )..addListener(() => safeSetState(() {}));
    _model.textController ??= TextEditingController();
    _model.textFieldFocusNode ??= FocusNode();

    WidgetsBinding.instance.addPostFrameCallback((_) => safeSetState(() {}));
  }

  @override
  void dispose() {
    _model.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    context.watch<FFAppState>();

    return StreamBuilder<List<ProviderDetailRecord>>(
      stream: queryProviderDetailRecord(
        queryBuilder: (providerDetailRecord) => providerDetailRecord.where(
          'user',
          isEqualTo: currentUserReference,
        ),
        singleRecord: true,
      ),
      builder: (context, snapshot) {
        // Customize what your widget looks like when it's loading.
        if (!snapshot.hasData) {
          return Scaffold(
            body: Center(
              child: SizedBox(
                width: 50.0,
                height: 50.0,
                child: CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(
                    FlutterFlowTheme.of(context).primary,
                  ),
                ),
              ),
            ),
          );
        }
        List<ProviderDetailRecord> jobseekerDashboardProviderDetailRecordList =
            snapshot.data!;
        // Return an empty Container when the item does not exist.
        if (snapshot.data!.isEmpty) {
          return Container();
        }
        final jobseekerDashboardProviderDetailRecord =
            jobseekerDashboardProviderDetailRecordList.isNotEmpty
                ? jobseekerDashboardProviderDetailRecordList.first
                : null;

        return Scaffold(
          key: scaffoldKey,
          body: SafeArea(
            top: true,
            child: Stack(
              alignment: AlignmentDirectional(0.0, 1.0),
              children: [
                Row(
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    if (responsiveVisibility(
                      context: context,
                      phone: false,
                      tablet: false,
                      tabletLandscape: false,
                    ))
                      Column(
                        mainAxisSize: MainAxisSize.max,
                        children: [
                          Expanded(
                            child: wrapWithModel(
                              model: _model.sideNavBarHealthcareModel,
                              updateCallback: () => safeSetState(() {}),
                              child: SideNavBarHealthcareWidget(),
                            ),
                          ),
                        ],
                      ),
                    Expanded(
                      child: Column(
                        mainAxisSize: MainAxisSize.max,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          wrapWithModel(
                            model: _model.mainHeaderModel,
                            updateCallback: () => safeSetState(() {}),
                            child: MainHeaderWidget(),
                          ),
                          if (responsiveVisibility(
                            context: context,
                            phone: false,
                            tablet: false,
                          ))
                            Padding(
                              padding: EdgeInsetsDirectional.fromSTEB(
                                  30.0, 20.0, 30.0, 20.0),
                              child: Row(
                                mainAxisSize: MainAxisSize.max,
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    'Job Board',
                                    style: FlutterFlowTheme.of(context)
                                        .headlineLarge
                                        .override(
                                          fontFamily: 'DM Sans',
                                          fontSize: 26.0,
                                          letterSpacing: 0.0,
                                        ),
                                  ),
                                  Row(
                                    mainAxisSize: MainAxisSize.max,
                                    children: [
                                      Text(
                                        'Available Now For Urgent Jobs',
                                        style: FlutterFlowTheme.of(context)
                                            .bodyMedium
                                            .override(
                                              fontFamily: 'DM Sans',
                                              fontSize: 18.0,
                                              letterSpacing: 0.0,
                                              fontWeight: FontWeight.w500,
                                            ),
                                      ),
                                      Padding(
                                        padding: EdgeInsetsDirectional.fromSTEB(
                                            20.0, 0.0, 0.0, 0.0),
                                        child: Switch.adaptive(
                                          value: _model.switchValue!,
                                          onChanged: (newValue) async {
                                            safeSetState(() =>
                                                _model.switchValue = newValue);
                                          },
                                          activeColor:
                                              FlutterFlowTheme.of(context)
                                                  .primary,
                                          activeTrackColor:
                                              FlutterFlowTheme.of(context)
                                                  .primary,
                                          inactiveTrackColor:
                                              FlutterFlowTheme.of(context)
                                                  .secondaryBackground,
                                          inactiveThumbColor:
                                              FlutterFlowTheme.of(context)
                                                  .secondary,
                                        ),
                                      ),
                                      Padding(
                                        padding: EdgeInsetsDirectional.fromSTEB(
                                            16.0, 12.0, 0.0, 12.0),
                                        child: FFButtonWidget(
                                          onPressed: () {
                                            print('Button pressed ...');
                                          },
                                          text: 'Plan expire: 23/04/2025',
                                          options: FFButtonOptions(
                                            height: 40.0,
                                            padding:
                                                EdgeInsetsDirectional.fromSTEB(
                                                    16.0, 0.0, 16.0, 0.0),
                                            iconPadding:
                                                EdgeInsetsDirectional.fromSTEB(
                                                    0.0, 0.0, 0.0, 0.0),
                                            color: FlutterFlowTheme.of(context)
                                                .secondaryBackground,
                                            textStyle: FlutterFlowTheme.of(
                                                    context)
                                                .titleSmall
                                                .override(
                                                  fontFamily: 'DM Sans',
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .primaryText,
                                                  letterSpacing: 0.0,
                                                  fontWeight: FontWeight.w500,
                                                ),
                                            elevation: 0.0,
                                            borderRadius:
                                                BorderRadius.circular(30.0),
                                          ),
                                        ),
                                      ),
                                      Padding(
                                        padding: EdgeInsetsDirectional.fromSTEB(
                                            16.0, 0.0, 16.0, 0.0),
                                        child: FlutterFlowIconButton(
                                          borderRadius: 20.0,
                                          buttonSize: 40.0,
                                          fillColor:
                                              FlutterFlowTheme.of(context)
                                                  .secondary,
                                          icon: FaIcon(
                                            FontAwesomeIcons.bell,
                                            color: FlutterFlowTheme.of(context)
                                                .secondaryBackground,
                                            size: 20.0,
                                          ),
                                          onPressed: () {
                                            print('IconButton pressed ...');
                                          },
                                        ),
                                      ),
                                      Stack(
                                        alignment:
                                            AlignmentDirectional(-0.8, 0.0),
                                        children: [
                                          FlutterFlowDropDown<String>(
                                            controller: _model
                                                    .dropDownValueController ??=
                                                FormFieldController<String>(
                                                    null),
                                            options: [
                                              'Option 1',
                                              'Option 2',
                                              'Option 3'
                                            ],
                                            onChanged: (val) => safeSetState(
                                                () =>
                                                    _model.dropDownValue = val),
                                            width: 90.0,
                                            height: 48.0,
                                            textStyle:
                                                FlutterFlowTheme.of(context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'DM Sans',
                                                      letterSpacing: 0.0,
                                                    ),
                                            icon: Icon(
                                              Icons.keyboard_arrow_down_rounded,
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryText,
                                              size: 24.0,
                                            ),
                                            fillColor:
                                                FlutterFlowTheme.of(context)
                                                    .secondaryBackground,
                                            elevation: 2.0,
                                            borderColor: Colors.transparent,
                                            borderWidth: 0.0,
                                            borderRadius: 30.0,
                                            margin:
                                                EdgeInsetsDirectional.fromSTEB(
                                                    12.0, 0.0, 12.0, 0.0),
                                            hidesUnderline: true,
                                            isOverButton: false,
                                            isSearchable: false,
                                            isMultiSelect: false,
                                          ),
                                          ClipRRect(
                                            borderRadius:
                                                BorderRadius.circular(20.0),
                                            child: Image.network(
                                              'https://picsum.photos/seed/829/600',
                                              width: 40.0,
                                              height: 40.0,
                                              fit: BoxFit.cover,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          Expanded(
                            child: Column(
                              mainAxisSize: MainAxisSize.max,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      20.0, 0.0, 20.0, 0.0),
                                  child: Container(
                                    width: 1522.0,
                                    height: 1000.0,
                                    decoration: BoxDecoration(
                                      color: Color(0x00FFFFFF),
                                    ),
                                    child: Column(
                                      children: [
                                        Align(
                                          alignment: Alignment(-1.0, 0),
                                          child: FlutterFlowButtonTabBar(
                                            useToggleButtonStyle: true,
                                            isScrollable: true,
                                            labelStyle: FlutterFlowTheme.of(
                                                    context)
                                                .titleLarge
                                                .override(
                                                  fontFamily: 'DM Sans',
                                                  fontSize: () {
                                                    if (MediaQuery.sizeOf(
                                                                context)
                                                            .width <
                                                        kBreakpointSmall) {
                                                      return 14.0;
                                                    } else if (MediaQuery
                                                                .sizeOf(context)
                                                            .width <
                                                        kBreakpointMedium) {
                                                      return 14.0;
                                                    } else if (MediaQuery
                                                                .sizeOf(context)
                                                            .width <
                                                        kBreakpointLarge) {
                                                      return 18.0;
                                                    } else {
                                                      return 18.0;
                                                    }
                                                  }(),
                                                  letterSpacing: 0.0,
                                                  fontWeight: FontWeight.w600,
                                                ),
                                            unselectedLabelStyle:
                                                FlutterFlowTheme.of(context)
                                                    .titleMedium
                                                    .override(
                                                      fontFamily: 'DM Sans',
                                                      fontSize: () {
                                                        if (MediaQuery.sizeOf(
                                                                    context)
                                                                .width <
                                                            kBreakpointSmall) {
                                                          return 14.0;
                                                        } else if (MediaQuery
                                                                    .sizeOf(
                                                                        context)
                                                                .width <
                                                            kBreakpointMedium) {
                                                          return 14.0;
                                                        } else if (MediaQuery
                                                                    .sizeOf(
                                                                        context)
                                                                .width <
                                                            kBreakpointLarge) {
                                                          return 18.0;
                                                        } else {
                                                          return 18.0;
                                                        }
                                                      }(),
                                                      letterSpacing: 0.0,
                                                    ),
                                            labelColor:
                                                FlutterFlowTheme.of(context)
                                                    .secondaryBackground,
                                            unselectedLabelColor:
                                                Color(0xFF292D32),
                                            backgroundColor:
                                                FlutterFlowTheme.of(context)
                                                    .secondary,
                                            unselectedBackgroundColor:
                                                FlutterFlowTheme.of(context)
                                                    .secondaryBackground,
                                            borderColor: Color(0xFFC0D1DC),
                                            borderWidth: 1.0,
                                            borderRadius: 50.0,
                                            elevation: 0.0,
                                            labelPadding:
                                                EdgeInsetsDirectional.fromSTEB(
                                                    valueOrDefault<double>(
                                                      () {
                                                        if (MediaQuery.sizeOf(
                                                                    context)
                                                                .width <
                                                            kBreakpointSmall) {
                                                          return 15.0;
                                                        } else if (MediaQuery
                                                                    .sizeOf(
                                                                        context)
                                                                .width <
                                                            kBreakpointMedium) {
                                                          return 15.0;
                                                        } else if (MediaQuery
                                                                    .sizeOf(
                                                                        context)
                                                                .width <
                                                            kBreakpointLarge) {
                                                          return 25.0;
                                                        } else {
                                                          return 25.0;
                                                        }
                                                      }(),
                                                      0.0,
                                                    ),
                                                    valueOrDefault<double>(
                                                      () {
                                                        if (MediaQuery.sizeOf(
                                                                    context)
                                                                .width <
                                                            kBreakpointSmall) {
                                                          return 0.0;
                                                        } else if (MediaQuery
                                                                    .sizeOf(
                                                                        context)
                                                                .width <
                                                            kBreakpointMedium) {
                                                          return 0.0;
                                                        } else if (MediaQuery
                                                                    .sizeOf(
                                                                        context)
                                                                .width <
                                                            kBreakpointLarge) {
                                                          return 2.0;
                                                        } else {
                                                          return 2.0;
                                                        }
                                                      }(),
                                                      0.0,
                                                    ),
                                                    valueOrDefault<double>(
                                                      () {
                                                        if (MediaQuery.sizeOf(
                                                                    context)
                                                                .width <
                                                            kBreakpointSmall) {
                                                          return 15.0;
                                                        } else if (MediaQuery
                                                                    .sizeOf(
                                                                        context)
                                                                .width <
                                                            kBreakpointMedium) {
                                                          return 15.0;
                                                        } else if (MediaQuery
                                                                    .sizeOf(
                                                                        context)
                                                                .width <
                                                            kBreakpointLarge) {
                                                          return 25.0;
                                                        } else {
                                                          return 25.0;
                                                        }
                                                      }(),
                                                      0.0,
                                                    ),
                                                    valueOrDefault<double>(
                                                      () {
                                                        if (MediaQuery.sizeOf(
                                                                    context)
                                                                .width <
                                                            kBreakpointSmall) {
                                                          return 0.0;
                                                        } else if (MediaQuery
                                                                    .sizeOf(
                                                                        context)
                                                                .width <
                                                            kBreakpointMedium) {
                                                          return 0.0;
                                                        } else if (MediaQuery
                                                                    .sizeOf(
                                                                        context)
                                                                .width <
                                                            kBreakpointLarge) {
                                                          return 2.0;
                                                        } else {
                                                          return 2.0;
                                                        }
                                                      }(),
                                                      0.0,
                                                    )),
                                            buttonMargin:
                                                EdgeInsetsDirectional.fromSTEB(
                                                    8.0, 0.0, 8.0, 0.0),
                                            tabs: [
                                              Tab(
                                                text: 'Recommendation',
                                              ),
                                              Tab(
                                                text: 'Job search',
                                              ),
                                              Tab(
                                                text: 'My jobs',
                                              ),
                                              Tab(
                                                text: 'Completed',
                                              ),
                                            ],
                                            controller: _model.tabBarController,
                                            onTap: (i) async {
                                              [
                                                () async {},
                                                () async {},
                                                () async {},
                                                () async {}
                                              ][i]();
                                            },
                                          ),
                                        ),
                                        Expanded(
                                          child: TabBarView(
                                            controller: _model.tabBarController,
                                            children: [
                                              Padding(
                                                padding: EdgeInsetsDirectional
                                                    .fromSTEB(
                                                        0.0, 28.0, 0.0, 0.0),
                                                child: SingleChildScrollView(
                                                  primary: false,
                                                  child: Column(
                                                    mainAxisSize:
                                                        MainAxisSize.max,
                                                    crossAxisAlignment:
                                                        CrossAxisAlignment
                                                            .start,
                                                    children: [
                                                      Padding(
                                                        padding:
                                                            EdgeInsetsDirectional
                                                                .fromSTEB(
                                                                    0.0,
                                                                    0.0,
                                                                    0.0,
                                                                    15.0),
                                                        child: Row(
                                                          mainAxisSize:
                                                              MainAxisSize.max,
                                                          mainAxisAlignment:
                                                              MainAxisAlignment
                                                                  .spaceBetween,
                                                          crossAxisAlignment:
                                                              CrossAxisAlignment
                                                                  .center,
                                                          children: [
                                                            Text(
                                                              'Recommendations',
                                                              style: FlutterFlowTheme
                                                                      .of(context)
                                                                  .headlineLarge
                                                                  .override(
                                                                    fontFamily:
                                                                        'DM Sans',
                                                                    fontSize:
                                                                        () {
                                                                      if (MediaQuery.sizeOf(context)
                                                                              .width <
                                                                          kBreakpointSmall) {
                                                                        return 20.0;
                                                                      } else if (MediaQuery.sizeOf(context)
                                                                              .width <
                                                                          kBreakpointMedium) {
                                                                        return 20.0;
                                                                      } else if (MediaQuery.sizeOf(context)
                                                                              .width <
                                                                          kBreakpointLarge) {
                                                                        return 24.0;
                                                                      } else {
                                                                        return 24.0;
                                                                      }
                                                                    }(),
                                                                    letterSpacing:
                                                                        0.0,
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .bold,
                                                                  ),
                                                            ),
                                                            Stack(
                                                              alignment:
                                                                  AlignmentDirectional(
                                                                      1.0,
                                                                      -1.0),
                                                              children: [
                                                                Padding(
                                                                  padding: EdgeInsetsDirectional
                                                                      .fromSTEB(
                                                                          0.0,
                                                                          5.0,
                                                                          5.0,
                                                                          0.0),
                                                                  child:
                                                                      FFButtonWidget(
                                                                    onPressed:
                                                                        () async {
                                                                      context.pushNamed(
                                                                          FilterMobilePageWidget
                                                                              .routeName);
                                                                    },
                                                                    text:
                                                                        'Filters',
                                                                    icon: Icon(
                                                                      Icons
                                                                          .filter_list,
                                                                      size:
                                                                          28.0,
                                                                    ),
                                                                    options:
                                                                        FFButtonOptions(
                                                                      height:
                                                                          40.0,
                                                                      padding: EdgeInsetsDirectional.fromSTEB(
                                                                          12.0,
                                                                          8.0,
                                                                          12.0,
                                                                          8.0),
                                                                      iconPadding: EdgeInsetsDirectional.fromSTEB(
                                                                          0.0,
                                                                          0.0,
                                                                          0.0,
                                                                          0.0),
                                                                      color: FlutterFlowTheme.of(
                                                                              context)
                                                                          .secondaryBackground,
                                                                      textStyle: FlutterFlowTheme.of(
                                                                              context)
                                                                          .titleSmall
                                                                          .override(
                                                                            fontFamily:
                                                                                'DM Sans',
                                                                            color:
                                                                                Color(0xFF292D32),
                                                                            fontSize:
                                                                                () {
                                                                              if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                return 14.0;
                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                return 14.0;
                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                return 18.0;
                                                                              } else {
                                                                                return 18.0;
                                                                              }
                                                                            }(),
                                                                            letterSpacing:
                                                                                0.0,
                                                                            fontWeight:
                                                                                FontWeight.w500,
                                                                          ),
                                                                      elevation:
                                                                          0.0,
                                                                      borderSide:
                                                                          BorderSide(
                                                                        color: Color(
                                                                            0xFFC0D1DC),
                                                                        width:
                                                                            1.0,
                                                                      ),
                                                                      borderRadius:
                                                                          BorderRadius.circular(
                                                                              8.0),
                                                                    ),
                                                                  ),
                                                                ),
                                                                if ((FFAppState()
                                                                            .FilterStartDate !=
                                                                        null) &&
                                                                    (FFAppState()
                                                                            .FilterEndDate !=
                                                                        null))
                                                                  Container(
                                                                    width: 15.0,
                                                                    height:
                                                                        15.0,
                                                                    decoration:
                                                                        BoxDecoration(
                                                                      color: FlutterFlowTheme.of(
                                                                              context)
                                                                          .primary,
                                                                      shape: BoxShape
                                                                          .circle,
                                                                    ),
                                                                  ),
                                                              ],
                                                            ),
                                                          ],
                                                        ),
                                                      ),
                                                      StreamBuilder<
                                                          List<
                                                              JobDetailsRecord>>(
                                                        stream:
                                                            queryJobDetailsRecord(
                                                          queryBuilder:
                                                              (jobDetailsRecord) =>
                                                                  jobDetailsRecord
                                                                      .where(
                                                                        'JobStatus',
                                                                        isEqualTo:
                                                                            'Active',
                                                                      )
                                                                      .where(
                                                                        'SpecialtyArea',
                                                                        isEqualTo: jobseekerDashboardProviderDetailRecord
                                                                            ?.personalinformation
                                                                            .specialtyArea,
                                                                      ),
                                                        ),
                                                        builder: (context,
                                                            snapshot) {
                                                          // Customize what your widget looks like when it's loading.
                                                          if (!snapshot
                                                              .hasData) {
                                                            return Center(
                                                              child: SizedBox(
                                                                width: 50.0,
                                                                height: 50.0,
                                                                child:
                                                                    CircularProgressIndicator(
                                                                  valueColor:
                                                                      AlwaysStoppedAnimation<
                                                                          Color>(
                                                                    FlutterFlowTheme.of(
                                                                            context)
                                                                        .primary,
                                                                  ),
                                                                ),
                                                              ),
                                                            );
                                                          }
                                                          List<JobDetailsRecord>
                                                              containerJobDetailsRecordList =
                                                              snapshot.data!;

                                                          return Container(
                                                            decoration:
                                                                BoxDecoration(),
                                                            child: Builder(
                                                              builder:
                                                                  (context) {
                                                                final containerVar = (FFAppState().sortFilter ==
                                                                            'otn'
                                                                        ? containerJobDetailsRecordList.where((e) => !e.providerApplied.contains(jobseekerDashboardProviderDetailRecord?.reference) && (FFAppState().urgentJob == true ? (e.isUrgentJob == true) : true) && ((FFAppState().FilterStartDate != null) && (FFAppState().FilterEndDate != null) ? functions.isDateBetween(e.startDate!, FFAppState().FilterStartDate!, FFAppState().FilterEndDate!) : true)).toList().sortedList(
                                                                            keyOf: (e) => e
                                                                                .createdAt!,
                                                                            desc:
                                                                                false)
                                                                        : containerJobDetailsRecordList
                                                                            .where((e) =>
                                                                                !e.providerApplied.contains(jobseekerDashboardProviderDetailRecord?.reference) &&
                                                                                (FFAppState().urgentJob == true ? (e.isUrgentJob == true) : true) &&
                                                                                ((FFAppState().FilterStartDate != null) && (FFAppState().FilterEndDate != null) ? functions.isDateBetween(e.startDate!, FFAppState().FilterStartDate!, FFAppState().FilterEndDate!) : true))
                                                                            .toList()
                                                                            .sortedList(keyOf: (e) => e.createdAt!, desc: true))
                                                                    .toList();
                                                                if (containerVar
                                                                    .isEmpty) {
                                                                  return EmptyWidget(
                                                                    message:
                                                                        'No Recommendation Job',
                                                                  );
                                                                }

                                                                return ListView
                                                                    .separated(
                                                                  padding:
                                                                      EdgeInsets
                                                                          .fromLTRB(
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    150.0,
                                                                  ),
                                                                  primary:
                                                                      false,
                                                                  shrinkWrap:
                                                                      true,
                                                                  scrollDirection:
                                                                      Axis.vertical,
                                                                  itemCount:
                                                                      containerVar
                                                                          .length,
                                                                  separatorBuilder: (_,
                                                                          __) =>
                                                                      SizedBox(
                                                                          height:
                                                                              25.0),
                                                                  itemBuilder:
                                                                      (context,
                                                                          containerVarIndex) {
                                                                    final containerVarItem =
                                                                        containerVar[
                                                                            containerVarIndex];
                                                                    return Container(
                                                                      width:
                                                                          () {
                                                                        if (MediaQuery.sizeOf(context).width <
                                                                            kBreakpointSmall) {
                                                                          return 335.0;
                                                                        } else if (MediaQuery.sizeOf(context).width <
                                                                            kBreakpointMedium) {
                                                                          return 335.0;
                                                                        } else if (MediaQuery.sizeOf(context).width <
                                                                            kBreakpointLarge) {
                                                                          return 1522.0;
                                                                        } else {
                                                                          return 1522.0;
                                                                        }
                                                                      }(),
                                                                      decoration:
                                                                          BoxDecoration(
                                                                        color: FlutterFlowTheme.of(context)
                                                                            .secondaryBackground,
                                                                        borderRadius:
                                                                            BorderRadius.circular(20.0),
                                                                        border:
                                                                            Border.all(
                                                                          color:
                                                                              Color(0xFFE8E8EC),
                                                                          width:
                                                                              1.0,
                                                                        ),
                                                                      ),
                                                                      child:
                                                                          Padding(
                                                                        padding:
                                                                            EdgeInsets.all(15.0),
                                                                        child:
                                                                            SingleChildScrollView(
                                                                          child:
                                                                              Column(
                                                                            mainAxisSize:
                                                                                MainAxisSize.max,
                                                                            mainAxisAlignment:
                                                                                MainAxisAlignment.spaceAround,
                                                                            crossAxisAlignment:
                                                                                CrossAxisAlignment.start,
                                                                            children: [
                                                                              Padding(
                                                                                padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 20.0),
                                                                                child: Row(
                                                                                  mainAxisSize: MainAxisSize.max,
                                                                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                  children: [
                                                                                    Text(
                                                                                      containerVarItem.subRole,
                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                            fontFamily: 'DM Sans',
                                                                                            letterSpacing: 0.0,
                                                                                            fontWeight: FontWeight.w500,
                                                                                          ),
                                                                                    ),
                                                                                    Align(
                                                                                      alignment: AlignmentDirectional(1.0, 0.0),
                                                                                      child: Text(
                                                                                        dateTimeFormat(
                                                                                          "relative",
                                                                                          containerVarItem.createdAt!,
                                                                                          locale: FFLocalizations.of(context).languageCode,
                                                                                        ),
                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                              fontFamily: 'DM Sans',
                                                                                              color: FlutterFlowTheme.of(context).primary,
                                                                                              fontSize: 16.0,
                                                                                              letterSpacing: 0.0,
                                                                                              fontWeight: FontWeight.w500,
                                                                                            ),
                                                                                      ),
                                                                                    ),
                                                                                  ],
                                                                                ),
                                                                              ),
                                                                              Padding(
                                                                                padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 10.0),
                                                                                child: Column(
                                                                                  mainAxisSize: MainAxisSize.max,
                                                                                  crossAxisAlignment: CrossAxisAlignment.start,
                                                                                  children: [
                                                                                    Row(
                                                                                      mainAxisSize: MainAxisSize.max,
                                                                                      crossAxisAlignment: CrossAxisAlignment.start,
                                                                                      children: [
                                                                                        StreamBuilder<UsersRecord>(
                                                                                          stream: UsersRecord.getDocument(containerVarItem.createdBy!),
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

                                                                                            final circleImageUsersRecord = snapshot.data!;

                                                                                            return Container(
                                                                                              width: 60.0,
                                                                                              height: 60.0,
                                                                                              clipBehavior: Clip.antiAlias,
                                                                                              decoration: BoxDecoration(
                                                                                                shape: BoxShape.circle,
                                                                                              ),
                                                                                              child: Image.network(
                                                                                                valueOrDefault<String>(
                                                                                                  circleImageUsersRecord.photoUrl,
                                                                                                  'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg',
                                                                                                ),
                                                                                                fit: BoxFit.cover,
                                                                                              ),
                                                                                            );
                                                                                          },
                                                                                        ),
                                                                                        Flexible(
                                                                                          child: Padding(
                                                                                            padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 7.0, 10.0),
                                                                                            child: Column(
                                                                                              mainAxisSize: MainAxisSize.max,
                                                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                                                              children: [
                                                                                                Text(
                                                                                                  valueOrDefault<String>(
                                                                                                    containerVarItem.jobName,
                                                                                                    'Job Name',
                                                                                                  ),
                                                                                                  textAlign: TextAlign.start,
                                                                                                  style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                        fontFamily: 'DM Sans',
                                                                                                        fontSize: () {
                                                                                                          if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                            return 18.0;
                                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                            return 18.0;
                                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                            return 20.0;
                                                                                                          } else {
                                                                                                            return 20.0;
                                                                                                          }
                                                                                                        }(),
                                                                                                        letterSpacing: 0.0,
                                                                                                        fontWeight: FontWeight.bold,
                                                                                                      ),
                                                                                                ),
                                                                                                Padding(
                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                  child: RichText(
                                                                                                    textScaler: MediaQuery.of(context).textScaler,
                                                                                                    text: TextSpan(
                                                                                                      children: [
                                                                                                        TextSpan(
                                                                                                          text: 'Job Id : ',
                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                fontFamily: 'DM Sans',
                                                                                                                color: Color(0xFF89969F),
                                                                                                                fontSize: () {
                                                                                                                  if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                    return 20.0;
                                                                                                                  } else {
                                                                                                                    return 20.0;
                                                                                                                  }
                                                                                                                }(),
                                                                                                                letterSpacing: 0.0,
                                                                                                              ),
                                                                                                        ),
                                                                                                        TextSpan(
                                                                                                          text: valueOrDefault<String>(
                                                                                                            containerVarItem.jobId,
                                                                                                            '00000',
                                                                                                          ),
                                                                                                          style: TextStyle(),
                                                                                                        )
                                                                                                      ],
                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                            fontFamily: 'DM Sans',
                                                                                                            color: Color(0xFF89969F),
                                                                                                            fontSize: () {
                                                                                                              if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                return 16.0;
                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                return 16.0;
                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                return 20.0;
                                                                                                              } else {
                                                                                                                return 20.0;
                                                                                                              }
                                                                                                            }(),
                                                                                                            letterSpacing: 0.0,
                                                                                                          ),
                                                                                                    ),
                                                                                                    textAlign: TextAlign.start,
                                                                                                  ),
                                                                                                ),
                                                                                                Align(
                                                                                                  alignment: AlignmentDirectional(-1.0, 0.0),
                                                                                                  child: Padding(
                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(0.0, 5.0, 0.0, 0.0),
                                                                                                    child: Text(
                                                                                                      'From ${valueOrDefault<String>(
                                                                                                        containerVarItem.fromBusiness,
                                                                                                        'Feom Buisness',
                                                                                                      )}',
                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                            fontFamily: 'DM Sans',
                                                                                                            fontSize: () {
                                                                                                              if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                return 16.0;
                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                return 16.0;
                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                return 18.0;
                                                                                                              } else {
                                                                                                                return 18.0;
                                                                                                              }
                                                                                                            }(),
                                                                                                            letterSpacing: 0.0,
                                                                                                            fontWeight: FontWeight.w600,
                                                                                                          ),
                                                                                                    ),
                                                                                                  ),
                                                                                                ),
                                                                                              ],
                                                                                            ),
                                                                                          ),
                                                                                        ),
                                                                                      ].divide(SizedBox(width: 25.0)),
                                                                                    ),
                                                                                    Flex(
                                                                                      direction: () {
                                                                                        if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                          return false;
                                                                                        } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                          return false;
                                                                                        } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                          return true;
                                                                                        } else {
                                                                                          return true;
                                                                                        }
                                                                                      }()
                                                                                          ? Axis.horizontal
                                                                                          : Axis.vertical,
                                                                                      mainAxisSize: MainAxisSize.max,
                                                                                      crossAxisAlignment: CrossAxisAlignment.center,
                                                                                      children: [
                                                                                        Visibility(
                                                                                          visible: responsiveVisibility(
                                                                                            context: context,
                                                                                            phone: false,
                                                                                            tablet: false,
                                                                                          ),
                                                                                          child: SizedBox(
                                                                                            height: 20.0,
                                                                                            child: VerticalDivider(
                                                                                              thickness: 2.0,
                                                                                              color: FlutterFlowTheme.of(context).alternate,
                                                                                            ),
                                                                                          ),
                                                                                        ),
                                                                                      ],
                                                                                    ),
                                                                                  ],
                                                                                ),
                                                                              ),
                                                                              Row(
                                                                                mainAxisSize: MainAxisSize.max,
                                                                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                crossAxisAlignment: CrossAxisAlignment.center,
                                                                                children: [
                                                                                  Flexible(
                                                                                    child: FFButtonWidget(
                                                                                      onPressed: () async {
                                                                                        if (jobseekerDashboardProviderDetailRecord?.workEligibility.sin != null && jobseekerDashboardProviderDetailRecord?.workEligibility.sin != '') {
                                                                                          _model.user = await UsersRecord.getDocumentOnce(currentUserReference!);
                                                                                          if (functions.isSlotAvailable(
                                                                                              _model.user!.bookedSolts.toList(),
                                                                                              SlotsStruct(
                                                                                                startDate: functions.convertDateTimeToString(containerVarItem.startDate),
                                                                                                endDate: functions.convertDateTimeToString(containerVarItem.endDate),
                                                                                              ))) {
                                                                                            await currentUserReference!.update({
                                                                                              ...mapToFirestore(
                                                                                                {
                                                                                                  'bookedSolts': FieldValue.arrayUnion([
                                                                                                    getSlotsFirestoreData(
                                                                                                      createSlotsStruct(
                                                                                                        startDate: functions.convertDateTimeToString(containerVarItem.startDate),
                                                                                                        endDate: containerVarItem.endDate?.toString(),
                                                                                                        job: containerVarItem.reference,
                                                                                                        clearUnsetFields: false,
                                                                                                      ),
                                                                                                      true,
                                                                                                    )
                                                                                                  ]),
                                                                                                },
                                                                                              ),
                                                                                            });

                                                                                            await AppliedJobRecord.collection.doc().set({
                                                                                              ...createAppliedJobRecordData(
                                                                                                job: containerVarItem.reference,
                                                                                                user: currentUserReference,
                                                                                                iscompleted: false,
                                                                                                providerdetail: jobseekerDashboardProviderDetailRecord?.reference,
                                                                                                appliedJobStatus: 'Applied',
                                                                                              ),
                                                                                              ...mapToFirestore(
                                                                                                {
                                                                                                  'Createdat': FieldValue.serverTimestamp(),
                                                                                                },
                                                                                              ),
                                                                                            });

                                                                                            await containerVarItem.reference.update({
                                                                                              ...mapToFirestore(
                                                                                                {
                                                                                                  'ProviderApplied': FieldValue.arrayUnion([
                                                                                                    jobseekerDashboardProviderDetailRecord?.reference
                                                                                                  ]),
                                                                                                },
                                                                                              ),
                                                                                            });

                                                                                            var chatsRecordReference = ChatsRecord.collection.doc();
                                                                                            await chatsRecordReference.set(createChatsRecordData(
                                                                                              worker: currentUserReference,
                                                                                              recruiter: containerVarItem.createdBy,
                                                                                              job: containerVarItem.reference,
                                                                                              createdAt: getCurrentTimestamp,
                                                                                              name: containerVarItem.jobName,
                                                                                            ));
                                                                                            _model.chats = ChatsRecord.getDocumentFromData(
                                                                                                createChatsRecordData(
                                                                                                  worker: currentUserReference,
                                                                                                  recruiter: containerVarItem.createdBy,
                                                                                                  job: containerVarItem.reference,
                                                                                                  createdAt: getCurrentTimestamp,
                                                                                                  name: containerVarItem.jobName,
                                                                                                ),
                                                                                                chatsRecordReference);

                                                                                            await containerVarItem.reference.update({
                                                                                              ...createJobDetailsRecordData(
                                                                                                chat: _model.chats?.reference,
                                                                                              ),
                                                                                              ...mapToFirestore(
                                                                                                {
                                                                                                  'chatsUser': FieldValue.arrayUnion([
                                                                                                    currentUserReference
                                                                                                  ]),
                                                                                                },
                                                                                              ),
                                                                                            });
                                                                                            triggerPushNotification(
                                                                                              notificationTitle: 'New Applicat Arrived for Job !',
                                                                                              notificationText: '${valueOrDefault<String>(
                                                                                                '${jobseekerDashboardProviderDetailRecord?.personalinformation.firstName} ${jobseekerDashboardProviderDetailRecord?.personalinformation.lastName}',
                                                                                                'Uknown',
                                                                                              )} is Apply for your Job Please check the job details now. A new applicant has shown interest in the position. Kindly review and get back to them.',
                                                                                              notificationImageUrl: jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != null && jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != '' ? jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture : 'https://firebasestorage.googleapis.com/v0/b/backup13thfeb-a0ssgv.firebasestorage.app/o/images.jpeg?alt=media&token=697aad83-ed8a-48e8-85c1-cefd8599922a',
                                                                                              notificationSound: 'default',
                                                                                              userRefs: [
                                                                                                containerVarItem.createdBy!
                                                                                              ],
                                                                                              initialPageName: 'AdminAlljob',
                                                                                              parameterData: {
                                                                                                'jobid': containerVarItem.reference,
                                                                                              },
                                                                                            );

                                                                                            await NotificationsRecord.collection.doc().set({
                                                                                              ...createNotificationsRecordData(
                                                                                                fromUser: currentUserReference,
                                                                                                job: containerVarItem.reference,
                                                                                                message: '${valueOrDefault<String>(
                                                                                                  '${jobseekerDashboardProviderDetailRecord?.personalinformation.firstName} ${jobseekerDashboardProviderDetailRecord?.personalinformation.lastName}',
                                                                                                  'Uknown',
                                                                                                )} is Apply for your Job Please check the job details now. A new applicant has shown interest in the position. Kindly review and get back to them.',
                                                                                                subject: 'New Applicat Arrived for Job !',
                                                                                                time: getCurrentTimestamp,
                                                                                                type: 'Apply',
                                                                                                image: jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != null && jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != '' ? jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture : 'https://firebasestorage.googleapis.com/v0/b/backup13thfeb-a0ssgv.firebasestorage.app/o/images.jpeg?alt=media&token=697aad83-ed8a-48e8-85c1-cefd8599922a',
                                                                                              ),
                                                                                              ...mapToFirestore(
                                                                                                {
                                                                                                  'toUsers': [
                                                                                                    containerVarItem.createdBy
                                                                                                  ],
                                                                                                },
                                                                                              ),
                                                                                            });

                                                                                            await NotificationsRecord.collection.doc().set({
                                                                                              ...createNotificationsRecordData(
                                                                                                fromUser: currentUserReference,
                                                                                                job: containerVarItem.reference,
                                                                                                message: 'You Apply for your Job Please check the job details now.',
                                                                                                subject: 'You Applied Job!',
                                                                                                time: getCurrentTimestamp,
                                                                                                type: 'Apply',
                                                                                                image: jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != null && jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != '' ? jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture : 'https://firebasestorage.googleapis.com/v0/b/backup13thfeb-a0ssgv.firebasestorage.app/o/images.jpeg?alt=media&token=697aad83-ed8a-48e8-85c1-cefd8599922a',
                                                                                              ),
                                                                                              ...mapToFirestore(
                                                                                                {
                                                                                                  'toUsers': [
                                                                                                    currentUserReference
                                                                                                  ],
                                                                                                },
                                                                                              ),
                                                                                            });
                                                                                            safeSetState(() {
                                                                                              _model.tabBarController!.animateTo(
                                                                                                2,
                                                                                                duration: Duration(milliseconds: 300),
                                                                                                curve: Curves.ease,
                                                                                              );
                                                                                            });
                                                                                          } else {
                                                                                            ScaffoldMessenger.of(context).showSnackBar(
                                                                                              SnackBar(
                                                                                                content: Text(
                                                                                                  'you have already booked slots .....',
                                                                                                  style: TextStyle(
                                                                                                    color: FlutterFlowTheme.of(context).primaryText,
                                                                                                  ),
                                                                                                ),
                                                                                                duration: Duration(milliseconds: 4000),
                                                                                                backgroundColor: FlutterFlowTheme.of(context).secondary,
                                                                                              ),
                                                                                            );
                                                                                          }
                                                                                        } else {
                                                                                          context.pushNamed(
                                                                                            ProfileFillingForJobSeekerWidget.routeName,
                                                                                            queryParameters: {
                                                                                              'index': serializeParam(
                                                                                                7,
                                                                                                ParamType.int,
                                                                                              ),
                                                                                            }.withoutNulls,
                                                                                          );
                                                                                        }

                                                                                        safeSetState(() {});
                                                                                      },
                                                                                      text: 'Apply',
                                                                                      options: FFButtonOptions(
                                                                                        width: () {
                                                                                          if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                            return 305.0;
                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                            return 305.0;
                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                            return 146.0;
                                                                                          } else {
                                                                                            return 146.0;
                                                                                          }
                                                                                        }(),
                                                                                        height: 46.0,
                                                                                        padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                                                                                        iconPadding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                                                                                        color: Color(0xFF22577A),
                                                                                        textStyle: FlutterFlowTheme.of(context).titleSmall.override(
                                                                                              fontFamily: 'DM Sans',
                                                                                              color: Colors.white,
                                                                                              letterSpacing: 0.0,
                                                                                            ),
                                                                                        elevation: 0.0,
                                                                                        borderRadius: BorderRadius.circular(8.0),
                                                                                      ),
                                                                                    ),
                                                                                  ),
                                                                                  if (containerVarItem.chatsUser.contains(currentUserReference))
                                                                                    FlutterFlowIconButton(
                                                                                      borderColor: FlutterFlowTheme.of(context).primary,
                                                                                      borderRadius: 8.0,
                                                                                      buttonSize: 40.0,
                                                                                      fillColor: FlutterFlowTheme.of(context).accent1,
                                                                                      icon: Icon(
                                                                                        Icons.mark_chat_unread,
                                                                                        color: FlutterFlowTheme.of(context).primary,
                                                                                        size: 24.0,
                                                                                      ),
                                                                                      onPressed: () async {
                                                                                        context.pushNamed(
                                                                                          MessageScreenWidget.routeName,
                                                                                          queryParameters: {
                                                                                            'chat': serializeParam(
                                                                                              containerVarItem.chat,
                                                                                              ParamType.DocumentReference,
                                                                                            ),
                                                                                            'name': serializeParam(
                                                                                              containerVarItem.jobName,
                                                                                              ParamType.String,
                                                                                            ),
                                                                                          }.withoutNulls,
                                                                                        );
                                                                                      },
                                                                                    ),
                                                                                ].divide(SizedBox(width: 25.0)),
                                                                              ),
                                                                              Divider(
                                                                                thickness: 2.0,
                                                                                color: FlutterFlowTheme.of(context).alternate,
                                                                              ),
                                                                              Flex(
                                                                                direction: () {
                                                                                  if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                    return false;
                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                    return false;
                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                    return true;
                                                                                  } else {
                                                                                    return true;
                                                                                  }
                                                                                }()
                                                                                    ? Axis.horizontal
                                                                                    : Axis.vertical,
                                                                                mainAxisSize: MainAxisSize.max,
                                                                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                crossAxisAlignment: CrossAxisAlignment.end,
                                                                                children: [
                                                                                  Column(
                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                    mainAxisAlignment: MainAxisAlignment.start,
                                                                                    crossAxisAlignment: CrossAxisAlignment.start,
                                                                                    children: [
                                                                                      Padding(
                                                                                        padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 10.0),
                                                                                        child: Text(
                                                                                          'Shift description',
                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                fontFamily: 'DM Sans',
                                                                                                fontSize: () {
                                                                                                  if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                    return 16.0;
                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                    return 16.0;
                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                    return 18.0;
                                                                                                  } else {
                                                                                                    return 18.0;
                                                                                                  }
                                                                                                }(),
                                                                                                letterSpacing: 0.0,
                                                                                                fontWeight: FontWeight.bold,
                                                                                              ),
                                                                                        ),
                                                                                      ),
                                                                                      Container(
                                                                                        width: 750.0,
                                                                                        decoration: BoxDecoration(),
                                                                                        child: Flex(
                                                                                          direction: () {
                                                                                            if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                              return false;
                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                              return false;
                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                              return true;
                                                                                            } else {
                                                                                              return true;
                                                                                            }
                                                                                          }()
                                                                                              ? Axis.horizontal
                                                                                              : Axis.vertical,
                                                                                          mainAxisSize: MainAxisSize.max,
                                                                                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                          children: [
                                                                                            Column(
                                                                                              mainAxisSize: MainAxisSize.max,
                                                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                                                              children: [
                                                                                                Row(
                                                                                                  mainAxisSize: MainAxisSize.max,
                                                                                                  children: [
                                                                                                    Text(
                                                                                                      'Duration :',
                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                            fontFamily: 'DM Sans',
                                                                                                            fontSize: () {
                                                                                                              if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                return 16.0;
                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                return 16.0;
                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                return 18.0;
                                                                                                              } else {
                                                                                                                return 18.0;
                                                                                                              }
                                                                                                            }(),
                                                                                                            letterSpacing: 0.0,
                                                                                                            fontWeight: FontWeight.w500,
                                                                                                          ),
                                                                                                    ),
                                                                                                    Padding(
                                                                                                      padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                      child: Text(
                                                                                                        '${valueOrDefault<String>(
                                                                                                          containerVarItem.duration.toString(),
                                                                                                          'none',
                                                                                                        )} hours',
                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                              fontFamily: 'DM Sans',
                                                                                                              fontSize: 16.0,
                                                                                                              letterSpacing: 0.0,
                                                                                                            ),
                                                                                                      ),
                                                                                                    ),
                                                                                                  ],
                                                                                                ),
                                                                                              ],
                                                                                            ),
                                                                                            Column(
                                                                                              mainAxisSize: MainAxisSize.max,
                                                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                                                              children: [
                                                                                                Padding(
                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                  child: Row(
                                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                                    children: [
                                                                                                      Text(
                                                                                                        'Time :',
                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                              fontFamily: 'DM Sans',
                                                                                                              fontSize: () {
                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                  return 18.0;
                                                                                                                } else {
                                                                                                                  return 18.0;
                                                                                                                }
                                                                                                              }(),
                                                                                                              letterSpacing: 0.0,
                                                                                                              fontWeight: FontWeight.w500,
                                                                                                            ),
                                                                                                      ),
                                                                                                      Padding(
                                                                                                        padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                        child: Text(
                                                                                                          '${valueOrDefault<String>(
                                                                                                            dateTimeFormat(
                                                                                                              "jm",
                                                                                                              containerVarItem.timing.startTime,
                                                                                                              locale: FFLocalizations.of(context).languageCode,
                                                                                                            ),
                                                                                                            'None',
                                                                                                          )} to ${valueOrDefault<String>(
                                                                                                            dateTimeFormat(
                                                                                                              "jm",
                                                                                                              containerVarItem.timing.endTime,
                                                                                                              locale: FFLocalizations.of(context).languageCode,
                                                                                                            ),
                                                                                                            'None',
                                                                                                          )}',
                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                fontFamily: 'DM Sans',
                                                                                                                fontSize: 16.0,
                                                                                                                letterSpacing: 0.0,
                                                                                                              ),
                                                                                                        ),
                                                                                                      ),
                                                                                                    ],
                                                                                                  ),
                                                                                                ),
                                                                                                Padding(
                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                  child: Row(
                                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                                    children: [
                                                                                                      Text(
                                                                                                        'Hourly Pay :',
                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                              fontFamily: 'DM Sans',
                                                                                                              fontSize: () {
                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                  return 18.0;
                                                                                                                } else {
                                                                                                                  return 18.0;
                                                                                                                }
                                                                                                              }(),
                                                                                                              letterSpacing: 0.0,
                                                                                                              fontWeight: FontWeight.w500,
                                                                                                            ),
                                                                                                      ),
                                                                                                      Padding(
                                                                                                        padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                        child: Text(
                                                                                                          valueOrDefault<String>(
                                                                                                            containerVarItem.hourlyPay.toString(),
                                                                                                            'None',
                                                                                                          ),
                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                fontFamily: 'DM Sans',
                                                                                                                fontSize: 16.0,
                                                                                                                letterSpacing: 0.0,
                                                                                                              ),
                                                                                                        ),
                                                                                                      ),
                                                                                                    ],
                                                                                                  ),
                                                                                                ),
                                                                                              ],
                                                                                            ),
                                                                                            Column(
                                                                                              mainAxisSize: MainAxisSize.max,
                                                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                                                              children: [
                                                                                                if (containerVarItem.customDate)
                                                                                                  Padding(
                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                    child: Row(
                                                                                                      mainAxisSize: MainAxisSize.max,
                                                                                                      children: [
                                                                                                        Text(
                                                                                                          'Date :',
                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                fontFamily: 'DM Sans',
                                                                                                                fontSize: () {
                                                                                                                  if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                    return 18.0;
                                                                                                                  } else {
                                                                                                                    return 18.0;
                                                                                                                  }
                                                                                                                }(),
                                                                                                                letterSpacing: 0.0,
                                                                                                                fontWeight: FontWeight.w500,
                                                                                                              ),
                                                                                                        ),
                                                                                                        Padding(
                                                                                                          padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                          child: Text(
                                                                                                            dateTimeFormat(
                                                                                                              "yMMMd",
                                                                                                              containerVarItem.startDate!,
                                                                                                              locale: FFLocalizations.of(context).languageCode,
                                                                                                            ),
                                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                  fontFamily: 'DM Sans',
                                                                                                                  fontSize: 16.0,
                                                                                                                  letterSpacing: 0.0,
                                                                                                                ),
                                                                                                          ),
                                                                                                        ),
                                                                                                      ],
                                                                                                    ),
                                                                                                  ),
                                                                                                if (!containerVarItem.customDate)
                                                                                                  Padding(
                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                    child: Row(
                                                                                                      mainAxisSize: MainAxisSize.max,
                                                                                                      children: [
                                                                                                        Text(
                                                                                                          'Start Date :',
                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                fontFamily: 'DM Sans',
                                                                                                                fontSize: () {
                                                                                                                  if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                    return 18.0;
                                                                                                                  } else {
                                                                                                                    return 18.0;
                                                                                                                  }
                                                                                                                }(),
                                                                                                                letterSpacing: 0.0,
                                                                                                                fontWeight: FontWeight.w500,
                                                                                                              ),
                                                                                                        ),
                                                                                                        Padding(
                                                                                                          padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                          child: Text(
                                                                                                            dateTimeFormat(
                                                                                                              "yMMMd",
                                                                                                              containerVarItem.startDate!,
                                                                                                              locale: FFLocalizations.of(context).languageCode,
                                                                                                            ),
                                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                  fontFamily: 'DM Sans',
                                                                                                                  fontSize: 16.0,
                                                                                                                  letterSpacing: 0.0,
                                                                                                                ),
                                                                                                          ),
                                                                                                        ),
                                                                                                      ],
                                                                                                    ),
                                                                                                  ),
                                                                                                if (!containerVarItem.customDate)
                                                                                                  Padding(
                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                    child: Row(
                                                                                                      mainAxisSize: MainAxisSize.max,
                                                                                                      children: [
                                                                                                        Text(
                                                                                                          'End Date :',
                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                fontFamily: 'DM Sans',
                                                                                                                fontSize: () {
                                                                                                                  if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                    return 18.0;
                                                                                                                  } else {
                                                                                                                    return 18.0;
                                                                                                                  }
                                                                                                                }(),
                                                                                                                letterSpacing: 0.0,
                                                                                                                fontWeight: FontWeight.w500,
                                                                                                              ),
                                                                                                        ),
                                                                                                        Padding(
                                                                                                          padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                          child: Text(
                                                                                                            dateTimeFormat(
                                                                                                              "yMMMd",
                                                                                                              containerVarItem.endDate!,
                                                                                                              locale: FFLocalizations.of(context).languageCode,
                                                                                                            ),
                                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                  fontFamily: 'DM Sans',
                                                                                                                  fontSize: 16.0,
                                                                                                                  letterSpacing: 0.0,
                                                                                                                ),
                                                                                                          ),
                                                                                                        ),
                                                                                                      ],
                                                                                                    ),
                                                                                                  ),
                                                                                                Padding(
                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                  child: Row(
                                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                                    children: [
                                                                                                      Text(
                                                                                                        'Total Pay :',
                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                              fontFamily: 'DM Sans',
                                                                                                              fontSize: () {
                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                  return 18.0;
                                                                                                                } else {
                                                                                                                  return 18.0;
                                                                                                                }
                                                                                                              }(),
                                                                                                              letterSpacing: 0.0,
                                                                                                              fontWeight: FontWeight.w500,
                                                                                                            ),
                                                                                                      ),
                                                                                                      Padding(
                                                                                                        padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                        child: Text(
                                                                                                          valueOrDefault<String>(
                                                                                                            containerVarItem.totalPay.toString(),
                                                                                                            'none',
                                                                                                          ),
                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                fontFamily: 'DM Sans',
                                                                                                                fontSize: 16.0,
                                                                                                                letterSpacing: 0.0,
                                                                                                              ),
                                                                                                        ),
                                                                                                      ),
                                                                                                    ],
                                                                                                  ),
                                                                                                ),
                                                                                              ],
                                                                                            ),
                                                                                          ],
                                                                                        ),
                                                                                      ),
                                                                                      if (responsiveVisibility(
                                                                                        context: context,
                                                                                        phone: false,
                                                                                        tablet: false,
                                                                                      ))
                                                                                        Container(
                                                                                          width: 990.0,
                                                                                          decoration: BoxDecoration(),
                                                                                          child: Flex(
                                                                                            direction: () {
                                                                                              if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                return false;
                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                return false;
                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                return true;
                                                                                              } else {
                                                                                                return true;
                                                                                              }
                                                                                            }()
                                                                                                ? Axis.horizontal
                                                                                                : Axis.vertical,
                                                                                            mainAxisSize: MainAxisSize.max,
                                                                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                            crossAxisAlignment: CrossAxisAlignment.center,
                                                                                            children: [
                                                                                              Flexible(
                                                                                                child: Padding(
                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                  child: Column(
                                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                                    crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                    children: [
                                                                                                      Text(
                                                                                                        'Description :',
                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                              fontFamily: 'DM Sans',
                                                                                                              fontSize: () {
                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                  return 18.0;
                                                                                                                } else {
                                                                                                                  return 18.0;
                                                                                                                }
                                                                                                              }(),
                                                                                                              letterSpacing: 0.0,
                                                                                                              fontWeight: FontWeight.w500,
                                                                                                            ),
                                                                                                      ),
                                                                                                      Text(
                                                                                                        valueOrDefault<String>(
                                                                                                          containerVarItem.description,
                                                                                                          'none',
                                                                                                        ),
                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                              fontFamily: 'DM Sans',
                                                                                                              fontSize: 16.0,
                                                                                                              letterSpacing: 0.0,
                                                                                                            ),
                                                                                                      ),
                                                                                                    ],
                                                                                                  ),
                                                                                                ),
                                                                                              ),
                                                                                            ],
                                                                                          ),
                                                                                        ),
                                                                                      if (responsiveVisibility(
                                                                                        context: context,
                                                                                        tabletLandscape: false,
                                                                                        desktop: false,
                                                                                      ))
                                                                                        Container(
                                                                                          width: 990.0,
                                                                                          decoration: BoxDecoration(),
                                                                                          child: Column(
                                                                                            mainAxisSize: MainAxisSize.max,
                                                                                            crossAxisAlignment: CrossAxisAlignment.start,
                                                                                            children: [
                                                                                              Padding(
                                                                                                padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                child: Column(
                                                                                                  mainAxisSize: MainAxisSize.max,
                                                                                                  crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                  children: [
                                                                                                    Text(
                                                                                                      'Description :',
                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                            fontFamily: 'DM Sans',
                                                                                                            fontSize: () {
                                                                                                              if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                return 16.0;
                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                return 16.0;
                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                return 18.0;
                                                                                                              } else {
                                                                                                                return 18.0;
                                                                                                              }
                                                                                                            }(),
                                                                                                            letterSpacing: 0.0,
                                                                                                            fontWeight: FontWeight.w500,
                                                                                                          ),
                                                                                                    ),
                                                                                                    Text(
                                                                                                      valueOrDefault<String>(
                                                                                                        containerVarItem.description,
                                                                                                        'none',
                                                                                                      ),
                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                            fontFamily: 'DM Sans',
                                                                                                            fontSize: 16.0,
                                                                                                            letterSpacing: 0.0,
                                                                                                          ),
                                                                                                    ),
                                                                                                  ],
                                                                                                ),
                                                                                              ),
                                                                                              Padding(
                                                                                                padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                child: Column(
                                                                                                  mainAxisSize: MainAxisSize.max,
                                                                                                  crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                  children: [
                                                                                                    Text(
                                                                                                      'Skill Criteria :',
                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                            fontFamily: 'DM Sans',
                                                                                                            fontSize: () {
                                                                                                              if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                return 16.0;
                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                return 16.0;
                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                return 18.0;
                                                                                                              } else {
                                                                                                                return 18.0;
                                                                                                              }
                                                                                                            }(),
                                                                                                            letterSpacing: 0.0,
                                                                                                            fontWeight: FontWeight.w500,
                                                                                                          ),
                                                                                                    ),
                                                                                                    Builder(
                                                                                                      builder: (context) {
                                                                                                        final skills = containerVarItem.skillCriteria.toList();

                                                                                                        return Wrap(
                                                                                                          spacing: 10.0,
                                                                                                          runSpacing: 5.0,
                                                                                                          alignment: WrapAlignment.start,
                                                                                                          crossAxisAlignment: WrapCrossAlignment.start,
                                                                                                          direction: Axis.horizontal,
                                                                                                          runAlignment: WrapAlignment.start,
                                                                                                          verticalDirection: VerticalDirection.down,
                                                                                                          clipBehavior: Clip.none,
                                                                                                          children: List.generate(skills.length, (skillsIndex) {
                                                                                                            final skillsItem = skills[skillsIndex];
                                                                                                            return Text(
                                                                                                              skillsItem,
                                                                                                              style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                    fontFamily: 'DM Sans',
                                                                                                                    fontSize: 16.0,
                                                                                                                    letterSpacing: 0.0,
                                                                                                                  ),
                                                                                                            );
                                                                                                          }),
                                                                                                        );
                                                                                                      },
                                                                                                    ),
                                                                                                  ],
                                                                                                ),
                                                                                              ),
                                                                                            ],
                                                                                          ),
                                                                                        ),
                                                                                    ],
                                                                                  ),
                                                                                  Column(
                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                    mainAxisAlignment: MainAxisAlignment.end,
                                                                                    crossAxisAlignment: CrossAxisAlignment.start,
                                                                                    children: [
                                                                                      Align(
                                                                                        alignment: AlignmentDirectional(-1.0, 0.0),
                                                                                        child: Padding(
                                                                                          padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                          child: Text(
                                                                                            'Location :',
                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                  fontFamily: 'DM Sans',
                                                                                                  fontSize: () {
                                                                                                    if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                      return 16.0;
                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                      return 16.0;
                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                      return 18.0;
                                                                                                    } else {
                                                                                                      return 18.0;
                                                                                                    }
                                                                                                  }(),
                                                                                                  letterSpacing: 0.0,
                                                                                                  fontWeight: FontWeight.w500,
                                                                                                ),
                                                                                          ),
                                                                                        ),
                                                                                      ),
                                                                                      Padding(
                                                                                        padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                        child: wrapWithModel(
                                                                                          model: _model.customMapModels1.getModel(
                                                                                            functions.generateUniqueId(),
                                                                                            containerVarIndex,
                                                                                          ),
                                                                                          updateCallback: () => safeSetState(() {}),
                                                                                          child: CustomMapWidget(
                                                                                            key: Key(
                                                                                              'Keyfnz_${functions.generateUniqueId()}',
                                                                                            ),
                                                                                            latlng: containerVarItem.latlng!,
                                                                                            address: containerVarItem.fullAddress,
                                                                                          ),
                                                                                        ),
                                                                                      ),
                                                                                    ],
                                                                                  ),
                                                                                ],
                                                                              ),
                                                                            ],
                                                                          ),
                                                                        ),
                                                                      ),
                                                                    );
                                                                  },
                                                                );
                                                              },
                                                            ),
                                                          );
                                                        },
                                                      ),
                                                    ].addToEnd(SizedBox(
                                                        height: 150.0)),
                                                  ),
                                                ),
                                              ),
                                              Padding(
                                                padding: EdgeInsetsDirectional
                                                    .fromSTEB(
                                                        0.0, 28.0, 0.0, 0.0),
                                                child: SingleChildScrollView(
                                                  primary: false,
                                                  child: Column(
                                                    mainAxisSize:
                                                        MainAxisSize.min,
                                                    crossAxisAlignment:
                                                        CrossAxisAlignment
                                                            .start,
                                                    children: [
                                                      Padding(
                                                        padding:
                                                            EdgeInsetsDirectional
                                                                .fromSTEB(
                                                                    0.0,
                                                                    0.0,
                                                                    0.0,
                                                                    15.0),
                                                        child: Column(
                                                          mainAxisSize:
                                                              MainAxisSize.max,
                                                          crossAxisAlignment:
                                                              CrossAxisAlignment
                                                                  .start,
                                                          children: [
                                                            Padding(
                                                              padding:
                                                                  EdgeInsetsDirectional
                                                                      .fromSTEB(
                                                                          0.0,
                                                                          0.0,
                                                                          0.0,
                                                                          18.0),
                                                              child: Row(
                                                                mainAxisSize:
                                                                    MainAxisSize
                                                                        .max,
                                                                mainAxisAlignment:
                                                                    MainAxisAlignment
                                                                        .spaceBetween,
                                                                children: [
                                                                  Text(
                                                                    'Search job',
                                                                    style: FlutterFlowTheme.of(
                                                                            context)
                                                                        .headlineLarge
                                                                        .override(
                                                                          fontFamily:
                                                                              'DM Sans',
                                                                          fontSize:
                                                                              () {
                                                                            if (MediaQuery.sizeOf(context).width <
                                                                                kBreakpointSmall) {
                                                                              return 20.0;
                                                                            } else if (MediaQuery.sizeOf(context).width <
                                                                                kBreakpointMedium) {
                                                                              return 20.0;
                                                                            } else if (MediaQuery.sizeOf(context).width <
                                                                                kBreakpointLarge) {
                                                                              return 24.0;
                                                                            } else {
                                                                              return 24.0;
                                                                            }
                                                                          }(),
                                                                          letterSpacing:
                                                                              0.0,
                                                                          fontWeight:
                                                                              FontWeight.bold,
                                                                        ),
                                                                  ),
                                                                  Stack(
                                                                    alignment:
                                                                        AlignmentDirectional(
                                                                            1.0,
                                                                            -1.0),
                                                                    children: [
                                                                      Padding(
                                                                        padding: EdgeInsetsDirectional.fromSTEB(
                                                                            0.0,
                                                                            5.0,
                                                                            5.0,
                                                                            0.0),
                                                                        child:
                                                                            FFButtonWidget(
                                                                          onPressed:
                                                                              () async {
                                                                            context.pushNamed(FilterMobilePageWidget.routeName);
                                                                          },
                                                                          text:
                                                                              'Filters',
                                                                          icon:
                                                                              Icon(
                                                                            Icons.filter_list,
                                                                            size:
                                                                                28.0,
                                                                          ),
                                                                          options:
                                                                              FFButtonOptions(
                                                                            height:
                                                                                40.0,
                                                                            padding: EdgeInsetsDirectional.fromSTEB(
                                                                                12.0,
                                                                                8.0,
                                                                                12.0,
                                                                                8.0),
                                                                            iconPadding: EdgeInsetsDirectional.fromSTEB(
                                                                                0.0,
                                                                                0.0,
                                                                                0.0,
                                                                                0.0),
                                                                            color:
                                                                                FlutterFlowTheme.of(context).secondaryBackground,
                                                                            textStyle: FlutterFlowTheme.of(context).titleSmall.override(
                                                                                  fontFamily: 'DM Sans',
                                                                                  color: Color(0xFF292D32),
                                                                                  fontSize: () {
                                                                                    if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                      return 14.0;
                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                      return 14.0;
                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                      return 18.0;
                                                                                    } else {
                                                                                      return 18.0;
                                                                                    }
                                                                                  }(),
                                                                                  letterSpacing: 0.0,
                                                                                  fontWeight: FontWeight.w500,
                                                                                ),
                                                                            elevation:
                                                                                0.0,
                                                                            borderSide:
                                                                                BorderSide(
                                                                              color: Color(0xFFC0D1DC),
                                                                              width: 1.0,
                                                                            ),
                                                                            borderRadius:
                                                                                BorderRadius.circular(8.0),
                                                                          ),
                                                                        ),
                                                                      ),
                                                                      if ((FFAppState().FilterStartDate !=
                                                                              null) &&
                                                                          (FFAppState().FilterEndDate !=
                                                                              null))
                                                                        Container(
                                                                          width:
                                                                              15.0,
                                                                          height:
                                                                              15.0,
                                                                          decoration:
                                                                              BoxDecoration(
                                                                            color:
                                                                                FlutterFlowTheme.of(context).primary,
                                                                            shape:
                                                                                BoxShape.circle,
                                                                          ),
                                                                        ),
                                                                    ],
                                                                  ),
                                                                ],
                                                              ),
                                                            ),
                                                            Row(
                                                              mainAxisSize:
                                                                  MainAxisSize
                                                                      .max,
                                                              children: [
                                                                Expanded(
                                                                  child:
                                                                      Container(
                                                                    decoration:
                                                                        BoxDecoration(),
                                                                    child:
                                                                        Container(
                                                                      height:
                                                                          48.0,
                                                                      decoration:
                                                                          BoxDecoration(),
                                                                      child:
                                                                          Container(
                                                                        width:
                                                                            100.0,
                                                                        child:
                                                                            TextFormField(
                                                                          controller:
                                                                              _model.textController,
                                                                          focusNode:
                                                                              _model.textFieldFocusNode,
                                                                          onChanged: (_) =>
                                                                              EasyDebounce.debounce(
                                                                            '_model.textController',
                                                                            Duration(milliseconds: 0),
                                                                            () async {
                                                                              safeSetState(() {});
                                                                            },
                                                                          ),
                                                                          autofocus:
                                                                              false,
                                                                          obscureText:
                                                                              false,
                                                                          decoration:
                                                                              InputDecoration(
                                                                            isDense:
                                                                                true,
                                                                            labelStyle: FlutterFlowTheme.of(context).labelMedium.override(
                                                                                  fontFamily: 'DM Sans',
                                                                                  letterSpacing: 0.0,
                                                                                ),
                                                                            hintText:
                                                                                'Medical...',
                                                                            hintStyle: FlutterFlowTheme.of(context).labelMedium.override(
                                                                                  fontFamily: 'DM Sans',
                                                                                  fontSize: 18.0,
                                                                                  letterSpacing: 0.0,
                                                                                  fontWeight: FontWeight.w500,
                                                                                ),
                                                                            enabledBorder:
                                                                                OutlineInputBorder(
                                                                              borderSide: BorderSide(
                                                                                color: Color(0xFFC0D1DC),
                                                                                width: 1.0,
                                                                              ),
                                                                              borderRadius: BorderRadius.circular(8.0),
                                                                            ),
                                                                            focusedBorder:
                                                                                OutlineInputBorder(
                                                                              borderSide: BorderSide(
                                                                                color: Color(0x00000000),
                                                                                width: 1.0,
                                                                              ),
                                                                              borderRadius: BorderRadius.circular(8.0),
                                                                            ),
                                                                            errorBorder:
                                                                                OutlineInputBorder(
                                                                              borderSide: BorderSide(
                                                                                color: FlutterFlowTheme.of(context).error,
                                                                                width: 1.0,
                                                                              ),
                                                                              borderRadius: BorderRadius.circular(8.0),
                                                                            ),
                                                                            focusedErrorBorder:
                                                                                OutlineInputBorder(
                                                                              borderSide: BorderSide(
                                                                                color: FlutterFlowTheme.of(context).error,
                                                                                width: 1.0,
                                                                              ),
                                                                              borderRadius: BorderRadius.circular(8.0),
                                                                            ),
                                                                            filled:
                                                                                true,
                                                                            fillColor:
                                                                                FlutterFlowTheme.of(context).secondaryBackground,
                                                                            contentPadding:
                                                                                EdgeInsets.all(20.0),
                                                                            prefixIcon:
                                                                                Icon(
                                                                              Icons.search_sharp,
                                                                              size: 26.0,
                                                                            ),
                                                                          ),
                                                                          style: FlutterFlowTheme.of(context)
                                                                              .bodyMedium
                                                                              .override(
                                                                                fontFamily: 'DM Sans',
                                                                                letterSpacing: 0.0,
                                                                              ),
                                                                          cursorColor:
                                                                              FlutterFlowTheme.of(context).primaryText,
                                                                          validator: _model
                                                                              .textControllerValidator
                                                                              .asValidator(context),
                                                                        ),
                                                                      ),
                                                                    ),
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                          ],
                                                        ),
                                                      ),
                                                      StreamBuilder<
                                                          List<
                                                              JobDetailsRecord>>(
                                                        stream:
                                                            queryJobDetailsRecord(
                                                          queryBuilder:
                                                              (jobDetailsRecord) =>
                                                                  jobDetailsRecord
                                                                      .where(
                                                            'JobStatus',
                                                            isEqualTo: 'Active',
                                                          ),
                                                        ),
                                                        builder: (context,
                                                            snapshot) {
                                                          // Customize what your widget looks like when it's loading.
                                                          if (!snapshot
                                                              .hasData) {
                                                            return Center(
                                                              child: SizedBox(
                                                                width: 50.0,
                                                                height: 50.0,
                                                                child:
                                                                    CircularProgressIndicator(
                                                                  valueColor:
                                                                      AlwaysStoppedAnimation<
                                                                          Color>(
                                                                    FlutterFlowTheme.of(
                                                                            context)
                                                                        .primary,
                                                                  ),
                                                                ),
                                                              ),
                                                            );
                                                          }
                                                          List<JobDetailsRecord>
                                                              containerJobDetailsRecordList =
                                                              snapshot.data!;

                                                          return Container(
                                                            decoration:
                                                                BoxDecoration(),
                                                            child: Builder(
                                                              builder:
                                                                  (context) {
                                                                final containerVar = (FFAppState().sortFilter ==
                                                                            'otn'
                                                                        ? containerJobDetailsRecordList.where((e) => !e.providerApplied.contains(jobseekerDashboardProviderDetailRecord?.reference) && (FFAppState().urgentJob == true ? (e.isUrgentJob == true) : true) && ((FFAppState().FilterStartDate != null) && (FFAppState().FilterEndDate != null) ? functions.isDateBetween(e.startDate!, FFAppState().FilterStartDate!, FFAppState().FilterEndDate!) : true)).toList().sortedList(
                                                                            keyOf: (e) => e
                                                                                .createdAt!,
                                                                            desc:
                                                                                false)
                                                                        : containerJobDetailsRecordList
                                                                            .where((e) =>
                                                                                !e.providerApplied.contains(jobseekerDashboardProviderDetailRecord?.reference) &&
                                                                                (FFAppState().urgentJob == true ? (e.isUrgentJob == true) : true) &&
                                                                                ((FFAppState().FilterStartDate != null) && (FFAppState().FilterEndDate != null) ? functions.isDateBetween(e.startDate!, FFAppState().FilterStartDate!, FFAppState().FilterEndDate!) : true))
                                                                            .toList()
                                                                            .sortedList(keyOf: (e) => e.createdAt!, desc: true))
                                                                    .toList();
                                                                if (containerVar
                                                                    .isEmpty) {
                                                                  return EmptyWidget(
                                                                    message:
                                                                        'No Job',
                                                                  );
                                                                }

                                                                return ListView
                                                                    .separated(
                                                                  padding:
                                                                      EdgeInsets
                                                                          .fromLTRB(
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    500.0,
                                                                  ),
                                                                  primary:
                                                                      false,
                                                                  shrinkWrap:
                                                                      true,
                                                                  scrollDirection:
                                                                      Axis.vertical,
                                                                  itemCount:
                                                                      containerVar
                                                                          .length,
                                                                  separatorBuilder: (_,
                                                                          __) =>
                                                                      SizedBox(
                                                                          height:
                                                                              25.0),
                                                                  itemBuilder:
                                                                      (context,
                                                                          containerVarIndex) {
                                                                    final containerVarItem =
                                                                        containerVar[
                                                                            containerVarIndex];
                                                                    return Visibility(
                                                                      visible: containerVarItem
                                                                          .jobName
                                                                          .toLowerCase()
                                                                          .contains(_model
                                                                              .textController
                                                                              .text
                                                                              .toLowerCase()),
                                                                      child:
                                                                          Container(
                                                                        width:
                                                                            () {
                                                                          if (MediaQuery.sizeOf(context).width <
                                                                              kBreakpointSmall) {
                                                                            return 335.0;
                                                                          } else if (MediaQuery.sizeOf(context).width <
                                                                              kBreakpointMedium) {
                                                                            return 335.0;
                                                                          } else if (MediaQuery.sizeOf(context).width <
                                                                              kBreakpointLarge) {
                                                                            return 1522.0;
                                                                          } else {
                                                                            return 1522.0;
                                                                          }
                                                                        }(),
                                                                        decoration:
                                                                            BoxDecoration(
                                                                          color:
                                                                              FlutterFlowTheme.of(context).secondaryBackground,
                                                                          borderRadius:
                                                                              BorderRadius.circular(20.0),
                                                                          border:
                                                                              Border.all(
                                                                            color:
                                                                                Color(0xFFE8E8EC),
                                                                            width:
                                                                                1.0,
                                                                          ),
                                                                        ),
                                                                        child:
                                                                            Padding(
                                                                          padding:
                                                                              EdgeInsets.all(15.0),
                                                                          child:
                                                                              SingleChildScrollView(
                                                                            child:
                                                                                Column(
                                                                              mainAxisSize: MainAxisSize.max,
                                                                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                                              children: [
                                                                                Padding(
                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 20.0),
                                                                                  child: Row(
                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                    children: [
                                                                                      Text(
                                                                                        containerVarItem.subRole,
                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                              fontFamily: 'DM Sans',
                                                                                              letterSpacing: 0.0,
                                                                                              fontWeight: FontWeight.w500,
                                                                                            ),
                                                                                      ),
                                                                                      Align(
                                                                                        alignment: AlignmentDirectional(1.0, 0.0),
                                                                                        child: Text(
                                                                                          dateTimeFormat(
                                                                                            "relative",
                                                                                            containerVarItem.createdAt!,
                                                                                            locale: FFLocalizations.of(context).languageCode,
                                                                                          ),
                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                fontFamily: 'DM Sans',
                                                                                                color: FlutterFlowTheme.of(context).primary,
                                                                                                fontSize: 16.0,
                                                                                                letterSpacing: 0.0,
                                                                                                fontWeight: FontWeight.w500,
                                                                                              ),
                                                                                        ),
                                                                                      ),
                                                                                    ],
                                                                                  ),
                                                                                ),
                                                                                Padding(
                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 10.0),
                                                                                  child: Column(
                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                    crossAxisAlignment: CrossAxisAlignment.start,
                                                                                    children: [
                                                                                      Row(
                                                                                        mainAxisSize: MainAxisSize.max,
                                                                                        crossAxisAlignment: CrossAxisAlignment.start,
                                                                                        children: [
                                                                                          StreamBuilder<UsersRecord>(
                                                                                            stream: UsersRecord.getDocument(containerVarItem.createdBy!),
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

                                                                                              final circleImageUsersRecord = snapshot.data!;

                                                                                              return Container(
                                                                                                width: 60.0,
                                                                                                height: 60.0,
                                                                                                clipBehavior: Clip.antiAlias,
                                                                                                decoration: BoxDecoration(
                                                                                                  shape: BoxShape.circle,
                                                                                                ),
                                                                                                child: Image.network(
                                                                                                  valueOrDefault<String>(
                                                                                                    circleImageUsersRecord.photoUrl,
                                                                                                    'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg',
                                                                                                  ),
                                                                                                  fit: BoxFit.cover,
                                                                                                ),
                                                                                              );
                                                                                            },
                                                                                          ),
                                                                                          Flexible(
                                                                                            child: Padding(
                                                                                              padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 7.0, 10.0),
                                                                                              child: Column(
                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                children: [
                                                                                                  Text(
                                                                                                    valueOrDefault<String>(
                                                                                                      containerVarItem.jobName,
                                                                                                      'Job Name',
                                                                                                    ),
                                                                                                    textAlign: TextAlign.start,
                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                          fontFamily: 'DM Sans',
                                                                                                          fontSize: () {
                                                                                                            if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                              return 18.0;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                              return 18.0;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                              return 20.0;
                                                                                                            } else {
                                                                                                              return 20.0;
                                                                                                            }
                                                                                                          }(),
                                                                                                          letterSpacing: 0.0,
                                                                                                          fontWeight: FontWeight.bold,
                                                                                                        ),
                                                                                                  ),
                                                                                                  Padding(
                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                    child: RichText(
                                                                                                      textScaler: MediaQuery.of(context).textScaler,
                                                                                                      text: TextSpan(
                                                                                                        children: [
                                                                                                          TextSpan(
                                                                                                            text: 'Job Id : ',
                                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                  fontFamily: 'DM Sans',
                                                                                                                  color: Color(0xFF89969F),
                                                                                                                  fontSize: () {
                                                                                                                    if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                      return 16.0;
                                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                      return 16.0;
                                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                      return 20.0;
                                                                                                                    } else {
                                                                                                                      return 20.0;
                                                                                                                    }
                                                                                                                  }(),
                                                                                                                  letterSpacing: 0.0,
                                                                                                                ),
                                                                                                          ),
                                                                                                          TextSpan(
                                                                                                            text: valueOrDefault<String>(
                                                                                                              containerVarItem.jobId,
                                                                                                              '00000',
                                                                                                            ),
                                                                                                            style: TextStyle(),
                                                                                                          )
                                                                                                        ],
                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                              fontFamily: 'DM Sans',
                                                                                                              color: Color(0xFF89969F),
                                                                                                              fontSize: () {
                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                  return 20.0;
                                                                                                                } else {
                                                                                                                  return 20.0;
                                                                                                                }
                                                                                                              }(),
                                                                                                              letterSpacing: 0.0,
                                                                                                            ),
                                                                                                      ),
                                                                                                      textAlign: TextAlign.start,
                                                                                                    ),
                                                                                                  ),
                                                                                                  Align(
                                                                                                    alignment: AlignmentDirectional(-1.0, 0.0),
                                                                                                    child: Padding(
                                                                                                      padding: EdgeInsetsDirectional.fromSTEB(0.0, 5.0, 0.0, 0.0),
                                                                                                      child: Text(
                                                                                                        'From ${containerVarItem.fromBusiness}',
                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                              fontFamily: 'DM Sans',
                                                                                                              fontSize: () {
                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                  return 18.0;
                                                                                                                } else {
                                                                                                                  return 18.0;
                                                                                                                }
                                                                                                              }(),
                                                                                                              letterSpacing: 0.0,
                                                                                                              fontWeight: FontWeight.w600,
                                                                                                            ),
                                                                                                      ),
                                                                                                    ),
                                                                                                  ),
                                                                                                ],
                                                                                              ),
                                                                                            ),
                                                                                          ),
                                                                                        ].divide(SizedBox(width: 25.0)),
                                                                                      ),
                                                                                      Flex(
                                                                                        direction: () {
                                                                                          if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                            return false;
                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                            return false;
                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                            return true;
                                                                                          } else {
                                                                                            return true;
                                                                                          }
                                                                                        }()
                                                                                            ? Axis.horizontal
                                                                                            : Axis.vertical,
                                                                                        mainAxisSize: MainAxisSize.max,
                                                                                        crossAxisAlignment: CrossAxisAlignment.center,
                                                                                        children: [
                                                                                          Visibility(
                                                                                            visible: responsiveVisibility(
                                                                                              context: context,
                                                                                              phone: false,
                                                                                              tablet: false,
                                                                                            ),
                                                                                            child: SizedBox(
                                                                                              height: 20.0,
                                                                                              child: VerticalDivider(
                                                                                                thickness: 2.0,
                                                                                                color: FlutterFlowTheme.of(context).alternate,
                                                                                              ),
                                                                                            ),
                                                                                          ),
                                                                                        ],
                                                                                      ),
                                                                                    ],
                                                                                  ),
                                                                                ),
                                                                                Row(
                                                                                  mainAxisSize: MainAxisSize.max,
                                                                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                  crossAxisAlignment: CrossAxisAlignment.center,
                                                                                  children: [
                                                                                    Flexible(
                                                                                      child: FFButtonWidget(
                                                                                        onPressed: () async {
                                                                                          if (jobseekerDashboardProviderDetailRecord?.workEligibility.sin != null && jobseekerDashboardProviderDetailRecord?.workEligibility.sin != '') {
                                                                                            _model.userCurrent = await UsersRecord.getDocumentOnce(currentUserReference!);
                                                                                            if (functions.isSlotAvailable(
                                                                                                _model.userCurrent!.bookedSolts.toList(),
                                                                                                SlotsStruct(
                                                                                                  startDate: functions.convertDateTimeToString(containerVarItem.startDate),
                                                                                                  endDate: functions.convertDateTimeToString(containerVarItem.endDate),
                                                                                                ))) {
                                                                                              await currentUserReference!.update({
                                                                                                ...mapToFirestore(
                                                                                                  {
                                                                                                    'bookedSolts': FieldValue.arrayUnion([
                                                                                                      getSlotsFirestoreData(
                                                                                                        createSlotsStruct(
                                                                                                          startDate: functions.convertDateTimeToString(containerVarItem.startDate),
                                                                                                          endDate: functions.convertDateTimeToString(containerVarItem.endDate),
                                                                                                          job: containerVarItem.reference,
                                                                                                          clearUnsetFields: false,
                                                                                                        ),
                                                                                                        true,
                                                                                                      )
                                                                                                    ]),
                                                                                                  },
                                                                                                ),
                                                                                              });

                                                                                              await AppliedJobRecord.collection.doc().set({
                                                                                                ...createAppliedJobRecordData(
                                                                                                  job: containerVarItem.reference,
                                                                                                  user: currentUserReference,
                                                                                                  iscompleted: false,
                                                                                                  providerdetail: jobseekerDashboardProviderDetailRecord?.reference,
                                                                                                  appliedJobStatus: 'Applied',
                                                                                                ),
                                                                                                ...mapToFirestore(
                                                                                                  {
                                                                                                    'Createdat': FieldValue.serverTimestamp(),
                                                                                                  },
                                                                                                ),
                                                                                              });

                                                                                              await containerVarItem.reference.update({
                                                                                                ...mapToFirestore(
                                                                                                  {
                                                                                                    'ProviderApplied': FieldValue.arrayUnion([
                                                                                                      jobseekerDashboardProviderDetailRecord?.reference
                                                                                                    ]),
                                                                                                  },
                                                                                                ),
                                                                                              });

                                                                                              var chatsRecordReference = ChatsRecord.collection.doc();
                                                                                              await chatsRecordReference.set(createChatsRecordData(
                                                                                                worker: currentUserReference,
                                                                                                recruiter: containerVarItem.createdBy,
                                                                                                job: containerVarItem.reference,
                                                                                                createdAt: getCurrentTimestamp,
                                                                                                name: containerVarItem.jobName,
                                                                                              ));
                                                                                              _model.chatData = ChatsRecord.getDocumentFromData(
                                                                                                  createChatsRecordData(
                                                                                                    worker: currentUserReference,
                                                                                                    recruiter: containerVarItem.createdBy,
                                                                                                    job: containerVarItem.reference,
                                                                                                    createdAt: getCurrentTimestamp,
                                                                                                    name: containerVarItem.jobName,
                                                                                                  ),
                                                                                                  chatsRecordReference);

                                                                                              await containerVarItem.reference.update({
                                                                                                ...createJobDetailsRecordData(
                                                                                                  chat: _model.chatData?.reference,
                                                                                                ),
                                                                                                ...mapToFirestore(
                                                                                                  {
                                                                                                    'chatsUser': FieldValue.arrayUnion([currentUserReference]),
                                                                                                  },
                                                                                                ),
                                                                                              });
                                                                                              triggerPushNotification(
                                                                                                notificationTitle: 'New Applicat Arrived for Job !',
                                                                                                notificationText: '${valueOrDefault<String>(
                                                                                                  '${jobseekerDashboardProviderDetailRecord?.personalinformation.firstName} ${jobseekerDashboardProviderDetailRecord?.personalinformation.lastName}',
                                                                                                  'Uknown',
                                                                                                )} is Apply for your Job Please check the job details now. A new applicant has shown interest in the position. Kindly review and get back to them.',
                                                                                                notificationImageUrl: jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != null && jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != '' ? jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture : 'https://firebasestorage.googleapis.com/v0/b/backup13thfeb-a0ssgv.firebasestorage.app/o/images.jpeg?alt=media&token=697aad83-ed8a-48e8-85c1-cefd8599922a',
                                                                                                notificationSound: 'default',
                                                                                                userRefs: [
                                                                                                  containerVarItem.createdBy!
                                                                                                ],
                                                                                                initialPageName: 'AdminAlljob',
                                                                                                parameterData: {
                                                                                                  'jobid': containerVarItem.reference,
                                                                                                },
                                                                                              );

                                                                                              await NotificationsRecord.collection.doc().set({
                                                                                                ...createNotificationsRecordData(
                                                                                                  fromUser: currentUserReference,
                                                                                                  job: containerVarItem.reference,
                                                                                                  message: '${valueOrDefault<String>(
                                                                                                    '${jobseekerDashboardProviderDetailRecord?.personalinformation.firstName} ${jobseekerDashboardProviderDetailRecord?.personalinformation.lastName}',
                                                                                                    'Uknown',
                                                                                                  )} is Apply for your Job Please check the job details now. A new applicant has shown interest in the position. Kindly review and get back to them.',
                                                                                                  subject: 'New Applicat Arrived for Job !',
                                                                                                  time: getCurrentTimestamp,
                                                                                                  type: 'Apply',
                                                                                                  image: jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != null && jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != '' ? jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture : 'https://firebasestorage.googleapis.com/v0/b/backup13thfeb-a0ssgv.firebasestorage.app/o/images.jpeg?alt=media&token=697aad83-ed8a-48e8-85c1-cefd8599922a',
                                                                                                ),
                                                                                                ...mapToFirestore(
                                                                                                  {
                                                                                                    'toUsers': [
                                                                                                      containerVarItem.createdBy
                                                                                                    ],
                                                                                                  },
                                                                                                ),
                                                                                              });

                                                                                              await NotificationsRecord.collection.doc().set({
                                                                                                ...createNotificationsRecordData(
                                                                                                  fromUser: currentUserReference,
                                                                                                  job: containerVarItem.reference,
                                                                                                  message: 'You Apply for your Job Please check the job details now.',
                                                                                                  subject: 'You Applied Job!',
                                                                                                  time: getCurrentTimestamp,
                                                                                                  type: 'Apply',
                                                                                                  image: jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != null && jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != '' ? jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture : 'https://firebasestorage.googleapis.com/v0/b/backup13thfeb-a0ssgv.firebasestorage.app/o/images.jpeg?alt=media&token=697aad83-ed8a-48e8-85c1-cefd8599922a',
                                                                                                ),
                                                                                                ...mapToFirestore(
                                                                                                  {
                                                                                                    'toUsers': [currentUserReference],
                                                                                                  },
                                                                                                ),
                                                                                              });
                                                                                              safeSetState(() {
                                                                                                _model.tabBarController!.animateTo(
                                                                                                  2,
                                                                                                  duration: Duration(milliseconds: 300),
                                                                                                  curve: Curves.ease,
                                                                                                );
                                                                                              });
                                                                                            } else {
                                                                                              ScaffoldMessenger.of(context).showSnackBar(
                                                                                                SnackBar(
                                                                                                  content: Text(
                                                                                                    'you have already booked slots .....',
                                                                                                    style: TextStyle(
                                                                                                      color: FlutterFlowTheme.of(context).primaryText,
                                                                                                    ),
                                                                                                  ),
                                                                                                  duration: Duration(milliseconds: 4000),
                                                                                                  backgroundColor: FlutterFlowTheme.of(context).secondary,
                                                                                                ),
                                                                                              );
                                                                                            }
                                                                                          } else {
                                                                                            context.pushNamed(
                                                                                              ProfileFillingForJobSeekerWidget.routeName,
                                                                                              queryParameters: {
                                                                                                'index': serializeParam(
                                                                                                  7,
                                                                                                  ParamType.int,
                                                                                                ),
                                                                                              }.withoutNulls,
                                                                                            );
                                                                                          }

                                                                                          safeSetState(() {});
                                                                                        },
                                                                                        text: 'Apply',
                                                                                        options: FFButtonOptions(
                                                                                          width: double.infinity,
                                                                                          height: 46.0,
                                                                                          padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                                                                                          iconPadding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                                                                                          color: Color(0xFF22577A),
                                                                                          textStyle: FlutterFlowTheme.of(context).titleSmall.override(
                                                                                                fontFamily: 'DM Sans',
                                                                                                color: Colors.white,
                                                                                                letterSpacing: 0.0,
                                                                                              ),
                                                                                          elevation: 0.0,
                                                                                          borderRadius: BorderRadius.circular(8.0),
                                                                                        ),
                                                                                      ),
                                                                                    ),
                                                                                    if (containerVarItem.chatsUser.contains(currentUserReference))
                                                                                      FlutterFlowIconButton(
                                                                                        borderColor: FlutterFlowTheme.of(context).primary,
                                                                                        borderRadius: 8.0,
                                                                                        buttonSize: 40.0,
                                                                                        fillColor: FlutterFlowTheme.of(context).accent1,
                                                                                        icon: Icon(
                                                                                          Icons.mark_chat_unread,
                                                                                          color: FlutterFlowTheme.of(context).primary,
                                                                                          size: 24.0,
                                                                                        ),
                                                                                        onPressed: () async {
                                                                                          context.pushNamed(
                                                                                            MessageScreenWidget.routeName,
                                                                                            queryParameters: {
                                                                                              'chat': serializeParam(
                                                                                                containerVarItem.chat,
                                                                                                ParamType.DocumentReference,
                                                                                              ),
                                                                                              'name': serializeParam(
                                                                                                containerVarItem.jobName,
                                                                                                ParamType.String,
                                                                                              ),
                                                                                            }.withoutNulls,
                                                                                          );
                                                                                        },
                                                                                      ),
                                                                                  ].divide(SizedBox(width: 25.0)),
                                                                                ),
                                                                                Divider(
                                                                                  thickness: 2.0,
                                                                                  color: FlutterFlowTheme.of(context).alternate,
                                                                                ),
                                                                                Flex(
                                                                                  direction: () {
                                                                                    if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                      return false;
                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                      return false;
                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                      return true;
                                                                                    } else {
                                                                                      return true;
                                                                                    }
                                                                                  }()
                                                                                      ? Axis.horizontal
                                                                                      : Axis.vertical,
                                                                                  mainAxisSize: MainAxisSize.max,
                                                                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                  crossAxisAlignment: CrossAxisAlignment.end,
                                                                                  children: [
                                                                                    Column(
                                                                                      mainAxisSize: MainAxisSize.max,
                                                                                      mainAxisAlignment: MainAxisAlignment.start,
                                                                                      crossAxisAlignment: CrossAxisAlignment.start,
                                                                                      children: [
                                                                                        Padding(
                                                                                          padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 10.0),
                                                                                          child: Text(
                                                                                            'Shift description',
                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                  fontFamily: 'DM Sans',
                                                                                                  fontSize: () {
                                                                                                    if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                      return 16.0;
                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                      return 16.0;
                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                      return 18.0;
                                                                                                    } else {
                                                                                                      return 18.0;
                                                                                                    }
                                                                                                  }(),
                                                                                                  letterSpacing: 0.0,
                                                                                                  fontWeight: FontWeight.bold,
                                                                                                ),
                                                                                          ),
                                                                                        ),
                                                                                        Container(
                                                                                          width: 750.0,
                                                                                          decoration: BoxDecoration(),
                                                                                          child: Flex(
                                                                                            direction: () {
                                                                                              if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                return false;
                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                return false;
                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                return true;
                                                                                              } else {
                                                                                                return true;
                                                                                              }
                                                                                            }()
                                                                                                ? Axis.horizontal
                                                                                                : Axis.vertical,
                                                                                            mainAxisSize: MainAxisSize.max,
                                                                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                            children: [
                                                                                              Column(
                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                children: [
                                                                                                  Row(
                                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                                    children: [
                                                                                                      Text(
                                                                                                        'Duration :',
                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                              fontFamily: 'DM Sans',
                                                                                                              fontSize: () {
                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                  return 18.0;
                                                                                                                } else {
                                                                                                                  return 18.0;
                                                                                                                }
                                                                                                              }(),
                                                                                                              letterSpacing: 0.0,
                                                                                                              fontWeight: FontWeight.w500,
                                                                                                            ),
                                                                                                      ),
                                                                                                      Padding(
                                                                                                        padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                        child: Text(
                                                                                                          '${containerVarItem.duration.toString()} hours',
                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                fontFamily: 'DM Sans',
                                                                                                                fontSize: 16.0,
                                                                                                                letterSpacing: 0.0,
                                                                                                              ),
                                                                                                        ),
                                                                                                      ),
                                                                                                    ],
                                                                                                  ),
                                                                                                ],
                                                                                              ),
                                                                                              Column(
                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                children: [
                                                                                                  Padding(
                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                    child: Row(
                                                                                                      mainAxisSize: MainAxisSize.max,
                                                                                                      children: [
                                                                                                        Text(
                                                                                                          'Time :',
                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                fontFamily: 'DM Sans',
                                                                                                                fontSize: () {
                                                                                                                  if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                    return 18.0;
                                                                                                                  } else {
                                                                                                                    return 18.0;
                                                                                                                  }
                                                                                                                }(),
                                                                                                                letterSpacing: 0.0,
                                                                                                                fontWeight: FontWeight.w500,
                                                                                                              ),
                                                                                                        ),
                                                                                                        Padding(
                                                                                                          padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                          child: Text(
                                                                                                            '${dateTimeFormat(
                                                                                                              "jm",
                                                                                                              containerVarItem.timing.startTime,
                                                                                                              locale: FFLocalizations.of(context).languageCode,
                                                                                                            )} to ${dateTimeFormat(
                                                                                                              "jm",
                                                                                                              containerVarItem.timing.endTime,
                                                                                                              locale: FFLocalizations.of(context).languageCode,
                                                                                                            )}',
                                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                  fontFamily: 'DM Sans',
                                                                                                                  fontSize: 16.0,
                                                                                                                  letterSpacing: 0.0,
                                                                                                                ),
                                                                                                          ),
                                                                                                        ),
                                                                                                      ],
                                                                                                    ),
                                                                                                  ),
                                                                                                  Padding(
                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                    child: Row(
                                                                                                      mainAxisSize: MainAxisSize.max,
                                                                                                      children: [
                                                                                                        Text(
                                                                                                          'Hourly Pay :',
                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                fontFamily: 'DM Sans',
                                                                                                                fontSize: () {
                                                                                                                  if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                    return 18.0;
                                                                                                                  } else {
                                                                                                                    return 18.0;
                                                                                                                  }
                                                                                                                }(),
                                                                                                                letterSpacing: 0.0,
                                                                                                                fontWeight: FontWeight.w500,
                                                                                                              ),
                                                                                                        ),
                                                                                                        Padding(
                                                                                                          padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                          child: Text(
                                                                                                            valueOrDefault<String>(
                                                                                                              containerVarItem.hourlyPay.toString(),
                                                                                                              'None',
                                                                                                            ),
                                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                  fontFamily: 'DM Sans',
                                                                                                                  fontSize: 16.0,
                                                                                                                  letterSpacing: 0.0,
                                                                                                                ),
                                                                                                          ),
                                                                                                        ),
                                                                                                      ],
                                                                                                    ),
                                                                                                  ),
                                                                                                ],
                                                                                              ),
                                                                                              Column(
                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                children: [
                                                                                                  if (containerVarItem.customDate)
                                                                                                    Padding(
                                                                                                      padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                      child: Row(
                                                                                                        mainAxisSize: MainAxisSize.max,
                                                                                                        children: [
                                                                                                          Text(
                                                                                                            'Date :',
                                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                  fontFamily: 'DM Sans',
                                                                                                                  fontSize: () {
                                                                                                                    if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                      return 16.0;
                                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                      return 16.0;
                                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                      return 18.0;
                                                                                                                    } else {
                                                                                                                      return 18.0;
                                                                                                                    }
                                                                                                                  }(),
                                                                                                                  letterSpacing: 0.0,
                                                                                                                  fontWeight: FontWeight.w500,
                                                                                                                ),
                                                                                                          ),
                                                                                                          Padding(
                                                                                                            padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                            child: Text(
                                                                                                              dateTimeFormat(
                                                                                                                "yMMMd",
                                                                                                                containerVarItem.startDate!,
                                                                                                                locale: FFLocalizations.of(context).languageCode,
                                                                                                              ),
                                                                                                              style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                    fontFamily: 'DM Sans',
                                                                                                                    fontSize: 16.0,
                                                                                                                    letterSpacing: 0.0,
                                                                                                                  ),
                                                                                                            ),
                                                                                                          ),
                                                                                                        ],
                                                                                                      ),
                                                                                                    ),
                                                                                                  if (!containerVarItem.customDate)
                                                                                                    Padding(
                                                                                                      padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                      child: Row(
                                                                                                        mainAxisSize: MainAxisSize.max,
                                                                                                        children: [
                                                                                                          Text(
                                                                                                            'Start Date :',
                                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                  fontFamily: 'DM Sans',
                                                                                                                  fontSize: () {
                                                                                                                    if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                      return 16.0;
                                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                      return 16.0;
                                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                      return 18.0;
                                                                                                                    } else {
                                                                                                                      return 18.0;
                                                                                                                    }
                                                                                                                  }(),
                                                                                                                  letterSpacing: 0.0,
                                                                                                                  fontWeight: FontWeight.w500,
                                                                                                                ),
                                                                                                          ),
                                                                                                          Padding(
                                                                                                            padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                            child: Text(
                                                                                                              dateTimeFormat(
                                                                                                                "yMMMd",
                                                                                                                containerVarItem.startDate!,
                                                                                                                locale: FFLocalizations.of(context).languageCode,
                                                                                                              ),
                                                                                                              style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                    fontFamily: 'DM Sans',
                                                                                                                    fontSize: 16.0,
                                                                                                                    letterSpacing: 0.0,
                                                                                                                  ),
                                                                                                            ),
                                                                                                          ),
                                                                                                        ],
                                                                                                      ),
                                                                                                    ),
                                                                                                  if (!containerVarItem.customDate)
                                                                                                    Padding(
                                                                                                      padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                      child: Row(
                                                                                                        mainAxisSize: MainAxisSize.max,
                                                                                                        children: [
                                                                                                          Text(
                                                                                                            'End Date :',
                                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                  fontFamily: 'DM Sans',
                                                                                                                  fontSize: () {
                                                                                                                    if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                      return 16.0;
                                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                      return 16.0;
                                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                      return 18.0;
                                                                                                                    } else {
                                                                                                                      return 18.0;
                                                                                                                    }
                                                                                                                  }(),
                                                                                                                  letterSpacing: 0.0,
                                                                                                                  fontWeight: FontWeight.w500,
                                                                                                                ),
                                                                                                          ),
                                                                                                          Padding(
                                                                                                            padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                            child: Text(
                                                                                                              dateTimeFormat(
                                                                                                                "yMMMd",
                                                                                                                containerVarItem.endDate!,
                                                                                                                locale: FFLocalizations.of(context).languageCode,
                                                                                                              ),
                                                                                                              style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                    fontFamily: 'DM Sans',
                                                                                                                    fontSize: 16.0,
                                                                                                                    letterSpacing: 0.0,
                                                                                                                  ),
                                                                                                            ),
                                                                                                          ),
                                                                                                        ],
                                                                                                      ),
                                                                                                    ),
                                                                                                  Padding(
                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                    child: Row(
                                                                                                      mainAxisSize: MainAxisSize.max,
                                                                                                      children: [
                                                                                                        Text(
                                                                                                          'Total Pay :',
                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                fontFamily: 'DM Sans',
                                                                                                                fontSize: () {
                                                                                                                  if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                    return 18.0;
                                                                                                                  } else {
                                                                                                                    return 18.0;
                                                                                                                  }
                                                                                                                }(),
                                                                                                                letterSpacing: 0.0,
                                                                                                                fontWeight: FontWeight.w500,
                                                                                                              ),
                                                                                                        ),
                                                                                                        Padding(
                                                                                                          padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                          child: Text(
                                                                                                            valueOrDefault<String>(
                                                                                                              containerVarItem.totalPay.toString(),
                                                                                                              'none',
                                                                                                            ),
                                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                  fontFamily: 'DM Sans',
                                                                                                                  fontSize: 16.0,
                                                                                                                  letterSpacing: 0.0,
                                                                                                                ),
                                                                                                          ),
                                                                                                        ),
                                                                                                      ],
                                                                                                    ),
                                                                                                  ),
                                                                                                ],
                                                                                              ),
                                                                                            ],
                                                                                          ),
                                                                                        ),
                                                                                        if (responsiveVisibility(
                                                                                          context: context,
                                                                                          phone: false,
                                                                                          tablet: false,
                                                                                        ))
                                                                                          Container(
                                                                                            width: 990.0,
                                                                                            decoration: BoxDecoration(),
                                                                                            child: Flex(
                                                                                              direction: () {
                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                  return false;
                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                  return false;
                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                  return true;
                                                                                                } else {
                                                                                                  return true;
                                                                                                }
                                                                                              }()
                                                                                                  ? Axis.horizontal
                                                                                                  : Axis.vertical,
                                                                                              mainAxisSize: MainAxisSize.max,
                                                                                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                              crossAxisAlignment: CrossAxisAlignment.center,
                                                                                              children: [
                                                                                                Flexible(
                                                                                                  child: Padding(
                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                    child: Column(
                                                                                                      mainAxisSize: MainAxisSize.max,
                                                                                                      crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                      children: [
                                                                                                        Text(
                                                                                                          'Description :',
                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                fontFamily: 'DM Sans',
                                                                                                                fontSize: () {
                                                                                                                  if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                    return 16.0;
                                                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                    return 18.0;
                                                                                                                  } else {
                                                                                                                    return 18.0;
                                                                                                                  }
                                                                                                                }(),
                                                                                                                letterSpacing: 0.0,
                                                                                                                fontWeight: FontWeight.w500,
                                                                                                              ),
                                                                                                        ),
                                                                                                        Text(
                                                                                                          valueOrDefault<String>(
                                                                                                            containerVarItem.description,
                                                                                                            'none',
                                                                                                          ),
                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                fontFamily: 'DM Sans',
                                                                                                                fontSize: 16.0,
                                                                                                                letterSpacing: 0.0,
                                                                                                              ),
                                                                                                        ),
                                                                                                      ],
                                                                                                    ),
                                                                                                  ),
                                                                                                ),
                                                                                              ],
                                                                                            ),
                                                                                          ),
                                                                                        if (responsiveVisibility(
                                                                                          context: context,
                                                                                          tabletLandscape: false,
                                                                                          desktop: false,
                                                                                        ))
                                                                                          Container(
                                                                                            width: 990.0,
                                                                                            decoration: BoxDecoration(),
                                                                                            child: Column(
                                                                                              mainAxisSize: MainAxisSize.max,
                                                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                                                              children: [
                                                                                                Padding(
                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                  child: Column(
                                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                                    crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                    children: [
                                                                                                      Text(
                                                                                                        'Description :',
                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                              fontFamily: 'DM Sans',
                                                                                                              fontSize: () {
                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                  return 18.0;
                                                                                                                } else {
                                                                                                                  return 18.0;
                                                                                                                }
                                                                                                              }(),
                                                                                                              letterSpacing: 0.0,
                                                                                                              fontWeight: FontWeight.w500,
                                                                                                            ),
                                                                                                      ),
                                                                                                      Text(
                                                                                                        valueOrDefault<String>(
                                                                                                          containerVarItem.description,
                                                                                                          'none',
                                                                                                        ),
                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                              fontFamily: 'DM Sans',
                                                                                                              fontSize: 16.0,
                                                                                                              letterSpacing: 0.0,
                                                                                                            ),
                                                                                                      ),
                                                                                                    ],
                                                                                                  ),
                                                                                                ),
                                                                                                Padding(
                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                  child: Column(
                                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                                    crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                    children: [
                                                                                                      Text(
                                                                                                        'Skill Criteria :',
                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                              fontFamily: 'DM Sans',
                                                                                                              fontSize: () {
                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                  return 18.0;
                                                                                                                } else {
                                                                                                                  return 18.0;
                                                                                                                }
                                                                                                              }(),
                                                                                                              letterSpacing: 0.0,
                                                                                                              fontWeight: FontWeight.w500,
                                                                                                            ),
                                                                                                      ),
                                                                                                      Builder(
                                                                                                        builder: (context) {
                                                                                                          final skills = containerVarItem.skillCriteria.toList();

                                                                                                          return Wrap(
                                                                                                            spacing: 10.0,
                                                                                                            runSpacing: 5.0,
                                                                                                            alignment: WrapAlignment.start,
                                                                                                            crossAxisAlignment: WrapCrossAlignment.start,
                                                                                                            direction: Axis.horizontal,
                                                                                                            runAlignment: WrapAlignment.start,
                                                                                                            verticalDirection: VerticalDirection.down,
                                                                                                            clipBehavior: Clip.none,
                                                                                                            children: List.generate(skills.length, (skillsIndex) {
                                                                                                              final skillsItem = skills[skillsIndex];
                                                                                                              return Text(
                                                                                                                skillsItem,
                                                                                                                style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                      fontFamily: 'DM Sans',
                                                                                                                      fontSize: 16.0,
                                                                                                                      letterSpacing: 0.0,
                                                                                                                    ),
                                                                                                              );
                                                                                                            }),
                                                                                                          );
                                                                                                        },
                                                                                                      ),
                                                                                                    ],
                                                                                                  ),
                                                                                                ),
                                                                                              ],
                                                                                            ),
                                                                                          ),
                                                                                      ],
                                                                                    ),
                                                                                    Padding(
                                                                                      padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                      child: Column(
                                                                                        mainAxisSize: MainAxisSize.max,
                                                                                        mainAxisAlignment: MainAxisAlignment.end,
                                                                                        crossAxisAlignment: CrossAxisAlignment.start,
                                                                                        children: [
                                                                                          Text(
                                                                                            'Location :',
                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                  fontFamily: 'DM Sans',
                                                                                                  fontSize: () {
                                                                                                    if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                      return 16.0;
                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                      return 16.0;
                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                      return 18.0;
                                                                                                    } else {
                                                                                                      return 18.0;
                                                                                                    }
                                                                                                  }(),
                                                                                                  letterSpacing: 0.0,
                                                                                                  fontWeight: FontWeight.w500,
                                                                                                ),
                                                                                          ),
                                                                                          Padding(
                                                                                            padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                            child: wrapWithModel(
                                                                                              model: _model.customMapModels2.getModel(
                                                                                                functions.generateUniqueId(),
                                                                                                containerVarIndex,
                                                                                              ),
                                                                                              updateCallback: () => safeSetState(() {}),
                                                                                              child: CustomMapWidget(
                                                                                                key: Key(
                                                                                                  'Keyia3_${functions.generateUniqueId()}',
                                                                                                ),
                                                                                                latlng: containerVarItem.latlng!,
                                                                                                address: containerVarItem.fullAddress,
                                                                                              ),
                                                                                            ),
                                                                                          ),
                                                                                        ],
                                                                                      ),
                                                                                    ),
                                                                                  ],
                                                                                ),
                                                                              ],
                                                                            ),
                                                                          ),
                                                                        ),
                                                                      ),
                                                                    );
                                                                  },
                                                                );
                                                              },
                                                            ),
                                                          );
                                                        },
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                              ),
                                              Padding(
                                                padding: EdgeInsetsDirectional
                                                    .fromSTEB(
                                                        0.0, 28.0, 0.0, 0.0),
                                                child: SingleChildScrollView(
                                                  primary: false,
                                                  child: Column(
                                                    mainAxisSize:
                                                        MainAxisSize.max,
                                                    crossAxisAlignment:
                                                        CrossAxisAlignment
                                                            .start,
                                                    children: [
                                                      Padding(
                                                        padding:
                                                            EdgeInsetsDirectional
                                                                .fromSTEB(
                                                                    0.0,
                                                                    0.0,
                                                                    0.0,
                                                                    15.0),
                                                        child: Row(
                                                          mainAxisSize:
                                                              MainAxisSize.max,
                                                          mainAxisAlignment:
                                                              MainAxisAlignment
                                                                  .spaceBetween,
                                                          crossAxisAlignment:
                                                              CrossAxisAlignment
                                                                  .center,
                                                          children: [
                                                            Text(
                                                              'Applied',
                                                              style: FlutterFlowTheme
                                                                      .of(context)
                                                                  .headlineLarge
                                                                  .override(
                                                                    fontFamily:
                                                                        'DM Sans',
                                                                    fontSize:
                                                                        () {
                                                                      if (MediaQuery.sizeOf(context)
                                                                              .width <
                                                                          kBreakpointSmall) {
                                                                        return 20.0;
                                                                      } else if (MediaQuery.sizeOf(context)
                                                                              .width <
                                                                          kBreakpointMedium) {
                                                                        return 20.0;
                                                                      } else if (MediaQuery.sizeOf(context)
                                                                              .width <
                                                                          kBreakpointLarge) {
                                                                        return 24.0;
                                                                      } else {
                                                                        return 24.0;
                                                                      }
                                                                    }(),
                                                                    letterSpacing:
                                                                        0.0,
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .bold,
                                                                  ),
                                                            ),
                                                            Row(
                                                              mainAxisSize:
                                                                  MainAxisSize
                                                                      .max,
                                                              children: [
                                                                Container(
                                                                  width: 125.0,
                                                                  decoration:
                                                                      BoxDecoration(),
                                                                  child:
                                                                      Padding(
                                                                    padding: EdgeInsetsDirectional
                                                                        .fromSTEB(
                                                                            0.0,
                                                                            5.0,
                                                                            20.0,
                                                                            0.0),
                                                                    child: FlutterFlowDropDown<
                                                                        String>(
                                                                      controller: _model
                                                                              .filterStatusValueController ??=
                                                                          FormFieldController<
                                                                              String>(
                                                                        _model.filterStatusValue ??=
                                                                            'All',
                                                                      ),
                                                                      options: [
                                                                        'All',
                                                                        'Applied',
                                                                        'Hired'
                                                                      ],
                                                                      onChanged:
                                                                          (val) async {
                                                                        safeSetState(() =>
                                                                            _model.filterStatusValue =
                                                                                val);
                                                                        safeSetState(
                                                                            () {});
                                                                      },
                                                                      width: MediaQuery.sizeOf(context)
                                                                              .width *
                                                                          0.19,
                                                                      height:
                                                                          40.0,
                                                                      textStyle: FlutterFlowTheme.of(
                                                                              context)
                                                                          .bodyMedium
                                                                          .override(
                                                                            fontFamily:
                                                                                'DM Sans',
                                                                            fontSize:
                                                                                18.0,
                                                                            letterSpacing:
                                                                                0.0,
                                                                            fontWeight:
                                                                                FontWeight.w500,
                                                                          ),
                                                                      hintText:
                                                                          'All',
                                                                      icon:
                                                                          Icon(
                                                                        Icons
                                                                            .keyboard_arrow_down_rounded,
                                                                        color: FlutterFlowTheme.of(context)
                                                                            .secondaryText,
                                                                        size:
                                                                            24.0,
                                                                      ),
                                                                      fillColor:
                                                                          FlutterFlowTheme.of(context)
                                                                              .secondaryBackground,
                                                                      elevation:
                                                                          2.0,
                                                                      borderColor:
                                                                          Color(
                                                                              0xFFC0D1DC),
                                                                      borderWidth:
                                                                          0.0,
                                                                      borderRadius:
                                                                          8.0,
                                                                      margin: EdgeInsetsDirectional.fromSTEB(
                                                                          12.0,
                                                                          0.0,
                                                                          12.0,
                                                                          0.0),
                                                                      hidesUnderline:
                                                                          true,
                                                                      isOverButton:
                                                                          false,
                                                                      isSearchable:
                                                                          false,
                                                                      isMultiSelect:
                                                                          false,
                                                                    ),
                                                                  ),
                                                                ),
                                                                Stack(
                                                                  alignment:
                                                                      AlignmentDirectional(
                                                                          1.0,
                                                                          -1.0),
                                                                  children: [
                                                                    Padding(
                                                                      padding: EdgeInsetsDirectional.fromSTEB(
                                                                          0.0,
                                                                          5.0,
                                                                          5.0,
                                                                          0.0),
                                                                      child:
                                                                          FFButtonWidget(
                                                                        onPressed:
                                                                            () async {
                                                                          context
                                                                              .pushNamed(FilterMobilePageWidget.routeName);
                                                                        },
                                                                        text:
                                                                            'Filters',
                                                                        icon:
                                                                            Icon(
                                                                          Icons
                                                                              .filter_list,
                                                                          size:
                                                                              28.0,
                                                                        ),
                                                                        options:
                                                                            FFButtonOptions(
                                                                          height:
                                                                              40.0,
                                                                          padding: EdgeInsetsDirectional.fromSTEB(
                                                                              12.0,
                                                                              8.0,
                                                                              12.0,
                                                                              8.0),
                                                                          iconPadding: EdgeInsetsDirectional.fromSTEB(
                                                                              0.0,
                                                                              0.0,
                                                                              0.0,
                                                                              0.0),
                                                                          color:
                                                                              FlutterFlowTheme.of(context).secondaryBackground,
                                                                          textStyle: FlutterFlowTheme.of(context)
                                                                              .titleSmall
                                                                              .override(
                                                                                fontFamily: 'DM Sans',
                                                                                color: Color(0xFF292D32),
                                                                                fontSize: () {
                                                                                  if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                    return 14.0;
                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                    return 14.0;
                                                                                  } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                    return 18.0;
                                                                                  } else {
                                                                                    return 18.0;
                                                                                  }
                                                                                }(),
                                                                                letterSpacing: 0.0,
                                                                                fontWeight: FontWeight.w500,
                                                                              ),
                                                                          elevation:
                                                                              0.0,
                                                                          borderSide:
                                                                              BorderSide(
                                                                            color:
                                                                                Color(0xFFC0D1DC),
                                                                            width:
                                                                                1.0,
                                                                          ),
                                                                          borderRadius:
                                                                              BorderRadius.circular(8.0),
                                                                        ),
                                                                      ),
                                                                    ),
                                                                    if ((FFAppState().FilterStartDate !=
                                                                            null) &&
                                                                        (FFAppState().FilterEndDate !=
                                                                            null))
                                                                      Container(
                                                                        width:
                                                                            15.0,
                                                                        height:
                                                                            15.0,
                                                                        decoration:
                                                                            BoxDecoration(
                                                                          color:
                                                                              FlutterFlowTheme.of(context).primary,
                                                                          shape:
                                                                              BoxShape.circle,
                                                                        ),
                                                                      ),
                                                                  ],
                                                                ),
                                                              ],
                                                            ),
                                                          ],
                                                        ),
                                                      ),
                                                      StreamBuilder<
                                                          List<
                                                              JobDetailsRecord>>(
                                                        stream:
                                                            queryJobDetailsRecord(),
                                                        builder: (context,
                                                            snapshot) {
                                                          // Customize what your widget looks like when it's loading.
                                                          if (!snapshot
                                                              .hasData) {
                                                            return Center(
                                                              child: SizedBox(
                                                                width: 50.0,
                                                                height: 50.0,
                                                                child:
                                                                    CircularProgressIndicator(
                                                                  valueColor:
                                                                      AlwaysStoppedAnimation<
                                                                          Color>(
                                                                    FlutterFlowTheme.of(
                                                                            context)
                                                                        .primary,
                                                                  ),
                                                                ),
                                                              ),
                                                            );
                                                          }
                                                          List<JobDetailsRecord>
                                                              containerJobDetailsRecordList =
                                                              snapshot.data!;

                                                          return Container(
                                                            decoration:
                                                                BoxDecoration(),
                                                            child: Builder(
                                                              builder:
                                                                  (context) {
                                                                final containerVar = (FFAppState().sortFilter ==
                                                                            'otn'
                                                                        ? containerJobDetailsRecordList.where((e) => e.providerApplied.contains(jobseekerDashboardProviderDetailRecord?.reference) && (FFAppState().urgentJob == true ? (e.isUrgentJob == true) : true) && ((FFAppState().FilterStartDate != null) && (FFAppState().FilterEndDate != null) ? functions.isDateBetween(e.startDate!, FFAppState().FilterStartDate!, FFAppState().FilterEndDate!) : true)).toList().sortedList(
                                                                            keyOf: (e) => e
                                                                                .createdAt!,
                                                                            desc:
                                                                                false)
                                                                        : containerJobDetailsRecordList
                                                                            .where((e) =>
                                                                                e.providerApplied.contains(jobseekerDashboardProviderDetailRecord?.reference) &&
                                                                                (FFAppState().urgentJob == true ? (e.isUrgentJob == true) : true) &&
                                                                                ((FFAppState().FilterStartDate != null) && (FFAppState().FilterEndDate != null) ? functions.isDateBetween(e.startDate!, FFAppState().FilterStartDate!, FFAppState().FilterEndDate!) : true))
                                                                            .toList()
                                                                            .sortedList(keyOf: (e) => e.createdAt!, desc: true))
                                                                    .toList();
                                                                if (containerVar
                                                                    .isEmpty) {
                                                                  return EmptyWidget(
                                                                    message:
                                                                        'No My Job',
                                                                  );
                                                                }

                                                                return ListView
                                                                    .builder(
                                                                  padding:
                                                                      EdgeInsets
                                                                          .fromLTRB(
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    500.0,
                                                                  ),
                                                                  primary:
                                                                      false,
                                                                  shrinkWrap:
                                                                      true,
                                                                  scrollDirection:
                                                                      Axis.vertical,
                                                                  itemCount:
                                                                      containerVar
                                                                          .length,
                                                                  itemBuilder:
                                                                      (context,
                                                                          containerVarIndex) {
                                                                    final containerVarItem =
                                                                        containerVar[
                                                                            containerVarIndex];
                                                                    return StreamBuilder<
                                                                        List<
                                                                            AppliedJobRecord>>(
                                                                      stream:
                                                                          queryAppliedJobRecord(
                                                                        queryBuilder: (appliedJobRecord) => appliedJobRecord
                                                                            .where(
                                                                              'job',
                                                                              isEqualTo: containerVarItem.reference,
                                                                            )
                                                                            .where(
                                                                              'user',
                                                                              isEqualTo: currentUserReference,
                                                                            ),
                                                                        singleRecord:
                                                                            true,
                                                                      ),
                                                                      builder:
                                                                          (context,
                                                                              snapshot) {
                                                                        // Customize what your widget looks like when it's loading.
                                                                        if (!snapshot
                                                                            .hasData) {
                                                                          return Center(
                                                                            child:
                                                                                SizedBox(
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
                                                                        List<AppliedJobRecord>
                                                                            containerAppliedJobRecordList =
                                                                            snapshot.data!;
                                                                        final containerAppliedJobRecord = containerAppliedJobRecordList.isNotEmpty
                                                                            ? containerAppliedJobRecordList.first
                                                                            : null;

                                                                        return Container(
                                                                          decoration:
                                                                              BoxDecoration(),
                                                                          child:
                                                                              Builder(
                                                                            builder:
                                                                                (context) {
                                                                              if (_model.filterStatusValue == 'All' ? true : (_model.filterStatusValue == containerAppliedJobRecord?.appliedJobStatus)) {
                                                                                return Padding(
                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 25.0),
                                                                                  child: Container(
                                                                                    width: () {
                                                                                      if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                        return 335.0;
                                                                                      } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                        return 335.0;
                                                                                      } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                        return 1522.0;
                                                                                      } else {
                                                                                        return 1522.0;
                                                                                      }
                                                                                    }(),
                                                                                    decoration: BoxDecoration(
                                                                                      color: FlutterFlowTheme.of(context).secondaryBackground,
                                                                                      borderRadius: BorderRadius.circular(20.0),
                                                                                      border: Border.all(
                                                                                        color: Color(0xFFE8E8EC),
                                                                                        width: 1.0,
                                                                                      ),
                                                                                    ),
                                                                                    child: Padding(
                                                                                      padding: EdgeInsets.all(15.0),
                                                                                      child: SingleChildScrollView(
                                                                                        child: Column(
                                                                                          mainAxisSize: MainAxisSize.max,
                                                                                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                                                                                          crossAxisAlignment: CrossAxisAlignment.start,
                                                                                          children: [
                                                                                            Padding(
                                                                                              padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 20.0),
                                                                                              child: Row(
                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                                children: [
                                                                                                  Text(
                                                                                                    containerVarItem.subRole,
                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                          fontFamily: 'DM Sans',
                                                                                                          letterSpacing: 0.0,
                                                                                                          fontWeight: FontWeight.w500,
                                                                                                        ),
                                                                                                  ),
                                                                                                  Align(
                                                                                                    alignment: AlignmentDirectional(1.0, 0.0),
                                                                                                    child: Text(
                                                                                                      dateTimeFormat(
                                                                                                        "relative",
                                                                                                        containerVarItem.createdAt!,
                                                                                                        locale: FFLocalizations.of(context).languageCode,
                                                                                                      ),
                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                            fontFamily: 'DM Sans',
                                                                                                            color: FlutterFlowTheme.of(context).primary,
                                                                                                            fontSize: 16.0,
                                                                                                            letterSpacing: 0.0,
                                                                                                            fontWeight: FontWeight.w500,
                                                                                                          ),
                                                                                                    ),
                                                                                                  ),
                                                                                                ],
                                                                                              ),
                                                                                            ),
                                                                                            Padding(
                                                                                              padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 10.0),
                                                                                              child: Column(
                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                children: [
                                                                                                  Row(
                                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                                    crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                    children: [
                                                                                                      StreamBuilder<UsersRecord>(
                                                                                                        stream: UsersRecord.getDocument(containerVarItem.createdBy!),
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

                                                                                                          final circleImageUsersRecord = snapshot.data!;

                                                                                                          return Container(
                                                                                                            width: 60.0,
                                                                                                            height: 60.0,
                                                                                                            clipBehavior: Clip.antiAlias,
                                                                                                            decoration: BoxDecoration(
                                                                                                              shape: BoxShape.circle,
                                                                                                            ),
                                                                                                            child: Image.network(
                                                                                                              valueOrDefault<String>(
                                                                                                                circleImageUsersRecord.photoUrl,
                                                                                                                'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg',
                                                                                                              ),
                                                                                                              fit: BoxFit.cover,
                                                                                                            ),
                                                                                                          );
                                                                                                        },
                                                                                                      ),
                                                                                                      Flexible(
                                                                                                        child: Padding(
                                                                                                          padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 7.0, 10.0),
                                                                                                          child: Column(
                                                                                                            mainAxisSize: MainAxisSize.max,
                                                                                                            crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                            children: [
                                                                                                              Text(
                                                                                                                valueOrDefault<String>(
                                                                                                                  containerVarItem.jobName,
                                                                                                                  'none',
                                                                                                                ),
                                                                                                                style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                      fontFamily: 'DM Sans',
                                                                                                                      fontSize: () {
                                                                                                                        if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                          return 18.0;
                                                                                                                        } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                          return 18.0;
                                                                                                                        } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                          return 20.0;
                                                                                                                        } else {
                                                                                                                          return 20.0;
                                                                                                                        }
                                                                                                                      }(),
                                                                                                                      letterSpacing: 0.0,
                                                                                                                      fontWeight: FontWeight.bold,
                                                                                                                    ),
                                                                                                              ),
                                                                                                              Padding(
                                                                                                                padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                                child: RichText(
                                                                                                                  textScaler: MediaQuery.of(context).textScaler,
                                                                                                                  text: TextSpan(
                                                                                                                    children: [
                                                                                                                      TextSpan(
                                                                                                                        text: 'Job Id : ',
                                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                              fontFamily: 'DM Sans',
                                                                                                                              color: Color(0xFF89969F),
                                                                                                                              fontSize: () {
                                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                                  return 16.0;
                                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                                  return 16.0;
                                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                                  return 20.0;
                                                                                                                                } else {
                                                                                                                                  return 20.0;
                                                                                                                                }
                                                                                                                              }(),
                                                                                                                              letterSpacing: 0.0,
                                                                                                                            ),
                                                                                                                      ),
                                                                                                                      TextSpan(
                                                                                                                        text: valueOrDefault<String>(
                                                                                                                          containerVarItem.jobId,
                                                                                                                          'none',
                                                                                                                        ),
                                                                                                                        style: TextStyle(),
                                                                                                                      )
                                                                                                                    ],
                                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                          fontFamily: 'DM Sans',
                                                                                                                          color: Color(0xFF89969F),
                                                                                                                          fontSize: () {
                                                                                                                            if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                              return 16.0;
                                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                              return 16.0;
                                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                              return 20.0;
                                                                                                                            } else {
                                                                                                                              return 20.0;
                                                                                                                            }
                                                                                                                          }(),
                                                                                                                          letterSpacing: 0.0,
                                                                                                                        ),
                                                                                                                  ),
                                                                                                                ),
                                                                                                              ),
                                                                                                              Align(
                                                                                                                alignment: AlignmentDirectional(-1.0, 0.0),
                                                                                                                child: Padding(
                                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 5.0, 0.0, 0.0),
                                                                                                                  child: Text(
                                                                                                                    'From ${containerVarItem.fromBusiness}',
                                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                          fontFamily: 'DM Sans',
                                                                                                                          fontSize: () {
                                                                                                                            if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                              return 16.0;
                                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                              return 16.0;
                                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                              return 18.0;
                                                                                                                            } else {
                                                                                                                              return 18.0;
                                                                                                                            }
                                                                                                                          }(),
                                                                                                                          letterSpacing: 0.0,
                                                                                                                          fontWeight: FontWeight.w600,
                                                                                                                        ),
                                                                                                                  ),
                                                                                                                ),
                                                                                                              ),
                                                                                                            ],
                                                                                                          ),
                                                                                                        ),
                                                                                                      ),
                                                                                                    ].divide(SizedBox(width: 25.0)),
                                                                                                  ),
                                                                                                  Flex(
                                                                                                    direction: () {
                                                                                                      if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                        return false;
                                                                                                      } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                        return false;
                                                                                                      } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                        return true;
                                                                                                      } else {
                                                                                                        return true;
                                                                                                      }
                                                                                                    }()
                                                                                                        ? Axis.horizontal
                                                                                                        : Axis.vertical,
                                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                                    crossAxisAlignment: CrossAxisAlignment.center,
                                                                                                    children: [
                                                                                                      Visibility(
                                                                                                        visible: responsiveVisibility(
                                                                                                          context: context,
                                                                                                          tabletLandscape: false,
                                                                                                          desktop: false,
                                                                                                        ),
                                                                                                        child: Row(
                                                                                                          mainAxisSize: MainAxisSize.max,
                                                                                                          mainAxisAlignment: MainAxisAlignment.end,
                                                                                                          children: [
                                                                                                            Row(
                                                                                                              mainAxisSize: MainAxisSize.max,
                                                                                                              children: [
                                                                                                                Padding(
                                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 10.0),
                                                                                                                  child: FFButtonWidget(
                                                                                                                    onPressed: () {
                                                                                                                      print('Button pressed ...');
                                                                                                                    },
                                                                                                                    text: containerAppliedJobRecord!.appliedJobStatus,
                                                                                                                    options: FFButtonOptions(
                                                                                                                      width: 95.0,
                                                                                                                      height: 40.0,
                                                                                                                      padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                                                                                                                      iconPadding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                                                                                                                      color: Color(0x354FB0F0),
                                                                                                                      textStyle: FlutterFlowTheme.of(context).titleSmall.override(
                                                                                                                            fontFamily: 'DM Sans',
                                                                                                                            color: FlutterFlowTheme.of(context).primaryText,
                                                                                                                            letterSpacing: 0.0,
                                                                                                                          ),
                                                                                                                      elevation: 0.0,
                                                                                                                      borderSide: BorderSide(
                                                                                                                        color: Color(0xFF4FB0F0),
                                                                                                                      ),
                                                                                                                      borderRadius: BorderRadius.circular(38.0),
                                                                                                                    ),
                                                                                                                  ),
                                                                                                                ),
                                                                                                                if (containerVarItem.chatsUser.contains(currentUserReference))
                                                                                                                  Align(
                                                                                                                    alignment: AlignmentDirectional(1.0, 0.0),
                                                                                                                    child: FlutterFlowIconButton(
                                                                                                                      borderColor: FlutterFlowTheme.of(context).primary,
                                                                                                                      borderRadius: 8.0,
                                                                                                                      buttonSize: 40.0,
                                                                                                                      fillColor: FlutterFlowTheme.of(context).accent1,
                                                                                                                      icon: Icon(
                                                                                                                        Icons.mark_chat_unread,
                                                                                                                        color: FlutterFlowTheme.of(context).primary,
                                                                                                                        size: 24.0,
                                                                                                                      ),
                                                                                                                      onPressed: () async {
                                                                                                                        context.pushNamed(
                                                                                                                          MessageScreenWidget.routeName,
                                                                                                                          queryParameters: {
                                                                                                                            'chat': serializeParam(
                                                                                                                              containerVarItem.chat,
                                                                                                                              ParamType.DocumentReference,
                                                                                                                            ),
                                                                                                                            'name': serializeParam(
                                                                                                                              containerVarItem.jobName,
                                                                                                                              ParamType.String,
                                                                                                                            ),
                                                                                                                          }.withoutNulls,
                                                                                                                        );
                                                                                                                      },
                                                                                                                    ),
                                                                                                                  ),
                                                                                                              ].divide(SizedBox(width: 25.0)),
                                                                                                            ),
                                                                                                          ],
                                                                                                        ),
                                                                                                      ),
                                                                                                      Visibility(
                                                                                                        visible: responsiveVisibility(
                                                                                                          context: context,
                                                                                                          phone: false,
                                                                                                          tablet: false,
                                                                                                        ),
                                                                                                        child: Align(
                                                                                                          alignment: AlignmentDirectional(-1.0, 0.0),
                                                                                                          child: Text(
                                                                                                            'Medical laboratory technologist',
                                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                  fontFamily: 'DM Sans',
                                                                                                                  fontSize: () {
                                                                                                                    if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                      return 16.0;
                                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                      return 16.0;
                                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                      return 18.0;
                                                                                                                    } else {
                                                                                                                      return 18.0;
                                                                                                                    }
                                                                                                                  }(),
                                                                                                                  letterSpacing: 0.0,
                                                                                                                  fontWeight: FontWeight.w600,
                                                                                                                ),
                                                                                                          ),
                                                                                                        ),
                                                                                                      ),
                                                                                                      Visibility(
                                                                                                        visible: responsiveVisibility(
                                                                                                          context: context,
                                                                                                          phone: false,
                                                                                                          tablet: false,
                                                                                                        ),
                                                                                                        child: SizedBox(
                                                                                                          height: 20.0,
                                                                                                          child: VerticalDivider(
                                                                                                            thickness: 2.0,
                                                                                                            color: FlutterFlowTheme.of(context).alternate,
                                                                                                          ),
                                                                                                        ),
                                                                                                      ),
                                                                                                    ],
                                                                                                  ),
                                                                                                  Row(
                                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                                    crossAxisAlignment: CrossAxisAlignment.center,
                                                                                                    children: [
                                                                                                      if (containerAppliedJobRecord.appliedJobStatus == 'Applied')
                                                                                                        Flexible(
                                                                                                          child: Padding(
                                                                                                            padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                            child: FFButtonWidget(
                                                                                                              onPressed: () async {
                                                                                                                _model.appliedJOb = await queryAppliedJobRecordOnce(
                                                                                                                  queryBuilder: (appliedJobRecord) => appliedJobRecord
                                                                                                                      .where(
                                                                                                                        'job',
                                                                                                                        isEqualTo: containerVarItem.reference,
                                                                                                                      )
                                                                                                                      .where(
                                                                                                                        'user',
                                                                                                                        isEqualTo: currentUserReference,
                                                                                                                      ),
                                                                                                                  singleRecord: true,
                                                                                                                ).then((s) => s.firstOrNull);

                                                                                                                await containerVarItem.reference.update({
                                                                                                                  ...mapToFirestore(
                                                                                                                    {
                                                                                                                      'ProviderApplied': FieldValue.arrayRemove([
                                                                                                                        jobseekerDashboardProviderDetailRecord?.reference
                                                                                                                      ]),
                                                                                                                      'chat': FieldValue.delete(),
                                                                                                                      'chatsUser': FieldValue.arrayRemove([currentUserReference]),
                                                                                                                    },
                                                                                                                  ),
                                                                                                                });

                                                                                                                await currentUserReference!.update({
                                                                                                                  ...mapToFirestore(
                                                                                                                    {
                                                                                                                      'bookedSolts': FieldValue.arrayRemove([
                                                                                                                        getSlotsFirestoreData(
                                                                                                                          updateSlotsStruct(
                                                                                                                            functions.removeSlots(containerVarItem.reference, (currentUserDocument?.bookedSolts.toList() ?? []).toList()),
                                                                                                                            clearUnsetFields: false,
                                                                                                                          ),
                                                                                                                          true,
                                                                                                                        )
                                                                                                                      ]),
                                                                                                                    },
                                                                                                                  ),
                                                                                                                });
                                                                                                                _model.chat = await queryChatsRecordOnce(
                                                                                                                  queryBuilder: (chatsRecord) => chatsRecord
                                                                                                                      .where(
                                                                                                                        'worker',
                                                                                                                        isEqualTo: currentUserReference,
                                                                                                                      )
                                                                                                                      .where(
                                                                                                                        'recruiter',
                                                                                                                        isEqualTo: containerVarItem.createdBy,
                                                                                                                      ),
                                                                                                                  singleRecord: true,
                                                                                                                ).then((s) => s.firstOrNull);
                                                                                                                await _model.chat!.reference.delete();
                                                                                                                triggerPushNotification(
                                                                                                                  notificationTitle: 'Cancelled Application Job !',
                                                                                                                  notificationText: '${valueOrDefault<String>(
                                                                                                                    '${jobseekerDashboardProviderDetailRecord?.personalinformation.firstName} ${jobseekerDashboardProviderDetailRecord?.personalinformation.lastName}',
                                                                                                                    'Uknown',
                                                                                                                  )} is canceled your Job, Please check once.',
                                                                                                                  notificationImageUrl: jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != null && jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != '' ? jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture : 'https://firebasestorage.googleapis.com/v0/b/backup13thfeb-a0ssgv.firebasestorage.app/o/images.jpeg?alt=media&token=697aad83-ed8a-48e8-85c1-cefd8599922a',
                                                                                                                  notificationSound: 'default',
                                                                                                                  userRefs: [containerVarItem.createdBy!],
                                                                                                                  initialPageName: 'AdminAlljob',
                                                                                                                  parameterData: {
                                                                                                                    'jobid': containerVarItem.reference,
                                                                                                                  },
                                                                                                                );

                                                                                                                await NotificationsRecord.collection.doc().set({
                                                                                                                  ...createNotificationsRecordData(
                                                                                                                    fromUser: currentUserReference,
                                                                                                                    job: containerVarItem.reference,
                                                                                                                    message: '${valueOrDefault<String>(
                                                                                                                      '${jobseekerDashboardProviderDetailRecord?.personalinformation.firstName} ${jobseekerDashboardProviderDetailRecord?.personalinformation.lastName}',
                                                                                                                      'Uknown',
                                                                                                                    )} is canceled your Job, Please check once.',
                                                                                                                    subject: 'Cancelled Application Job !',
                                                                                                                    time: getCurrentTimestamp,
                                                                                                                    type: 'Cancel',
                                                                                                                    image: jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != null && jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != '' ? jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture : 'https://firebasestorage.googleapis.com/v0/b/backup13thfeb-a0ssgv.firebasestorage.app/o/images.jpeg?alt=media&token=697aad83-ed8a-48e8-85c1-cefd8599922a',
                                                                                                                  ),
                                                                                                                  ...mapToFirestore(
                                                                                                                    {
                                                                                                                      'toUsers': [containerVarItem.createdBy],
                                                                                                                    },
                                                                                                                  ),
                                                                                                                });

                                                                                                                await NotificationsRecord.collection.doc().set({
                                                                                                                  ...createNotificationsRecordData(
                                                                                                                    fromUser: currentUserReference,
                                                                                                                    job: containerVarItem.reference,
                                                                                                                    message: 'You Cancelled this Job !',
                                                                                                                    subject: 'You Cancelled Job!',
                                                                                                                    time: getCurrentTimestamp,
                                                                                                                    type: 'Apply',
                                                                                                                    image: jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != null && jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != '' ? jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture : 'https://firebasestorage.googleapis.com/v0/b/backup13thfeb-a0ssgv.firebasestorage.app/o/images.jpeg?alt=media&token=697aad83-ed8a-48e8-85c1-cefd8599922a',
                                                                                                                  ),
                                                                                                                  ...mapToFirestore(
                                                                                                                    {
                                                                                                                      'toUsers': [currentUserReference],
                                                                                                                    },
                                                                                                                  ),
                                                                                                                });
                                                                                                                await _model.appliedJOb!.reference.delete();

                                                                                                                safeSetState(() {});
                                                                                                              },
                                                                                                              text: 'Cancel applied',
                                                                                                              options: FFButtonOptions(
                                                                                                                width: double.infinity,
                                                                                                                height: 46.0,
                                                                                                                padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                                                                                                                iconPadding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                                                                                                                color: Color(0xFF22577A),
                                                                                                                textStyle: FlutterFlowTheme.of(context).titleSmall.override(
                                                                                                                      fontFamily: 'DM Sans',
                                                                                                                      color: Colors.white,
                                                                                                                      letterSpacing: 0.0,
                                                                                                                    ),
                                                                                                                elevation: 0.0,
                                                                                                                borderRadius: BorderRadius.circular(8.0),
                                                                                                              ),
                                                                                                            ),
                                                                                                          ),
                                                                                                        ),
                                                                                                    ].divide(SizedBox(width: 25.0)),
                                                                                                  ),
                                                                                                  if (containerVarItem.hiredApplicant == currentUserReference)
                                                                                                    Padding(
                                                                                                      padding: EdgeInsetsDirectional.fromSTEB(0.0, 15.0, 0.0, 25.0),
                                                                                                      child: Column(
                                                                                                        mainAxisSize: MainAxisSize.max,
                                                                                                        crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                        children: [
                                                                                                          Padding(
                                                                                                            padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 10.0),
                                                                                                            child: Text(
                                                                                                              'Attendance List',
                                                                                                              style: FlutterFlowTheme.of(context).headlineLarge.override(
                                                                                                                    fontFamily: 'DM Sans',
                                                                                                                    fontSize: () {
                                                                                                                      if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                        return 20.0;
                                                                                                                      } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                        return 20.0;
                                                                                                                      } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                        return 22.0;
                                                                                                                      } else {
                                                                                                                        return 22.0;
                                                                                                                      }
                                                                                                                    }(),
                                                                                                                    letterSpacing: 0.0,
                                                                                                                    fontWeight: FontWeight.bold,
                                                                                                                  ),
                                                                                                            ),
                                                                                                          ),
                                                                                                          Builder(
                                                                                                            builder: (context) {
                                                                                                              final attendance = containerVarItem.attendanceJob.toList();

                                                                                                              return Column(
                                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                                children: List.generate(attendance.length, (attendanceIndex) {
                                                                                                                  final attendanceItem = attendance[attendanceIndex];
                                                                                                                  return Visibility(
                                                                                                                    visible: functions.isDatePassed(attendanceItem.date!),
                                                                                                                    child: Container(
                                                                                                                      width: double.infinity,
                                                                                                                      decoration: BoxDecoration(
                                                                                                                        color: FlutterFlowTheme.of(context).secondaryBackground,
                                                                                                                        borderRadius: BorderRadius.circular(12.0),
                                                                                                                        border: Border.all(
                                                                                                                          color: FlutterFlowTheme.of(context).primary,
                                                                                                                        ),
                                                                                                                      ),
                                                                                                                      child: Padding(
                                                                                                                        padding: EdgeInsets.all(10.0),
                                                                                                                        child: Column(
                                                                                                                          mainAxisSize: MainAxisSize.max,
                                                                                                                          crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                                          children: [
                                                                                                                            Row(
                                                                                                                              mainAxisSize: MainAxisSize.max,
                                                                                                                              children: [
                                                                                                                                Text(
                                                                                                                                  'Date : ',
                                                                                                                                  style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                                        fontFamily: 'DM Sans',
                                                                                                                                        fontSize: 16.0,
                                                                                                                                        letterSpacing: 0.0,
                                                                                                                                        fontWeight: FontWeight.w500,
                                                                                                                                      ),
                                                                                                                                ),
                                                                                                                                Text(
                                                                                                                                  dateTimeFormat(
                                                                                                                                    "yMMMd",
                                                                                                                                    attendanceItem.date!,
                                                                                                                                    locale: FFLocalizations.of(context).languageCode,
                                                                                                                                  ),
                                                                                                                                  style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                                        fontFamily: 'DM Sans',
                                                                                                                                        color: FlutterFlowTheme.of(context).primary,
                                                                                                                                        fontSize: 16.0,
                                                                                                                                        letterSpacing: 0.0,
                                                                                                                                        fontWeight: FontWeight.w500,
                                                                                                                                      ),
                                                                                                                                ),
                                                                                                                              ],
                                                                                                                            ),
                                                                                                                            Row(
                                                                                                                              mainAxisSize: MainAxisSize.max,
                                                                                                                              children: [
                                                                                                                                Text(
                                                                                                                                  'ArrivalTime : ',
                                                                                                                                  style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                                        fontFamily: 'DM Sans',
                                                                                                                                        fontSize: 16.0,
                                                                                                                                        letterSpacing: 0.0,
                                                                                                                                        fontWeight: FontWeight.w500,
                                                                                                                                      ),
                                                                                                                                ),
                                                                                                                                Text(
                                                                                                                                  dateTimeFormat(
                                                                                                                                    "jm",
                                                                                                                                    attendanceItem.arrivalTime!,
                                                                                                                                    locale: FFLocalizations.of(context).languageCode,
                                                                                                                                  ),
                                                                                                                                  style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                                        fontFamily: 'DM Sans',
                                                                                                                                        color: FlutterFlowTheme.of(context).primary,
                                                                                                                                        fontSize: 16.0,
                                                                                                                                        letterSpacing: 0.0,
                                                                                                                                        fontWeight: FontWeight.w500,
                                                                                                                                      ),
                                                                                                                                ),
                                                                                                                              ],
                                                                                                                            ),
                                                                                                                            Column(
                                                                                                                              mainAxisSize: MainAxisSize.max,
                                                                                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                                              children: [
                                                                                                                                Text(
                                                                                                                                  'Confirmed By Client : ',
                                                                                                                                  style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                                        fontFamily: 'DM Sans',
                                                                                                                                        fontSize: 16.0,
                                                                                                                                        letterSpacing: 0.0,
                                                                                                                                        fontWeight: FontWeight.w500,
                                                                                                                                      ),
                                                                                                                                ),
                                                                                                                                FFButtonWidget(
                                                                                                                                  onPressed: () async {
                                                                                                                                    if (!attendanceItem.isConfirmedArrived) {
                                                                                                                                      if (!attendanceItem.isSendRequest) {
                                                                                                                                        await containerVarItem.reference.update({
                                                                                                                                          ...mapToFirestore(
                                                                                                                                            {
                                                                                                                                              'AttendanceJob': getAttendanceListFirestoreData(
                                                                                                                                                functions.updateAttendceCopy(attendanceIndex, containerVarItem.attendanceJob.toList()),
                                                                                                                                              ),
                                                                                                                                            },
                                                                                                                                          ),
                                                                                                                                        });
                                                                                                                                        triggerPushNotification(
                                                                                                                                          notificationTitle: 'Job Attendance!',
                                                                                                                                          notificationText: 'Arrival Request from Worker',
                                                                                                                                          notificationImageUrl: jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != null && jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture != '' ? jobseekerDashboardProviderDetailRecord?.profiledetailsforclients.profilePicture : 'https://firebasestorage.googleapis.com/v0/b/backup13thfeb-a0ssgv.firebasestorage.app/o/images.jpeg?alt=media&token=697aad83-ed8a-48e8-85c1-cefd8599922a',
                                                                                                                                          notificationSound: 'default',
                                                                                                                                          userRefs: [containerVarItem.createdBy!],
                                                                                                                                          initialPageName: 'AdminAlljob',
                                                                                                                                          parameterData: {
                                                                                                                                            'jobid': containerVarItem.reference,
                                                                                                                                          },
                                                                                                                                        );
                                                                                                                                      }
                                                                                                                                    }
                                                                                                                                  },
                                                                                                                                  text: attendanceItem.isConfirmedArrived ? 'Confirmed' : (attendanceItem.isSendRequest ? 'Requested' : 'Mark Arrival'),
                                                                                                                                  options: FFButtonOptions(
                                                                                                                                    height: 40.0,
                                                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(16.0, 0.0, 16.0, 0.0),
                                                                                                                                    iconPadding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                                                                                                                                    color: FlutterFlowTheme.of(context).primary,
                                                                                                                                    textStyle: FlutterFlowTheme.of(context).titleSmall.override(
                                                                                                                                          fontFamily: 'DM Sans',
                                                                                                                                          color: Colors.white,
                                                                                                                                          letterSpacing: 0.0,
                                                                                                                                        ),
                                                                                                                                    elevation: 0.0,
                                                                                                                                    borderRadius: BorderRadius.circular(8.0),
                                                                                                                                  ),
                                                                                                                                ),
                                                                                                                              ].divide(SizedBox(height: 5.0)),
                                                                                                                            ),
                                                                                                                          ].divide(SizedBox(height: 10.0)),
                                                                                                                        ),
                                                                                                                      ),
                                                                                                                    ),
                                                                                                                  );
                                                                                                                }).divide(
                                                                                                                  SizedBox(height: 20.0),
                                                                                                                  filterFn: (attendanceIndex) {
                                                                                                                    final attendanceItem = attendance[attendanceIndex];
                                                                                                                    return functions.isDatePassed(attendanceItem.date!);
                                                                                                                  },
                                                                                                                ),
                                                                                                              );
                                                                                                            },
                                                                                                          ),
                                                                                                        ],
                                                                                                      ),
                                                                                                    ),
                                                                                                ],
                                                                                              ),
                                                                                            ),
                                                                                            Divider(
                                                                                              thickness: 2.0,
                                                                                              color: FlutterFlowTheme.of(context).alternate,
                                                                                            ),
                                                                                            Flex(
                                                                                              direction: () {
                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                  return false;
                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                  return false;
                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                  return true;
                                                                                                } else {
                                                                                                  return true;
                                                                                                }
                                                                                              }()
                                                                                                  ? Axis.horizontal
                                                                                                  : Axis.vertical,
                                                                                              mainAxisSize: MainAxisSize.max,
                                                                                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                              crossAxisAlignment: CrossAxisAlignment.end,
                                                                                              children: [
                                                                                                Column(
                                                                                                  mainAxisSize: MainAxisSize.max,
                                                                                                  mainAxisAlignment: MainAxisAlignment.start,
                                                                                                  crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                  children: [
                                                                                                    Padding(
                                                                                                      padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 10.0),
                                                                                                      child: Text(
                                                                                                        'Shift description',
                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                              fontFamily: 'DM Sans',
                                                                                                              fontSize: () {
                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                  return 18.0;
                                                                                                                } else {
                                                                                                                  return 18.0;
                                                                                                                }
                                                                                                              }(),
                                                                                                              letterSpacing: 0.0,
                                                                                                              fontWeight: FontWeight.bold,
                                                                                                            ),
                                                                                                      ),
                                                                                                    ),
                                                                                                    Container(
                                                                                                      width: 750.0,
                                                                                                      decoration: BoxDecoration(),
                                                                                                      child: Flex(
                                                                                                        direction: () {
                                                                                                          if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                            return false;
                                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                            return false;
                                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                            return true;
                                                                                                          } else {
                                                                                                            return true;
                                                                                                          }
                                                                                                        }()
                                                                                                            ? Axis.horizontal
                                                                                                            : Axis.vertical,
                                                                                                        mainAxisSize: MainAxisSize.max,
                                                                                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                                        children: [
                                                                                                          Column(
                                                                                                            mainAxisSize: MainAxisSize.max,
                                                                                                            crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                            children: [
                                                                                                              Row(
                                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                                children: [
                                                                                                                  Text(
                                                                                                                    'Duration :',
                                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                          fontFamily: 'DM Sans',
                                                                                                                          fontSize: () {
                                                                                                                            if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                              return 16.0;
                                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                              return 16.0;
                                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                              return 18.0;
                                                                                                                            } else {
                                                                                                                              return 18.0;
                                                                                                                            }
                                                                                                                          }(),
                                                                                                                          letterSpacing: 0.0,
                                                                                                                          fontWeight: FontWeight.w500,
                                                                                                                        ),
                                                                                                                  ),
                                                                                                                  Padding(
                                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                                    child: Text(
                                                                                                                      '${containerVarItem.duration.toString()} hours',
                                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                            fontFamily: 'DM Sans',
                                                                                                                            fontSize: 16.0,
                                                                                                                            letterSpacing: 0.0,
                                                                                                                          ),
                                                                                                                    ),
                                                                                                                  ),
                                                                                                                ],
                                                                                                              ),
                                                                                                            ],
                                                                                                          ),
                                                                                                          Column(
                                                                                                            mainAxisSize: MainAxisSize.max,
                                                                                                            crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                            children: [
                                                                                                              Padding(
                                                                                                                padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                                child: Row(
                                                                                                                  mainAxisSize: MainAxisSize.max,
                                                                                                                  children: [
                                                                                                                    Text(
                                                                                                                      'Time :',
                                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                            fontFamily: 'DM Sans',
                                                                                                                            fontSize: () {
                                                                                                                              if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                                return 16.0;
                                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                                return 16.0;
                                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                                return 18.0;
                                                                                                                              } else {
                                                                                                                                return 18.0;
                                                                                                                              }
                                                                                                                            }(),
                                                                                                                            letterSpacing: 0.0,
                                                                                                                            fontWeight: FontWeight.w500,
                                                                                                                          ),
                                                                                                                    ),
                                                                                                                    Padding(
                                                                                                                      padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                                      child: Text(
                                                                                                                        '${dateTimeFormat(
                                                                                                                          "jm",
                                                                                                                          containerVarItem.timing.startTime,
                                                                                                                          locale: FFLocalizations.of(context).languageCode,
                                                                                                                        )} to ${dateTimeFormat(
                                                                                                                          "jm",
                                                                                                                          containerVarItem.timing.endTime,
                                                                                                                          locale: FFLocalizations.of(context).languageCode,
                                                                                                                        )}',
                                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                              fontFamily: 'DM Sans',
                                                                                                                              fontSize: 16.0,
                                                                                                                              letterSpacing: 0.0,
                                                                                                                            ),
                                                                                                                      ),
                                                                                                                    ),
                                                                                                                  ],
                                                                                                                ),
                                                                                                              ),
                                                                                                              Padding(
                                                                                                                padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                                child: Row(
                                                                                                                  mainAxisSize: MainAxisSize.max,
                                                                                                                  children: [
                                                                                                                    Text(
                                                                                                                      'Hourly Pay :',
                                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                            fontFamily: 'DM Sans',
                                                                                                                            fontSize: () {
                                                                                                                              if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                                return 16.0;
                                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                                return 16.0;
                                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                                return 18.0;
                                                                                                                              } else {
                                                                                                                                return 18.0;
                                                                                                                              }
                                                                                                                            }(),
                                                                                                                            letterSpacing: 0.0,
                                                                                                                            fontWeight: FontWeight.w500,
                                                                                                                          ),
                                                                                                                    ),
                                                                                                                    Padding(
                                                                                                                      padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                                      child: Text(
                                                                                                                        valueOrDefault<String>(
                                                                                                                          containerVarItem.hourlyPay.toString(),
                                                                                                                          'None',
                                                                                                                        ),
                                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                              fontFamily: 'DM Sans',
                                                                                                                              fontSize: 16.0,
                                                                                                                              letterSpacing: 0.0,
                                                                                                                            ),
                                                                                                                      ),
                                                                                                                    ),
                                                                                                                  ],
                                                                                                                ),
                                                                                                              ),
                                                                                                            ],
                                                                                                          ),
                                                                                                          Column(
                                                                                                            mainAxisSize: MainAxisSize.max,
                                                                                                            crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                            children: [
                                                                                                              if (containerVarItem.customDate)
                                                                                                                Padding(
                                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                                  child: Row(
                                                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                                                    children: [
                                                                                                                      Text(
                                                                                                                        'Date :',
                                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                              fontFamily: 'DM Sans',
                                                                                                                              fontSize: () {
                                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                                  return 16.0;
                                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                                  return 16.0;
                                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                                  return 18.0;
                                                                                                                                } else {
                                                                                                                                  return 18.0;
                                                                                                                                }
                                                                                                                              }(),
                                                                                                                              letterSpacing: 0.0,
                                                                                                                              fontWeight: FontWeight.w500,
                                                                                                                            ),
                                                                                                                      ),
                                                                                                                      Padding(
                                                                                                                        padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                                        child: Text(
                                                                                                                          dateTimeFormat(
                                                                                                                            "yMMMd",
                                                                                                                            containerVarItem.startDate!,
                                                                                                                            locale: FFLocalizations.of(context).languageCode,
                                                                                                                          ),
                                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                                fontFamily: 'DM Sans',
                                                                                                                                fontSize: 16.0,
                                                                                                                                letterSpacing: 0.0,
                                                                                                                              ),
                                                                                                                        ),
                                                                                                                      ),
                                                                                                                    ],
                                                                                                                  ),
                                                                                                                ),
                                                                                                              if (!containerVarItem.customDate)
                                                                                                                Padding(
                                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                                  child: Row(
                                                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                                                    children: [
                                                                                                                      Text(
                                                                                                                        'Start Date :',
                                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                              fontFamily: 'DM Sans',
                                                                                                                              fontSize: () {
                                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                                  return 16.0;
                                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                                  return 16.0;
                                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                                  return 18.0;
                                                                                                                                } else {
                                                                                                                                  return 18.0;
                                                                                                                                }
                                                                                                                              }(),
                                                                                                                              letterSpacing: 0.0,
                                                                                                                              fontWeight: FontWeight.w500,
                                                                                                                            ),
                                                                                                                      ),
                                                                                                                      Padding(
                                                                                                                        padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                                        child: Text(
                                                                                                                          dateTimeFormat(
                                                                                                                            "yMMMd",
                                                                                                                            containerVarItem.startDate!,
                                                                                                                            locale: FFLocalizations.of(context).languageCode,
                                                                                                                          ),
                                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                                fontFamily: 'DM Sans',
                                                                                                                                fontSize: 16.0,
                                                                                                                                letterSpacing: 0.0,
                                                                                                                              ),
                                                                                                                        ),
                                                                                                                      ),
                                                                                                                    ],
                                                                                                                  ),
                                                                                                                ),
                                                                                                              if (!containerVarItem.customDate)
                                                                                                                Padding(
                                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                                  child: Row(
                                                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                                                    children: [
                                                                                                                      Text(
                                                                                                                        'End Date :',
                                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                              fontFamily: 'DM Sans',
                                                                                                                              fontSize: () {
                                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                                  return 16.0;
                                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                                  return 16.0;
                                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                                  return 18.0;
                                                                                                                                } else {
                                                                                                                                  return 18.0;
                                                                                                                                }
                                                                                                                              }(),
                                                                                                                              letterSpacing: 0.0,
                                                                                                                              fontWeight: FontWeight.w500,
                                                                                                                            ),
                                                                                                                      ),
                                                                                                                      Padding(
                                                                                                                        padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                                        child: Text(
                                                                                                                          dateTimeFormat(
                                                                                                                            "yMMMd",
                                                                                                                            containerVarItem.endDate!,
                                                                                                                            locale: FFLocalizations.of(context).languageCode,
                                                                                                                          ),
                                                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                                fontFamily: 'DM Sans',
                                                                                                                                fontSize: 16.0,
                                                                                                                                letterSpacing: 0.0,
                                                                                                                              ),
                                                                                                                        ),
                                                                                                                      ),
                                                                                                                    ],
                                                                                                                  ),
                                                                                                                ),
                                                                                                              Padding(
                                                                                                                padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                                child: Row(
                                                                                                                  mainAxisSize: MainAxisSize.max,
                                                                                                                  children: [
                                                                                                                    Text(
                                                                                                                      'Total Pay :',
                                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                            fontFamily: 'DM Sans',
                                                                                                                            fontSize: () {
                                                                                                                              if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                                return 16.0;
                                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                                return 16.0;
                                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                                return 18.0;
                                                                                                                              } else {
                                                                                                                                return 18.0;
                                                                                                                              }
                                                                                                                            }(),
                                                                                                                            letterSpacing: 0.0,
                                                                                                                            fontWeight: FontWeight.w500,
                                                                                                                          ),
                                                                                                                    ),
                                                                                                                    Padding(
                                                                                                                      padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                                      child: Text(
                                                                                                                        valueOrDefault<String>(
                                                                                                                          containerVarItem.totalPay.toString(),
                                                                                                                          'none',
                                                                                                                        ),
                                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                              fontFamily: 'DM Sans',
                                                                                                                              fontSize: 16.0,
                                                                                                                              letterSpacing: 0.0,
                                                                                                                            ),
                                                                                                                      ),
                                                                                                                    ),
                                                                                                                  ],
                                                                                                                ),
                                                                                                              ),
                                                                                                            ],
                                                                                                          ),
                                                                                                        ],
                                                                                                      ),
                                                                                                    ),
                                                                                                    if (responsiveVisibility(
                                                                                                      context: context,
                                                                                                      phone: false,
                                                                                                      tablet: false,
                                                                                                    ))
                                                                                                      Container(
                                                                                                        width: 990.0,
                                                                                                        decoration: BoxDecoration(),
                                                                                                        child: Flex(
                                                                                                          direction: () {
                                                                                                            if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                              return false;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                              return false;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                              return true;
                                                                                                            } else {
                                                                                                              return true;
                                                                                                            }
                                                                                                          }()
                                                                                                              ? Axis.horizontal
                                                                                                              : Axis.vertical,
                                                                                                          mainAxisSize: MainAxisSize.max,
                                                                                                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                                          crossAxisAlignment: CrossAxisAlignment.center,
                                                                                                          children: [
                                                                                                            Flexible(
                                                                                                              child: Padding(
                                                                                                                padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                                child: Column(
                                                                                                                  mainAxisSize: MainAxisSize.max,
                                                                                                                  crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                                  children: [
                                                                                                                    Text(
                                                                                                                      'Description :',
                                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                            fontFamily: 'DM Sans',
                                                                                                                            fontSize: () {
                                                                                                                              if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                                return 16.0;
                                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                                return 16.0;
                                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                                return 18.0;
                                                                                                                              } else {
                                                                                                                                return 18.0;
                                                                                                                              }
                                                                                                                            }(),
                                                                                                                            letterSpacing: 0.0,
                                                                                                                            fontWeight: FontWeight.w500,
                                                                                                                          ),
                                                                                                                    ),
                                                                                                                    Text(
                                                                                                                      valueOrDefault<String>(
                                                                                                                        containerVarItem.description,
                                                                                                                        'none',
                                                                                                                      ),
                                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                            fontFamily: 'DM Sans',
                                                                                                                            fontSize: 16.0,
                                                                                                                            letterSpacing: 0.0,
                                                                                                                          ),
                                                                                                                    ),
                                                                                                                  ],
                                                                                                                ),
                                                                                                              ),
                                                                                                            ),
                                                                                                          ],
                                                                                                        ),
                                                                                                      ),
                                                                                                    if (responsiveVisibility(
                                                                                                      context: context,
                                                                                                      tabletLandscape: false,
                                                                                                      desktop: false,
                                                                                                    ))
                                                                                                      Container(
                                                                                                        width: 990.0,
                                                                                                        decoration: BoxDecoration(),
                                                                                                        child: Column(
                                                                                                          mainAxisSize: MainAxisSize.max,
                                                                                                          crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                          children: [
                                                                                                            Padding(
                                                                                                              padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                              child: Column(
                                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                                children: [
                                                                                                                  Text(
                                                                                                                    'Description :',
                                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                          fontFamily: 'DM Sans',
                                                                                                                          fontSize: () {
                                                                                                                            if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                              return 16.0;
                                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                              return 16.0;
                                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                              return 18.0;
                                                                                                                            } else {
                                                                                                                              return 18.0;
                                                                                                                            }
                                                                                                                          }(),
                                                                                                                          letterSpacing: 0.0,
                                                                                                                          fontWeight: FontWeight.w500,
                                                                                                                        ),
                                                                                                                  ),
                                                                                                                  Text(
                                                                                                                    valueOrDefault<String>(
                                                                                                                      containerVarItem.description,
                                                                                                                      'none',
                                                                                                                    ),
                                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                          fontFamily: 'DM Sans',
                                                                                                                          fontSize: 16.0,
                                                                                                                          letterSpacing: 0.0,
                                                                                                                        ),
                                                                                                                  ),
                                                                                                                ],
                                                                                                              ),
                                                                                                            ),
                                                                                                            Padding(
                                                                                                              padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                              child: Column(
                                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                                children: [
                                                                                                                  Text(
                                                                                                                    'Skill Criteria :',
                                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                          fontFamily: 'DM Sans',
                                                                                                                          fontSize: () {
                                                                                                                            if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                              return 16.0;
                                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                              return 16.0;
                                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                              return 18.0;
                                                                                                                            } else {
                                                                                                                              return 18.0;
                                                                                                                            }
                                                                                                                          }(),
                                                                                                                          letterSpacing: 0.0,
                                                                                                                          fontWeight: FontWeight.w500,
                                                                                                                        ),
                                                                                                                  ),
                                                                                                                  Builder(
                                                                                                                    builder: (context) {
                                                                                                                      final skills = containerVarItem.skillCriteria.toList();

                                                                                                                      return Wrap(
                                                                                                                        spacing: 10.0,
                                                                                                                        runSpacing: 5.0,
                                                                                                                        alignment: WrapAlignment.start,
                                                                                                                        crossAxisAlignment: WrapCrossAlignment.start,
                                                                                                                        direction: Axis.horizontal,
                                                                                                                        runAlignment: WrapAlignment.start,
                                                                                                                        verticalDirection: VerticalDirection.down,
                                                                                                                        clipBehavior: Clip.none,
                                                                                                                        children: List.generate(skills.length, (skillsIndex) {
                                                                                                                          final skillsItem = skills[skillsIndex];
                                                                                                                          return Text(
                                                                                                                            skillsItem,
                                                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                                  fontFamily: 'DM Sans',
                                                                                                                                  fontSize: 16.0,
                                                                                                                                  letterSpacing: 0.0,
                                                                                                                                ),
                                                                                                                          );
                                                                                                                        }),
                                                                                                                      );
                                                                                                                    },
                                                                                                                  ),
                                                                                                                ],
                                                                                                              ),
                                                                                                            ),
                                                                                                          ],
                                                                                                        ),
                                                                                                      ),
                                                                                                  ],
                                                                                                ),
                                                                                                Padding(
                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                  child: Column(
                                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                                    mainAxisAlignment: MainAxisAlignment.end,
                                                                                                    crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                    children: [
                                                                                                      Text(
                                                                                                        'Location :',
                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                              fontFamily: 'DM Sans',
                                                                                                              fontSize: () {
                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                  return 18.0;
                                                                                                                } else {
                                                                                                                  return 18.0;
                                                                                                                }
                                                                                                              }(),
                                                                                                              letterSpacing: 0.0,
                                                                                                              fontWeight: FontWeight.w500,
                                                                                                            ),
                                                                                                      ),
                                                                                                      Padding(
                                                                                                        padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                        child: wrapWithModel(
                                                                                                          model: _model.customMapModels3.getModel(
                                                                                                            functions.generateUniqueId(),
                                                                                                            containerVarIndex,
                                                                                                          ),
                                                                                                          updateCallback: () => safeSetState(() {}),
                                                                                                          child: CustomMapWidget(
                                                                                                            key: Key(
                                                                                                              'Keyucp_${functions.generateUniqueId()}',
                                                                                                            ),
                                                                                                            latlng: containerVarItem.latlng!,
                                                                                                            address: containerVarItem.fullAddress,
                                                                                                          ),
                                                                                                        ),
                                                                                                      ),
                                                                                                    ],
                                                                                                  ),
                                                                                                ),
                                                                                              ],
                                                                                            ),
                                                                                          ],
                                                                                        ),
                                                                                      ),
                                                                                    ),
                                                                                  ),
                                                                                );
                                                                              } else {
                                                                                return Container(
                                                                                  width: 0.0,
                                                                                  height: 0.0,
                                                                                  decoration: BoxDecoration(
                                                                                    color: Colors.transparent,
                                                                                  ),
                                                                                );
                                                                              }
                                                                            },
                                                                          ),
                                                                        );
                                                                      },
                                                                    );
                                                                  },
                                                                );
                                                              },
                                                            ),
                                                          );
                                                        },
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                              ),
                                              Padding(
                                                padding: EdgeInsetsDirectional
                                                    .fromSTEB(
                                                        0.0, 28.0, 0.0, 0.0),
                                                child: SingleChildScrollView(
                                                  primary: false,
                                                  child: Column(
                                                    mainAxisSize:
                                                        MainAxisSize.max,
                                                    crossAxisAlignment:
                                                        CrossAxisAlignment
                                                            .start,
                                                    children: [
                                                      Padding(
                                                        padding:
                                                            EdgeInsetsDirectional
                                                                .fromSTEB(
                                                                    0.0,
                                                                    0.0,
                                                                    0.0,
                                                                    15.0),
                                                        child: Row(
                                                          mainAxisSize:
                                                              MainAxisSize.max,
                                                          mainAxisAlignment:
                                                              MainAxisAlignment
                                                                  .spaceBetween,
                                                          crossAxisAlignment:
                                                              CrossAxisAlignment
                                                                  .center,
                                                          children: [
                                                            Text(
                                                              'Completed',
                                                              style: FlutterFlowTheme
                                                                      .of(context)
                                                                  .headlineLarge
                                                                  .override(
                                                                    fontFamily:
                                                                        'DM Sans',
                                                                    fontSize:
                                                                        () {
                                                                      if (MediaQuery.sizeOf(context)
                                                                              .width <
                                                                          kBreakpointSmall) {
                                                                        return 20.0;
                                                                      } else if (MediaQuery.sizeOf(context)
                                                                              .width <
                                                                          kBreakpointMedium) {
                                                                        return 20.0;
                                                                      } else if (MediaQuery.sizeOf(context)
                                                                              .width <
                                                                          kBreakpointLarge) {
                                                                        return 24.0;
                                                                      } else {
                                                                        return 24.0;
                                                                      }
                                                                    }(),
                                                                    letterSpacing:
                                                                        0.0,
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .bold,
                                                                  ),
                                                            ),
                                                          ],
                                                        ),
                                                      ),
                                                      StreamBuilder<
                                                          List<
                                                              JobDetailsRecord>>(
                                                        stream:
                                                            queryJobDetailsRecord(
                                                          queryBuilder:
                                                              (jobDetailsRecord) =>
                                                                  jobDetailsRecord
                                                                      .where(
                                                                        'JobStatus',
                                                                        isEqualTo:
                                                                            'Completed',
                                                                      )
                                                                      .where(
                                                                        'HiredApplicant',
                                                                        isEqualTo:
                                                                            currentUserReference,
                                                                      ),
                                                        ),
                                                        builder: (context,
                                                            snapshot) {
                                                          // Customize what your widget looks like when it's loading.
                                                          if (!snapshot
                                                              .hasData) {
                                                            return Center(
                                                              child: SizedBox(
                                                                width: 50.0,
                                                                height: 50.0,
                                                                child:
                                                                    CircularProgressIndicator(
                                                                  valueColor:
                                                                      AlwaysStoppedAnimation<
                                                                          Color>(
                                                                    FlutterFlowTheme.of(
                                                                            context)
                                                                        .primary,
                                                                  ),
                                                                ),
                                                              ),
                                                            );
                                                          }
                                                          List<JobDetailsRecord>
                                                              containerJobDetailsRecordList =
                                                              snapshot.data!;

                                                          return Container(
                                                            decoration:
                                                                BoxDecoration(),
                                                            child: Builder(
                                                              builder:
                                                                  (context) {
                                                                final containerVar = (FFAppState().sortFilter ==
                                                                            'otn'
                                                                        ? containerJobDetailsRecordList.where((e) => FFAppState().urgentJob == true ? (e.isUrgentJob == true) : true).toList().sortedList(
                                                                            keyOf: (e) => e
                                                                                .createdAt!,
                                                                            desc:
                                                                                false)
                                                                        : containerJobDetailsRecordList
                                                                            .where((e) => FFAppState().urgentJob == true
                                                                                ? (e.isUrgentJob == true)
                                                                                : true)
                                                                            .toList()
                                                                            .sortedList(keyOf: (e) => e.createdAt!, desc: true))
                                                                    .toList();
                                                                if (containerVar
                                                                    .isEmpty) {
                                                                  return EmptyWidget(
                                                                    message:
                                                                        'No Completed Job',
                                                                  );
                                                                }

                                                                return ListView
                                                                    .separated(
                                                                  padding:
                                                                      EdgeInsets
                                                                          .fromLTRB(
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    500.0,
                                                                  ),
                                                                  primary:
                                                                      false,
                                                                  shrinkWrap:
                                                                      true,
                                                                  scrollDirection:
                                                                      Axis.vertical,
                                                                  itemCount:
                                                                      containerVar
                                                                          .length,
                                                                  separatorBuilder: (_,
                                                                          __) =>
                                                                      SizedBox(
                                                                          height:
                                                                              25.0),
                                                                  itemBuilder:
                                                                      (context,
                                                                          containerVarIndex) {
                                                                    final containerVarItem =
                                                                        containerVar[
                                                                            containerVarIndex];
                                                                    return Padding(
                                                                      padding: EdgeInsetsDirectional.fromSTEB(
                                                                          0.0,
                                                                          0.0,
                                                                          0.0,
                                                                          20.0),
                                                                      child:
                                                                          Container(
                                                                        width:
                                                                            () {
                                                                          if (MediaQuery.sizeOf(context).width <
                                                                              kBreakpointSmall) {
                                                                            return 335.0;
                                                                          } else if (MediaQuery.sizeOf(context).width <
                                                                              kBreakpointMedium) {
                                                                            return 335.0;
                                                                          } else if (MediaQuery.sizeOf(context).width <
                                                                              kBreakpointLarge) {
                                                                            return 1522.0;
                                                                          } else {
                                                                            return 1522.0;
                                                                          }
                                                                        }(),
                                                                        decoration:
                                                                            BoxDecoration(
                                                                          color:
                                                                              FlutterFlowTheme.of(context).secondaryBackground,
                                                                          borderRadius:
                                                                              BorderRadius.circular(20.0),
                                                                          border:
                                                                              Border.all(
                                                                            color:
                                                                                Color(0xFFE8E8EC),
                                                                            width:
                                                                                1.0,
                                                                          ),
                                                                        ),
                                                                        child:
                                                                            Padding(
                                                                          padding:
                                                                              EdgeInsets.all(15.0),
                                                                          child:
                                                                              SingleChildScrollView(
                                                                            child:
                                                                                Column(
                                                                              mainAxisSize: MainAxisSize.max,
                                                                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                                              children: [
                                                                                Padding(
                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 20.0),
                                                                                  child: Row(
                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                    children: [
                                                                                      Text(
                                                                                        containerVarItem.subRole,
                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                              fontFamily: 'DM Sans',
                                                                                              letterSpacing: 0.0,
                                                                                              fontWeight: FontWeight.w500,
                                                                                            ),
                                                                                      ),
                                                                                      Align(
                                                                                        alignment: AlignmentDirectional(1.0, 0.0),
                                                                                        child: Text(
                                                                                          dateTimeFormat(
                                                                                            "relative",
                                                                                            containerVarItem.createdAt!,
                                                                                            locale: FFLocalizations.of(context).languageCode,
                                                                                          ),
                                                                                          style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                fontFamily: 'DM Sans',
                                                                                                color: FlutterFlowTheme.of(context).primary,
                                                                                                fontSize: 16.0,
                                                                                                letterSpacing: 0.0,
                                                                                                fontWeight: FontWeight.w500,
                                                                                              ),
                                                                                        ),
                                                                                      ),
                                                                                    ],
                                                                                  ),
                                                                                ),
                                                                                Padding(
                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 10.0),
                                                                                  child: Column(
                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                    crossAxisAlignment: CrossAxisAlignment.start,
                                                                                    children: [
                                                                                      Row(
                                                                                        mainAxisSize: MainAxisSize.max,
                                                                                        crossAxisAlignment: CrossAxisAlignment.start,
                                                                                        children: [
                                                                                          StreamBuilder<UsersRecord>(
                                                                                            stream: UsersRecord.getDocument(containerVarItem.createdBy!),
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

                                                                                              final circleImageUsersRecord = snapshot.data!;

                                                                                              return Container(
                                                                                                width: 60.0,
                                                                                                height: 60.0,
                                                                                                clipBehavior: Clip.antiAlias,
                                                                                                decoration: BoxDecoration(
                                                                                                  shape: BoxShape.circle,
                                                                                                ),
                                                                                                child: Image.network(
                                                                                                  valueOrDefault<String>(
                                                                                                    circleImageUsersRecord.photoUrl,
                                                                                                    'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg',
                                                                                                  ),
                                                                                                  fit: BoxFit.cover,
                                                                                                ),
                                                                                              );
                                                                                            },
                                                                                          ),
                                                                                          Flexible(
                                                                                            child: Padding(
                                                                                              padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 7.0, 10.0),
                                                                                              child: Column(
                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                children: [
                                                                                                  Text(
                                                                                                    containerVarItem.jobName,
                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                          fontFamily: 'DM Sans',
                                                                                                          fontSize: () {
                                                                                                            if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                              return 18.0;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                              return 18.0;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                              return 20.0;
                                                                                                            } else {
                                                                                                              return 20.0;
                                                                                                            }
                                                                                                          }(),
                                                                                                          letterSpacing: 0.0,
                                                                                                          fontWeight: FontWeight.bold,
                                                                                                        ),
                                                                                                  ),
                                                                                                  Padding(
                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                                    child: Text(
                                                                                                      'Job Id : ${containerVarItem.jobId}',
                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                            fontFamily: 'DM Sans',
                                                                                                            color: Color(0xFF89969F),
                                                                                                            fontSize: () {
                                                                                                              if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                return 16.0;
                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                return 16.0;
                                                                                                              } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                return 20.0;
                                                                                                              } else {
                                                                                                                return 20.0;
                                                                                                              }
                                                                                                            }(),
                                                                                                            letterSpacing: 0.0,
                                                                                                          ),
                                                                                                    ),
                                                                                                  ),
                                                                                                  Align(
                                                                                                    alignment: AlignmentDirectional(-1.0, 0.0),
                                                                                                    child: Padding(
                                                                                                      padding: EdgeInsetsDirectional.fromSTEB(0.0, 5.0, 0.0, 0.0),
                                                                                                      child: Text(
                                                                                                        'From ${containerVarItem.fromBusiness}',
                                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                              fontFamily: 'DM Sans',
                                                                                                              fontSize: () {
                                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                                  return 16.0;
                                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                                  return 18.0;
                                                                                                                } else {
                                                                                                                  return 18.0;
                                                                                                                }
                                                                                                              }(),
                                                                                                              letterSpacing: 0.0,
                                                                                                              fontWeight: FontWeight.w600,
                                                                                                            ),
                                                                                                      ),
                                                                                                    ),
                                                                                                  ),
                                                                                                ],
                                                                                              ),
                                                                                            ),
                                                                                          ),
                                                                                        ].divide(SizedBox(width: 25.0)),
                                                                                      ),
                                                                                      Flex(
                                                                                        direction: () {
                                                                                          if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                            return false;
                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                            return false;
                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                            return true;
                                                                                          } else {
                                                                                            return true;
                                                                                          }
                                                                                        }()
                                                                                            ? Axis.horizontal
                                                                                            : Axis.vertical,
                                                                                        mainAxisSize: MainAxisSize.max,
                                                                                        crossAxisAlignment: CrossAxisAlignment.center,
                                                                                        children: [
                                                                                          Visibility(
                                                                                            visible: responsiveVisibility(
                                                                                              context: context,
                                                                                              tabletLandscape: false,
                                                                                              desktop: false,
                                                                                            ),
                                                                                            child: Row(
                                                                                              mainAxisSize: MainAxisSize.max,
                                                                                              mainAxisAlignment: MainAxisAlignment.end,
                                                                                              children: [
                                                                                                FFButtonWidget(
                                                                                                  onPressed: () {
                                                                                                    print('Button pressed ...');
                                                                                                  },
                                                                                                  text: 'Completed',
                                                                                                  options: FFButtonOptions(
                                                                                                    width: 112.29,
                                                                                                    height: 40.0,
                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                                                                                                    iconPadding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                                                                                                    color: Color(0xFFE9FFEF),
                                                                                                    textStyle: FlutterFlowTheme.of(context).titleSmall.override(
                                                                                                          fontFamily: 'DM Sans',
                                                                                                          color: FlutterFlowTheme.of(context).primaryText,
                                                                                                          letterSpacing: 0.0,
                                                                                                        ),
                                                                                                    elevation: 0.0,
                                                                                                    borderSide: BorderSide(
                                                                                                      color: Color(0xFF41CA67),
                                                                                                    ),
                                                                                                    borderRadius: BorderRadius.circular(38.0),
                                                                                                  ),
                                                                                                ),
                                                                                                if (containerVarItem.chatsUser.contains(currentUserReference))
                                                                                                  Align(
                                                                                                    alignment: AlignmentDirectional(1.0, 0.0),
                                                                                                    child: FlutterFlowIconButton(
                                                                                                      borderColor: FlutterFlowTheme.of(context).primary,
                                                                                                      borderRadius: 8.0,
                                                                                                      buttonSize: 40.0,
                                                                                                      fillColor: FlutterFlowTheme.of(context).accent1,
                                                                                                      icon: Icon(
                                                                                                        Icons.mark_chat_unread,
                                                                                                        color: FlutterFlowTheme.of(context).primary,
                                                                                                        size: 24.0,
                                                                                                      ),
                                                                                                      onPressed: () async {
                                                                                                        context.pushNamed(
                                                                                                          MessageScreenWidget.routeName,
                                                                                                          queryParameters: {
                                                                                                            'chat': serializeParam(
                                                                                                              containerVarItem.chat,
                                                                                                              ParamType.DocumentReference,
                                                                                                            ),
                                                                                                            'name': serializeParam(
                                                                                                              containerVarItem.jobName,
                                                                                                              ParamType.String,
                                                                                                            ),
                                                                                                          }.withoutNulls,
                                                                                                        );
                                                                                                      },
                                                                                                    ),
                                                                                                  ),
                                                                                              ].divide(SizedBox(width: 25.0)),
                                                                                            ),
                                                                                          ),
                                                                                          Visibility(
                                                                                            visible: responsiveVisibility(
                                                                                              context: context,
                                                                                              phone: false,
                                                                                              tablet: false,
                                                                                            ),
                                                                                            child: Align(
                                                                                              alignment: AlignmentDirectional(-1.0, 0.0),
                                                                                              child: Text(
                                                                                                'Medical laboratory technologist',
                                                                                                style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                      fontFamily: 'DM Sans',
                                                                                                      fontSize: () {
                                                                                                        if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                          return 16.0;
                                                                                                        } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                          return 16.0;
                                                                                                        } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                          return 18.0;
                                                                                                        } else {
                                                                                                          return 18.0;
                                                                                                        }
                                                                                                      }(),
                                                                                                      letterSpacing: 0.0,
                                                                                                      fontWeight: FontWeight.w600,
                                                                                                    ),
                                                                                              ),
                                                                                            ),
                                                                                          ),
                                                                                          Visibility(
                                                                                            visible: responsiveVisibility(
                                                                                              context: context,
                                                                                              phone: false,
                                                                                              tablet: false,
                                                                                            ),
                                                                                            child: SizedBox(
                                                                                              height: 20.0,
                                                                                              child: VerticalDivider(
                                                                                                thickness: 2.0,
                                                                                                color: FlutterFlowTheme.of(context).alternate,
                                                                                              ),
                                                                                            ),
                                                                                          ),
                                                                                          Visibility(
                                                                                            visible: responsiveVisibility(
                                                                                              context: context,
                                                                                              phone: false,
                                                                                              tablet: false,
                                                                                            ),
                                                                                            child: Padding(
                                                                                              padding: EdgeInsetsDirectional.fromSTEB(
                                                                                                  valueOrDefault<double>(
                                                                                                    () {
                                                                                                      if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                        return 0.0;
                                                                                                      } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                        return 0.0;
                                                                                                      } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                        return 45.0;
                                                                                                      } else {
                                                                                                        return 45.0;
                                                                                                      }
                                                                                                    }(),
                                                                                                    0.0,
                                                                                                  ),
                                                                                                  valueOrDefault<double>(
                                                                                                    () {
                                                                                                      if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                        return 10.0;
                                                                                                      } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                        return 10.0;
                                                                                                      } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                        return 0.0;
                                                                                                      } else {
                                                                                                        return 0.0;
                                                                                                      }
                                                                                                    }(),
                                                                                                    0.0,
                                                                                                  ),
                                                                                                  0.0,
                                                                                                  0.0),
                                                                                              child: FFButtonWidget(
                                                                                                onPressed: () {
                                                                                                  print('Button pressed ...');
                                                                                                },
                                                                                                text: 'Completed',
                                                                                                options: FFButtonOptions(
                                                                                                  width: () {
                                                                                                    if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                      return 305.0;
                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                      return 305.0;
                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                      return 146.0;
                                                                                                    } else {
                                                                                                      return 146.0;
                                                                                                    }
                                                                                                  }(),
                                                                                                  height: 46.0,
                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                                                                                                  iconPadding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                                                                                                  color: Color(0xFFE9FFEF),
                                                                                                  textStyle: FlutterFlowTheme.of(context).titleSmall.override(
                                                                                                        fontFamily: 'DM Sans',
                                                                                                        color: FlutterFlowTheme.of(context).primaryText,
                                                                                                        letterSpacing: 0.0,
                                                                                                      ),
                                                                                                  elevation: 0.0,
                                                                                                  borderSide: BorderSide(
                                                                                                    color: Color(0xFF41CA67),
                                                                                                  ),
                                                                                                  borderRadius: BorderRadius.circular(38.0),
                                                                                                ),
                                                                                              ),
                                                                                            ),
                                                                                          ),
                                                                                        ],
                                                                                      ),
                                                                                    ],
                                                                                  ),
                                                                                ),
                                                                                Divider(
                                                                                  thickness: 2.0,
                                                                                  color: FlutterFlowTheme.of(context).alternate,
                                                                                ),
                                                                                Column(
                                                                                  mainAxisSize: MainAxisSize.max,
                                                                                  mainAxisAlignment: MainAxisAlignment.start,
                                                                                  crossAxisAlignment: CrossAxisAlignment.start,
                                                                                  children: [
                                                                                    Padding(
                                                                                      padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 10.0),
                                                                                      child: Text(
                                                                                        'Shift description',
                                                                                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                              fontFamily: 'DM Sans',
                                                                                              fontSize: () {
                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                  return 16.0;
                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                  return 16.0;
                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                  return 18.0;
                                                                                                } else {
                                                                                                  return 18.0;
                                                                                                }
                                                                                              }(),
                                                                                              letterSpacing: 0.0,
                                                                                              fontWeight: FontWeight.bold,
                                                                                            ),
                                                                                      ),
                                                                                    ),
                                                                                    Container(
                                                                                      width: 990.0,
                                                                                      decoration: BoxDecoration(),
                                                                                      child: Padding(
                                                                                        padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 10.0),
                                                                                        child: Column(
                                                                                          mainAxisSize: MainAxisSize.max,
                                                                                          crossAxisAlignment: CrossAxisAlignment.start,
                                                                                          children: [
                                                                                            Padding(
                                                                                              padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                              child: Column(
                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                children: [
                                                                                                  Text(
                                                                                                    'Description :',
                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                          fontFamily: 'DM Sans',
                                                                                                          fontSize: () {
                                                                                                            if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                              return 16.0;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                              return 16.0;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                              return 18.0;
                                                                                                            } else {
                                                                                                              return 18.0;
                                                                                                            }
                                                                                                          }(),
                                                                                                          letterSpacing: 0.0,
                                                                                                          fontWeight: FontWeight.w500,
                                                                                                        ),
                                                                                                  ),
                                                                                                  Text(
                                                                                                    containerVarItem.description,
                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                          fontFamily: 'DM Sans',
                                                                                                          fontSize: 16.0,
                                                                                                          letterSpacing: 0.0,
                                                                                                        ),
                                                                                                  ),
                                                                                                ],
                                                                                              ),
                                                                                            ),
                                                                                            Padding(
                                                                                              padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                              child: Column(
                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                children: [
                                                                                                  Text(
                                                                                                    'Skill criteria :',
                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                          fontFamily: 'DM Sans',
                                                                                                          fontSize: () {
                                                                                                            if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                              return 16.0;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                              return 16.0;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                              return 18.0;
                                                                                                            } else {
                                                                                                              return 18.0;
                                                                                                            }
                                                                                                          }(),
                                                                                                          letterSpacing: 0.0,
                                                                                                          fontWeight: FontWeight.w500,
                                                                                                        ),
                                                                                                  ),
                                                                                                  Builder(
                                                                                                    builder: (context) {
                                                                                                      final skills = containerVarItem.skillCriteria.toList();

                                                                                                      return Wrap(
                                                                                                        spacing: 10.0,
                                                                                                        runSpacing: 5.0,
                                                                                                        alignment: WrapAlignment.start,
                                                                                                        crossAxisAlignment: WrapCrossAlignment.start,
                                                                                                        direction: Axis.horizontal,
                                                                                                        runAlignment: WrapAlignment.start,
                                                                                                        verticalDirection: VerticalDirection.down,
                                                                                                        clipBehavior: Clip.none,
                                                                                                        children: List.generate(skills.length, (skillsIndex) {
                                                                                                          final skillsItem = skills[skillsIndex];
                                                                                                          return Text(
                                                                                                            skillsItem,
                                                                                                            style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                                  fontFamily: 'DM Sans',
                                                                                                                  fontSize: 16.0,
                                                                                                                  letterSpacing: 0.0,
                                                                                                                ),
                                                                                                          );
                                                                                                        }),
                                                                                                      );
                                                                                                    },
                                                                                                  ),
                                                                                                ],
                                                                                              ),
                                                                                            ),
                                                                                          ],
                                                                                        ),
                                                                                      ),
                                                                                    ),
                                                                                    Container(
                                                                                      width: 750.0,
                                                                                      decoration: BoxDecoration(),
                                                                                      child: Flex(
                                                                                        direction: () {
                                                                                          if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                            return false;
                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                            return false;
                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                            return true;
                                                                                          } else {
                                                                                            return true;
                                                                                          }
                                                                                        }()
                                                                                            ? Axis.horizontal
                                                                                            : Axis.vertical,
                                                                                        mainAxisSize: MainAxisSize.max,
                                                                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                        crossAxisAlignment: CrossAxisAlignment.end,
                                                                                        children: [
                                                                                          Padding(
                                                                                            padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                            child: Row(
                                                                                              mainAxisSize: MainAxisSize.max,
                                                                                              children: [
                                                                                                Text(
                                                                                                  'Time :',
                                                                                                  style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                        fontFamily: 'DM Sans',
                                                                                                        fontSize: () {
                                                                                                          if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                            return 16.0;
                                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                            return 16.0;
                                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                            return 18.0;
                                                                                                          } else {
                                                                                                            return 18.0;
                                                                                                          }
                                                                                                        }(),
                                                                                                        letterSpacing: 0.0,
                                                                                                        fontWeight: FontWeight.w500,
                                                                                                      ),
                                                                                                ),
                                                                                                Padding(
                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                  child: Text(
                                                                                                    '${dateTimeFormat(
                                                                                                      "jm",
                                                                                                      containerVarItem.timing.startTime,
                                                                                                      locale: FFLocalizations.of(context).languageCode,
                                                                                                    )} to ${dateTimeFormat(
                                                                                                      "jm",
                                                                                                      containerVarItem.timing.endTime,
                                                                                                      locale: FFLocalizations.of(context).languageCode,
                                                                                                    )}',
                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                          fontFamily: 'DM Sans',
                                                                                                          fontSize: 16.0,
                                                                                                          letterSpacing: 0.0,
                                                                                                        ),
                                                                                                  ),
                                                                                                ),
                                                                                              ],
                                                                                            ),
                                                                                          ),
                                                                                          Visibility(
                                                                                            visible: containerVarItem.customDate,
                                                                                            child: Padding(
                                                                                              padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                              child: Row(
                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                children: [
                                                                                                  Text(
                                                                                                    'Date : ',
                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                          fontFamily: 'DM Sans',
                                                                                                          fontSize: () {
                                                                                                            if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                              return 16.0;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                              return 16.0;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                              return 18.0;
                                                                                                            } else {
                                                                                                              return 18.0;
                                                                                                            }
                                                                                                          }(),
                                                                                                          letterSpacing: 0.0,
                                                                                                          fontWeight: FontWeight.w500,
                                                                                                        ),
                                                                                                  ),
                                                                                                  Padding(
                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                    child: Text(
                                                                                                      dateTimeFormat(
                                                                                                        "yMMMd",
                                                                                                        containerVarItem.startDate!,
                                                                                                        locale: FFLocalizations.of(context).languageCode,
                                                                                                      ),
                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                            fontFamily: 'DM Sans',
                                                                                                            fontSize: 16.0,
                                                                                                            letterSpacing: 0.0,
                                                                                                          ),
                                                                                                    ),
                                                                                                  ),
                                                                                                ],
                                                                                              ),
                                                                                            ),
                                                                                          ),
                                                                                          Visibility(
                                                                                            visible: !containerVarItem.customDate,
                                                                                            child: Padding(
                                                                                              padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                              child: Row(
                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                children: [
                                                                                                  Text(
                                                                                                    'Start Date : ',
                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                          fontFamily: 'DM Sans',
                                                                                                          fontSize: () {
                                                                                                            if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                              return 16.0;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                              return 16.0;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                              return 18.0;
                                                                                                            } else {
                                                                                                              return 18.0;
                                                                                                            }
                                                                                                          }(),
                                                                                                          letterSpacing: 0.0,
                                                                                                          fontWeight: FontWeight.w500,
                                                                                                        ),
                                                                                                  ),
                                                                                                  Padding(
                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                    child: Text(
                                                                                                      dateTimeFormat(
                                                                                                        "yMMMd",
                                                                                                        containerVarItem.startDate!,
                                                                                                        locale: FFLocalizations.of(context).languageCode,
                                                                                                      ),
                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                            fontFamily: 'DM Sans',
                                                                                                            fontSize: 16.0,
                                                                                                            letterSpacing: 0.0,
                                                                                                          ),
                                                                                                    ),
                                                                                                  ),
                                                                                                ],
                                                                                              ),
                                                                                            ),
                                                                                          ),
                                                                                          Visibility(
                                                                                            visible: !containerVarItem.customDate,
                                                                                            child: Padding(
                                                                                              padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                              child: Row(
                                                                                                mainAxisSize: MainAxisSize.max,
                                                                                                children: [
                                                                                                  Text(
                                                                                                    'End Date : ',
                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                          fontFamily: 'DM Sans',
                                                                                                          fontSize: () {
                                                                                                            if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                              return 16.0;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                              return 16.0;
                                                                                                            } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                              return 18.0;
                                                                                                            } else {
                                                                                                              return 18.0;
                                                                                                            }
                                                                                                          }(),
                                                                                                          letterSpacing: 0.0,
                                                                                                          fontWeight: FontWeight.w500,
                                                                                                        ),
                                                                                                  ),
                                                                                                  Padding(
                                                                                                    padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                    child: Text(
                                                                                                      dateTimeFormat(
                                                                                                        "yMMMd",
                                                                                                        containerVarItem.endDate!,
                                                                                                        locale: FFLocalizations.of(context).languageCode,
                                                                                                      ),
                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                            fontFamily: 'DM Sans',
                                                                                                            fontSize: 16.0,
                                                                                                            letterSpacing: 0.0,
                                                                                                          ),
                                                                                                    ),
                                                                                                  ),
                                                                                                ],
                                                                                              ),
                                                                                            ),
                                                                                          ),
                                                                                          Padding(
                                                                                            padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                            child: Row(
                                                                                              mainAxisSize: MainAxisSize.max,
                                                                                              children: [
                                                                                                Text(
                                                                                                  'Payment',
                                                                                                  style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                        fontFamily: 'DM Sans',
                                                                                                        fontSize: () {
                                                                                                          if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                            return 16.0;
                                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                            return 16.0;
                                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                            return 18.0;
                                                                                                          } else {
                                                                                                            return 18.0;
                                                                                                          }
                                                                                                        }(),
                                                                                                        letterSpacing: 0.0,
                                                                                                        fontWeight: FontWeight.w500,
                                                                                                      ),
                                                                                                ),
                                                                                                Padding(
                                                                                                  padding: EdgeInsetsDirectional.fromSTEB(10.0, 0.0, 0.0, 0.0),
                                                                                                  child: Text(
                                                                                                    containerVarItem.totalPay.toString(),
                                                                                                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                          fontFamily: 'DM Sans',
                                                                                                          fontSize: 16.0,
                                                                                                          letterSpacing: 0.0,
                                                                                                        ),
                                                                                                  ),
                                                                                                ),
                                                                                              ],
                                                                                            ),
                                                                                          ),
                                                                                        ],
                                                                                      ),
                                                                                    ),
                                                                                  ],
                                                                                ),
                                                                                Padding(
                                                                                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                  child: Flex(
                                                                                    direction: () {
                                                                                      if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                        return false;
                                                                                      } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                        return false;
                                                                                      } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                        return true;
                                                                                      } else {
                                                                                        return true;
                                                                                      }
                                                                                    }()
                                                                                        ? Axis.horizontal
                                                                                        : Axis.vertical,
                                                                                    mainAxisSize: MainAxisSize.max,
                                                                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                    children: [
                                                                                      Flex(
                                                                                        direction: () {
                                                                                          if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                            return false;
                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                            return false;
                                                                                          } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                            return true;
                                                                                          } else {
                                                                                            return true;
                                                                                          }
                                                                                        }()
                                                                                            ? Axis.horizontal
                                                                                            : Axis.vertical,
                                                                                        mainAxisSize: MainAxisSize.max,
                                                                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                        children: [
                                                                                          Padding(
                                                                                            padding: EdgeInsetsDirectional.fromSTEB(
                                                                                                0.0,
                                                                                                valueOrDefault<double>(
                                                                                                  () {
                                                                                                    if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                      return 10.0;
                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                      return 10.0;
                                                                                                    } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                      return 0.0;
                                                                                                    } else {
                                                                                                      return 0.0;
                                                                                                    }
                                                                                                  }(),
                                                                                                  0.0,
                                                                                                ),
                                                                                                0.0,
                                                                                                0.0),
                                                                                            child: Container(
                                                                                              width: () {
                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                  return 305.0;
                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                  return 305.0;
                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                  return 550.0;
                                                                                                } else {
                                                                                                  return 550.0;
                                                                                                }
                                                                                              }(),
                                                                                              height: () {
                                                                                                if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                  return 260.0;
                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                  return 260.0;
                                                                                                } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                  return 200.0;
                                                                                                } else {
                                                                                                  return 200.0;
                                                                                                }
                                                                                              }(),
                                                                                              decoration: BoxDecoration(
                                                                                                color: Color(0xFFF3F6F9),
                                                                                                borderRadius: BorderRadius.circular(8.0),
                                                                                                border: Border.all(
                                                                                                  color: Color(0xFFE8E8EC),
                                                                                                ),
                                                                                              ),
                                                                                              child: Padding(
                                                                                                padding: EdgeInsets.all(15.0),
                                                                                                child: Column(
                                                                                                  mainAxisSize: MainAxisSize.max,
                                                                                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                                  crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                  children: [
                                                                                                    Text(
                                                                                                      'Your Review :',
                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                            fontFamily: 'DM Sans',
                                                                                                            fontSize: 18.0,
                                                                                                            letterSpacing: 0.0,
                                                                                                            fontWeight: FontWeight.bold,
                                                                                                          ),
                                                                                                    ),
                                                                                                    Text(
                                                                                                      'Review',
                                                                                                      style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                            fontFamily: 'DM Sans',
                                                                                                            color: Color(0xFF89969F),
                                                                                                            fontSize: 16.0,
                                                                                                            letterSpacing: 0.0,
                                                                                                          ),
                                                                                                    ),
                                                                                                  ],
                                                                                                ),
                                                                                              ),
                                                                                            ),
                                                                                          ),
                                                                                        ],
                                                                                      ),
                                                                                      Padding(
                                                                                        padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                        child: Column(
                                                                                          mainAxisSize: MainAxisSize.max,
                                                                                          mainAxisAlignment: MainAxisAlignment.end,
                                                                                          crossAxisAlignment: CrossAxisAlignment.start,
                                                                                          children: [
                                                                                            Text(
                                                                                              'Location :',
                                                                                              style: FlutterFlowTheme.of(context).bodyMedium.override(
                                                                                                    fontFamily: 'DM Sans',
                                                                                                    fontSize: () {
                                                                                                      if (MediaQuery.sizeOf(context).width < kBreakpointSmall) {
                                                                                                        return 16.0;
                                                                                                      } else if (MediaQuery.sizeOf(context).width < kBreakpointMedium) {
                                                                                                        return 16.0;
                                                                                                      } else if (MediaQuery.sizeOf(context).width < kBreakpointLarge) {
                                                                                                        return 18.0;
                                                                                                      } else {
                                                                                                        return 18.0;
                                                                                                      }
                                                                                                    }(),
                                                                                                    letterSpacing: 0.0,
                                                                                                    fontWeight: FontWeight.w500,
                                                                                                  ),
                                                                                            ),
                                                                                            Padding(
                                                                                              padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                                                                                              child: wrapWithModel(
                                                                                                model: _model.customMapModels4.getModel(
                                                                                                  functions.generateUniqueId(),
                                                                                                  containerVarIndex,
                                                                                                ),
                                                                                                updateCallback: () => safeSetState(() {}),
                                                                                                child: CustomMapWidget(
                                                                                                  key: Key(
                                                                                                    'Keyk7m_${functions.generateUniqueId()}',
                                                                                                  ),
                                                                                                  latlng: containerVarItem.latlng!,
                                                                                                  address: containerVarItem.fullAddress,
                                                                                                ),
                                                                                              ),
                                                                                            ),
                                                                                          ],
                                                                                        ),
                                                                                      ),
                                                                                    ],
                                                                                  ),
                                                                                ),
                                                                              ],
                                                                            ),
                                                                          ),
                                                                        ),
                                                                      ),
                                                                    );
                                                                  },
                                                                );
                                                              },
                                                            ),
                                                          );
                                                        },
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                wrapWithModel(
                  model: _model.jobSeekerMobileNavBarModel,
                  updateCallback: () => safeSetState(() {}),
                  child: JobSeekerMobileNavBarWidget(
                    index: 0,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
