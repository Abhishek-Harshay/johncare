import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'package:easy_debounce/easy_debounce.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'skill_text_field_model.dart';
export 'skill_text_field_model.dart';

class SkillTextFieldWidget extends StatefulWidget {
  const SkillTextFieldWidget({
    super.key,
    required this.index,
  });

  final int? index;

  @override
  State<SkillTextFieldWidget> createState() => _SkillTextFieldWidgetState();
}

class _SkillTextFieldWidgetState extends State<SkillTextFieldWidget> {
  late SkillTextFieldModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => SkillTextFieldModel());

    _model.skillscriteria11TextController ??= TextEditingController(
        text: FFAppState().skills.elementAtOrNull(widget.index!));
    _model.skillscriteria11FocusNode ??= FocusNode();

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

    return Container(
      width: 335.0,
      child: TextFormField(
        controller: _model.skillscriteria11TextController,
        focusNode: _model.skillscriteria11FocusNode,
        onChanged: (_) => EasyDebounce.debounce(
          '_model.skillscriteria11TextController',
          Duration(milliseconds: 2000),
          () async {
            FFAppState().updateSkillsAtIndex(
              widget.index!,
              (_) => _model.skillscriteria11TextController.text,
            );
            safeSetState(() {});
          },
        ),
        autofocus: false,
        autofillHints: [AutofillHints.email],
        obscureText: false,
        decoration: InputDecoration(
          labelText: 'Enter Skill',
          labelStyle: FlutterFlowTheme.of(context).labelMedium.override(
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
          fillColor: FlutterFlowTheme.of(context).secondaryBackground,
        ),
        style: FlutterFlowTheme.of(context).bodyMedium.override(
              fontFamily: 'DM Sans',
              letterSpacing: 0.0,
            ),
        validator:
            _model.skillscriteria11TextControllerValidator.asValidator(context),
      ),
    );
  }
}
