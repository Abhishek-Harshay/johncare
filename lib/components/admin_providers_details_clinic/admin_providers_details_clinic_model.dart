import '/components/side_nav_bar_healthcare/side_nav_bar_healthcare_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import 'admin_providers_details_clinic_widget.dart'
    show AdminProvidersDetailsClinicWidget;
import 'package:flutter/material.dart';
import 'package:signature/signature.dart';

class AdminProvidersDetailsClinicModel
    extends FlutterFlowModel<AdminProvidersDetailsClinicWidget> {
  ///  State fields for stateful widgets in this page.

  // Model for SideNavBarHealthcare component.
  late SideNavBarHealthcareModel sideNavBarHealthcareModel;
  // State field(s) for Switch widget.
  bool? switchValue1;
  // State field(s) for Switch widget.
  bool? switchValue2;
  // State field(s) for DropDown widget.
  String? dropDownValue;
  FormFieldController<String>? dropDownValueController;
  // State field(s) for Clinicname widget.
  FocusNode? clinicnameFocusNode1;
  TextEditingController? clinicnameTextController1;
  String? Function(BuildContext, String?)? clinicnameTextController1Validator;
  // State field(s) for TypeofBusiness widget.
  String? typeofBusinessValue1;
  FormFieldController<String>? typeofBusinessValueController1;
  // State field(s) for Buisnessregistrationnumber widget.
  FocusNode? buisnessregistrationnumberFocusNode1;
  TextEditingController? buisnessregistrationnumberTextController1;
  String? Function(BuildContext, String?)?
      buisnessregistrationnumberTextController1Validator;
  // State field(s) for CountController widget.
  int? countControllerValue1;
  // State field(s) for Name widget.
  FocusNode? nameFocusNode1;
  TextEditingController? nameTextController1;
  String? Function(BuildContext, String?)? nameTextController1Validator;
  // State field(s) for NAME widget.
  FocusNode? nameFocusNode2;
  TextEditingController? nameTextController2;
  String? Function(BuildContext, String?)? nameTextController2Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode1;
  TextEditingController? emailAddressTextController1;
  String? Function(BuildContext, String?)? emailAddressTextController1Validator;
  // State field(s) for Phonenumber widget.
  FocusNode? phonenumberFocusNode1;
  TextEditingController? phonenumberTextController1;
  String? Function(BuildContext, String?)? phonenumberTextController1Validator;
  // State field(s) for PositionTitle widget.
  FocusNode? positionTitleFocusNode1;
  TextEditingController? positionTitleTextController1;
  String? Function(BuildContext, String?)?
      positionTitleTextController1Validator;
  // State field(s) for Alternativecontact widget.
  FocusNode? alternativecontactFocusNode1;
  TextEditingController? alternativecontactTextController1;
  String? Function(BuildContext, String?)?
      alternativecontactTextController1Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode1;
  TextEditingController? addressTextController1;
  String? Function(BuildContext, String?)? addressTextController1Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode2;
  TextEditingController? addressTextController2;
  String? Function(BuildContext, String?)? addressTextController2Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode3;
  TextEditingController? addressTextController3;
  String? Function(BuildContext, String?)? addressTextController3Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode4;
  TextEditingController? addressTextController4;
  String? Function(BuildContext, String?)? addressTextController4Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode5;
  TextEditingController? addressTextController5;
  String? Function(BuildContext, String?)? addressTextController5Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode6;
  TextEditingController? addressTextController6;
  String? Function(BuildContext, String?)? addressTextController6Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode7;
  TextEditingController? addressTextController7;
  String? Function(BuildContext, String?)? addressTextController7Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode8;
  TextEditingController? addressTextController8;
  String? Function(BuildContext, String?)? addressTextController8Validator;
  // State field(s) for Professionalsneeded widget.
  String? professionalsneededValue1;
  FormFieldController<String>? professionalsneededValueController1;
  // State field(s) for Typesofshiftsrequired widget.
  String? typesofshiftsrequiredValue1;
  FormFieldController<String>? typesofshiftsrequiredValueController1;
  // State field(s) for CountController widget.
  int? countControllerValue2;
  // State field(s) for Expectedfrequencyofuse widget.
  FocusNode? expectedfrequencyofuseFocusNode1;
  TextEditingController? expectedfrequencyofuseTextController1;
  String? Function(BuildContext, String?)?
      expectedfrequencyofuseTextController1Validator;
  // State field(s) for TaxIDGSTnumber widget.
  FocusNode? taxIDGSTnumberFocusNode1;
  TextEditingController? taxIDGSTnumberTextController1;
  String? Function(BuildContext, String?)?
      taxIDGSTnumberTextController1Validator;
  // State field(s) for Buisnessidentificationnumber widget.
  FocusNode? buisnessidentificationnumberFocusNode1;
  TextEditingController? buisnessidentificationnumberTextController1;
  String? Function(BuildContext, String?)?
      buisnessidentificationnumberTextController1Validator;
  // State field(s) for Language widget.
  FocusNode? languageFocusNode1;
  TextEditingController? languageTextController1;
  String? Function(BuildContext, String?)? languageTextController1Validator;
  // State field(s) for Checkbox widget.
  bool? checkboxValue1;
  // State field(s) for Checkbox widget.
  bool? checkboxValue2;
  // State field(s) for Signature widget.
  SignatureController? signatureController1;
  // State field(s) for Clinicname widget.
  FocusNode? clinicnameFocusNode2;
  TextEditingController? clinicnameTextController2;
  String? Function(BuildContext, String?)? clinicnameTextController2Validator;
  // State field(s) for TypeofBusiness widget.
  String? typeofBusinessValue2;
  FormFieldController<String>? typeofBusinessValueController2;
  // State field(s) for Buisnessregistrationnumber widget.
  FocusNode? buisnessregistrationnumberFocusNode2;
  TextEditingController? buisnessregistrationnumberTextController2;
  String? Function(BuildContext, String?)?
      buisnessregistrationnumberTextController2Validator;
  // State field(s) for CountController widget.
  int? countControllerValue3;
  // State field(s) for Name widget.
  FocusNode? nameFocusNode3;
  TextEditingController? nameTextController3;
  String? Function(BuildContext, String?)? nameTextController3Validator;
  // State field(s) for NAME widget.
  FocusNode? nameFocusNode4;
  TextEditingController? nameTextController4;
  String? Function(BuildContext, String?)? nameTextController4Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode2;
  TextEditingController? emailAddressTextController2;
  String? Function(BuildContext, String?)? emailAddressTextController2Validator;
  // State field(s) for Phonenumber widget.
  FocusNode? phonenumberFocusNode2;
  TextEditingController? phonenumberTextController2;
  String? Function(BuildContext, String?)? phonenumberTextController2Validator;
  // State field(s) for PositionTitle widget.
  FocusNode? positionTitleFocusNode2;
  TextEditingController? positionTitleTextController2;
  String? Function(BuildContext, String?)?
      positionTitleTextController2Validator;
  // State field(s) for Alternativecontact widget.
  FocusNode? alternativecontactFocusNode2;
  TextEditingController? alternativecontactTextController2;
  String? Function(BuildContext, String?)?
      alternativecontactTextController2Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode9;
  TextEditingController? addressTextController9;
  String? Function(BuildContext, String?)? addressTextController9Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode10;
  TextEditingController? addressTextController10;
  String? Function(BuildContext, String?)? addressTextController10Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode11;
  TextEditingController? addressTextController11;
  String? Function(BuildContext, String?)? addressTextController11Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode12;
  TextEditingController? addressTextController12;
  String? Function(BuildContext, String?)? addressTextController12Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode13;
  TextEditingController? addressTextController13;
  String? Function(BuildContext, String?)? addressTextController13Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode14;
  TextEditingController? addressTextController14;
  String? Function(BuildContext, String?)? addressTextController14Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode15;
  TextEditingController? addressTextController15;
  String? Function(BuildContext, String?)? addressTextController15Validator;
  // State field(s) for Address widget.
  FocusNode? addressFocusNode16;
  TextEditingController? addressTextController16;
  String? Function(BuildContext, String?)? addressTextController16Validator;
  // State field(s) for Professionalsneeded widget.
  String? professionalsneededValue2;
  FormFieldController<String>? professionalsneededValueController2;
  // State field(s) for Typesofshiftsrequired widget.
  String? typesofshiftsrequiredValue2;
  FormFieldController<String>? typesofshiftsrequiredValueController2;
  // State field(s) for CountController widget.
  int? countControllerValue4;
  // State field(s) for Expectedfrequencyofuse widget.
  FocusNode? expectedfrequencyofuseFocusNode2;
  TextEditingController? expectedfrequencyofuseTextController2;
  String? Function(BuildContext, String?)?
      expectedfrequencyofuseTextController2Validator;
  // State field(s) for TaxIDGSTnumber widget.
  FocusNode? taxIDGSTnumberFocusNode2;
  TextEditingController? taxIDGSTnumberTextController2;
  String? Function(BuildContext, String?)?
      taxIDGSTnumberTextController2Validator;
  // State field(s) for Buisnessidentificationnumber widget.
  FocusNode? buisnessidentificationnumberFocusNode2;
  TextEditingController? buisnessidentificationnumberTextController2;
  String? Function(BuildContext, String?)?
      buisnessidentificationnumberTextController2Validator;
  // State field(s) for Language widget.
  FocusNode? languageFocusNode2;
  TextEditingController? languageTextController2;
  String? Function(BuildContext, String?)? languageTextController2Validator;
  // State field(s) for Checkbox widget.
  bool? checkboxValue3;
  // State field(s) for Checkbox widget.
  bool? checkboxValue4;
  // State field(s) for Signature widget.
  SignatureController? signatureController2;

  @override
  void initState(BuildContext context) {
    sideNavBarHealthcareModel =
        createModel(context, () => SideNavBarHealthcareModel());
  }

  @override
  void dispose() {
    sideNavBarHealthcareModel.dispose();
    clinicnameFocusNode1?.dispose();
    clinicnameTextController1?.dispose();

    buisnessregistrationnumberFocusNode1?.dispose();
    buisnessregistrationnumberTextController1?.dispose();

    nameFocusNode1?.dispose();
    nameTextController1?.dispose();

    nameFocusNode2?.dispose();
    nameTextController2?.dispose();

    emailAddressFocusNode1?.dispose();
    emailAddressTextController1?.dispose();

    phonenumberFocusNode1?.dispose();
    phonenumberTextController1?.dispose();

    positionTitleFocusNode1?.dispose();
    positionTitleTextController1?.dispose();

    alternativecontactFocusNode1?.dispose();
    alternativecontactTextController1?.dispose();

    addressFocusNode1?.dispose();
    addressTextController1?.dispose();

    addressFocusNode2?.dispose();
    addressTextController2?.dispose();

    addressFocusNode3?.dispose();
    addressTextController3?.dispose();

    addressFocusNode4?.dispose();
    addressTextController4?.dispose();

    addressFocusNode5?.dispose();
    addressTextController5?.dispose();

    addressFocusNode6?.dispose();
    addressTextController6?.dispose();

    addressFocusNode7?.dispose();
    addressTextController7?.dispose();

    addressFocusNode8?.dispose();
    addressTextController8?.dispose();

    expectedfrequencyofuseFocusNode1?.dispose();
    expectedfrequencyofuseTextController1?.dispose();

    taxIDGSTnumberFocusNode1?.dispose();
    taxIDGSTnumberTextController1?.dispose();

    buisnessidentificationnumberFocusNode1?.dispose();
    buisnessidentificationnumberTextController1?.dispose();

    languageFocusNode1?.dispose();
    languageTextController1?.dispose();

    signatureController1?.dispose();
    clinicnameFocusNode2?.dispose();
    clinicnameTextController2?.dispose();

    buisnessregistrationnumberFocusNode2?.dispose();
    buisnessregistrationnumberTextController2?.dispose();

    nameFocusNode3?.dispose();
    nameTextController3?.dispose();

    nameFocusNode4?.dispose();
    nameTextController4?.dispose();

    emailAddressFocusNode2?.dispose();
    emailAddressTextController2?.dispose();

    phonenumberFocusNode2?.dispose();
    phonenumberTextController2?.dispose();

    positionTitleFocusNode2?.dispose();
    positionTitleTextController2?.dispose();

    alternativecontactFocusNode2?.dispose();
    alternativecontactTextController2?.dispose();

    addressFocusNode9?.dispose();
    addressTextController9?.dispose();

    addressFocusNode10?.dispose();
    addressTextController10?.dispose();

    addressFocusNode11?.dispose();
    addressTextController11?.dispose();

    addressFocusNode12?.dispose();
    addressTextController12?.dispose();

    addressFocusNode13?.dispose();
    addressTextController13?.dispose();

    addressFocusNode14?.dispose();
    addressTextController14?.dispose();

    addressFocusNode15?.dispose();
    addressTextController15?.dispose();

    addressFocusNode16?.dispose();
    addressTextController16?.dispose();

    expectedfrequencyofuseFocusNode2?.dispose();
    expectedfrequencyofuseTextController2?.dispose();

    taxIDGSTnumberFocusNode2?.dispose();
    taxIDGSTnumberTextController2?.dispose();

    buisnessidentificationnumberFocusNode2?.dispose();
    buisnessidentificationnumberTextController2?.dispose();

    languageFocusNode2?.dispose();
    languageTextController2?.dispose();

    signatureController2?.dispose();
  }
}
