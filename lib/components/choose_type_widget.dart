import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'choose_type_model.dart';
export 'choose_type_model.dart';

class ChooseTypeWidget extends StatefulWidget {
  const ChooseTypeWidget({
    super.key,
    required this.jobAction,
  });

  final Future Function()? jobAction;

  @override
  State<ChooseTypeWidget> createState() => _ChooseTypeWidgetState();
}

class _ChooseTypeWidgetState extends State<ChooseTypeWidget> {
  late ChooseTypeModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => ChooseTypeModel());

    WidgetsBinding.instance.addPostFrameCallback((_) => safeSetState(() {}));
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    context.watch<FFAppState>();

    return Padding(
      padding: EdgeInsetsDirectional.fromSTEB(20.0, 0.0, 20.0, 0.0),
      child: Container(
        width: 450.0,
        decoration: BoxDecoration(
          color: FlutterFlowTheme.of(context).secondaryBackground,
          borderRadius: BorderRadius.circular(20.0),
        ),
        child: Padding(
          padding: EdgeInsets.all(25.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Padding(
                padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 20.0),
                child: RichText(
                  textScaler: MediaQuery.of(context).textScaler,
                  text: TextSpan(
                    children: [
                      TextSpan(
                        text: 'This is the New ',
                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                              fontFamily: 'DM Sans',
                              fontSize: 20.0,
                              letterSpacing: 0.0,
                            ),
                      ),
                      TextSpan(
                        text: '\nGoogle Account\n',
                        style: TextStyle(
                          color: FlutterFlowTheme.of(context).primary,
                          fontWeight: FontWeight.w600,
                          fontSize: 22.0,
                        ),
                      ),
                      TextSpan(
                        text: 'Please Choose Type',
                        style: TextStyle(
                          color: FlutterFlowTheme.of(context).primary,
                          fontSize: 16.0,
                        ),
                      )
                    ],
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'DM Sans',
                          fontSize: 16.0,
                          letterSpacing: 0.0,
                        ),
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
              Padding(
                padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 15.0),
                child: Row(
                  mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    InkWell(
                      splashColor: Colors.transparent,
                      focusColor: Colors.transparent,
                      hoverColor: Colors.transparent,
                      highlightColor: Colors.transparent,
                      onTap: () async {
                        FFAppState().chooseType = 'Worker';
                        safeSetState(() {});
                      },
                      child: Material(
                        color: Colors.transparent,
                        elevation:
                            FFAppState().chooseType == 'Worker' ? 19.0 : 0.0,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(99.0),
                        ),
                        child: Container(
                          width: 140.0,
                          height: 45.0,
                          decoration: BoxDecoration(
                            color: FFAppState().chooseType == 'Worker'
                                ? Color(0xFF22577A)
                                : Colors.white,
                            borderRadius: BorderRadius.circular(99.0),
                            border: Border.all(
                              color: Colors.transparent,
                            ),
                          ),
                          child: Align(
                            alignment: AlignmentDirectional(0.0, 0.0),
                            child: Text(
                              'Care Giver',
                              style: FlutterFlowTheme.of(context)
                                  .bodyMedium
                                  .override(
                                    fontFamily: 'DM Sans',
                                    color: FFAppState().chooseType == 'Worker'
                                        ? Colors.white
                                        : Color(0xFF57636C),
                                    fontSize: 16.0,
                                    letterSpacing: 0.0,
                                    fontWeight: FontWeight.w600,
                                  ),
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
                        FFAppState().chooseType = 'Recuriter';
                        safeSetState(() {});
                      },
                      child: Material(
                        color: Colors.transparent,
                        elevation:
                            FFAppState().chooseType == 'Recuriter' ? 19.0 : 0.0,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(99.0),
                        ),
                        child: Container(
                          width: 140.0,
                          height: 45.0,
                          decoration: BoxDecoration(
                            color: FFAppState().chooseType == 'Recuriter'
                                ? Color(0xFF22577A)
                                : Colors.white,
                            borderRadius: BorderRadius.circular(99.0),
                            border: Border.all(
                              color: Colors.transparent,
                            ),
                          ),
                          child: Align(
                            alignment: AlignmentDirectional(0.0, 0.0),
                            child: Text(
                              'Care Seeker',
                              style: FlutterFlowTheme.of(context)
                                  .bodyMedium
                                  .override(
                                    fontFamily: 'DM Sans',
                                    color:
                                        FFAppState().chooseType == 'Recuriter'
                                            ? Colors.white
                                            : Color(0xFF57636C),
                                    fontSize: 16.0,
                                    letterSpacing: 0.0,
                                    fontWeight: FontWeight.w600,
                                  ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              if (FFAppState().chooseType == 'Recuriter')
                Padding(
                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 10.0),
                  child: Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      InkWell(
                        splashColor: Colors.transparent,
                        focusColor: Colors.transparent,
                        hoverColor: Colors.transparent,
                        highlightColor: Colors.transparent,
                        onTap: () async {
                          FFAppState().chooseSubType = 'business';
                          safeSetState(() {});
                        },
                        child: Material(
                          color: Colors.transparent,
                          elevation: FFAppState().chooseSubType == 'business'
                              ? 19.0
                              : 0.0,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(99.0),
                          ),
                          child: Container(
                            width: 140.0,
                            height: 45.0,
                            decoration: BoxDecoration(
                              color: FFAppState().chooseSubType == 'business'
                                  ? Color(0xFF22577A)
                                  : Colors.white,
                              borderRadius: BorderRadius.circular(99.0),
                              border: Border.all(
                                color: Colors.transparent,
                              ),
                            ),
                            child: Align(
                              alignment: AlignmentDirectional(0.0, 0.0),
                              child: Text(
                                'I\'m Business',
                                style: FlutterFlowTheme.of(context)
                                    .bodyMedium
                                    .override(
                                      fontFamily: 'DM Sans',
                                      color: FFAppState().chooseSubType ==
                                              'business'
                                          ? Colors.white
                                          : Color(0xFF57636C),
                                      fontSize: 16.0,
                                      letterSpacing: 0.0,
                                      fontWeight: FontWeight.w600,
                                    ),
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
                          FFAppState().chooseSubType = 'Individual';
                          safeSetState(() {});
                        },
                        child: Material(
                          color: Colors.transparent,
                          elevation: FFAppState().chooseSubType == 'Individual'
                              ? 19.0
                              : 0.0,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(99.0),
                          ),
                          child: Container(
                            width: 140.0,
                            height: 45.0,
                            decoration: BoxDecoration(
                              color: FFAppState().chooseSubType == 'Individual'
                                  ? Color(0xFF22577A)
                                  : Colors.white,
                              borderRadius: BorderRadius.circular(99.0),
                              border: Border.all(
                                color: Colors.transparent,
                              ),
                            ),
                            child: Align(
                              alignment: AlignmentDirectional(0.0, 0.0),
                              child: Text(
                                'I\'m Individual',
                                style: FlutterFlowTheme.of(context)
                                    .bodyMedium
                                    .override(
                                      fontFamily: 'DM Sans',
                                      color: FFAppState().chooseSubType ==
                                              'Individual'
                                          ? Colors.white
                                          : Color(0xFF57636C),
                                      fontSize: 16.0,
                                      letterSpacing: 0.0,
                                      fontWeight: FontWeight.w600,
                                    ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              Row(
                mainAxisSize: MainAxisSize.max,
                children: [
                  Expanded(
                    child: Padding(
                      padding:
                          EdgeInsetsDirectional.fromSTEB(0.0, 25.0, 0.0, 0.0),
                      child: FFButtonWidget(
                        onPressed: () async {
                          await widget.jobAction?.call();
                          Navigator.pop(context);
                        },
                        text: 'Confirm',
                        options: FFButtonOptions(
                          height: 46.0,
                          padding: EdgeInsetsDirectional.fromSTEB(
                              16.0, 0.0, 16.0, 0.0),
                          iconPadding: EdgeInsetsDirectional.fromSTEB(
                              0.0, 0.0, 0.0, 0.0),
                          color: Color(0xFF22577A),
                          textStyle:
                              FlutterFlowTheme.of(context).titleSmall.override(
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
                ].divide(SizedBox(width: 12.0)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
