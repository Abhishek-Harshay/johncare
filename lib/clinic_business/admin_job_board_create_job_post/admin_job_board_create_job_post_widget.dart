import '/auth/firebase_auth/auth_util.dart';
import '/backend/backend.dart';
import '/backend/push_notifications/push_notifications_util.dart';
import '/backend/stripe/payment_manager.dart';
import '/components/add_location_widget.dart';
import '/components/clinic_mobile_nav_bar/clinic_mobile_nav_bar_widget.dart';
import '/flutter_flow/flutter_flow_calendar.dart';
import '/flutter_flow/flutter_flow_drop_down.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/flutter_flow/form_field_controller.dart';
import '/custom_code/actions/index.dart' as actions;
import '/flutter_flow/custom_functions.dart' as functions;
import '/index.dart';
import 'package:collection/collection.dart';
import 'package:easy_debounce/easy_debounce.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import 'admin_job_board_create_job_post_model.dart';
export 'admin_job_board_create_job_post_model.dart';

class AdminJobBoardCreateJobPostWidget extends StatefulWidget {
  const AdminJobBoardCreateJobPostWidget({super.key});

  static String routeName = 'AdminJobBoardCreateJobPost';
  static String routePath = '/clinicjobcreate';

  @override
  State<AdminJobBoardCreateJobPostWidget> createState() =>
      _AdminJobBoardCreateJobPostWidgetState();
}

