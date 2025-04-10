import '/components/side_nav_bar_healthcare/side_nav_bar_healthcare_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import 'helpandsupport_widget.dart' show HelpandsupportWidget;
import 'package:flutter/material.dart';

class HelpandsupportModel extends FlutterFlowModel<HelpandsupportWidget> {
  ///  State fields for stateful widgets in this page.

  // State field(s) for Number widget.
  FocusNode? numberFocusNode1;
  TextEditingController? numberTextController1;
  String? Function(BuildContext, String?)? numberTextController1Validator;
  // Model for SideNavBarHealthcare component.
  late SideNavBarHealthcareModel sideNavBarHealthcareModel;
  // State field(s) for Switch widget.
  bool? switchValue;
  // State field(s) for DropDown widget.
  String? dropDownValue;
  FormFieldController<String>? dropDownValueController;
  // State field(s) for Number widget.
  FocusNode? numberFocusNode2;
  TextEditingController? numberTextController2;
  String? Function(BuildContext, String?)? numberTextController2Validator;

  @override
  void initState(BuildContext context) {
    sideNavBarHealthcareModel =
        createModel(context, () => SideNavBarHealthcareModel());
  }

  @override
  void dispose() {
    numberFocusNode1?.dispose();
    numberTextController1?.dispose();

    sideNavBarHealthcareModel.dispose();
    numberFocusNode2?.dispose();
    numberTextController2?.dispose();
  }
}
