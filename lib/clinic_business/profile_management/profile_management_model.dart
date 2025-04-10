import '/components/side_nav_barfor_recuriter/side_nav_barfor_recuriter_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import 'profile_management_widget.dart' show ProfileManagementWidget;
import 'package:flutter/material.dart';
import 'package:signature/signature.dart';

class ProfileManagementModel extends FlutterFlowModel<ProfileManagementWidget> {
  ///  State fields for stateful widgets in this page.

  // State field(s) for PageView widget.
  PageController? pageViewController1;

  int get pageViewCurrentIndex1 => pageViewController1 != null &&
          pageViewController1!.hasClients &&
          pageViewController1!.page != null
      ? pageViewController1!.page!.round()
      : 0;
  // State field(s) for BusinessClinicname widget.
  FocusNode? businessClinicnameFocusNode;
  TextEditingController? businessClinicnameTextController;
  String? Function(BuildContext, String?)?
      businessClinicnameTextControllerValidator;
  // State field(s) for TypeofBusiness widget.
  String? typeofBusinessValue1;
  FormFieldController<String>? typeofBusinessValueController1;
  // State field(s) for Businessregistrationnumber widget.
  FocusNode? businessregistrationnumberFocusNode;
  TextEditingController? businessregistrationnumberTextController;
  String? Function(BuildContext, String?)?
      businessregistrationnumberTextControllerValidator;
  // State field(s) for CountController widget.
  int? countControllerValue1;
  // State field(s) for Name widget.
  FocusNode? nameFocusNode1;
  TextEditingController? nameTextController1;
  String? Function(BuildContext, String?)? nameTextController1Validator;
  // State field(s) for Name widget.
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
  // State field(s) for Column widget.
  ScrollController? columnController1;
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
  // State field(s) for Typesofshifts widget.
  String? typesofshiftsValue;
  FormFieldController<String>? typesofshiftsValueController;
  // State field(s) for shiftduration widget.
  int? shiftdurationValue;
  // State field(s) for Expectedfrequencyofuse widget.
  FocusNode? expectedfrequencyofuseFocusNode1;
  TextEditingController? expectedfrequencyofuseTextController1;
  String? Function(BuildContext, String?)?
      expectedfrequencyofuseTextController1Validator;
  // State field(s) for Column widget.
  ScrollController? columnController2;
  // State field(s) for Number widget.
  FocusNode? numberFocusNode1;
  TextEditingController? numberTextController1;
  String? Function(BuildContext, String?)? numberTextController1Validator;
  // State field(s) for Number widget.
  FocusNode? numberFocusNode2;
  TextEditingController? numberTextController2;
  String? Function(BuildContext, String?)? numberTextController2Validator;
  // State field(s) for skills widget.
  FocusNode? skillsFocusNode;
  TextEditingController? skillsTextController;
  String? Function(BuildContext, String?)? skillsTextControllerValidator;
  // State field(s) for Checkbox widget.
  bool? checkboxValue1;
  // State field(s) for Checkbox widget.
  bool? checkboxValue2;
  // State field(s) for Signature widget.
  SignatureController? signatureController1;
  // State field(s) for Row widget.
  ScrollController? rowController;
  // Model for SideNavBarforRecuriter component.
  late SideNavBarforRecuriterModel sideNavBarforRecuriterModel;
  // State field(s) for RadioButton widget.
  FormFieldController<String>? radioButtonValueController;
  // State field(s) for PageView widget.
  PageController? pageViewController2;

