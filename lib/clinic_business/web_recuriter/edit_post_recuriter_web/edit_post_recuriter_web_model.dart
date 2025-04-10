import '/backend/backend.dart';
import '/components/side_nav_barfor_recuriter/side_nav_barfor_recuriter_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import '/index.dart';
import 'edit_post_recuriter_web_widget.dart' show EditPostRecuriterWebWidget;
import 'package:flutter/material.dart';

class EditPostRecuriterWebModel
    extends FlutterFlowModel<EditPostRecuriterWebWidget> {
  ///  Local state fields for this page.

  String status = 'All';

  ///  State fields for stateful widgets in this page.

  // Model for SideNavBarforRecuriter component.
  late SideNavBarforRecuriterModel sideNavBarforRecuriterModel;
  // State field(s) for jobTitle widget.
  FocusNode? jobTitleFocusNode;
  TextEditingController? jobTitleTextController;
  String? Function(BuildContext, String?)? jobTitleTextControllerValidator;
  // State field(s) for HospitalName widget.
  FocusNode? hospitalNameFocusNode;
  TextEditingController? hospitalNameTextController;
  String? Function(BuildContext, String?)? hospitalNameTextControllerValidator;
  // State field(s) for Yearsofexperience widget.
  FocusNode? yearsofexperienceFocusNode;
  TextEditingController? yearsofexperienceTextController;
  String? Function(BuildContext, String?)?
      yearsofexperienceTextControllerValidator;
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
  // State field(s) for Duration widget.
  FocusNode? durationFocusNode;
  TextEditingController? durationTextController;
  String? Function(BuildContext, String?)? durationTextControllerValidator;
  // State field(s) for HourlyPay widget.
  FocusNode? hourlyPayFocusNode;
  TextEditingController? hourlyPayTextController;
  String? Function(BuildContext, String?)? hourlyPayTextControllerValidator;
  // State field(s) for TotalPay widget.
  FocusNode? totalPayFocusNode;
  TextEditingController? totalPayTextController;
  String? Function(BuildContext, String?)? totalPayTextControllerValidator;
  // State field(s) for ZipCode widget.
  FocusNode? zipCodeFocusNode;
  TextEditingController? zipCodeTextController;
  String? Function(BuildContext, String?)? zipCodeTextControllerValidator;
  // State field(s) for Description widget.
  FocusNode? descriptionFocusNode;
  TextEditingController? descriptionTextController;
  String? Function(BuildContext, String?)? descriptionTextControllerValidator;
  // State field(s) for Skills widget.
  FocusNode? skillsFocusNode;
  TextEditingController? skillsTextController;
  String? Function(BuildContext, String?)? skillsTextControllerValidator;
  // State field(s) for isUrgentJob widget.
  bool? isUrgentJobValue;
  // Stores action output result for [Custom Action - convertAddressTOLatLng] action in CreatePost11 widget.
  LatLng? latlng;
  // Stores action output result for [Firestore Query - Query a collection] action in CreatePost11 widget.
  List<ProviderDetailRecord>? recommendationUsers;

  @override
  void initState(BuildContext context) {
    sideNavBarforRecuriterModel =
        createModel(context, () => SideNavBarforRecuriterModel());
  }

  @override
  void dispose() {
    sideNavBarforRecuriterModel.dispose();
    jobTitleFocusNode?.dispose();
    jobTitleTextController?.dispose();

    hospitalNameFocusNode?.dispose();
    hospitalNameTextController?.dispose();

    yearsofexperienceFocusNode?.dispose();
    yearsofexperienceTextController?.dispose();

    durationFocusNode?.dispose();
    durationTextController?.dispose();

    hourlyPayFocusNode?.dispose();
    hourlyPayTextController?.dispose();

    totalPayFocusNode?.dispose();
    totalPayTextController?.dispose();

    zipCodeFocusNode?.dispose();
    zipCodeTextController?.dispose();

    descriptionFocusNode?.dispose();
    descriptionTextController?.dispose();

    skillsFocusNode?.dispose();
    skillsTextController?.dispose();
  }
}
