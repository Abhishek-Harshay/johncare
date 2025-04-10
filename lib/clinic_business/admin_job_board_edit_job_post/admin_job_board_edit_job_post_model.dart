import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import '/index.dart';
import 'admin_job_board_edit_job_post_widget.dart'
    show AdminJobBoardEditJobPostWidget;
import 'package:flutter/material.dart';

class AdminJobBoardEditJobPostModel
    extends FlutterFlowModel<AdminJobBoardEditJobPostWidget> {
  ///  State fields for stateful widgets in this page.

  final formKey = GlobalKey<FormState>();
  // State field(s) for Switch widget.
  bool? switchValue;
  // State field(s) for Jobtitle11 widget.
  FocusNode? jobtitle11FocusNode;
  TextEditingController? jobtitle11TextController;
  String? Function(BuildContext, String?)? jobtitle11TextControllerValidator;
  String? _jobtitle11TextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Enter Job title is required';
    }

    return null;
  }

  // State field(s) for Hospitalname11 widget.
  FocusNode? hospitalname11FocusNode;
  TextEditingController? hospitalname11TextController;
  String? Function(BuildContext, String?)?
      hospitalname11TextControllerValidator;
  String? _hospitalname11TextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Enter Hospital name is required';
    }

    return null;
  }

  // State field(s) for Yearsofexperience11 widget.
  FocusNode? yearsofexperience11FocusNode;
  TextEditingController? yearsofexperience11TextController;
  String? Function(BuildContext, String?)?
      yearsofexperience11TextControllerValidator;
  String? _yearsofexperience11TextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Enter Years of experience is required';
    }

    return null;
  }

  // State field(s) for Profession widget.
  String? professionValue;
  FormFieldController<String>? professionValueController;
  // State field(s) for Specialtyarea widget.
  String? specialtyareaValue;
  FormFieldController<String>? specialtyareaValueController;
  DateTime? datePicked1;
  DateTime? datePicked2;
  DateTime? datePicked3;
  DateTime? datePicked4;
  // State field(s) for Duration11 widget.
  FocusNode? duration11FocusNode;
  TextEditingController? duration11TextController;
  String? Function(BuildContext, String?)? duration11TextControllerValidator;
  // State field(s) for Hourlypay11 widget.
  FocusNode? hourlypay11FocusNode;
  TextEditingController? hourlypay11TextController;
  String? Function(BuildContext, String?)? hourlypay11TextControllerValidator;
  // State field(s) for Totalpay11 widget.
  FocusNode? totalpay11FocusNode;
  TextEditingController? totalpay11TextController;
  String? Function(BuildContext, String?)? totalpay11TextControllerValidator;
  // State field(s) for Zipcode11 widget.
  FocusNode? zipcode11FocusNode;
  TextEditingController? zipcode11TextController;
  String? Function(BuildContext, String?)? zipcode11TextControllerValidator;
  // State field(s) for Description11 widget.
  FocusNode? description11FocusNode;
  TextEditingController? description11TextController;
  String? Function(BuildContext, String?)? description11TextControllerValidator;
  // State field(s) for Skills widget.
  FocusNode? skillsFocusNode;
  TextEditingController? skillsTextController;
  String? Function(BuildContext, String?)? skillsTextControllerValidator;
  // State field(s) for isUrgentJob widget.
  bool? isUrgentJobValue;
  // Stores action output result for [Custom Action - convertAddressTOLatLng] action in CreatePost11 widget.
  LatLng? latlng;

  @override
  void initState(BuildContext context) {
    jobtitle11TextControllerValidator = _jobtitle11TextControllerValidator;
    hospitalname11TextControllerValidator =
        _hospitalname11TextControllerValidator;
    yearsofexperience11TextControllerValidator =
        _yearsofexperience11TextControllerValidator;
  }

  @override
  void dispose() {
    jobtitle11FocusNode?.dispose();
    jobtitle11TextController?.dispose();

    hospitalname11FocusNode?.dispose();
    hospitalname11TextController?.dispose();

    yearsofexperience11FocusNode?.dispose();
    yearsofexperience11TextController?.dispose();

    duration11FocusNode?.dispose();
    duration11TextController?.dispose();

    hourlypay11FocusNode?.dispose();
    hourlypay11TextController?.dispose();

    totalpay11FocusNode?.dispose();
    totalpay11TextController?.dispose();

    zipcode11FocusNode?.dispose();
    zipcode11TextController?.dispose();

    description11FocusNode?.dispose();
    description11TextController?.dispose();

    skillsFocusNode?.dispose();
    skillsTextController?.dispose();
  }
}
