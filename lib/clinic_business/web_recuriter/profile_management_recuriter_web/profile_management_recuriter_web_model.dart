import '/components/side_nav_barfor_recuriter/side_nav_barfor_recuriter_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import '/index.dart';
import 'profile_management_recuriter_web_widget.dart'
    show ProfileManagementRecuriterWebWidget;
import 'package:flutter/material.dart';
import 'package:signature/signature.dart';

class ProfileManagementRecuriterWebModel
    extends FlutterFlowModel<ProfileManagementRecuriterWebWidget> {
  ///  Local state fields for this page.

  int? active;

  bool isAdditional = false;

  ///  State fields for stateful widgets in this page.

  final formKey1 = GlobalKey<FormState>();
  final formKey4 = GlobalKey<FormState>();
  final formKey5 = GlobalKey<FormState>();
  final formKey2 = GlobalKey<FormState>();
  final formKey3 = GlobalKey<FormState>();
  // Model for SideNavBarforRecuriter component.
  late SideNavBarforRecuriterModel sideNavBarforRecuriterModel;
  // State field(s) for clinicName widget.
  FocusNode? clinicNameFocusNode;
  TextEditingController? clinicNameTextController;
  String? Function(BuildContext, String?)? clinicNameTextControllerValidator;
  String? _clinicNameTextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'BusinessName is required';
    }

    return null;
  }

  // State field(s) for typr widget.
  String? typrValue;
  FormFieldController<String>? typrValueController;
  // State field(s) for businessNumber widget.
  FocusNode? businessNumberFocusNode;
  TextEditingController? businessNumberTextController;
  String? Function(BuildContext, String?)?
      businessNumberTextControllerValidator;
  // State field(s) for noOfLocation widget.
  FocusNode? noOfLocationFocusNode;
  TextEditingController? noOfLocationTextController;
  String? Function(BuildContext, String?)? noOfLocationTextControllerValidator;
  // State field(s) for fName widget.
  FocusNode? fNameFocusNode;
  TextEditingController? fNameTextController;
  String? Function(BuildContext, String?)? fNameTextControllerValidator;
  String? _fNameTextControllerValidator(BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'firstName is required';
    }

    return null;
  }

  // State field(s) for lName widget.
  FocusNode? lNameFocusNode;
  TextEditingController? lNameTextController;
  String? Function(BuildContext, String?)? lNameTextControllerValidator;
  String? _lNameTextControllerValidator(BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'lastName is required';
    }

    return null;
  }

  // State field(s) for PositionTitle widget.
  FocusNode? positionTitleFocusNode;
  TextEditingController? positionTitleTextController;
  String? Function(BuildContext, String?)? positionTitleTextControllerValidator;
  // State field(s) for Emailaddress widget.
  FocusNode? emailaddressFocusNode;
  TextEditingController? emailaddressTextController;
  String? Function(BuildContext, String?)? emailaddressTextControllerValidator;
  String? _emailaddressTextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Emailaddress is required';
    }

    return null;
  }

  // State field(s) for Phonenumber widget.
  FocusNode? phonenumberFocusNode;
  TextEditingController? phonenumberTextController;
  String? Function(BuildContext, String?)? phonenumberTextControllerValidator;
  String? _phonenumberTextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Phonenumber is required';
    }

    return null;
  }

  // State field(s) for AlternativecontactOptional widget.
  FocusNode? alternativecontactOptionalFocusNode;
  TextEditingController? alternativecontactOptionalTextController;
  String? Function(BuildContext, String?)?
      alternativecontactOptionalTextControllerValidator;
  // State field(s) for Street widget.
  FocusNode? streetFocusNode;
  TextEditingController? streetTextController;
  String? Function(BuildContext, String?)? streetTextControllerValidator;
  // State field(s) for Cityname widget.
  FocusNode? citynameFocusNode;
  TextEditingController? citynameTextController;
  String? Function(BuildContext, String?)? citynameTextControllerValidator;
  // State field(s) for Province widget.
  FocusNode? provinceFocusNode;
  TextEditingController? provinceTextController;
  String? Function(BuildContext, String?)? provinceTextControllerValidator;
  // State field(s) for Postalcode widget.
  FocusNode? postalcodeFocusNode;
  TextEditingController? postalcodeTextController;
  String? Function(BuildContext, String?)? postalcodeTextControllerValidator;
  // Stores action output result for [Custom Action - convertAddressTOLatLng] action in Button widget.
  LatLng? mainlatlng2;
  // State field(s) for Professionalsneeded widget.
  String? professionalsneededValue;
  FormFieldController<String>? professionalsneededValueController;
  // State field(s) for Typesofshiftsrequired widget.
  String? typesofshiftsrequiredValue;
  FormFieldController<String>? typesofshiftsrequiredValueController;
  // State field(s) for Typicalshiftduration widget.
  FocusNode? typicalshiftdurationFocusNode;
  TextEditingController? typicalshiftdurationTextController;
  String? Function(BuildContext, String?)?
      typicalshiftdurationTextControllerValidator;
  // State field(s) for Expectedfrequencyofuse widget.
  FocusNode? expectedfrequencyofuseFocusNode;
  TextEditingController? expectedfrequencyofuseTextController;
  String? Function(BuildContext, String?)?
      expectedfrequencyofuseTextControllerValidator;
  // State field(s) for TaxIDHSTnumber widget.
  FocusNode? taxIDHSTnumberFocusNode;
  TextEditingController? taxIDHSTnumberTextController;
  String? Function(BuildContext, String?)?
      taxIDHSTnumberTextControllerValidator;
  // State field(s) for Businessidentificationnumber widget.
  FocusNode? businessidentificationnumberFocusNode;
  TextEditingController? businessidentificationnumberTextController;
  String? Function(BuildContext, String?)?
      businessidentificationnumberTextControllerValidator;
  bool isDataUploading1 = false;
  FFUploadedFile uploadedLocalFile1 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl1 = '';

  bool isDataUploading2 = false;
  FFUploadedFile uploadedLocalFile2 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl2 = '';

  bool isDataUploading3 = false;
  FFUploadedFile uploadedLocalFile3 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl3 = '';

  // State field(s) for paymenrType widget.
  String? paymenrTypeValue;
  FormFieldController<String>? paymenrTypeValueController;
  // State field(s) for billingAdress widget.
  FocusNode? billingAdressFocusNode;
  TextEditingController? billingAdressTextController;
  String? Function(BuildContext, String?)? billingAdressTextControllerValidator;
  String? _billingAdressTextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Billingaddress is required';
    }

    return null;
  }

  // State field(s) for Bankaccountnumber widget.
  FocusNode? bankaccountnumberFocusNode;
  TextEditingController? bankaccountnumberTextController;
  String? Function(BuildContext, String?)?
      bankaccountnumberTextControllerValidator;
  String? _bankaccountnumberTextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Bankaccountnumber is required';
    }

    return null;
  }

  // State field(s) for bankName widget.
  FocusNode? bankNameFocusNode;
  TextEditingController? bankNameTextController;
  String? Function(BuildContext, String?)? bankNameTextControllerValidator;
  String? _bankNameTextControllerValidator(BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Bankname is required';
    }

    return null;
  }

  // State field(s) for Institutionnumber widget.
  FocusNode? institutionnumberFocusNode;
  TextEditingController? institutionnumberTextController;
  String? Function(BuildContext, String?)?
      institutionnumberTextControllerValidator;
  String? _institutionnumberTextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Institutionnumber is required';
    }

    return null;
  }

  // State field(s) for Branchnumber widget.
  FocusNode? branchnumberFocusNode;
  TextEditingController? branchnumberTextController;
  String? Function(BuildContext, String?)? branchnumberTextControllerValidator;
  String? _branchnumberTextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Branchnumber is required';
    }

    return null;
  }

  // State field(s) for SINnumber widget.
  FocusNode? sINnumberFocusNode;
  TextEditingController? sINnumberTextController;
  String? Function(BuildContext, String?)? sINnumberTextControllerValidator;
  String? _sINnumberTextControllerValidator(BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'SINnumber is required';
    }

    return null;
  }

  // State field(s) for Name widget.
  FocusNode? nameFocusNode;
  TextEditingController? nameTextController;
  String? Function(BuildContext, String?)? nameTextControllerValidator;
  String? _nameTextControllerValidator(BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Name is required';
    }

    return null;
  }

  // State field(s) for Email widget.
  FocusNode? emailFocusNode;
  TextEditingController? emailTextController;
  String? Function(BuildContext, String?)? emailTextControllerValidator;
  String? _emailTextControllerValidator(BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Email is required';
    }

    return null;
  }

  // State field(s) for PhoneNumber widget.
  FocusNode? phoneNumberFocusNode;
  TextEditingController? phoneNumberTextController;
  String? Function(BuildContext, String?)? phoneNumberTextControllerValidator;
  String? _phoneNumberTextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Phonenumber is required';
    }

    return null;
  }

  // State field(s) for Professionalsneeded widget.
  FocusNode? professionalsneededFocusNode;
  TextEditingController? professionalsneededTextController;
  String? Function(BuildContext, String?)?
      professionalsneededTextControllerValidator;
  String? _professionalsneededTextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Professionalsneeded is required';
    }

    return null;
  }

  bool isDataUploading4 = false;
  FFUploadedFile uploadedLocalFile4 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl4 = '';

  // State field(s) for Signature14 widget.
  SignatureController? signature14Controller;
  String uploadedSignatureUrl = '';

  @override
  void initState(BuildContext context) {
    sideNavBarforRecuriterModel =
        createModel(context, () => SideNavBarforRecuriterModel());
    clinicNameTextControllerValidator = _clinicNameTextControllerValidator;
    fNameTextControllerValidator = _fNameTextControllerValidator;
    lNameTextControllerValidator = _lNameTextControllerValidator;
    emailaddressTextControllerValidator = _emailaddressTextControllerValidator;
    phonenumberTextControllerValidator = _phonenumberTextControllerValidator;
    billingAdressTextControllerValidator =
        _billingAdressTextControllerValidator;
    bankaccountnumberTextControllerValidator =
        _bankaccountnumberTextControllerValidator;
    bankNameTextControllerValidator = _bankNameTextControllerValidator;
    institutionnumberTextControllerValidator =
        _institutionnumberTextControllerValidator;
    branchnumberTextControllerValidator = _branchnumberTextControllerValidator;
    sINnumberTextControllerValidator = _sINnumberTextControllerValidator;
    nameTextControllerValidator = _nameTextControllerValidator;
    emailTextControllerValidator = _emailTextControllerValidator;
    phoneNumberTextControllerValidator = _phoneNumberTextControllerValidator;
    professionalsneededTextControllerValidator =
        _professionalsneededTextControllerValidator;
  }

  @override
  void dispose() {
    sideNavBarforRecuriterModel.dispose();
    clinicNameFocusNode?.dispose();
    clinicNameTextController?.dispose();

    businessNumberFocusNode?.dispose();
    businessNumberTextController?.dispose();

    noOfLocationFocusNode?.dispose();
    noOfLocationTextController?.dispose();

    fNameFocusNode?.dispose();
    fNameTextController?.dispose();

    lNameFocusNode?.dispose();
    lNameTextController?.dispose();

    positionTitleFocusNode?.dispose();
    positionTitleTextController?.dispose();

    emailaddressFocusNode?.dispose();
    emailaddressTextController?.dispose();

    phonenumberFocusNode?.dispose();
    phonenumberTextController?.dispose();

    alternativecontactOptionalFocusNode?.dispose();
    alternativecontactOptionalTextController?.dispose();

    streetFocusNode?.dispose();
    streetTextController?.dispose();

    citynameFocusNode?.dispose();
    citynameTextController?.dispose();

    provinceFocusNode?.dispose();
    provinceTextController?.dispose();

    postalcodeFocusNode?.dispose();
    postalcodeTextController?.dispose();

    typicalshiftdurationFocusNode?.dispose();
    typicalshiftdurationTextController?.dispose();

    expectedfrequencyofuseFocusNode?.dispose();
    expectedfrequencyofuseTextController?.dispose();

    taxIDHSTnumberFocusNode?.dispose();
    taxIDHSTnumberTextController?.dispose();

    businessidentificationnumberFocusNode?.dispose();
    businessidentificationnumberTextController?.dispose();

    billingAdressFocusNode?.dispose();
    billingAdressTextController?.dispose();

    bankaccountnumberFocusNode?.dispose();
    bankaccountnumberTextController?.dispose();

    bankNameFocusNode?.dispose();
    bankNameTextController?.dispose();

    institutionnumberFocusNode?.dispose();
    institutionnumberTextController?.dispose();

    branchnumberFocusNode?.dispose();
    branchnumberTextController?.dispose();

    sINnumberFocusNode?.dispose();
    sINnumberTextController?.dispose();

    nameFocusNode?.dispose();
    nameTextController?.dispose();

    emailFocusNode?.dispose();
    emailTextController?.dispose();

    phoneNumberFocusNode?.dispose();
    phoneNumberTextController?.dispose();

    professionalsneededFocusNode?.dispose();
    professionalsneededTextController?.dispose();

    signature14Controller?.dispose();
  }
}