  int get pageViewCurrentIndex2 => pageViewController2 != null &&
          pageViewController2!.hasClients &&
          pageViewController2!.page != null
      ? pageViewController2!.page!.round()
      : 0;
  // State field(s) for Column widget.
  ScrollController? columnController3;
  // State field(s) for Clinicname widget.
  FocusNode? clinicnameFocusNode;
  TextEditingController? clinicnameTextController;
  String? Function(BuildContext, String?)? clinicnameTextControllerValidator;
  // State field(s) for TypeofBusiness widget.
  String? typeofBusinessValue2;
  FormFieldController<String>? typeofBusinessValueController2;
  // State field(s) for Buisnessregistrationnumber widget.
  FocusNode? buisnessregistrationnumberFocusNode;
  TextEditingController? buisnessregistrationnumberTextController;
  String? Function(BuildContext, String?)?
      buisnessregistrationnumberTextControllerValidator;
  // State field(s) for CountController widget.
  int? countControllerValue2;
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
  // State field(s) for Column widget.
  ScrollController? columnController4;
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
  String? typesofshiftsrequiredValue;
  FormFieldController<String>? typesofshiftsrequiredValueController;
  // State field(s) for CountController widget.
  int? countControllerValue3;
  // State field(s) for Expectedfrequencyofuse widget.
  FocusNode? expectedfrequencyofuseFocusNode2;
  TextEditingController? expectedfrequencyofuseTextController2;
  String? Function(BuildContext, String?)?
      expectedfrequencyofuseTextController2Validator;
  // State field(s) for Column widget.
  ScrollController? columnController5;
  // State field(s) for Column widget.
  ScrollController? columnController6;
  // State field(s) for TaxIDGSTnumber widget.
  FocusNode? taxIDGSTnumberFocusNode;
  TextEditingController? taxIDGSTnumberTextController;
  String? Function(BuildContext, String?)?
      taxIDGSTnumberTextControllerValidator;
  // State field(s) for Buisnessidentificationnumber widget.
  FocusNode? buisnessidentificationnumberFocusNode;
  TextEditingController? buisnessidentificationnumberTextController;
  String? Function(BuildContext, String?)?
      buisnessidentificationnumberTextControllerValidator;
  // State field(s) for Language widget.
  FocusNode? languageFocusNode;
  TextEditingController? languageTextController;
  String? Function(BuildContext, String?)? languageTextControllerValidator;
  // State field(s) for Checkbox widget.
  bool? checkboxValue3;
  // State field(s) for Checkbox widget.
  bool? checkboxValue4;
  // State field(s) for Signature widget.
  SignatureController? signatureController2;
  // State field(s) for Switch widget.
  bool? switchValue;
  // State field(s) for DropDown widget.
  String? dropDownValue;
  FormFieldController<String>? dropDownValueController;

  @override
  void initState(BuildContext context) {
    columnController1 = ScrollController();
    columnController2 = ScrollController();
    rowController = ScrollController();
    sideNavBarforRecuriterModel =
        createModel(context, () => SideNavBarforRecuriterModel());
    columnController3 = ScrollController();
    columnController4 = ScrollController();
    columnController5 = ScrollController();
    columnController6 = ScrollController();
  }

  @override
  void dispose() {
    businessClinicnameFocusNode?.dispose();
    businessClinicnameTextController?.dispose();

    businessregistrationnumberFocusNode?.dispose();
    businessregistrationnumberTextController?.dispose();

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

    columnController1?.dispose();
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

    columnController2?.dispose();
    numberFocusNode1?.dispose();
    numberTextController1?.dispose();

    numberFocusNode2?.dispose();
    numberTextController2?.dispose();

    skillsFocusNode?.dispose();
    skillsTextController?.dispose();

    signatureController1?.dispose();
    rowController?.dispose();
    sideNavBarforRecuriterModel.dispose();
    columnController3?.dispose();
    clinicnameFocusNode?.dispose();
    clinicnameTextController?.dispose();

    buisnessregistrationnumberFocusNode?.dispose();
    buisnessregistrationnumberTextController?.dispose();

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

    columnController4?.dispose();
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

    columnController5?.dispose();
    columnController6?.dispose();
    taxIDGSTnumberFocusNode?.dispose();
    taxIDGSTnumberTextController?.dispose();

    buisnessidentificationnumberFocusNode?.dispose();
    buisnessidentificationnumberTextController?.dispose();

    languageFocusNode?.dispose();
    languageTextController?.dispose();

    signatureController2?.dispose();
  }

  /// Additional helper methods.
  String? get radioButtonValue => radioButtonValueController?.value;
}
