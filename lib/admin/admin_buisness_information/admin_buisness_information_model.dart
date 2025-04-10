import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import 'admin_buisness_information_widget.dart'
    show AdminBuisnessInformationWidget;
import 'package:flutter/material.dart';

class AdminBuisnessInformationModel
    extends FlutterFlowModel<AdminBuisnessInformationWidget> {
  ///  State fields for stateful widgets in this page.

  // State field(s) for BusinessClinicname widget.
  FocusNode? businessClinicnameFocusNode;
  TextEditingController? businessClinicnameTextController;
  String? Function(BuildContext, String?)?
      businessClinicnameTextControllerValidator;
  // State field(s) for TypeofBusiness widget.
  String? typeofBusinessValue;
  FormFieldController<String>? typeofBusinessValueController;
  // State field(s) for Businessregistrationnumber widget.
  FocusNode? businessregistrationnumberFocusNode;
  TextEditingController? businessregistrationnumberTextController;
  String? Function(BuildContext, String?)?
      businessregistrationnumberTextControllerValidator;
  // State field(s) for CountController widget.
  int? countControllerValue;

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {
    businessClinicnameFocusNode?.dispose();
    businessClinicnameTextController?.dispose();

    businessregistrationnumberFocusNode?.dispose();
    businessregistrationnumberTextController?.dispose();
  }
}
