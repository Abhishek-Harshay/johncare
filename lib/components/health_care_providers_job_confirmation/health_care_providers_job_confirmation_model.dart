import '/flutter_flow/flutter_flow_util.dart';
import 'health_care_providers_job_confirmation_widget.dart'
    show HealthCareProvidersJobConfirmationWidget;
import 'package:flutter/material.dart';

class HealthCareProvidersJobConfirmationModel
    extends FlutterFlowModel<HealthCareProvidersJobConfirmationWidget> {
  ///  State fields for stateful widgets in this component.

  // State field(s) for HourlyPayAmountInput widget.
  FocusNode? hourlyPayAmountInputFocusNode;
  TextEditingController? hourlyPayAmountInputTextController;
  String? Function(BuildContext, String?)?
      hourlyPayAmountInputTextControllerValidator;
  // State field(s) for TotalPayAmountInput widget.
  FocusNode? totalPayAmountInputFocusNode1;
  TextEditingController? totalPayAmountInputTextController1;
  String? Function(BuildContext, String?)?
      totalPayAmountInputTextController1Validator;
  // State field(s) for TotalPayAmountInput widget.
  FocusNode? totalPayAmountInputFocusNode2;
  TextEditingController? totalPayAmountInputTextController2;
  String? Function(BuildContext, String?)?
      totalPayAmountInputTextController2Validator;

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {
    hourlyPayAmountInputFocusNode?.dispose();
    hourlyPayAmountInputTextController?.dispose();

    totalPayAmountInputFocusNode1?.dispose();
    totalPayAmountInputTextController1?.dispose();

    totalPayAmountInputFocusNode2?.dispose();
    totalPayAmountInputTextController2?.dispose();
  }
}