class _AdminJobBoardCreateJobPostWidgetState
    extends State<AdminJobBoardCreateJobPostWidget> {
  late AdminJobBoardCreateJobPostModel _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => AdminJobBoardCreateJobPostModel());

    // On page load action.
    SchedulerBinding.instance.addPostFrameCallback((_) async {
      FFAppState().skills = [];
      FFAppState().addressJob = '';
      safeSetState(() {});
    });

    _model.switchValue = false;
    _model.jobtitle11TextController ??= TextEditingController();
    _model.jobtitle11FocusNode ??= FocusNode();

    _model.hospitalname11TextController ??= TextEditingController();
    _model.hospitalname11FocusNode ??= FocusNode();

    _model.yearsofexperience11TextController ??= TextEditingController();
    _model.yearsofexperience11FocusNode ??= FocusNode();

    _model.duration11TextController ??= TextEditingController();
    _model.duration11FocusNode ??= FocusNode();

    _model.hourlypay11TextController ??= TextEditingController();
    _model.hourlypay11FocusNode ??= FocusNode();

    _model.totalpay11TextController ??= TextEditingController(
        text: (_model.hourlypay11TextController.text != '') &&
                (_model.duration11TextController.text != '')
            ? valueOrDefault<String>(
                functions
                    .countTotalPay(
                        double.parse(_model.hourlypay11TextController.text),
                        (String var1) {
                          return double.parse(var1.split(' ')[0]);
                        }(_model.duration11TextController.text))
                    .toString(),
                '0',
              )
            : '0');
    _model.totalpay11FocusNode ??= FocusNode();

    _model.zipcode11TextController ??= TextEditingController();
    _model.zipcode11FocusNode ??= FocusNode();

    _model.description11TextController ??= TextEditingController();
    _model.description11FocusNode ??= FocusNode();

    _model.skillsTextController ??= TextEditingController();
    _model.skillsFocusNode ??= FocusNode();

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

    return Scaffold(
      key: scaffoldKey,
      body: SafeArea(
        top: true,
        child: Stack(
          alignment: AlignmentDirectional(0.0, 1.0),
          children: [
            Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (responsiveVisibility(
                  context: context,
                  tabletLandscape: false,
                  desktop: false,
                ))
                  Padding(
                    padding:
                        EdgeInsetsDirectional.fromSTEB(20.0, 10.0, 20.0, 20.0),
                    child: Row(
                      mainAxisSize: MainAxisSize.max,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(0.0),
                          child: Image.asset(
                            'assets/images/Logo.png',
                            width: 83.0,
                            height: 28.0,
                            fit: BoxFit.contain,
                          ),
                        ),
                        Row(
                          mainAxisSize: MainAxisSize.max,
                          children: [
                            Text(
                              'Post New Job',
                              textAlign: TextAlign.end,
                              style: FlutterFlowTheme.of(context)
                                  .bodyMedium
                                  .override(
                                    fontFamily: 'DM Sans',
                                    fontSize: 14.0,
                                    letterSpacing: 0.0,
                                    fontWeight: FontWeight.w500,
                                  ),
                            ),
                            Opacity(
                              opacity: 0.0,
                              child: Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    20.0, 0.0, 0.0, 0.0),
                                child: Switch.adaptive(
                                  value: _model.switchValue!,
                                  onChanged: (newValue) async {
                                    safeSetState(
                                        () => _model.switchValue = newValue);
                                  },
                                  activeColor:
                                      FlutterFlowTheme.of(context).primary,
                                  activeTrackColor:
                                      FlutterFlowTheme.of(context).primary,
                                  inactiveTrackColor:
                                      FlutterFlowTheme.of(context)
                                          .secondaryBackground,
                                  inactiveThumbColor:
                                      FlutterFlowTheme.of(context).secondary,
                                ),
                              ),
                            ),
                            Padding(
                              padding: EdgeInsetsDirectional.fromSTEB(
                                  12.0, 0.0, 0.0, 0.0),
                              child: FlutterFlowIconButton(
                                borderRadius: 20.0,
                                buttonSize: 40.0,
                                fillColor:
                                    FlutterFlowTheme.of(context).secondary,
                                icon: FaIcon(
                                  FontAwesomeIcons.bell,
                                  color: FlutterFlowTheme.of(context)
                                      .secondaryBackground,
                                  size: 20.0,
                                ),
                                onPressed: () async {
                                  context.pushNamed(
                                      NotificationScreenWidget.routeName);
                                },
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                Padding(
                  padding: EdgeInsetsDirectional.fromSTEB(20.0, 0.0, 0.0, 20.0),
                  child: Text(
                    'Create job post',
                    style: FlutterFlowTheme.of(context).displaySmall.override(
                          fontFamily: 'DM Sans',
                          fontSize: 20.0,
                          letterSpacing: 0.0,
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                ),
                Expanded(
                  child: Form(
                    key: _model.formKey,
                    autovalidateMode: AutovalidateMode.disabled,
                    child: Visibility(
                      visible: responsiveVisibility(
                        context: context,
                        desktop: false,
                      ),
                      child: Padding(
                        padding: EdgeInsetsDirectional.fromSTEB(
                            20.0, 0.0, 20.0, 0.0),
                        child: SingleChildScrollView(
                          child: Column(
                            mainAxisSize: MainAxisSize.max,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Job details :',
                                style: FlutterFlowTheme.of(context)
                                    .displaySmall
                                    .override(
                                      fontFamily: 'DM Sans',
                                      fontSize: 20.0,
                                      letterSpacing: 0.0,
                                      fontWeight: FontWeight.w500,
                                    ),
                              ),
                              Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 12.0, 0.0, 12.0),
                                child: Text(
                                  'Job title',
                                  style: FlutterFlowTheme.of(context)
                                      .labelMedium
                                      .override(
                                        fontFamily: 'DM Sans',
                                        color: FlutterFlowTheme.of(context)
                                            .primaryText,
                                        fontSize: 16.0,
                                        letterSpacing: 0.0,
                                        fontWeight: FontWeight.w500,
                                      ),
                                ),
                              ),
                              Container(
                                width: 335.0,
                                child: TextFormField(
                                  controller: _model.jobtitle11TextController,
                                  focusNode: _model.jobtitle11FocusNode,
                                  autofocus: false,
                                  obscureText: false,
                                  decoration: InputDecoration(
                                    labelText: 'Enter Job title',
                                    labelStyle: FlutterFlowTheme.of(context)
                                        .labelMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          color: Color(0xFF89969F),
                                          fontSize: 16.0,
                                          letterSpacing: 0.0,
                                          fontWeight: FontWeight.w500,
                                        ),
                                    enabledBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color: Color(0xFFC0D1DC),
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    focusedBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color: FlutterFlowTheme.of(context)
                                            .primary,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    errorBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color:
                                            FlutterFlowTheme.of(context).error,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    focusedErrorBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color:
                                            FlutterFlowTheme.of(context).error,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    filled: true,
                                    fillColor: FlutterFlowTheme.of(context)
                                        .secondaryBackground,
                                  ),
                                  style: FlutterFlowTheme.of(context)
                                      .bodyMedium
                                      .override(
                                        fontFamily: 'DM Sans',
                                        letterSpacing: 0.0,
                                      ),
                                  validator: _model
                                      .jobtitle11TextControllerValidator
                                      .asValidator(context),
                                ),
                              ),
                              if (valueOrDefault(
                                      currentUserDocument?.subRole, '') ==
                                  'business')
                                AuthUserStreamWidget(
                                  builder: (context) => Column(
                                    mainAxisSize: MainAxisSize.max,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Padding(
                                        padding: EdgeInsetsDirectional.fromSTEB(
                                            0.0, 12.0, 0.0, 12.0),
                                        child: Text(
                                          'Hospital name',
                                          style: FlutterFlowTheme.of(context)
                                              .labelMedium
                                              .override(
                                                fontFamily: 'DM Sans',
                                                color:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                fontSize: 16.0,
                                                letterSpacing: 0.0,
                                                fontWeight: FontWeight.w500,
                                              ),
                                        ),
                                      ),
                                      Container(
                                        width: 335.0,
                                        child: TextFormField(
                                          controller: _model
                                              .hospitalname11TextController,
                                          focusNode:
                                              _model.hospitalname11FocusNode,
                                          autofocus: false,
                                          autofillHints: [AutofillHints.email],
                                          obscureText: false,
                                          decoration: InputDecoration(
                                            labelText: 'Enter Hospital name',
                                            labelStyle:
                                                FlutterFlowTheme.of(context)
                                                    .labelMedium
                                                    .override(
                                                      fontFamily: 'DM Sans',
                                                      color: Color(0xFF89969F),
                                                      fontSize: 16.0,
                                                      letterSpacing: 0.0,
                                                      fontWeight:
                                                          FontWeight.w500,
                                                    ),
                                            enabledBorder: OutlineInputBorder(
                                              borderSide: BorderSide(
                                                color: Color(0xFFC0D1DC),
                                                width: 2.0,
                                              ),
                                              borderRadius:
                                                  BorderRadius.circular(12.0),
                                            ),
                                            focusedBorder: OutlineInputBorder(
                                              borderSide: BorderSide(
                                                color:
                                                    FlutterFlowTheme.of(context)
                                                        .primary,
                                                width: 2.0,
                                              ),
                                              borderRadius:
                                                  BorderRadius.circular(12.0),
                                            ),
                                            errorBorder: OutlineInputBorder(
                                              borderSide: BorderSide(
                                                color:
                                                    FlutterFlowTheme.of(context)
                                                        .error,
                                                width: 2.0,
                                              ),
                                              borderRadius:
                                                  BorderRadius.circular(12.0),
                                            ),
                                            focusedErrorBorder:
                                                OutlineInputBorder(
                                              borderSide: BorderSide(
                                                color:
                                                    FlutterFlowTheme.of(context)
                                                        .error,
                                                width: 2.0,
                                              ),
                                              borderRadius:
                                                  BorderRadius.circular(12.0),
                                            ),
                                            filled: true,
                                            fillColor:
                                                FlutterFlowTheme.of(context)
                                                    .secondaryBackground,
                                          ),
                                          style: FlutterFlowTheme.of(context)
                                              .bodyMedium
                                              .override(
                                                fontFamily: 'DM Sans',
                                                letterSpacing: 0.0,
                                              ),
                                          keyboardType:
                                              TextInputType.emailAddress,
                                          validator: _model
                                              .hospitalname11TextControllerValidator
                                              .asValidator(context),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 12.0, 0.0, 12.0),
                                child: Text(
                                  'Years of experience',
                                  style: FlutterFlowTheme.of(context)
                                      .labelMedium
                                      .override(
                                        fontFamily: 'DM Sans',
                                        color: FlutterFlowTheme.of(context)
                                            .primaryText,
                                        fontSize: 16.0,
                                        letterSpacing: 0.0,
                                        fontWeight: FontWeight.w500,
                                      ),
                                ),
                              ),
                              Container(
                                width: 335.0,
                                child: TextFormField(
                                  controller:
                                      _model.yearsofexperience11TextController,
                                  focusNode:
                                      _model.yearsofexperience11FocusNode,
                                  autofocus: false,
                                  obscureText: false,
                                  decoration: InputDecoration(
                                    labelText: 'Enter Years of experience',
                                    labelStyle: FlutterFlowTheme.of(context)
                                        .labelMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          color: Color(0xFF89969F),
                                          fontSize: 16.0,
                                          letterSpacing: 0.0,
                                          fontWeight: FontWeight.w500,
                                        ),
                                    enabledBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color: Color(0xFFC0D1DC),
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    focusedBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color: FlutterFlowTheme.of(context)
                                            .primary,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    errorBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color:
                                            FlutterFlowTheme.of(context).error,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    focusedErrorBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color:
                                            FlutterFlowTheme.of(context).error,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    filled: true,
                                    fillColor: FlutterFlowTheme.of(context)
                                        .secondaryBackground,
                                  ),
                                  style: FlutterFlowTheme.of(context)
                                      .bodyMedium
                                      .override(
                                        fontFamily: 'DM Sans',
                                        letterSpacing: 0.0,
                                      ),
                                  keyboardType: TextInputType.number,
                                  validator: _model
                                      .yearsofexperience11TextControllerValidator
                                      .asValidator(context),
                                ),
                              ),
                              Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 12.0, 0.0, 12.0),
                                child: Text(
                                  'Profession',
                                  style: FlutterFlowTheme.of(context)
                                      .labelMedium
                                      .override(
                                        fontFamily: 'DM Sans',
                                        color: FlutterFlowTheme.of(context)
                                            .primaryText,
                                        fontSize: 16.0,
                                        letterSpacing: 0.0,
                                        fontWeight: FontWeight.w500,
                                      ),
                                ),
                              ),
                              FutureBuilder<List<ProfessionsRecord>>(
                                future: queryProfessionsRecordOnce(),
                                builder: (context, snapshot) {
                                  // Customize what your widget looks like when it's loading.
                                  if (!snapshot.hasData) {
                                    return Center(
                                      child: SizedBox(
                                        width: 50.0,
                                        height: 50.0,
                                        child: CircularProgressIndicator(
                                          valueColor:
                                              AlwaysStoppedAnimation<Color>(
                                            FlutterFlowTheme.of(context)
                                                .primary,
                                          ),
                                        ),
                                      ),
                                    );
                                  }
                                  List<ProfessionsRecord>
                                      professionProfessionsRecordList =
                                      snapshot.data!;

                                  return FlutterFlowDropDown<String>(
                                    controller:
                                        _model.professionValueController ??=
                                            FormFieldController<String>(null),
                                    options: professionProfessionsRecordList
                                        .map((e) => e.profession)
                                        .toList(),
                                    onChanged: (val) => safeSetState(
                                        () => _model.professionValue = val),
                                    width: 335.0,
                                    height: 48.0,
                                    textStyle: FlutterFlowTheme.of(context)
                                        .bodyMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          color: Color(0xFF89969F),
                                          fontSize: 16.0,
                                          letterSpacing: 0.0,
                                          fontWeight: FontWeight.w500,
                                        ),
                                    hintText: 'Enter profession',
                                    icon: Icon(
                                      Icons.keyboard_arrow_down_rounded,
                                      color: FlutterFlowTheme.of(context)
                                          .secondaryText,
                                      size: 24.0,
                                    ),
                                    fillColor: FlutterFlowTheme.of(context)
                                        .secondaryBackground,
                                    elevation: 2.0,
                                    borderColor: Color(0xFFC0D1DC),
                                    borderWidth: 0.0,
                                    borderRadius: 8.0,
                                    margin: EdgeInsetsDirectional.fromSTEB(
                                        12.0, 0.0, 12.0, 0.0),
                                    hidesUnderline: true,
                                    isOverButton: false,
                                    isSearchable: false,
                                    isMultiSelect: false,
                                  );
                                },
                              ),
                              Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 12.0, 0.0, 12.0),
                                child: Text(
                                  'Specialty area',
                                  style: FlutterFlowTheme.of(context)
                                      .labelMedium
                                      .override(
                                        fontFamily: 'DM Sans',
                                        color: FlutterFlowTheme.of(context)
                                            .primaryText,
                                        fontSize: 16.0,
                                        letterSpacing: 0.0,
                                        fontWeight: FontWeight.w500,
                                      ),
                                ),
                              ),
                              FutureBuilder<List<ProfessionsRecord>>(
                                future: queryProfessionsRecordOnce(),
                                builder: (context, snapshot) {
                                  // Customize what your widget looks like when it's loading.
                                  if (!snapshot.hasData) {
                                    return Center(
                                      child: SizedBox(
                                        width: 50.0,
                                        height: 50.0,
                                        child: CircularProgressIndicator(
                                          valueColor:
                                              AlwaysStoppedAnimation<Color>(
                                            FlutterFlowTheme.of(context)
                                                .primary,
                                          ),
                                        ),
                                      ),
                                    );
                                  }
                                  List<ProfessionsRecord>
                                      specialtyareaProfessionsRecordList =
                                      snapshot.data!;

                                  return FlutterFlowDropDown<String>(
                                    controller:
                                        _model.specialtyareaValueController ??=
                                            FormFieldController<String>(null),
                                    options: _model.professionValue != null &&
                                            _model.professionValue != ''
                                        ? specialtyareaProfessionsRecordList
                                            .where((e) =>
                                                e.profession ==
                                                _model.professionValue)
                                            .toList()
                                            .firstOrNull!
                                            .spealityArea
                                        : ([]),
                                    onChanged: (val) => safeSetState(
                                        () => _model.specialtyareaValue = val),
                                    width: 335.0,
                                    height: 48.0,
                                    textStyle: FlutterFlowTheme.of(context)
                                        .bodyMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          color: Color(0xFF89969F),
                                          fontSize: 16.0,
                                          letterSpacing: 0.0,
                                          fontWeight: FontWeight.w500,
                                        ),
                                    hintText: 'Select speciality area',
                                    icon: Icon(
                                      Icons.keyboard_arrow_down_rounded,
                                      color: FlutterFlowTheme.of(context)
                                          .secondaryText,
                                      size: 24.0,
                                    ),
                                    fillColor: FlutterFlowTheme.of(context)
                                        .secondaryBackground,
                                    elevation: 2.0,
                                    borderColor: Color(0xFFC0D1DC),
                                    borderWidth: 0.0,
                                    borderRadius: 8.0,
                                    margin: EdgeInsetsDirectional.fromSTEB(
                                        12.0, 0.0, 12.0, 0.0),
                                    hidesUnderline: true,
                                    isOverButton: false,
                                    isSearchable: false,
                                    isMultiSelect: false,
                                  );
                                },
                              ),
                              Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 20.0, 0.0, 0.0),
                                child: Text(
                                  'Shift details :',
                                  style: FlutterFlowTheme.of(context)
                                      .displaySmall
                                      .override(
                                        fontFamily: 'DM Sans',
                                        fontSize: 20.0,
                                        letterSpacing: 0.0,
                                        fontWeight: FontWeight.w500,
                                      ),
                                ),
                              ),
                              Row(
                                mainAxisSize: MainAxisSize.max,
                                children: [
                                  Theme(
                                    data: ThemeData(
                                      checkboxTheme: CheckboxThemeData(
                                        visualDensity: VisualDensity.compact,
                                        materialTapTargetSize:
                                            MaterialTapTargetSize.shrinkWrap,
                                        shape: RoundedRectangleBorder(
                                          borderRadius:
                                              BorderRadius.circular(4.0),
                                        ),
                                      ),
                                      unselectedWidgetColor:
                                          FlutterFlowTheme.of(context)
                                              .alternate,
                                    ),
                                    child: Checkbox(
                                      value: _model.customDateValue ??= false,
                                      onChanged: (newValue) async {
                                        safeSetState(() =>
                                            _model.customDateValue = newValue!);
                                      },
                                      side: BorderSide(
                                        width: 2,
                                        color: FlutterFlowTheme.of(context)
                                            .alternate,
                                      ),
                                      activeColor:
                                          FlutterFlowTheme.of(context).primary,
                                      checkColor:
                                          FlutterFlowTheme.of(context).info,
                                    ),
                                  ),
                                  Padding(
                                    padding: EdgeInsetsDirectional.fromSTEB(
                                        0.0, 12.0, 0.0, 12.0),
                                    child: RichText(
                                      textScaler:
                                          MediaQuery.of(context).textScaler,
                                      text: TextSpan(
                                        children: [
                                          TextSpan(
                                            text: 'Custom Date',
                                            style: FlutterFlowTheme.of(context)
                                                .labelMedium
                                                .override(
                                                  fontFamily: 'DM Sans',
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .primaryText,
                                                  fontSize: 16.0,
                                                  letterSpacing: 0.0,
                                                  fontWeight: FontWeight.w500,
                                                ),
                                          )
                                        ],
                                        style: FlutterFlowTheme.of(context)
                                            .labelMedium
                                            .override(
                                              fontFamily: 'DM Sans',
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .primaryText,
                                              fontSize: 16.0,
                                              letterSpacing: 0.0,
                                              fontWeight: FontWeight.w500,
                                            ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              if (_model.customDateValue ?? true)
                                Column(
                                  mainAxisSize: MainAxisSize.max,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    FlutterFlowCalendar(
                                      color:
                                          FlutterFlowTheme.of(context).primary,
                                      iconColor: FlutterFlowTheme.of(context)
                                          .secondaryText,
                                      weekFormat: false,
                                      weekStartsMonday: false,
                                      initialDate: getCurrentTimestamp,
                                      rowHeight: 50.0,
                                      onChange: (DateTimeRange?
                                          newSelectedDate) async {
                                        if (_model.calendarSelectedDay ==
                                            newSelectedDate) {
                                          return;
                                        }
                                        _model.calendarSelectedDay =
                                            newSelectedDate;

                                        safeSetState(() {});
                                        safeSetState(() {
                                          _model.duration11TextController
                                                  ?.text =
                                              '${functions.countDuration(_model.datePicked3!, _model.datePicked4!, _model.calendarSelectedDay!.start, _model.calendarSelectedDay!.start).toString()} hours';
                                        });
                                        safeSetState(() {
                                          _model.totalpay11TextController
                                              ?.text = ((_model.hourlypay11TextController
                                                              .text !=
                                                          '') &&
                                                  (_model.duration11TextController
                                                              .text !=
                                                          '')
                                              ? valueOrDefault<String>(
                                                  functions
                                                      .countTotalPay(
                                                          double.parse(_model
                                                              .hourlypay11TextController
                                                              .text),
                                                          (String var1) {
                                                            return double.parse(
                                                                var1.split(
                                                                    ' ')[0]);
                                                          }(_model
                                                              .duration11TextController
                                                              .text))
                                                      .toString(),
                                                  '0',
                                                )
                                              : '0');
                                        });
                                        safeSetState(() {});
                                      },
                                      titleStyle: FlutterFlowTheme.of(context)
                                          .titleLarge
                                          .override(
                                            fontFamily: 'DM Sans',
                                            fontSize: 24.0,
                                            letterSpacing: 0.0,
                                          ),
                                      dayOfWeekStyle:
                                          FlutterFlowTheme.of(context)
                                              .bodyLarge
                                              .override(
                                                fontFamily: 'DM Sans',
                                                letterSpacing: 0.0,
                                              ),
                                      dateStyle: FlutterFlowTheme.of(context)
                                          .bodyMedium
                                          .override(
                                            fontFamily: 'DM Sans',
                                            letterSpacing: 0.0,
                                          ),
                                      selectedDateStyle:
                                          FlutterFlowTheme.of(context)
                                              .titleSmall
                                              .override(
                                                fontFamily: 'DM Sans',
                                                color:
                                                    FlutterFlowTheme.of(context)
                                                        .secondaryBackground,
                                                letterSpacing: 0.0,
                                              ),
                                      inactiveDateStyle:
                                          FlutterFlowTheme.of(context)
                                              .labelMedium
                                              .override(
                                                fontFamily: 'DM Sans',
                                                letterSpacing: 0.0,
                                              ),
                                      locale: FFLocalizations.of(context)
                                          .languageCode,
                                    ),
                                    Padding(
                                      padding: EdgeInsetsDirectional.fromSTEB(
                                          0.0, 12.0, 0.0, 12.0),
                                      child: RichText(
                                        textScaler:
                                            MediaQuery.of(context).textScaler,
                                        text: TextSpan(
                                          children: [
                                            TextSpan(
                                              text: 'Date',
                                              style: FlutterFlowTheme.of(
                                                      context)
                                                  .labelMedium
                                                  .override(
                                                    fontFamily: 'DM Sans',
                                                    color: FlutterFlowTheme.of(
                                                            context)
                                                        .primaryText,
                                                    fontSize: 16.0,
                                                    letterSpacing: 0.0,
                                                    fontWeight: FontWeight.w500,
                                                  ),
                                            )
                                          ],
                                          style: FlutterFlowTheme.of(context)
                                              .labelMedium
                                              .override(
                                                fontFamily: 'DM Sans',
                                                color:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                fontSize: 16.0,
                                                letterSpacing: 0.0,
                                                fontWeight: FontWeight.w500,
                                              ),
                                        ),
                                      ),
                                    ),
                                    Container(
                                      height: 48.0,
                                      decoration: BoxDecoration(
                                        color: FlutterFlowTheme.of(context)
                                            .secondaryBackground,
                                        borderRadius:
                                            BorderRadius.circular(12.0),
                                        border: Border.all(
                                          color: Color(0xFFC0D1DC),
                                          width: 2.0,
                                        ),
                                      ),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.max,
                                        children: [
                                          Padding(
                                            padding:
                                                EdgeInsetsDirectional.fromSTEB(
                                                    5.0, 0.0, 0.0, 0.0),
                                            child: Icon(
                                              Icons.calendar_month,
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .primaryText,
                                              size: 24.0,
                                            ),
                                          ),
                                          Align(
                                            alignment:
                                                AlignmentDirectional(-1.0, 0.0),
                                            child: Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(8.0, 0.0, 0.0, 0.0),
                                              child: Text(
                                                functions
                                                    .convertDateTimeToString(
                                                        _model
                                                            .calendarSelectedDay
                                                            ?.start),
                                                style:
                                                    FlutterFlowTheme.of(context)
                                                        .bodyMedium
                                                        .override(
                                                          fontFamily: 'DM Sans',
                                                          fontSize: 16.0,
                                                          letterSpacing: 0.0,
                                                        ),
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              if (!_model.customDateValue!)
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      0.0, 12.0, 0.0, 12.0),
                                  child: RichText(
                                    textScaler:
                                        MediaQuery.of(context).textScaler,
                                    text: TextSpan(
                                      children: [
                                        TextSpan(
                                          text: 'Start date',
                                          style: FlutterFlowTheme.of(context)
                                              .labelMedium
                                              .override(
                                                fontFamily: 'DM Sans',
                                                color:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                fontSize: 16.0,
                                                letterSpacing: 0.0,
                                                fontWeight: FontWeight.w500,
                                              ),
                                        )
                                      ],
                                      style: FlutterFlowTheme.of(context)
                                          .labelMedium
                                          .override(
                                            fontFamily: 'DM Sans',
                                            color: FlutterFlowTheme.of(context)
                                                .primaryText,
                                            fontSize: 16.0,
                                            letterSpacing: 0.0,
                                            fontWeight: FontWeight.w500,
                                          ),
                                    ),
                                  ),
                                ),
                              if (!_model.customDateValue!)
                                InkWell(
                                  splashColor: Colors.transparent,
                                  focusColor: Colors.transparent,
                                  hoverColor: Colors.transparent,
                                  highlightColor: Colors.transparent,
                                  onTap: () async {
                                    final _datePicked1Date =
                                        await showDatePicker(
                                      context: context,
                                      initialDate: (_model.datePicked1 ??
                                          DateTime.now()),
                                      firstDate: DateTime(1900),
                                      lastDate: DateTime(2050),
                                      builder: (context, child) {
                                        return wrapInMaterialDatePickerTheme(
                                          context,
                                          child!,
                                          headerBackgroundColor:
                                              FlutterFlowTheme.of(context)
                                                  .primary,
                                          headerForegroundColor:
                                              FlutterFlowTheme.of(context).info,
                                          headerTextStyle:
                                              FlutterFlowTheme.of(context)
                                                  .headlineLarge
                                                  .override(
                                                    fontFamily: 'DM Sans',
                                                    fontSize: 32.0,
                                                    letterSpacing: 0.0,
                                                    fontWeight: FontWeight.w600,
                                                  ),
                                          pickerBackgroundColor:
                                              FlutterFlowTheme.of(context)
                                                  .secondaryBackground,
                                          pickerForegroundColor:
                                              FlutterFlowTheme.of(context)
                                                  .primaryText,
                                          selectedDateTimeBackgroundColor:
                                              FlutterFlowTheme.of(context)
                                                  .primary,
                                          selectedDateTimeForegroundColor:
                                              FlutterFlowTheme.of(context).info,
                                          actionButtonForegroundColor:
                                              FlutterFlowTheme.of(context)
                                                  .primaryText,
                                          iconSize: 24.0,
                                        );
                                      },
                                    );

                                    if (_datePicked1Date != null) {
                                      safeSetState(() {
                                        _model.datePicked1 = DateTime(
                                          _datePicked1Date.year,
                                          _datePicked1Date.month,
                                          _datePicked1Date.day,
                                        );
                                      });
                                    } else if (_model.datePicked1 != null) {
                                      safeSetState(() {
                                        _model.datePicked1 = _model.datePicked1;
                                      });
                                    }
                                    safeSetState(() {
                                      _model.duration11TextController?.text =
                                          '${functions.countDuration(_model.datePicked3!, _model.datePicked4!, _model.datePicked1!, _model.datePicked2!).toString()} hours';
                                    });
                                    safeSetState(() {
                                      _model.totalpay11TextController
                                          ?.text = ((_model.hourlypay11TextController
                                                          .text !=
                                                      '') &&
                                              (_model.duration11TextController
                                                          .text !=
                                                      '')
                                          ? valueOrDefault<String>(
                                              functions
                                                  .countTotalPay(
                                                      double.parse(_model
                                                          .hourlypay11TextController
                                                          .text),
                                                      (String var1) {
                                                        return double.parse(
                                                            var1.split(' ')[0]);
                                                      }(_model
                                                          .duration11TextController
                                                          .text))
                                                  .toString(),
                                              '0',
                                            )
                                          : '0');
                                    });
                                  },
                                  child: Container(
                                    height: 48.0,
                                    decoration: BoxDecoration(
                                      color: FlutterFlowTheme.of(context)
                                          .secondaryBackground,
                                      borderRadius: BorderRadius.circular(12.0),
                                      border: Border.all(
                                        color: Color(0xFFC0D1DC),
                                        width: 2.0,
                                      ),
                                    ),
                                    child: Row(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  5.0, 0.0, 0.0, 0.0),
                                          child: Icon(
                                            Icons.calendar_month,
                                            color: FlutterFlowTheme.of(context)
                                                .primaryText,
                                            size: 24.0,
                                          ),
                                        ),
                                        Align(
                                          alignment:
                                              AlignmentDirectional(-1.0, 0.0),
                                          child: Padding(
                                            padding:
                                                EdgeInsetsDirectional.fromSTEB(
                                                    8.0, 0.0, 0.0, 0.0),
                                            child: Text(
                                              _model.datePicked1 != null
                                                  ? functions
                                                      .convertDateTimeToString(
                                                          _model.datePicked1)
                                                  : 'Start Date',
                                              style:
                                                  FlutterFlowTheme.of(context)
                                                      .bodyMedium
                                                      .override(
                                                        fontFamily: 'DM Sans',
                                                        fontSize: 16.0,
                                                        letterSpacing: 0.0,
                                                      ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              if (!_model.customDateValue!)
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      0.0, 12.0, 0.0, 12.0),
                                  child: RichText(
                                    textScaler:
                                        MediaQuery.of(context).textScaler,
                                    text: TextSpan(
                                      children: [
                                        TextSpan(
                                          text: 'End date',
                                          style: FlutterFlowTheme.of(context)
                                              .labelMedium
                                              .override(
                                                fontFamily: 'DM Sans',
                                                color:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                fontSize: 16.0,
                                                letterSpacing: 0.0,
                                                fontWeight: FontWeight.w500,
                                              ),
                                        )
                                      ],
                                      style: FlutterFlowTheme.of(context)
                                          .labelMedium
                                          .override(
                                            fontFamily: 'DM Sans',
                                            color: FlutterFlowTheme.of(context)
                                                .primaryText,
                                            fontSize: 16.0,
                                            letterSpacing: 0.0,
                                            fontWeight: FontWeight.w500,
                                          ),
                                    ),
                                  ),
                                ),
                              if (!_model.customDateValue!)
                                InkWell(
                                  splashColor: Colors.transparent,
                                  focusColor: Colors.transparent,
                                  hoverColor: Colors.transparent,
                                  highlightColor: Colors.transparent,
                                  onTap: () async {
                                    final _datePicked2Date =
                                        await showDatePicker(
                                      context: context,
                                      initialDate: (_model.datePicked2 ??
                                          DateTime.now()),
                                      firstDate: DateTime(1900),
                                      lastDate: DateTime(2050),
                                      builder: (context, child) {
                                        return wrapInMaterialDatePickerTheme(
                                          context,
                                          child!,
                                          headerBackgroundColor:
                                              FlutterFlowTheme.of(context)
                                                  .primary,
                                          headerForegroundColor:
                                              FlutterFlowTheme.of(context).info,
                                          headerTextStyle:
                                              FlutterFlowTheme.of(context)
                                                  .headlineLarge
                                                  .override(
                                                    fontFamily: 'DM Sans',
                                                    fontSize: 32.0,
                                                    letterSpacing: 0.0,
                                                    fontWeight: FontWeight.w600,
                                                  ),
                                          pickerBackgroundColor:
                                              FlutterFlowTheme.of(context)
                                                  .secondaryBackground,
                                          pickerForegroundColor:
                                              FlutterFlowTheme.of(context)
                                                  .primaryText,
                                          selectedDateTimeBackgroundColor:
                                              FlutterFlowTheme.of(context)
                                                  .primary,
                                          selectedDateTimeForegroundColor:
                                              FlutterFlowTheme.of(context).info,
                                          actionButtonForegroundColor:
                                              FlutterFlowTheme.of(context)
                                                  .primaryText,
                                          iconSize: 24.0,
                                        );
                                      },
                                    );

                                    if (_datePicked2Date != null) {
                                      safeSetState(() {
                                        _model.datePicked2 = DateTime(
                                          _datePicked2Date.year,
                                          _datePicked2Date.month,
                                          _datePicked2Date.day,
                                        );
                                      });
                                    } else if (_model.datePicked2 != null) {
                                      safeSetState(() {
                                        _model.datePicked2 = _model.datePicked2;
                                      });
                                    }
                                    safeSetState(() {
                                      _model.duration11TextController?.text =
                                          '${functions.countDuration(_model.datePicked3!, _model.datePicked4!, _model.datePicked1!, _model.datePicked2!).toString()} hours';
                                    });
                                    safeSetState(() {
                                      _model.totalpay11TextController
                                          ?.text = ((_model.hourlypay11TextController
                                                          .text !=
                                                      '') &&
                                              (_model.duration11TextController
                                                          .text !=
                                                      '')
                                          ? valueOrDefault<String>(
                                              functions
                                                  .countTotalPay(
                                                      double.parse(_model
                                                          .hourlypay11TextController
                                                          .text),
                                                      (String var1) {
                                                        return double.parse(
                                                            var1.split(' ')[0]);
                                                      }(_model
                                                          .duration11TextController
                                                          .text))
                                                  .toString(),
                                              '0',
                                            )
                                          : '0');
                                    });
                                  },
                                  child: Container(
                                    height: 48.0,
                                    decoration: BoxDecoration(
                                      color: Colors.white,
                                      borderRadius: BorderRadius.circular(12.0),
                                      border: Border.all(
                                        color: Color(0xFFC0D1DC),
                                        width: 2.0,
                                      ),
                                    ),
                                    child: Row(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  5.0, 0.0, 0.0, 0.0),
                                          child: Icon(
                                            Icons.calendar_month,
                                            color: FlutterFlowTheme.of(context)
                                                .primaryText,
                                            size: 24.0,
                                          ),
                                        ),
                                        Align(
                                          alignment:
                                              AlignmentDirectional(-1.0, 0.0),
                                          child: Padding(
                                            padding:
                                                EdgeInsetsDirectional.fromSTEB(
                                                    8.0, 0.0, 0.0, 0.0),
                                            child: Text(
                                              _model.datePicked2 != null
                                                  ? functions
                                                      .convertDateTimeToString(
                                                          _model.datePicked2)
                                                  : 'End Date',
                                              style:
                                                  FlutterFlowTheme.of(context)
                                                      .bodyMedium
                                                      .override(
                                                        fontFamily: 'DM Sans',
                                                        fontSize: 16.0,
                                                        letterSpacing: 0.0,
                                                      ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 12.0, 0.0, 12.0),
                                child: RichText(
                                  textScaler: MediaQuery.of(context).textScaler,
                                  text: TextSpan(
                                    children: [
                                      TextSpan(
                                        text: 'Timing ( HH:MM to HH:MM)',
                                        style: FlutterFlowTheme.of(context)
                                            .labelMedium
                                            .override(
                                              fontFamily: 'DM Sans',
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .primaryText,
                                              fontSize: 16.0,
                                              letterSpacing: 0.0,
                                              fontWeight: FontWeight.w500,
                                            ),
                                      )
                                    ],
                                    style: FlutterFlowTheme.of(context)
                                        .labelMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          color: FlutterFlowTheme.of(context)
                                              .primaryText,
                                          fontSize: 16.0,
                                          letterSpacing: 0.0,
                                          fontWeight: FontWeight.w500,
                                        ),
                                  ),
                                ),
                              ),
                              Row(
                                mainAxisSize: MainAxisSize.max,
                                children: [
                                  Expanded(
                                    child: InkWell(
                                      splashColor: Colors.transparent,
                                      focusColor: Colors.transparent,
                                      hoverColor: Colors.transparent,
                                      highlightColor: Colors.transparent,
                                      onTap: () async {
                                        final _datePicked3Time =
                                            await showTimePicker(
                                          context: context,
                                          initialTime: TimeOfDay.fromDateTime(
                                              (_model.datePicked3 ??
                                                  DateTime.now())),
                                          builder: (context, child) {
                                            return wrapInMaterialTimePickerTheme(
                                              context,
                                              child!,
                                              headerBackgroundColor:
                                                  FlutterFlowTheme.of(context)
                                                      .primary,
                                              headerForegroundColor:
                                                  FlutterFlowTheme.of(context)
                                                      .info,
                                              headerTextStyle:
                                                  FlutterFlowTheme.of(context)
                                                      .headlineLarge
                                                      .override(
                                                        fontFamily: 'DM Sans',
                                                        fontSize: 32.0,
                                                        letterSpacing: 0.0,
                                                        fontWeight:
                                                            FontWeight.w600,
                                                      ),
                                              pickerBackgroundColor:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                              pickerForegroundColor:
                                                  FlutterFlowTheme.of(context)
                                                      .primaryText,
                                              selectedDateTimeBackgroundColor:
                                                  FlutterFlowTheme.of(context)
                                                      .primary,
                                              selectedDateTimeForegroundColor:
                                                  FlutterFlowTheme.of(context)
                                                      .info,
                                              actionButtonForegroundColor:
                                                  FlutterFlowTheme.of(context)
                                                      .primaryText,
                                              iconSize: 24.0,
                                            );
                                          },
                                        );
                                        if (_datePicked3Time != null) {
                                          safeSetState(() {
                                            _model.datePicked3 = DateTime(
                                              (_model.datePicked3 ??
                                                      DateTime.now())
                                                  .year,
                                              (_model.datePicked3 ??
                                                      DateTime.now())
                                                  .month,
                                              (_model.datePicked3 ??
                                                      DateTime.now())
                                                  .day,
                                              _datePicked3Time.hour,
                                              _datePicked3Time.minute,
                                            );
                                          });
                                        } else if (_model.datePicked3 != null) {
                                          safeSetState(() {
                                            _model.datePicked3 =
                                                _model.datePicked3;
                                          });
                                        }
                                        safeSetState(() {
                                          _model.duration11TextController
                                                  ?.text =
                                              '${functions.countDuration(_model.datePicked3!, _model.datePicked4!, _model.customDateValue! ? _model.calendarSelectedDay!.start : _model.datePicked1!, _model.customDateValue! ? _model.calendarSelectedDay!.start : _model.datePicked2!).toString()} hours';
                                        });
                                        safeSetState(() {
                                          _model.totalpay11TextController
                                              ?.text = ((_model.hourlypay11TextController
                                                              .text !=
                                                          '') &&
                                                  (_model.duration11TextController
                                                              .text !=
                                                          '')
                                              ? valueOrDefault<String>(
                                                  functions
                                                      .countTotalPay(
                                                          double.parse(_model
                                                              .hourlypay11TextController
                                                              .text),
                                                          (String var1) {
                                                            return double.parse(
                                                                var1.split(
                                                                    ' ')[0]);
                                                          }(_model
                                                              .duration11TextController
                                                              .text))
                                                      .toString(),
                                                  '0',
                                                )
                                              : '0');
                                        });
                                      },
                                      child: Container(
                                        height: 50.0,
                                        decoration: BoxDecoration(
                                          color: FlutterFlowTheme.of(context)
                                              .secondaryBackground,
                                          borderRadius:
                                              BorderRadius.circular(12.0),
                                          border: Border.all(
                                            color: Color(0xFFC0D1DC),
                                            width: 2.0,
                                          ),
                                        ),
                                        child: Align(
                                          alignment:
                                              AlignmentDirectional(-1.0, 0.0),
                                          child: Padding(
                                            padding:
                                                EdgeInsetsDirectional.fromSTEB(
                                                    8.0, 0.0, 0.0, 0.0),
                                            child: Text(
                                              _model.datePicked3 != null
                                                  ? dateTimeFormat(
                                                      "jm",
                                                      _model.datePicked3,
                                                      locale:
                                                          FFLocalizations.of(
                                                                  context)
                                                              .languageCode,
                                                    )
                                                  : 'Start Time',
                                              style:
                                                  FlutterFlowTheme.of(context)
                                                      .bodyMedium
                                                      .override(
                                                        fontFamily: 'DM Sans',
                                                        fontSize: 16.0,
                                                        letterSpacing: 0.0,
                                                      ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Text(
                                    'to',
                                    style: FlutterFlowTheme.of(context)
                                        .bodyMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          fontSize: 18.0,
                                          letterSpacing: 0.0,
                                          fontWeight: FontWeight.w500,
                                        ),
                                  ),
                                  Expanded(
                                    child: InkWell(
                                      splashColor: Colors.transparent,
                                      focusColor: Colors.transparent,
                                      hoverColor: Colors.transparent,
                                      highlightColor: Colors.transparent,
                                      onTap: () async {
                                        final _datePicked4Time =
                                            await showTimePicker(
                                          context: context,
                                          initialTime: TimeOfDay.fromDateTime(
                                              (_model.datePicked4 ??
                                                  DateTime.now())),
                                          builder: (context, child) {
                                            return wrapInMaterialTimePickerTheme(
                                              context,
                                              child!,
                                              headerBackgroundColor:
                                                  FlutterFlowTheme.of(context)
                                                      .primary,
                                              headerForegroundColor:
                                                  FlutterFlowTheme.of(context)
                                                      .info,
                                              headerTextStyle:
                                                  FlutterFlowTheme.of(context)
                                                      .headlineLarge
                                                      .override(
                                                        fontFamily: 'DM Sans',
                                                        fontSize: 32.0,
                                                        letterSpacing: 0.0,
                                                        fontWeight:
                                                            FontWeight.w600,
                                                      ),
                                              pickerBackgroundColor:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                              pickerForegroundColor:
                                                  FlutterFlowTheme.of(context)
                                                      .primaryText,
                                              selectedDateTimeBackgroundColor:
                                                  FlutterFlowTheme.of(context)
                                                      .primary,
                                              selectedDateTimeForegroundColor:
                                                  FlutterFlowTheme.of(context)
                                                      .info,
                                              actionButtonForegroundColor:
                                                  FlutterFlowTheme.of(context)
                                                      .primaryText,
                                              iconSize: 24.0,
                                            );
                                          },
                                        );
                                        if (_datePicked4Time != null) {
                                          safeSetState(() {
                                            _model.datePicked4 = DateTime(
                                              (_model.datePicked4 ??
                                                      DateTime.now())
                                                  .year,
                                              (_model.datePicked4 ??
                                                      DateTime.now())
                                                  .month,
                                              (_model.datePicked4 ??
                                                      DateTime.now())
                                                  .day,
                                              _datePicked4Time.hour,
                                              _datePicked4Time.minute,
                                            );
                                          });
                                        } else if (_model.datePicked4 != null) {
                                          safeSetState(() {
                                            _model.datePicked4 =
                                                _model.datePicked4;
                                          });
                                        }
                                        safeSetState(() {
                                          _model.duration11TextController
                                                  ?.text =
                                              '${functions.countDuration(_model.datePicked3!, _model.datePicked4!, _model.customDateValue! ? _model.calendarSelectedDay!.start : _model.datePicked1!, _model.customDateValue! ? _model.calendarSelectedDay!.start : _model.datePicked2!).toString()} hours';
                                        });
                                        safeSetState(() {
                                          _model.totalpay11TextController
                                              ?.text = ((_model.hourlypay11TextController
                                                              .text !=
                                                          '') &&
                                                  (_model.duration11TextController
                                                              .text !=
                                                          '')
                                              ? valueOrDefault<String>(
                                                  functions
                                                      .countTotalPay(
                                                          double.parse(_model
                                                              .hourlypay11TextController
                                                              .text),
                                                          (String var1) {
                                                            return double.parse(
                                                                var1.split(
                                                                    ' ')[0]);
                                                          }(_model
                                                              .duration11TextController
                                                              .text))
                                                      .toString(),
                                                  '0',
                                                )
                                              : '0');
                                        });
                                      },
                                      child: Container(
                                        height: 50.0,
                                        decoration: BoxDecoration(
                                          color: FlutterFlowTheme.of(context)
                                              .secondaryBackground,
                                          borderRadius:
                                              BorderRadius.circular(12.0),
                                          border: Border.all(
                                            color: Color(0xFFC0D1DC),
                                            width: 2.0,
                                          ),
                                        ),
                                        child: Align(
                                          alignment:
                                              AlignmentDirectional(-1.0, 0.0),
                                          child: Padding(
                                            padding:
                                                EdgeInsetsDirectional.fromSTEB(
                                                    8.0, 0.0, 0.0, 0.0),
                                            child: Text(
                                              _model.datePicked4 != null
                                                  ? dateTimeFormat(
                                                      "jm",
                                                      _model.datePicked4,
                                                      locale:
                                                          FFLocalizations.of(
                                                                  context)
                                                              .languageCode,
                                                    )
                                                  : 'End Time',
                                              style:
                                                  FlutterFlowTheme.of(context)
                                                      .bodyMedium
                                                      .override(
                                                        fontFamily: 'DM Sans',
                                                        fontSize: 16.0,
                                                        letterSpacing: 0.0,
                                                      ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ].divide(SizedBox(width: 15.0)),
                              ),
                              Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 12.0, 0.0, 12.0),
                                child: RichText(
                                  textScaler: MediaQuery.of(context).textScaler,
                                  text: TextSpan(
                                    children: [
                                      TextSpan(
                                        text: 'Duration (hours)',
                                        style: FlutterFlowTheme.of(context)
                                            .labelMedium
                                            .override(
                                              fontFamily: 'DM Sans',
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .primaryText,
                                              fontSize: 16.0,
                                              letterSpacing: 0.0,
                                              fontWeight: FontWeight.w500,
                                            ),
                                      )
                                    ],
                                    style: FlutterFlowTheme.of(context)
                                        .labelMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          color: FlutterFlowTheme.of(context)
                                              .primaryText,
                                          fontSize: 16.0,
                                          letterSpacing: 0.0,
                                          fontWeight: FontWeight.w500,
                                        ),
                                  ),
                                ),
                              ),
                              Container(
                                width: 335.0,
                                child: TextFormField(
                                  controller: _model.duration11TextController,
                                  focusNode: _model.duration11FocusNode,
                                  autofocus: false,
                                  readOnly: true,
                                  obscureText: false,
                                  decoration: InputDecoration(
                                    enabledBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color: Color(0xFFC0D1DC),
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    focusedBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color: FlutterFlowTheme.of(context)
                                            .primary,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    errorBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color:
                                            FlutterFlowTheme.of(context).error,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    focusedErrorBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color:
                                            FlutterFlowTheme.of(context).error,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    filled: true,
                                    fillColor: FlutterFlowTheme.of(context)
                                        .secondaryBackground,
                                  ),
                                  style: FlutterFlowTheme.of(context)
                                      .bodyMedium
                                      .override(
                                        fontFamily: 'DM Sans',
                                        fontSize: 16.0,
                                        letterSpacing: 0.0,
                                        fontWeight: FontWeight.w500,
                                      ),
                                  keyboardType: TextInputType.emailAddress,
                                  validator: _model
                                      .duration11TextControllerValidator
                                      .asValidator(context),
                                ),
                              ),
                              Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 12.0, 0.0, 12.0),
                                child: RichText(
                                  textScaler: MediaQuery.of(context).textScaler,
                                  text: TextSpan(
                                    children: [
                                      TextSpan(
                                        text: 'Hourly pay (\$)',
                                        style: FlutterFlowTheme.of(context)
                                            .labelMedium
                                            .override(
                                              fontFamily: 'DM Sans',
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .primaryText,
                                              fontSize: 16.0,
                                              letterSpacing: 0.0,
                                              fontWeight: FontWeight.w500,
                                            ),
                                      )
                                    ],
                                    style: FlutterFlowTheme.of(context)
                                        .labelMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          color: FlutterFlowTheme.of(context)
                                              .primaryText,
                                          fontSize: 16.0,
                                          letterSpacing: 0.0,
                                          fontWeight: FontWeight.w500,
                                        ),
                                  ),
                                ),
                              ),
                              Container(
                                width: 335.0,
                                child: TextFormField(
                                  controller: _model.hourlypay11TextController,
                                  focusNode: _model.hourlypay11FocusNode,
                                  onChanged: (_) => EasyDebounce.debounce(
                                    '_model.hourlypay11TextController',
                                    Duration(milliseconds: 0),
                                    () async {
                                      safeSetState(() {
                                        _model.totalpay11TextController
                                            ?.text = ((_model.hourlypay11TextController
                                                            .text !=
                                                        '') &&
                                                (_model.duration11TextController
                                                            .text !=
                                                        '')
                                            ? valueOrDefault<String>(
                                                functions
                                                    .countTotalPay(
                                                        double.parse(_model
                                                            .hourlypay11TextController
                                                            .text),
                                                        (String var1) {
                                                          return double.parse(
                                                              var1.split(
                                                                  ' ')[0]);
                                                        }(_model
                                                            .duration11TextController
                                                            .text))
                                                    .toString(),
                                                '0',
                                              )
                                            : '0');
                                      });
                                    },
                                  ),
                                  autofocus: false,
                                  autofillHints: [AutofillHints.email],
                                  obscureText: false,
                                  decoration: InputDecoration(
                                    labelText: 'Enter Hourly pay',
                                    labelStyle: FlutterFlowTheme.of(context)
                                        .labelMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          color: Color(0xFF89969F),
                                          fontSize: 16.0,
                                          letterSpacing: 0.0,
                                          fontWeight: FontWeight.w500,
                                        ),
                                    enabledBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color: Color(0xFFC0D1DC),
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    focusedBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color: FlutterFlowTheme.of(context)
                                            .primary,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    errorBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color:
                                            FlutterFlowTheme.of(context).error,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    focusedErrorBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color:
                                            FlutterFlowTheme.of(context).error,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    filled: true,
                                    fillColor: FlutterFlowTheme.of(context)
                                        .secondaryBackground,
                                  ),
                                  style: FlutterFlowTheme.of(context)
                                      .bodyMedium
                                      .override(
                                        fontFamily: 'DM Sans',
                                        letterSpacing: 0.0,
                                      ),
                                  keyboardType: TextInputType.number,
                                  validator: _model
                                      .hourlypay11TextControllerValidator
                                      .asValidator(context),
                                  inputFormatters: [
                                    FilteringTextInputFormatter.allow(
                                        RegExp('[0-9]'))
                                  ],
                                ),
                              ),
                              Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 12.0, 0.0, 12.0),
                                child: RichText(
                                  textScaler: MediaQuery.of(context).textScaler,
                                  text: TextSpan(
                                    children: [
                                      TextSpan(
                                        text: 'Total pay (\$)',
                                        style: FlutterFlowTheme.of(context)
                                            .labelMedium
                                            .override(
                                              fontFamily: 'DM Sans',
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .primaryText,
                                              fontSize: 16.0,
                                              letterSpacing: 0.0,
                                              fontWeight: FontWeight.w500,
                                            ),
                                      )
                                    ],
                                    style: FlutterFlowTheme.of(context)
                                        .labelMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          color: FlutterFlowTheme.of(context)
                                              .primaryText,
                                          fontSize: 16.0,
                                          letterSpacing: 0.0,
                                          fontWeight: FontWeight.w500,
                                        ),
                                  ),
                                ),
                              ),
                              Container(
                                width: 335.0,
                                child: TextFormField(
                                  controller: _model.totalpay11TextController,
                                  focusNode: _model.totalpay11FocusNode,
                                  autofocus: false,
                                  autofillHints: [AutofillHints.email],
                                  readOnly: true,
                                  obscureText: false,
                                  decoration: InputDecoration(
                                    labelStyle: FlutterFlowTheme.of(context)
                                        .labelMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          color: Color(0xFF89969F),
                                          fontSize: 16.0,
                                          letterSpacing: 0.0,
                                          fontWeight: FontWeight.w500,
                                        ),
                                    enabledBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color: Color(0xFFC0D1DC),
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    focusedBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color: FlutterFlowTheme.of(context)
                                            .primary,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    errorBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color:
                                            FlutterFlowTheme.of(context).error,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    focusedErrorBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color:
                                            FlutterFlowTheme.of(context).error,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    filled: true,
                                    fillColor: FlutterFlowTheme.of(context)
                                        .secondaryBackground,
                                  ),
                                  style: FlutterFlowTheme.of(context)
                                      .bodyMedium
                                      .override(
                                        fontFamily: 'DM Sans',
                                        letterSpacing: 0.0,
                                      ),
                                  keyboardType: TextInputType.emailAddress,
                                  validator: _model
                                      .totalpay11TextControllerValidator
                                      .asValidator(context),
                                ),
                              ),
                              Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 10.0, 0.0, 0.0),
                                child: Text(
                                  'Address details:',
                                  style: FlutterFlowTheme.of(context)
                                      .displaySmall
                                      .override(
                                        fontFamily: 'DM Sans',
                                        fontSize: 20.0,
                                        letterSpacing: 0.0,
                                        fontWeight: FontWeight.w500,
                                      ),
                                ),
                              ),
                              Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 12.0, 0.0, 12.0),
                                child: RichText(
                                  textScaler: MediaQuery.of(context).textScaler,
                                  text: TextSpan(
                                    children: [
                                      TextSpan(
                                        text: 'Full address',
                                        style: FlutterFlowTheme.of(context)
                                            .labelMedium
                                            .override(
                                              fontFamily: 'DM Sans',
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .primaryText,
                                              fontSize: 16.0,
                                              letterSpacing: 0.0,
                                              fontWeight: FontWeight.w500,
                                            ),
                                      )
                                    ],
                                    style: FlutterFlowTheme.of(context)
                                        .labelMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          color: FlutterFlowTheme.of(context)
                                              .primaryText,
                                          fontSize: 16.0,
                                          letterSpacing: 0.0,
                                          fontWeight: FontWeight.w500,
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
                                  await showModalBottomSheet(
                                    isScrollControlled: true,
                                    backgroundColor: Colors.transparent,
                                    enableDrag: false,
                                    context: context,
                                    builder: (context) {
                                      return Padding(
                                        padding:
                                            MediaQuery.viewInsetsOf(context),
                                        child: Container(
                                          height: MediaQuery.sizeOf(context)
                                                  .height *
                                              0.5,
                                          child: AddLocationWidget(),
                                        ),
                                      );
                                    },
                                  ).then((value) => safeSetState(() {}));
                                },
                                child: Container(
                                  width: double.infinity,
                                  decoration: BoxDecoration(
                                    color: FlutterFlowTheme.of(context)
                                        .secondaryBackground,
                                    borderRadius: BorderRadius.circular(8.0),
                                    border: Border.all(
                                      color: Color(0xFFC0D1DC),
                                      width: 2.0,
                                    ),
                                  ),
                                  child: Align(
                                    alignment: AlignmentDirectional(-1.0, 0.0),
                                    child: Padding(
                                      padding: EdgeInsetsDirectional.fromSTEB(
                                          10.0, 15.0, 10.0, 15.0),
                                      child: Text(
                                        FFAppState().addressJob != ''
                                            ? FFAppState().addressJob
                                            : 'Pick Address',
                                        style: FlutterFlowTheme.of(context)
                                            .bodyMedium
                                            .override(
                                              fontFamily: 'DM Sans',
                                              letterSpacing: 0.0,
                                            ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 12.0, 0.0, 12.0),
                                child: RichText(
                                  textScaler: MediaQuery.of(context).textScaler,
                                  text: TextSpan(
                                    children: [
                                      TextSpan(
                                        text: 'Postal code',
                                        style: FlutterFlowTheme.of(context)
                                            .labelMedium
                                            .override(
                                              fontFamily: 'DM Sans',
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .primaryText,
                                              fontSize: 16.0,
                                              letterSpacing: 0.0,
                                              fontWeight: FontWeight.w500,
                                            ),
                                      )
                                    ],
                                    style: FlutterFlowTheme.of(context)
                                        .labelMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          color: FlutterFlowTheme.of(context)
                                              .primaryText,
                                          fontSize: 16.0,
                                          letterSpacing: 0.0,
                                          fontWeight: FontWeight.w500,
                                        ),
                                  ),
                                ),
                              ),
                              Container(
                                width: 335.0,
                                child: TextFormField(
                                  controller: _model.zipcode11TextController,
                                  focusNode: _model.zipcode11FocusNode,
                                  autofocus: false,
                                  autofillHints: [AutofillHints.email],
                                  obscureText: false,
                                  decoration: InputDecoration(
                                    labelText: 'Enter Postal code',
                                    labelStyle: FlutterFlowTheme.of(context)
                                        .labelMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          color: Color(0xFF89969F),
                                          fontSize: 16.0,
                                          letterSpacing: 0.0,
                                          fontWeight: FontWeight.w500,
                                        ),
                                    enabledBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color: Color(0xFFC0D1DC),
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    focusedBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color: FlutterFlowTheme.of(context)
                                            .primary,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    errorBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color:
                                            FlutterFlowTheme.of(context).error,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    focusedErrorBorder: OutlineInputBorder(
                                      borderSide: BorderSide(
                                        color:
                                            FlutterFlowTheme.of(context).error,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    filled: true,
                                    fillColor: FlutterFlowTheme.of(context)
                                        .secondaryBackground,
                                  ),
                                  style: FlutterFlowTheme.of(context)
                                      .bodyMedium
                                      .override(
                                        fontFamily: 'DM Sans',
                                        letterSpacing: 0.0,
                                      ),
                                  validator: _model
                                      .zipcode11TextControllerValidator
                                      .asValidator(context),
                                ),
                              ),
                              Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 10.0, 0.0, 0.0),
                                child: Text(
                                  'Description:',
                                  style: FlutterFlowTheme.of(context)
                                      .displaySmall
                                      .override(
                                        fontFamily: 'DM Sans',
                                        fontSize: 20.0,
                                        letterSpacing: 0.0,
                                        fontWeight: FontWeight.w500,
                                      ),
                                ),
                              ),
                              Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 20.0, 0.0, 0.0),
                                child: Container(
                                  width: 335.0,
                                  child: TextFormField(
                                    controller:
                                        _model.description11TextController,
                                    focusNode: _model.description11FocusNode,
                                    autofocus: false,
                                    autofillHints: [AutofillHints.email],
                                    obscureText: false,
                                    decoration: InputDecoration(
                                      labelText: 'Write description',
                                      labelStyle: FlutterFlowTheme.of(context)
                                          .labelMedium
                                          .override(
                                            fontFamily: 'DM Sans',
                                            color: Color(0xFF89969F),
                                            fontSize: 16.0,
                                            letterSpacing: 0.0,
                                            fontWeight: FontWeight.w500,
                                          ),
                                      alignLabelWithHint: true,
                                      enabledBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color: Color(0xFFC0D1DC),
                                          width: 2.0,
                                        ),
                                        borderRadius:
                                            BorderRadius.circular(12.0),
                                      ),
                                      focusedBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color: FlutterFlowTheme.of(context)
                                              .primary,
                                          width: 2.0,
                                        ),
                                        borderRadius:
                                            BorderRadius.circular(12.0),
                                      ),
                                      errorBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color: FlutterFlowTheme.of(context)
                                              .error,
                                          width: 2.0,
                                        ),
                                        borderRadius:
                                            BorderRadius.circular(12.0),
                                      ),
                                      focusedErrorBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color: FlutterFlowTheme.of(context)
                                              .error,
                                          width: 2.0,
                                        ),
                                        borderRadius:
                                            BorderRadius.circular(12.0),
                                      ),
                                      filled: true,
                                      fillColor: FlutterFlowTheme.of(context)
                                          .secondaryBackground,
                                    ),
                                    style: FlutterFlowTheme.of(context)
                                        .bodyMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          letterSpacing: 0.0,
                                        ),
                                    maxLines: 10,
                                    keyboardType: TextInputType.multiline,
                                    validator: _model
                                        .description11TextControllerValidator
                                        .asValidator(context),
                                  ),
                                ),
                              ),
                              Column(
                                mainAxisSize: MainAxisSize.max,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Padding(
                                    padding: EdgeInsetsDirectional.fromSTEB(
                                        0.0, 10.0, 0.0, 0.0),
                                    child: Row(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Text(
                                          'Skills criteria:',
                                          style: FlutterFlowTheme.of(context)
                                              .displaySmall
                                              .override(
                                                fontFamily: 'DM Sans',
                                                fontSize: 20.0,
                                                letterSpacing: 0.0,
                                                fontWeight: FontWeight.w500,
                                              ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Padding(
                                    padding: EdgeInsetsDirectional.fromSTEB(
                                        0.0, 20.0, 0.0, 0.0),
                                    child: Builder(
                                      builder: (context) {
                                        final skilss =
                                            FFAppState().skills.toList();

                                        return Wrap(
                                          spacing: 10.0,
                                          runSpacing: 5.0,
                                          alignment: WrapAlignment.start,
                                          crossAxisAlignment:
                                              WrapCrossAlignment.start,
                                          direction: Axis.horizontal,
                                          runAlignment: WrapAlignment.start,
                                          verticalDirection:
                                              VerticalDirection.down,
                                          clipBehavior: Clip.none,
                                          children: List.generate(skilss.length,
                                              (skilssIndex) {
                                            final skilssItem =
                                                skilss[skilssIndex];
                                            return Container(
                                              decoration: BoxDecoration(
                                                color: Color(0x3D22577A),
                                                borderRadius:
                                                    BorderRadius.circular(5.0),
                                              ),
                                              child: Padding(
                                                padding: EdgeInsetsDirectional
                                                    .fromSTEB(
                                                        10.0, 5.0, 10.0, 5.0),
                                                child: Text(
                                                  '${skilssItem}',
                                                  style: FlutterFlowTheme.of(
                                                          context)
                                                      .bodyMedium
                                                      .override(
                                                        fontFamily: 'DM Sans',
                                                        fontSize: 16.0,
                                                        letterSpacing: 0.0,
                                                      ),
                                                ),
                                              ),
                                            );
                                          }),
                                        );
                                      },
                                    ),
                                  ),
                                  Padding(
                                    padding: EdgeInsetsDirectional.fromSTEB(
                                        0.0, 20.0, 20.0, 0.0),
                                    child: Row(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Expanded(
                                          child: TextFormField(
                                            controller:
                                                _model.skillsTextController,
                                            focusNode: _model.skillsFocusNode,
                                            autofocus: false,
                                            autofillHints: [
                                              AutofillHints.email
                                            ],
                                            obscureText: false,
                                            decoration: InputDecoration(
                                              labelText: 'Enter Skill',
                                              labelStyle: FlutterFlowTheme.of(
                                                      context)
                                                  .labelMedium
                                                  .override(
                                                    fontFamily: 'DM Sans',
                                                    color: Color(0xFF89969F),
                                                    fontSize: 16.0,
                                                    letterSpacing: 0.0,
                                                    fontWeight: FontWeight.w500,
                                                  ),
                                              alignLabelWithHint: true,
                                              enabledBorder: OutlineInputBorder(
                                                borderSide: BorderSide(
                                                  color: Color(0xFFC0D1DC),
                                                  width: 2.0,
                                                ),
                                                borderRadius:
                                                    BorderRadius.circular(12.0),
                                              ),
                                              focusedBorder: OutlineInputBorder(
                                                borderSide: BorderSide(
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .primary,
                                                  width: 2.0,
                                                ),
                                                borderRadius:
                                                    BorderRadius.circular(12.0),
                                              ),
                                              errorBorder: OutlineInputBorder(
                                                borderSide: BorderSide(
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .error,
                                                  width: 2.0,
                                                ),
                                                borderRadius:
                                                    BorderRadius.circular(12.0),
                                              ),
                                              focusedErrorBorder:
                                                  OutlineInputBorder(
                                                borderSide: BorderSide(
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .error,
                                                  width: 2.0,
                                                ),
                                                borderRadius:
                                                    BorderRadius.circular(12.0),
                                              ),
                                              filled: true,
                                              fillColor:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                            ),
                                            style: FlutterFlowTheme.of(context)
                                                .bodyMedium
                                                .override(
                                                  fontFamily: 'DM Sans',
                                                  letterSpacing: 0.0,
                                                ),
                                            keyboardType:
                                                TextInputType.multiline,
                                            validator: _model
                                                .skillsTextControllerValidator
                                                .asValidator(context),
                                          ),
                                        ),
                                        InkWell(
                                          splashColor: Colors.transparent,
                                          focusColor: Colors.transparent,
                                          hoverColor: Colors.transparent,
                                          highlightColor: Colors.transparent,
                                          onTap: () async {
                                            if (_model.skillsTextController
                                                        .text !=
                                                    '') {
                                              FFAppState().addToSkills(_model
                                                  .skillsTextController.text);
                                              safeSetState(() {});
                                              safeSetState(() {
                                                _model.skillsTextController
                                                    ?.clear();
                                              });
                                            }
                                          },
                                          child: FaIcon(
                                            FontAwesomeIcons.check,
                                            color: Color(0xFF22577A),
                                            size: 24.0,
                                          ),
                                        ),
                                      ].divide(SizedBox(width: 25.0)),
                                    ),
                                  ),
                                ],
                              ),
                              Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 10.0, 0.0, 0.0),
                                child: Row(
                                  mainAxisSize: MainAxisSize.max,
                                  children: [
                                    Text(
                                      'Urgent Job:',
                                      style: FlutterFlowTheme.of(context)
                                          .displaySmall
                                          .override(
                                            fontFamily: 'DM Sans',
                                            fontSize: 20.0,
                                            letterSpacing: 0.0,
                                            fontWeight: FontWeight.w500,
                                          ),
                                    ),
                                    Transform.scale(
                                      scaleX: 1.5,
                                      scaleY: 1.5,
                                      child: Theme(
                                        data: ThemeData(
                                          checkboxTheme: CheckboxThemeData(
                                            shape: RoundedRectangleBorder(
                                              borderRadius:
                                                  BorderRadius.circular(4.0),
                                            ),
                                          ),
                                          unselectedWidgetColor:
                                              FlutterFlowTheme.of(context)
                                                  .alternate,
                                        ),
                                        child: Checkbox(
                                          value: _model.isUrgentJobValue ??=
                                              false,
                                          onChanged: (newValue) async {
                                            safeSetState(() => _model
                                                .isUrgentJobValue = newValue!);
                                          },
                                          side: BorderSide(
                                            width: 2,
                                            color: FlutterFlowTheme.of(context)
                                                .alternate,
                                          ),
                                          activeColor:
                                              FlutterFlowTheme.of(context)
                                                  .secondary,
                                          checkColor:
                                              FlutterFlowTheme.of(context).info,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Align(
                                alignment: AlignmentDirectional(0.0, -1.0),
                                child: Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      0.0, 20.0, 0.0, 50.0),
                                  child: Row(
                                    mainAxisSize: MainAxisSize.max,
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: [
                                      Padding(
                                        padding: EdgeInsetsDirectional.fromSTEB(
                                            0.0, 40.0, 0.0, 0.0),
                                        child: FFButtonWidget(
                                          onPressed: () {
                                            print('Button pressed ...');
                                          },
                                          text: 'Cancel',
                                          options: FFButtonOptions(
                                            width: 150.0,
                                            height: 44.0,
                                            padding: EdgeInsets.all(0.0),
                                            iconPadding:
                                                EdgeInsetsDirectional.fromSTEB(
                                                    0.0, 0.0, 0.0, 0.0),
                                            color: Colors.transparent,
                                            textStyle:
                                                FlutterFlowTheme.of(context)
                                                    .titleSmall
                                                    .override(
                                                      fontFamily: 'DM Sans',
                                                      color: Color(0xFF22577A),
                                                      letterSpacing: 0.0,
                                                    ),
                                            elevation: 0.0,
                                            borderSide: BorderSide(
                                              color: Color(0xFF22577A),
                                              width: 1.0,
                                            ),
                                            borderRadius:
                                                BorderRadius.circular(12.0),
                                          ),
                                        ),
                                      ),
                                      Padding(
                                        padding: EdgeInsetsDirectional.fromSTEB(
                                            0.0, 40.0, 0.0, 0.0),
                                        child: FFButtonWidget(
                                          onPressed: () async {
                                            final paymentResponse =
                                                await processStripePayment(
                                              context,
                                              amount: (double.parse(_model
                                                          .totalpay11TextController
                                                          .text) *
                                                      100)
                                                  .round(),
                                              currency: 'USD',
                                              customerEmail: currentUserEmail,
                                              description: 'Basic Plan',
                                              allowGooglePay: true,
                                              allowApplePay: false,
                                            );
                                            if (paymentResponse.paymentId ==
                                                    null &&
                                                paymentResponse.errorMessage !=
                                                    null) {
                                              showSnackbar(
                                                context,
                                                'Error: ${paymentResponse.errorMessage}',
                                              );
                                            }
                                            _model.paymentId =
                                                paymentResponse.paymentId ?? '';

                                            if (_model.paymentId != null &&
                                                _model.paymentId != '') {
                                              _model.latlng = await actions
                                                  .convertAddressTOLatLng(
                                                FFAppState().addressJob,
                                              );
                                              _model.business =
                                                  await BusinessdetailRecord
                                                      .getDocumentOnce(
                                                          currentUserDocument!
                                                              .buisnessdetail!);

                                              var jobDetailsRecordReference =
                                                  JobDetailsRecord.collection
                                                      .doc(functions
                                                          .generateUniqueId());
                                              await jobDetailsRecordReference
                                                  .set({
                                                ...createJobDetailsRecordData(
                                                  jobName: _model
                                                      .jobtitle11TextController
                                                      .text,
                                                  hospitalName: valueOrDefault(
                                                              currentUserDocument
                                                                  ?.subRole,
                                                              '') ==
                                                          'business'
                                                      ? _model
                                                          .hospitalname11TextController
                                                          .text
                                                      : '',
                                                  yearOfExperience:
                                                      int.tryParse(_model
                                                          .yearsofexperience11TextController
                                                          .text),
                                                  profession:
                                                      _model.professionValue,
                                                  specialtyArea:
                                                      _model.specialtyareaValue,
                                                  timing: createTimingStruct(
                                                    startTime:
                                                        _model.datePicked3,
                                                    endTime: _model.datePicked4,
                                                    clearUnsetFields: false,
                                                    create: true,
                                                  ),
                                                  duration: (String var1) {
                                                    return double.parse(
                                                        var1.split(" ")[0]);
                                                  }(_model
                                                      .duration11TextController
                                                      .text),
                                                  hourlyPay: int.tryParse(_model
                                                      .hourlypay11TextController
                                                      .text),
                                                  totalPay: double.tryParse(_model
                                                      .totalpay11TextController
                                                      .text),
                                                  description: _model
                                                      .description11TextController
                                                      .text,
                                                  fullAddress:
                                                      FFAppState().addressJob,
                                                  startDate:
                                                      _model.customDateValue!
                                                          ? _model
                                                              .calendarSelectedDay
                                                              ?.start
                                                          : _model.datePicked1,
                                                  endDate: _model
                                                          .customDateValue!
                                                      ? _model
                                                          .calendarSelectedDay
                                                          ?.start
                                                      : _model.datePicked2,
                                                  zipCode: int.tryParse(_model
                                                      .zipcode11TextController
                                                      .text),
                                                  jobStatus: 'Active',
                                                  createdBy:
                                                      currentUserReference,
                                                  createdAt:
                                                      getCurrentTimestamp,
                                                  isUrgentJob:
                                                      _model.isUrgentJobValue,
                                                  latlng: _model.latlng,
                                                  subRole: valueOrDefault(
                                                      currentUserDocument
                                                          ?.subRole,
                                                      ''),
                                                  fromBusiness:
                                                      valueOrDefault<String>(
                                                    '${_model.business?.primaryContactInformation.firstName} ${_model.business?.primaryContactInformation.lastName}',
                                                    'Unknown',
                                                  ),
                                                  customDate:
                                                      _model.customDateValue!
                                                          ? true
                                                          : false,
                                                  isChildJob: false,
                                                ),
                                                ...mapToFirestore(
                                                  {
                                                    'SkillCriteria':
                                                        FFAppState().skills,
                                                  },
                                                ),
                                              });
                                              _model.job = JobDetailsRecord
                                                  .getDocumentFromData({
                                                ...createJobDetailsRecordData(
                                                  jobName: _model
                                                      .jobtitle11TextController
                                                      .text,
                                                  hospitalName: valueOrDefault(
                                                              currentUserDocument
                                                                  ?.subRole,
                                                              '') ==
                                                          'business'
                                                      ? _model
                                                          .hospitalname11TextController
                                                          .text
                                                      : '',
                                                  yearOfExperience:
                                                      int.tryParse(_model
                                                          .yearsofexperience11TextController
                                                          .text),
                                                  profession:
                                                      _model.professionValue,
                                                  specialtyArea:
                                                      _model.specialtyareaValue,
                                                  timing: createTimingStruct(
                                                    startTime:
                                                        _model.datePicked3,
                                                    endTime: _model.datePicked4,
                                                    clearUnsetFields: false,
                                                    create: true,
                                                  ),
                                                  duration: (String var1) {
                                                    return double.parse(
                                                        var1.split(" ")[0]);
                                                  }(_model
                                                      .duration11TextController
                                                      .text),
                                                  hourlyPay: int.tryParse(_model
                                                      .hourlypay11TextController
                                                      .text),
                                                  totalPay: double.tryParse(_model
                                                      .totalpay11TextController
                                                      .text),
                                                  description: _model
                                                      .description11TextController
                                                      .text,
                                                  fullAddress:
                                                      FFAppState().addressJob,
                                                  startDate:
                                                      _model.customDateValue!
                                                          ? _model
                                                              .calendarSelectedDay
                                                              ?.start
                                                          : _model.datePicked1,
                                                  endDate: _model
                                                          .customDateValue!
                                                      ? _model
                                                          .calendarSelectedDay
                                                          ?.start
                                                      : _model.datePicked2,
                                                  zipCode: int.tryParse(_model
                                                      .zipcode11TextController
                                                      .text),
                                                  jobStatus: 'Active',
                                                  createdBy:
                                                      currentUserReference,
                                                  createdAt:
                                                      getCurrentTimestamp,
                                                  isUrgentJob:
                                                      _model.isUrgentJobValue,
                                                  latlng: _model.latlng,
                                                  subRole: valueOrDefault(
                                                      currentUserDocument
                                                          ?.subRole,
                                                      ''),
                                                  fromBusiness:
                                                      valueOrDefault<String>(
                                                    '${_model.business?.primaryContactInformation.firstName} ${_model.business?.primaryContactInformation.lastName}',
                                                    'Unknown',
                                                  ),
                                                  customDate:
                                                      _model.customDateValue!
                                                          ? true
                                                          : false,
                                                  isChildJob: false,
                                                ),
                                                ...mapToFirestore(
                                                  {
                                                    'SkillCriteria':
                                                        FFAppState().skills,
                                                  },
                                                ),
                                              }, jobDetailsRecordReference);

                                              await _model.job!.reference
                                                  .update({
                                                ...createJobDetailsRecordData(
                                                  jobId:
                                                      _model.job?.reference.id,
                                                  perentJob:
                                                      _model.job?.reference,
                                                ),
                                                ...mapToFirestore(
                                                  {
                                                    'AttendanceJob':
                                                        getAttendanceListFirestoreData(
                                                      functions
                                                          .makeAttendanceJob(
                                                              _model.job!),
                                                    ),
                                                  },
                                                ),
                                              });
                                              _model.recommendationUsers =
                                                  await queryProviderDetailRecordOnce(
                                                queryBuilder:
                                                    (providerDetailRecord) =>
                                                        providerDetailRecord
                                                            .where(
                                                  'Personalinformation.SpecialtyArea',
                                                  isEqualTo:
                                                      _model.specialtyareaValue,
                                                ),
                                              );

                                              await currentUserReference!
                                                  .update({
                                                ...createUsersRecordData(
                                                  wallet: functions
                                                      .updateWalletBalance(
                                                          double.parse(_model
                                                              .totalpay11TextController
                                                              .text),
                                                          valueOrDefault(
                                                              currentUserDocument
                                                                  ?.wallet,
                                                              0.0)),
                                                ),
                                                ...mapToFirestore(
                                                  {
                                                    'onHold': FieldValue.increment(
                                                        double.parse(_model
                                                            .totalpay11TextController
                                                            .text)),
                                                  },
                                                ),
                                              });
                                              triggerPushNotification(
                                                notificationTitle:
                                                    'Recommended job for you!',
                                                notificationText:
                                                    'Please stay focused. You have the job by ${valueOrDefault<String>(
                                                  _model
                                                      .business
                                                      ?.primaryContactInformation
                                                      .firstName,
                                                  'Unknown',
                                                )}. you\'re looking for this Job \"${_model.jobtitle11TextController.text}\"Quickly check out and apply now for the best response.',
                                                notificationImageUrl:
                                                    currentUserPhoto !=
                                                                ''
                                                        ? currentUserPhoto
                                                        : 'https://firebasestorage.googleapis.com/v0/b/backup13thfeb-a0ssgv.firebasestorage.app/o/1000301822_1719697644.png?alt=media&token=c0a9bbf1-f5bb-46fe-95a9-dcd7eabef8d5',
                                                notificationSound: 'default',
                                                userRefs: _model
                                                    .recommendationUsers!
                                                    .map((e) => e.user)
                                                    .withoutNulls
                                                    .toList(),
                                                initialPageName:
                                                    'JobseekerDashboard',
                                                parameterData: {},
                                              );

                                              await NotificationsRecord
                                                  .collection
                                                  .doc()
                                                  .set({
                                                ...createNotificationsRecordData(
                                                  fromUser:
                                                      currentUserReference,
                                                  job: _model.job?.reference,
                                                  message:
                                                      'Please stay focused. You have the job by ${valueOrDefault<String>(
                                                    _model
                                                        .business
                                                        ?.primaryContactInformation
                                                        .firstName,
                                                    'Unknown',
                                                  )}. you\'re looking for this Job \"${_model.jobtitle11TextController.text}\"Quickly check out and apply now for the best response.',
                                                  subject:
                                                      'Recommended job for you!',
                                                  time: getCurrentTimestamp,
                                                  type: 'Recommendation',
                                                  image: currentUserPhoto != ''
                                                      ? currentUserPhoto
                                                      : 'https://firebasestorage.googleapis.com/v0/b/backup13thfeb-a0ssgv.firebasestorage.app/o/1000301822_1719697644.png?alt=media&token=c0a9bbf1-f5bb-46fe-95a9-dcd7eabef8d5',
                                                ),
                                                ...mapToFirestore(
                                                  {
                                                    'toUsers': _model
                                                        .recommendationUsers
                                                        ?.map((e) => e.user)
                                                        .withoutNulls
                                                        .toList(),
                                                  },
                                                ),
                                              });
                                              FFAppState().skills = [];
                                              safeSetState(() {});

                                              context.goNamed(
                                                  RecruiterJobBoardDashboardWidget
                                                      .routeName);

                                              ScaffoldMessenger.of(context)
                                                  .showSnackBar(
                                                SnackBar(
                                                  content: Text(
                                                    'job created',
                                                    style: TextStyle(
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .primaryText,
                                                    ),
                                                  ),
                                                  duration: Duration(
                                                      milliseconds: 4000),
                                                  backgroundColor:
                                                      FlutterFlowTheme.of(
                                                              context)
                                                          .secondary,
                                                ),
                                              );
                                            } else {
                                              ScaffoldMessenger.of(context)
                                                  .showSnackBar(
                                                SnackBar(
                                                  content: Text(
                                                    'Payment is Failed....',
                                                    style: TextStyle(
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .primaryText,
                                                    ),
                                                  ),
                                                  duration: Duration(
                                                      milliseconds: 4000),
                                                  backgroundColor:
                                                      FlutterFlowTheme.of(
                                                              context)
                                                          .secondary,
                                                ),
                                              );
                                            }

                                            safeSetState(() {});
                                          },
                                          text: 'Create Job',
                                          options: FFButtonOptions(
                                            width: 150.0,
                                            height: 44.0,
                                            padding:
                                                EdgeInsetsDirectional.fromSTEB(
                                                    0.0, 0.0, 0.0, 0.0),
                                            iconPadding:
                                                EdgeInsetsDirectional.fromSTEB(
                                                    0.0, 0.0, 0.0, 0.0),
                                            color: Color(0xFF22577A),
                                            textStyle:
                                                FlutterFlowTheme.of(context)
                                                    .titleSmall
                                                    .override(
                                                      fontFamily: 'DM Sans',
                                                      color: Colors.white,
                                                      letterSpacing: 0.0,
                                                    ),
                                            elevation: 3.0,
                                            borderSide: BorderSide(
                                              color: Colors.transparent,
                                              width: 1.0,
                                            ),
                                            borderRadius:
                                                BorderRadius.circular(12.0),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ].addToEnd(SizedBox(height: 50.0)),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            wrapWithModel(
              model: _model.clinicMobileNavBarModel,
              updateCallback: () => safeSetState(() {}),
              child: ClinicMobileNavBarWidget(
                index: 2,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
