import '/backend/backend.dart';
import '/components/custom_appbar_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'mark_completed_payment_release_widget.dart'
    show MarkCompletedPaymentReleaseWidget;
import 'package:flutter/material.dart';

class MarkCompletedPaymentReleaseModel
    extends FlutterFlowModel<MarkCompletedPaymentReleaseWidget> {
  ///  State fields for stateful widgets in this page.

  final formKey = GlobalKey<FormState>();
  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel;
  // State field(s) for Instructions widget.
  FocusNode? instructionsFocusNode;
  TextEditingController? instructionsTextController;
  String? Function(BuildContext, String?)? instructionsTextControllerValidator;
  // State field(s) for arrivalHours widget.
  FocusNode? arrivalHoursFocusNode;
  TextEditingController? arrivalHoursTextController;
  String? Function(BuildContext, String?)? arrivalHoursTextControllerValidator;
  // State field(s) for TotalPayCustom widget.
  FocusNode? totalPayCustomFocusNode;
  TextEditingController? totalPayCustomTextController;
  String? Function(BuildContext, String?)?
      totalPayCustomTextControllerValidator;
  // Stores action output result for [Backend Call - Read Document] action in Button widget.
  JobDetailsRecord? job;
  // Stores action output result for [Backend Call - Read Document] action in Button widget.
  UsersRecord? hiredUser;
  // Stores action output result for [Backend Call - Read Document] action in Button widget.
  ProviderDetailRecord? providerDetails;
  // Stores action output result for [Backend Call - Read Document] action in Button widget.
  BusinessdetailRecord? business;
  // Stores action output result for [Backend Call - Read Document] action in Button widget.
  BusinessdetailRecord? businesss;

  @override
  void initState(BuildContext context) {
    customAppbarModel = createModel(context, () => CustomAppbarModel());
  }

  @override
  void dispose() {
    customAppbarModel.dispose();
    instructionsFocusNode?.dispose();
    instructionsTextController?.dispose();

    arrivalHoursFocusNode?.dispose();
    arrivalHoursTextController?.dispose();

    totalPayCustomFocusNode?.dispose();
    totalPayCustomTextController?.dispose();
  }
}
