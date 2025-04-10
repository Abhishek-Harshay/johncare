import '/flutter_flow/flutter_flow_util.dart';
import 'skill_text_field_widget.dart' show SkillTextFieldWidget;
import 'package:flutter/material.dart';

class SkillTextFieldModel extends FlutterFlowModel<SkillTextFieldWidget> {
  ///  State fields for stateful widgets in this component.

  // State field(s) for Skillscriteria11 widget.
  FocusNode? skillscriteria11FocusNode;
  TextEditingController? skillscriteria11TextController;
  String? Function(BuildContext, String?)?
      skillscriteria11TextControllerValidator;

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {
    skillscriteria11FocusNode?.dispose();
    skillscriteria11TextController?.dispose();
  }
}
