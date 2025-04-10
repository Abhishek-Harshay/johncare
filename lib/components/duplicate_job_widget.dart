import '/auth/firebase_auth/auth_util.dart';
import '/backend/backend.dart';
import '/backend/stripe/payment_manager.dart';
import '/flutter_flow/flutter_flow_calendar.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/flutter_flow/custom_functions.dart' as functions;
import 'package:easy_debounce/easy_debounce.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter/services.dart';
import 'duplicate_job_model.dart';
export 'duplicate_job_model.dart';

class DuplicateJobWidget extends StatefulWidget {
  const DuplicateJobWidget({
    super.key,
    required this.job,
  });

  final JobDetailsRecord? job;

  @override
  State<DuplicateJobWidget> createState() => _DuplicateJobWidgetState();
}

class _DuplicateJobWidgetState extends State<DuplicateJobWidget> {
  late DuplicateJobModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => DuplicateJobModel());

    // On component load action.
    SchedulerBinding.instance.addPostFrameCallback((_) async {
      _model.date = _model.calendarSelectedDay?.start;
      safeSetState(() {});
    });

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

    WidgetsBinding.instance.addPostFrameCallback((_) => safeSetState(() {}));
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(25.0),
      child: Container(
        width: 500.0,
        decoration: BoxDecoration(
          color: FlutterFlowTheme.of(context).secondaryBackground,
          borderRadius: BorderRadius.circular(35.0),
        ),
        child: Padding(
          padding: EdgeInsetsDirectional.fromSTEB(15.0, 0.0, 15.0, 0.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Row(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Expanded(
                    child: Align(
                      alignment: AlignmentDirectional(0.0, 0.0),
                      child: Padding(
                        padding: EdgeInsetsDirectional.fromSTEB(
                            25.0, 30.0, 0.0, 0.0),
                        child: Text(
                          'Duplicate Job',
                          style:
                              FlutterFlowTheme.of(context).bodyMedium.override(
                                    fontFamily: 'DM Sans',
                                    fontSize: 22.0,
                                    letterSpacing: 0.0,
                                    fontWeight: FontWeight.w600,
                                  ),
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding:
                        EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 25.0, 0.0),
                    child: InkWell(
                      splashColor: Colors.transparent,
                      focusColor: Colors.transparent,
                      hoverColor: Colors.transparent,
                      highlightColor: Colors.transparent,
                      onTap: () async {
                        Navigator.pop(context);
                      },
                      child: Icon(
                        Icons.close_rounded,
                        color: FlutterFlowTheme.of(context).primaryText,
                        size: 24.0,
                      ),
                    ),
                  ),
                ],
              ),
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    mainAxisSize: MainAxisSize.max,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding:
                            EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
                        child: FlutterFlowCalendar(
                          color: FlutterFlowTheme.of(context).primary,
                          iconColor: FlutterFlowTheme.of(context).secondaryText,
                          weekFormat: false,
                          weekStartsMonday: false,
                          initialDate: _model.date,
                          rowHeight: 50.0,
                          onChange: (DateTimeRange? newSelectedDate) async {
                            if (_model.calendarSelectedDay == newSelectedDate) {
                              return;
                            }
                            _model.calendarSelectedDay = newSelectedDate;
                            _model.date = _model.calendarSelectedDay?.start;
                            safeSetState(() {});
                            safeSetState(() {
                              _model.duration11TextController?.text =
                                  '${functions.countDuration(_model.datePicked1!, _model.datePicked2!, _model.calendarSelectedDay!.start, _model.calendarSelectedDay!.start).toString()} hours';
                            });
                            safeSetState(() {
                              _model.totalpay11TextController?.text = ((_model.hourlypay11TextController
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
                                              }(_model.duration11TextController
                                                  .text))
                                          .toString(),
                                      '0',
                                    )
                                  : '0');
                            });
                            safeSetState(() {});
                          },
                          titleStyle:
                              FlutterFlowTheme.of(context).titleLarge.override(
                                    fontFamily: 'DM Sans',
                                    fontSize: 24.0,
                                    letterSpacing: 0.0,
                                  ),
                          dayOfWeekStyle:
                              FlutterFlowTheme.of(context).bodyLarge.override(
                                    fontFamily: 'DM Sans',
                                    letterSpacing: 0.0,
                                  ),
                          dateStyle:
                              FlutterFlowTheme.of(context).bodyMedium.override(
                                    fontFamily: 'DM Sans',
                                    letterSpacing: 0.0,
                                  ),
                          selectedDateStyle:
                              FlutterFlowTheme.of(context).titleSmall.override(
                                    fontFamily: 'DM Sans',
                                    color: FlutterFlowTheme.of(context)
                                        .secondaryBackground,
                                    letterSpacing: 0.0,
                                  ),
                          inactiveDateStyle:
                              FlutterFlowTheme.of(context).labelMedium.override(
                                    fontFamily: 'DM Sans',
                                    letterSpacing: 0.0,
                                  ),
                          locale: FFLocalizations.of(context).languageCode,
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
                                text: 'Date',
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
                              )
                            ],
                            style: FlutterFlowTheme.of(context)
                                .labelMedium
                                .override(
                                  fontFamily: 'DM Sans',
                                  color:
                                      FlutterFlowTheme.of(context).primaryText,
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
                          color:
                              FlutterFlowTheme.of(context).secondaryBackground,
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
                              padding: EdgeInsetsDirectional.fromSTEB(
                                  5.0, 0.0, 0.0, 0.0),
                              child: Icon(
                                Icons.calendar_month,
                                color: FlutterFlowTheme.of(context).primaryText,
                                size: 24.0,
                              ),
                            ),
                            Align(
                              alignment: AlignmentDirectional(-1.0, 0.0),
                              child: Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    8.0, 0.0, 0.0, 0.0),
                                child: Text(
                                  functions
                                      .convertDateTimeToString(_model.date),
                                  style: FlutterFlowTheme.of(context)
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
                                      color: FlutterFlowTheme.of(context)
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
                                      FlutterFlowTheme.of(context).primaryText,
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
                                final _datePicked1Time = await showTimePicker(
                                  context: context,
                                  initialTime: TimeOfDay.fromDateTime(
                                      (_model.datePicked1 ?? DateTime.now())),
                                  builder: (context, child) {
                                    return wrapInMaterialTimePickerTheme(
                                      context,
                                      child!,
                                      headerBackgroundColor:
                                          FlutterFlowTheme.of(context).primary,
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
                                          FlutterFlowTheme.of(context).primary,
                                      selectedDateTimeForegroundColor:
                                          FlutterFlowTheme.of(context).info,
                                      actionButtonForegroundColor:
                                          FlutterFlowTheme.of(context)
                                              .primaryText,
                                      iconSize: 24.0,
                                    );
                                  },
                                );
                                if (_datePicked1Time != null) {
                                  safeSetState(() {
                                    _model.datePicked1 = DateTime(
                                      (_model.datePicked1 ?? DateTime.now())
                                          .year,
                                      (_model.datePicked1 ?? DateTime.now())
                                          .month,
                                      (_model.datePicked1 ?? DateTime.now())
                                          .day,
                                      _datePicked1Time.hour,
                                      _datePicked1Time.minute,
                                    );
                                  });
                                } else if (_model.datePicked1 != null) {
                                  safeSetState(() {
                                    _model.datePicked1 = _model.datePicked1;
                                  });
                                }
                                safeSetState(() {
                                  _model.duration11TextController?.text =
                                      '${functions.countDuration(_model.datePicked1!, _model.datePicked2!, _model.calendarSelectedDay!.start, _model.calendarSelectedDay!.start).toString()} hours';
                                });
                                safeSetState(() {
                                  _model
                                      .totalpay11TextController?.text = ((_model.hourlypay11TextController
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
                                height: 50.0,
                                decoration: BoxDecoration(
                                  color: FlutterFlowTheme.of(context)
                                      .secondaryBackground,
                                  borderRadius: BorderRadius.circular(12.0),
                                  border: Border.all(
                                    color: Color(0xFFC0D1DC),
                                    width: 2.0,
                                  ),
                                ),
                                child: Align(
                                  alignment: AlignmentDirectional(-1.0, 0.0),
                                  child: Padding(
                                    padding: EdgeInsetsDirectional.fromSTEB(
                                        8.0, 0.0, 0.0, 0.0),
                                    child: Text(
                                      _model.datePicked1 != null
                                          ? dateTimeFormat(
                                              "jm",
                                              _model.datePicked1,
                                              locale:
                                                  FFLocalizations.of(context)
                                                      .languageCode,
                                            )
                                          : 'Start Time',
                                      style: FlutterFlowTheme.of(context)
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
                                final _datePicked2Time = await showTimePicker(
                                  context: context,
                                  initialTime: TimeOfDay.fromDateTime(
                                      (_model.datePicked2 ?? DateTime.now())),
                                  builder: (context, child) {
                                    return wrapInMaterialTimePickerTheme(
                                      context,
                                      child!,
                                      headerBackgroundColor:
                                          FlutterFlowTheme.of(context).primary,
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
                                          FlutterFlowTheme.of(context).primary,
                                      selectedDateTimeForegroundColor:
                                          FlutterFlowTheme.of(context).info,
                                      actionButtonForegroundColor:
                                          FlutterFlowTheme.of(context)
                                              .primaryText,
                                      iconSize: 24.0,
                                    );
                                  },
                                );
                                if (_datePicked2Time != null) {
                                  safeSetState(() {
                                    _model.datePicked2 = DateTime(
                                      (_model.datePicked2 ?? DateTime.now())
                                          .year,
                                      (_model.datePicked2 ?? DateTime.now())
                                          .month,
                                      (_model.datePicked2 ?? DateTime.now())
                                          .day,
                                      _datePicked2Time.hour,
                                      _datePicked2Time.minute,
                                    );
                                  });
                                } else if (_model.datePicked2 != null) {
                                  safeSetState(() {
                                    _model.datePicked2 = _model.datePicked2;
                                  });
                                }
                                safeSetState(() {
                                  _model.duration11TextController?.text =
                                      '${functions.countDuration(_model.datePicked1!, _model.datePicked2!, _model.calendarSelectedDay!.start, _model.calendarSelectedDay!.start).toString()} hours';
                                });
                                safeSetState(() {
                                  _model.totalpay11TextController?.text = '';
                                });
                              },
                              child: Container(
                                height: 50.0,
                                decoration: BoxDecoration(
                                  color: FlutterFlowTheme.of(context)
                                      .secondaryBackground,
                                  borderRadius: BorderRadius.circular(12.0),
                                  border: Border.all(
                                    color: Color(0xFFC0D1DC),
                                    width: 2.0,
                                  ),
                                ),
                                child: Align(
                                  alignment: AlignmentDirectional(-1.0, 0.0),
                                  child: Padding(
                                    padding: EdgeInsetsDirectional.fromSTEB(
                                        8.0, 0.0, 0.0, 0.0),
                                    child: Text(
                                      _model.datePicked2 != null
                                          ? dateTimeFormat(
                                              "jm",
                                              _model.datePicked2,
                                              locale:
                                                  FFLocalizations.of(context)
                                                      .languageCode,
                                            )
                                          : 'End Time',
                                      style: FlutterFlowTheme.of(context)
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
                                      color: FlutterFlowTheme.of(context)
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
                                      FlutterFlowTheme.of(context).primaryText,
                                  fontSize: 16.0,
                                  letterSpacing: 0.0,
                                  fontWeight: FontWeight.w500,
                                ),
                          ),
                        ),
                      ),
                      Container(
                        width: double.infinity,
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
                                color: FlutterFlowTheme.of(context).primary,
                                width: 2.0,
                              ),
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                            errorBorder: OutlineInputBorder(
                              borderSide: BorderSide(
                                color: FlutterFlowTheme.of(context).error,
                                width: 2.0,
                              ),
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                            focusedErrorBorder: OutlineInputBorder(
                              borderSide: BorderSide(
                                color: FlutterFlowTheme.of(context).error,
                                width: 2.0,
                              ),
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                            filled: true,
                            fillColor: FlutterFlowTheme.of(context)
                                .secondaryBackground,
                          ),
                          style:
                              FlutterFlowTheme.of(context).bodyMedium.override(
                                    fontFamily: 'DM Sans',
                                    fontSize: 16.0,
                                    letterSpacing: 0.0,
                                    fontWeight: FontWeight.w500,
                                  ),
                          keyboardType: TextInputType.emailAddress,
                          validator: _model.duration11TextControllerValidator
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
                                      color: FlutterFlowTheme.of(context)
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
                                      FlutterFlowTheme.of(context).primaryText,
                                  fontSize: 16.0,
                                  letterSpacing: 0.0,
                                  fontWeight: FontWeight.w500,
                                ),
                          ),
                        ),
                      ),
                      Container(
                        width: double.infinity,
                        child: TextFormField(
                          controller: _model.hourlypay11TextController,
                          focusNode: _model.hourlypay11FocusNode,
                          onChanged: (_) => EasyDebounce.debounce(
                            '_model.hourlypay11TextController',
                            Duration(milliseconds: 0),
                            () async {
                              safeSetState(() {
                                _model.totalpay11TextController?.text = ((_model.hourlypay11TextController
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
                                color: FlutterFlowTheme.of(context).primary,
                                width: 2.0,
                              ),
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                            errorBorder: OutlineInputBorder(
                              borderSide: BorderSide(
                                color: FlutterFlowTheme.of(context).error,
                                width: 2.0,
                              ),
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                            focusedErrorBorder: OutlineInputBorder(
                              borderSide: BorderSide(
                                color: FlutterFlowTheme.of(context).error,
                                width: 2.0,
                              ),
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                            filled: true,
                            fillColor: FlutterFlowTheme.of(context)
                                .secondaryBackground,
                          ),
                          style:
                              FlutterFlowTheme.of(context).bodyMedium.override(
                                    fontFamily: 'DM Sans',
                                    letterSpacing: 0.0,
                                  ),
                          keyboardType: TextInputType.number,
                          validator: _model.hourlypay11TextControllerValidator
                              .asValidator(context),
                          inputFormatters: [
                            FilteringTextInputFormatter.allow(RegExp('[0-9]'))
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
                                      color: FlutterFlowTheme.of(context)
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
                                      FlutterFlowTheme.of(context).primaryText,
                                  fontSize: 16.0,
                                  letterSpacing: 0.0,
                                  fontWeight: FontWeight.w500,
                                ),
                          ),
                        ),
                      ),
                      Container(
                        width: double.infinity,
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
                                color: FlutterFlowTheme.of(context).primary,
                                width: 2.0,
                              ),
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                            errorBorder: OutlineInputBorder(
                              borderSide: BorderSide(
                                color: FlutterFlowTheme.of(context).error,
                                width: 2.0,
                              ),
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                            focusedErrorBorder: OutlineInputBorder(
                              borderSide: BorderSide(
                                color: FlutterFlowTheme.of(context).error,
                                width: 2.0,
                              ),
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                            filled: true,
                            fillColor: FlutterFlowTheme.of(context)
                                .secondaryBackground,
                          ),
                          style:
                              FlutterFlowTheme.of(context).bodyMedium.override(
                                    fontFamily: 'DM Sans',
                                    letterSpacing: 0.0,
                                  ),
                          keyboardType: TextInputType.emailAddress,
                          validator: _model.totalpay11TextControllerValidator
                              .asValidator(context),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsetsDirectional.fromSTEB(
                            0.0, 25.0, 0.0, 25.0),
                        child: Row(
                          mainAxisSize: MainAxisSize.max,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Align(
                              alignment: AlignmentDirectional(1.0, 0.0),
                              child: Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 0.0, 10.0, 0.0),
                                child: FFButtonWidget(
                                  onPressed: () async {
                                    Navigator.pop(context);
                                  },
                                  text: 'Cancel',
                                  options: FFButtonOptions(
                                    width: 160.0,
                                    height: 44.0,
                                    padding: EdgeInsets.all(0.0),
                                    iconPadding: EdgeInsetsDirectional.fromSTEB(
                                        0.0, 0.0, 0.0, 0.0),
                                    color: Colors.transparent,
                                    textStyle: FlutterFlowTheme.of(context)
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
                                    borderRadius: BorderRadius.circular(12.0),
                                  ),
                                ),
                              ),
                            ),
                            Align(
                              alignment: AlignmentDirectional(1.0, 0.0),
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
                                  if (paymentResponse.paymentId == null &&
                                      paymentResponse.errorMessage != null) {
                                    showSnackbar(
                                      context,
                                      'Error: ${paymentResponse.errorMessage}',
                                    );
                                  }
                                  _model.paymentId =
                                      paymentResponse.paymentId ?? '';

                                  if (_model.paymentId != null &&
                                      _model.paymentId != '') {
                                    var jobDetailsRecordReference =
                                        JobDetailsRecord.collection
                                            .doc(functions.generateUniqueId());
                                    await jobDetailsRecordReference.set({
                                      ...createJobDetailsRecordData(
                                        jobName: widget.job?.jobName,
                                        hospitalName: widget.job?.hospitalName,
                                        yearOfExperience:
                                            widget.job?.yearOfExperience,
                                        profession: widget.job?.profession,
                                        specialtyArea:
                                            widget.job?.specialtyArea,
                                        timing: createTimingStruct(
                                          startTime: _model.datePicked1,
                                          endTime: _model.datePicked2,
                                          clearUnsetFields: false,
                                          create: true,
                                        ),
                                        duration: (String var1) {
                                          return double.parse(
                                              var1.split(" ")[0]);
                                        }(_model.duration11TextController.text),
                                        hourlyPay: int.tryParse(_model
                                            .hourlypay11TextController.text),
                                        totalPay: double.tryParse(_model
                                            .totalpay11TextController.text),
                                        description: widget.job?.description,
                                        fullAddress: widget.job?.fullAddress,
                                        startDate:
                                            _model.calendarSelectedDay?.start,
                                        endDate:
                                            _model.calendarSelectedDay?.start,
                                        zipCode: widget.job?.zipCode,
                                        jobStatus: 'Active',
                                        createdBy: currentUserReference,
                                        createdAt: getCurrentTimestamp,
                                        isUrgentJob: widget.job?.isUrgentJob,
                                        latlng: widget.job?.latlng,
                                        subRole: widget.job?.subRole,
                                        fromBusiness: widget.job?.fromBusiness,
                                        customDate: true,
                                        perentJob: widget.job?.perentJob,
                                        isChildJob: true,
                                      ),
                                      ...mapToFirestore(
                                        {
                                          'SkillCriteria':
                                              widget.job?.skillCriteria,
                                        },
                                      ),
                                    });
                                    _model.job =
                                        JobDetailsRecord.getDocumentFromData({
                                      ...createJobDetailsRecordData(
                                        jobName: widget.job?.jobName,
                                        hospitalName: widget.job?.hospitalName,
                                        yearOfExperience:
                                            widget.job?.yearOfExperience,
                                        profession: widget.job?.profession,
                                        specialtyArea:
                                            widget.job?.specialtyArea,
                                        timing: createTimingStruct(
                                          startTime: _model.datePicked1,
                                          endTime: _model.datePicked2,
                                          clearUnsetFields: false,
                                          create: true,
                                        ),
                                        duration: (String var1) {
                                          return double.parse(
                                              var1.split(" ")[0]);
                                        }(_model.duration11TextController.text),
                                        hourlyPay: int.tryParse(_model
                                            .hourlypay11TextController.text),
                                        totalPay: double.tryParse(_model
                                            .totalpay11TextController.text),
                                        description: widget.job?.description,
                                        fullAddress: widget.job?.fullAddress,
                                        startDate:
                                            _model.calendarSelectedDay?.start,
                                        endDate:
                                            _model.calendarSelectedDay?.start,
                                        zipCode: widget.job?.zipCode,
                                        jobStatus: 'Active',
                                        createdBy: currentUserReference,
                                        createdAt: getCurrentTimestamp,
                                        isUrgentJob: widget.job?.isUrgentJob,
                                        latlng: widget.job?.latlng,
                                        subRole: widget.job?.subRole,
                                        fromBusiness: widget.job?.fromBusiness,
                                        customDate: true,
                                        perentJob: widget.job?.perentJob,
                                        isChildJob: true,
                                      ),
                                      ...mapToFirestore(
                                        {
                                          'SkillCriteria':
                                              widget.job?.skillCriteria,
                                        },
                                      ),
                                    }, jobDetailsRecordReference);

                                    await _model.job!.reference.update({
                                      ...createJobDetailsRecordData(
                                        jobId: _model.job?.reference.id,
                                      ),
                                      ...mapToFirestore(
                                        {
                                          'AttendanceJob':
                                              getAttendanceListFirestoreData(
                                            functions
                                                .makeAttendanceJob(_model.job!),
                                          ),
                                        },
                                      ),
                                    });

                                    await _model.job!.perentJob!.update({
                                      ...mapToFirestore(
                                        {
                                          'childJob': FieldValue.arrayUnion(
                                              [_model.job?.reference]),
                                        },
                                      ),
                                    });

                                    await currentUserReference!.update({
                                      ...createUsersRecordData(
                                        wallet: functions.updateWalletBalance(
                                            double.parse(_model
                                                .totalpay11TextController.text),
                                            valueOrDefault(
                                                currentUserDocument?.wallet,
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
                                    Navigator.pop(context);
                                  } else {
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(
                                        content: Text(
                                          'Payment is Failed....',
                                          style: TextStyle(
                                            color: FlutterFlowTheme.of(context)
                                                .primaryText,
                                          ),
                                        ),
                                        duration: Duration(milliseconds: 4000),
                                        backgroundColor:
                                            FlutterFlowTheme.of(context)
                                                .secondary,
                                      ),
                                    );
                                  }

                                  safeSetState(() {});
                                },
                                text: 'Duplicate',
                                options: FFButtonOptions(
                                  width: 160.0,
                                  height: 44.0,
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      0.0, 0.0, 0.0, 0.0),
                                  iconPadding: EdgeInsetsDirectional.fromSTEB(
                                      0.0, 0.0, 0.0, 0.0),
                                  color: Color(0xFF22577A),
                                  textStyle: FlutterFlowTheme.of(context)
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
                                  borderRadius: BorderRadius.circular(12.0),
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
      ),
    );
  }
}
