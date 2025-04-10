import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import 'health_care_providers_review_widget.dart'
    show HealthCareProvidersReviewWidget;
import 'package:flutter/material.dart';

class HealthCareProvidersReviewModel
    extends FlutterFlowModel<HealthCareProvidersReviewWidget> {
  ///  State fields for stateful widgets in this page.

  // State field(s) for RatingBar widget.
  double? ratingBarValue;
  // State field(s) for Review widget.
  FocusNode? reviewFocusNode;
  TextEditingController? reviewTextController;
  String? Function(BuildContext, String?)? reviewTextControllerValidator;
  // State field(s) for Switch widget.
  bool? switchValue;
  // State field(s) for DropDown widget.
  String? dropDownValue;
  FormFieldController<String>? dropDownValueController;

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {
    reviewFocusNode?.dispose();
    reviewTextController?.dispose();
  }
}
