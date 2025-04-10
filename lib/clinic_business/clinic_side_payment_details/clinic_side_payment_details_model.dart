import '/components/side_nav_bar_healthcare/side_nav_bar_healthcare_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import 'clinic_side_payment_details_widget.dart'
    show ClinicSidePaymentDetailsWidget;
import 'package:flutter/material.dart';

class ClinicSidePaymentDetailsModel
    extends FlutterFlowModel<ClinicSidePaymentDetailsWidget> {
  ///  State fields for stateful widgets in this page.

  // State field(s) for Number widget.
  FocusNode? numberFocusNode1;
  TextEditingController? numberTextController1;
  String? Function(BuildContext, String?)? numberTextController1Validator;
  // State field(s) for Name widget.
  FocusNode? nameFocusNode1;
  TextEditingController? nameTextController1;
  String? Function(BuildContext, String?)? nameTextController1Validator;
  // State field(s) for Date widget.
  FocusNode? dateFocusNode;
  TextEditingController? dateTextController;
  String? Function(BuildContext, String?)? dateTextControllerValidator;
  // State field(s) for number widget.
  FocusNode? numberFocusNode2;
  TextEditingController? numberTextController2;
  String? Function(BuildContext, String?)? numberTextController2Validator;
  // Model for SideNavBarHealthcare component.
  late SideNavBarHealthcareModel sideNavBarHealthcareModel;
  // State field(s) for Number widget.
  FocusNode? numberFocusNode3;
  TextEditingController? numberTextController3;
  String? Function(BuildContext, String?)? numberTextController3Validator;
  // State field(s) for Name widget.
  FocusNode? nameFocusNode2;
  TextEditingController? nameTextController2;
  String? Function(BuildContext, String?)? nameTextController2Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode1;
  TextEditingController? emailAddressTextController1;
  String? Function(BuildContext, String?)? emailAddressTextController1Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode2;
  TextEditingController? emailAddressTextController2;
  String? Function(BuildContext, String?)? emailAddressTextController2Validator;
  // State field(s) for Switch widget.
  bool? switchValue;
  // State field(s) for DropDown widget.
  String? dropDownValue;
  FormFieldController<String>? dropDownValueController;

  @override
  void initState(BuildContext context) {
    sideNavBarHealthcareModel =
        createModel(context, () => SideNavBarHealthcareModel());
  }

  @override
  void dispose() {
    numberFocusNode1?.dispose();
    numberTextController1?.dispose();

    nameFocusNode1?.dispose();
    nameTextController1?.dispose();

    dateFocusNode?.dispose();
    dateTextController?.dispose();

    numberFocusNode2?.dispose();
    numberTextController2?.dispose();

    sideNavBarHealthcareModel.dispose();
    numberFocusNode3?.dispose();
    numberTextController3?.dispose();

    nameFocusNode2?.dispose();
    nameTextController2?.dispose();

    emailAddressFocusNode1?.dispose();
    emailAddressTextController1?.dispose();

    emailAddressFocusNode2?.dispose();
    emailAddressTextController2?.dispose();
  }
}
