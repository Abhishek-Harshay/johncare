import '/components/custom_appbar_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'payment_details_job_seeker_widget.dart'
    show PaymentDetailsJobSeekerWidget;
import 'package:flutter/material.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';

class PaymentDetailsJobSeekerModel
    extends FlutterFlowModel<PaymentDetailsJobSeekerWidget> {
  ///  State fields for stateful widgets in this page.

  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel;
  // State field(s) for cardNumber widget.
  FocusNode? cardNumberFocusNode;
  TextEditingController? cardNumberTextController;
  String? Function(BuildContext, String?)? cardNumberTextControllerValidator;
  // State field(s) for Sin widget.
  FocusNode? sinFocusNode;
  TextEditingController? sinTextController;
  String? Function(BuildContext, String?)? sinTextControllerValidator;
  // State field(s) for ExpireDate widget.
  FocusNode? expireDateFocusNode;
  TextEditingController? expireDateTextController;
  final expireDateMask = MaskTextInputFormatter(mask: '##/##');
  String? Function(BuildContext, String?)? expireDateTextControllerValidator;
  // State field(s) for CVC widget.
  FocusNode? cvcFocusNode;
  TextEditingController? cvcTextController;
  final cvcMask = MaskTextInputFormatter(mask: '##/##');
  String? Function(BuildContext, String?)? cvcTextControllerValidator;

  @override
  void initState(BuildContext context) {
    customAppbarModel = createModel(context, () => CustomAppbarModel());
  }

  @override
  void dispose() {
    customAppbarModel.dispose();
    cardNumberFocusNode?.dispose();
    cardNumberTextController?.dispose();

    sinFocusNode?.dispose();
    sinTextController?.dispose();

    expireDateFocusNode?.dispose();
    expireDateTextController?.dispose();

    cvcFocusNode?.dispose();
    cvcTextController?.dispose();
  }
}
