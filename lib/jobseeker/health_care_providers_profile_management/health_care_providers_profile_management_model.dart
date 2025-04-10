import '/components/side_nav_bar_healthcare/side_nav_bar_healthcare_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import 'health_care_providers_profile_management_widget.dart'
    show HealthCareProvidersProfileManagementWidget;
import 'package:flutter/material.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';
import 'package:signature/signature.dart';

class HealthCareProvidersProfileManagementModel
    extends FlutterFlowModel<HealthCareProvidersProfileManagementWidget> {
  ///  State fields for stateful widgets in this page.

  // State field(s) for PageView widget.
  PageController? pageViewController1;

  int get pageViewCurrentIndex1 => pageViewController1 != null &&
          pageViewController1!.hasClients &&
          pageViewController1!.page != null
      ? pageViewController1!.page!.round()
      : 0;
  // State field(s) for HCPeditFirstName widget.
  FocusNode? hCPeditFirstNameFocusNode;
  TextEditingController? hCPeditFirstNameTextController;
  String? Function(BuildContext, String?)?
      hCPeditFirstNameTextControllerValidator;
  // State field(s) for HCPeditLastname widget.
  FocusNode? hCPeditLastnameFocusNode;
  TextEditingController? hCPeditLastnameTextController;
  String? Function(BuildContext, String?)?
      hCPeditLastnameTextControllerValidator;
  // State field(s) for HCPeditemailAddress widget.
  FocusNode? hCPeditemailAddressFocusNode;
  TextEditingController? hCPeditemailAddressTextController;
  String? Function(BuildContext, String?)?
      hCPeditemailAddressTextControllerValidator;
  // State field(s) for HCPeditPhoneNumber widget.
  FocusNode? hCPeditPhoneNumberFocusNode;
  TextEditingController? hCPeditPhoneNumberTextController;
  String? Function(BuildContext, String?)?
      hCPeditPhoneNumberTextControllerValidator;
  // State field(s) for HCPeditGender widget.
  String? hCPeditGenderValue;
  FormFieldController<String>? hCPeditGenderValueController;
  // State field(s) for HCPeditDOB widget.
  FocusNode? hCPeditDOBFocusNode;
  TextEditingController? hCPeditDOBTextController;
  final hCPeditDOBMask = MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)? hCPeditDOBTextControllerValidator;
  // State field(s) for HCPeditHomeaddress widget.
  FocusNode? hCPeditHomeaddressFocusNode;
  TextEditingController? hCPeditHomeaddressTextController;
  String? Function(BuildContext, String?)?
      hCPeditHomeaddressTextControllerValidator;
  // State field(s) for Checkbox widget.
  bool? checkboxValue1;
  // State field(s) for HCPeditProfession widget.
  String? hCPeditProfessionValue;
  FormFieldController<String>? hCPeditProfessionValueController;
  // State field(s) for HCPeditSpecialityArea widget.
  String? hCPeditSpecialityAreaValue;
  FormFieldController<String>? hCPeditSpecialityAreaValueController;
  // State field(s) for HCPeditYearsofexperience widget.
  int? hCPeditYearsofexperienceValue;
  // State field(s) for HCPeditLanguage widget.
  FocusNode? hCPeditLanguageFocusNode;
  TextEditingController? hCPeditLanguageTextController;
  String? Function(BuildContext, String?)?
      hCPeditLanguageTextControllerValidator;
  // State field(s) for HCPeditProfessionalsummary widget.
  FocusNode? hCPeditProfessionalsummaryFocusNode;
  TextEditingController? hCPeditProfessionalsummaryTextController;
  String? Function(BuildContext, String?)?
      hCPeditProfessionalsummaryTextControllerValidator;
  // State field(s) for HCPeditRadioButton widget.
  FormFieldController<String>? hCPeditRadioButtonValueController;
  // State field(s) for HCPeditProfessionalLicenseNumber widget.
  FocusNode? hCPeditProfessionalLicenseNumberFocusNode;
  TextEditingController? hCPeditProfessionalLicenseNumberTextController;
  String? Function(BuildContext, String?)?
      hCPeditProfessionalLicenseNumberTextControllerValidator;
  // State field(s) for HCPeditIssuingBody widget.
  FocusNode? hCPeditIssuingBodyFocusNode;
  TextEditingController? hCPeditIssuingBodyTextController;
  String? Function(BuildContext, String?)?
      hCPeditIssuingBodyTextControllerValidator;
  // State field(s) for HCPeditLicenseExpirydate widget.
  FocusNode? hCPeditLicenseExpirydateFocusNode;
  TextEditingController? hCPeditLicenseExpirydateTextController;
  final hCPeditLicenseExpirydateMask =
      MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)?
      hCPeditLicenseExpirydateTextControllerValidator;
  // State field(s) for HCPeditOtherCertification widget.
  FocusNode? hCPeditOtherCertificationFocusNode;
  TextEditingController? hCPeditOtherCertificationTextController;
  String? Function(BuildContext, String?)?
      hCPeditOtherCertificationTextControllerValidator;
  // State field(s) for HCPeditHighestDegree widget.
  String? hCPeditHighestDegreeValue;
  FormFieldController<String>? hCPeditHighestDegreeValueController;
  // State field(s) for HCPeditInstitutuionName widget.
  FocusNode? hCPeditInstitutuionNameFocusNode;
  TextEditingController? hCPeditInstitutuionNameTextController;
  String? Function(BuildContext, String?)?
      hCPeditInstitutuionNameTextControllerValidator;
  // State field(s) for HCPeditYearGraduated widget.
  FocusNode? hCPeditYearGraduatedFocusNode;
  TextEditingController? hCPeditYearGraduatedTextController;
  String? Function(BuildContext, String?)?
      hCPeditYearGraduatedTextControllerValidator;
  // State field(s) for HCPeditAdditionalTraining widget.
  FocusNode? hCPeditAdditionalTrainingFocusNode;
  TextEditingController? hCPeditAdditionalTrainingTextController;
  String? Function(BuildContext, String?)?
      hCPeditAdditionalTrainingTextControllerValidator;
  // State field(s) for HCPeditEmployerName widget.
  FocusNode? hCPeditEmployerNameFocusNode;
  TextEditingController? hCPeditEmployerNameTextController;
  String? Function(BuildContext, String?)?
      hCPeditEmployerNameTextControllerValidator;
  // State field(s) for HCPeditPosition widget.
  FocusNode? hCPeditPositionFocusNode;
  TextEditingController? hCPeditPositionTextController;
  String? Function(BuildContext, String?)?
      hCPeditPositionTextControllerValidator;
  // State field(s) for HCPeditStartDate widget.
  FocusNode? hCPeditStartDateFocusNode;
  TextEditingController? hCPeditStartDateTextController;
  final hCPeditStartDateMask = MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)?
      hCPeditStartDateTextControllerValidator;
  // State field(s) for HCPeditEnddate widget.
  FocusNode? hCPeditEnddateFocusNode;
  TextEditingController? hCPeditEnddateTextController;
  final hCPeditEnddateMask = MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)?
      hCPeditEnddateTextControllerValidator;
  // State field(s) for HCPeditResponsibilities widget.
  FocusNode? hCPeditResponsibilitiesFocusNode;
  TextEditingController? hCPeditResponsibilitiesTextController;
  String? Function(BuildContext, String?)?
      hCPeditResponsibilitiesTextControllerValidator;
  bool isDataUploading1 = false;
  FFUploadedFile uploadedLocalFile1 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl1 = '';

  // State field(s) for HCPeditLiabilyInsurance widget.
  FormFieldController<String>? hCPeditLiabilyInsuranceValueController;
  // State field(s) for HCPeditInsuranceExpitydate widget.
  FocusNode? hCPeditInsuranceExpitydateFocusNode;
  TextEditingController? hCPeditInsuranceExpitydateTextController;
  final hCPeditInsuranceExpitydateMask =
      MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)?
      hCPeditInsuranceExpitydateTextControllerValidator;
  DateTime? datePicked;
  bool isDataUploading2 = false;
  FFUploadedFile uploadedLocalFile2 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl2 = '';

  bool isDataUploading3 = false;
  FFUploadedFile uploadedLocalFile3 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl3 = '';

  // State field(s) for HCPeditLegalStatus widget.
  String? hCPeditLegalStatusValue;
  FormFieldController<String>? hCPeditLegalStatusValueController;
  // State field(s) for HCPeditSin widget.
  FocusNode? hCPeditSinFocusNode;
  TextEditingController? hCPeditSinTextController;
  String? Function(BuildContext, String?)? hCPeditSinTextControllerValidator;
  // State field(s) for HCPeditHourlyRate widget.
  FocusNode? hCPeditHourlyRateFocusNode;
  TextEditingController? hCPeditHourlyRateTextController;
  String? Function(BuildContext, String?)?
      hCPeditHourlyRateTextControllerValidator;
  // State field(s) for HCPeditLanguahe widget.
  FocusNode? hCPeditLanguaheFocusNode;
  TextEditingController? hCPeditLanguaheTextController;
  String? Function(BuildContext, String?)?
      hCPeditLanguaheTextControllerValidator;
  // State field(s) for HCPeditWillingnesstotravel widget.
  FocusNode? hCPeditWillingnesstotravelFocusNode;
  TextEditingController? hCPeditWillingnesstotravelTextController;
  String? Function(BuildContext, String?)?
      hCPeditWillingnesstotravelTextControllerValidator;
  // State field(s) for EditMobileSignature widget.
  SignatureController? editMobileSignatureController;
  String uploadedSignatureUrl = '';
  // State field(s) for HCPeditBankName widget.
  FocusNode? hCPeditBankNameFocusNode;
  TextEditingController? hCPeditBankNameTextController;
  String? Function(BuildContext, String?)?
      hCPeditBankNameTextControllerValidator;
  // State field(s) for HCPeditBankAccountNumber widget.
  FocusNode? hCPeditBankAccountNumberFocusNode;
  TextEditingController? hCPeditBankAccountNumberTextController;
  String? Function(BuildContext, String?)?
      hCPeditBankAccountNumberTextControllerValidator;
  // State field(s) for HCPeditInstituionName widget.
  FocusNode? hCPeditInstituionNameFocusNode;
  TextEditingController? hCPeditInstituionNameTextController;
  String? Function(BuildContext, String?)?
      hCPeditInstituionNameTextControllerValidator;
  // State field(s) for HCPeditBranchNumber widget.
  FocusNode? hCPeditBranchNumberFocusNode;
  TextEditingController? hCPeditBranchNumberTextController;
  String? Function(BuildContext, String?)?
      hCPeditBranchNumberTextControllerValidator;
  // State field(s) for HCPeditSinNumber widget.
  FocusNode? hCPeditSinNumberFocusNode;
  TextEditingController? hCPeditSinNumberTextController;
  String? Function(BuildContext, String?)?
      hCPeditSinNumberTextControllerValidator;
  // Model for SideNavBarHealthcare component.
  late SideNavBarHealthcareModel sideNavBarHealthcareModel;
  // State field(s) for RadioButton widget.
  FormFieldController<String>? radioButtonValueController1;
  // State field(s) for PageView widget.
  PageController? pageViewController2;

  int get pageViewCurrentIndex2 => pageViewController2 != null &&
          pageViewController2!.hasClients &&
          pageViewController2!.page != null
      ? pageViewController2!.page!.round()
      : 0;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode1;
  TextEditingController? emailAddressTextController1;
  String? Function(BuildContext, String?)? emailAddressTextController1Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode2;
  TextEditingController? emailAddressTextController2;
  String? Function(BuildContext, String?)? emailAddressTextController2Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode3;
  TextEditingController? emailAddressTextController3;
  String? Function(BuildContext, String?)? emailAddressTextController3Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode4;
  TextEditingController? emailAddressTextController4;
  String? Function(BuildContext, String?)? emailAddressTextController4Validator;
  // State field(s) for password widget.
  String? passwordValue1;
  FormFieldController<String>? passwordValueController1;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode5;
  TextEditingController? emailAddressTextController5;
  final emailAddressMask5 = MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)? emailAddressTextController5Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode6;
  TextEditingController? emailAddressTextController6;
  String? Function(BuildContext, String?)? emailAddressTextController6Validator;
  // State field(s) for Checkbox widget.
  bool? checkboxValue2;
  // State field(s) for password widget.
  String? passwordValue2;
  FormFieldController<String>? passwordValueController2;
  // State field(s) for CountController widget.
  int? countControllerValue;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode7;
  TextEditingController? emailAddressTextController7;
  String? Function(BuildContext, String?)? emailAddressTextController7Validator;
  // State field(s) for RadioButton widget.
  FormFieldController<String>? radioButtonValueController2;
  // State field(s) for password widget.
  String? passwordValue3;
  FormFieldController<String>? passwordValueController3;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode8;
  TextEditingController? emailAddressTextController8;
  String? Function(BuildContext, String?)? emailAddressTextController8Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode9;
  TextEditingController? emailAddressTextController9;
  String? Function(BuildContext, String?)? emailAddressTextController9Validator;
  // State field(s) for RadioButton widget.
  FormFieldController<String>? radioButtonValueController3;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode10;
  TextEditingController? emailAddressTextController10;
  String? Function(BuildContext, String?)?
      emailAddressTextController10Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode11;
  TextEditingController? emailAddressTextController11;
  String? Function(BuildContext, String?)?
      emailAddressTextController11Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode12;
  TextEditingController? emailAddressTextController12;
  final emailAddressMask12 = MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)?
      emailAddressTextController12Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode13;
  TextEditingController? emailAddressTextController13;
  String? Function(BuildContext, String?)?
      emailAddressTextController13Validator;
  // State field(s) for password widget.
  String? passwordValue4;
  FormFieldController<String>? passwordValueController4;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode14;
  TextEditingController? emailAddressTextController14;
  String? Function(BuildContext, String?)?
      emailAddressTextController14Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode15;
  TextEditingController? emailAddressTextController15;
  String? Function(BuildContext, String?)?
      emailAddressTextController15Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode16;
  TextEditingController? emailAddressTextController16;
  String? Function(BuildContext, String?)?
      emailAddressTextController16Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode17;
  TextEditingController? emailAddressTextController17;
  String? Function(BuildContext, String?)?
      emailAddressTextController17Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode18;
  TextEditingController? emailAddressTextController18;
  String? Function(BuildContext, String?)?
      emailAddressTextController18Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode19;
  TextEditingController? emailAddressTextController19;
  final emailAddressMask19 = MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)?
      emailAddressTextController19Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode20;
  TextEditingController? emailAddressTextController20;
  final emailAddressMask20 = MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)?
      emailAddressTextController20Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode21;
  TextEditingController? emailAddressTextController21;
  String? Function(BuildContext, String?)?
      emailAddressTextController21Validator;
  // State field(s) for RadioButton widget.
  FormFieldController<String>? radioButtonValueController4;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode22;
  TextEditingController? emailAddressTextController22;
  final emailAddressMask22 = MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)?
      emailAddressTextController22Validator;
  // State field(s) for password widget.
  String? passwordValue5;
  FormFieldController<String>? passwordValueController5;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode23;
  TextEditingController? emailAddressTextController23;
  String? Function(BuildContext, String?)?
      emailAddressTextController23Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode24;
  TextEditingController? emailAddressTextController24;
  String? Function(BuildContext, String?)?
      emailAddressTextController24Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode25;
  TextEditingController? emailAddressTextController25;
  String? Function(BuildContext, String?)?
      emailAddressTextController25Validator;
  // State field(s) for emailAddress widget.
  FocusNode? emailAddressFocusNode26;
  TextEditingController? emailAddressTextController26;
  String? Function(BuildContext, String?)?
      emailAddressTextController26Validator;
  // State field(s) for Signature widget.
  SignatureController? signatureController;
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
    hCPeditFirstNameFocusNode?.dispose();
    hCPeditFirstNameTextController?.dispose();

    hCPeditLastnameFocusNode?.dispose();
    hCPeditLastnameTextController?.dispose();

    hCPeditemailAddressFocusNode?.dispose();
    hCPeditemailAddressTextController?.dispose();

    hCPeditPhoneNumberFocusNode?.dispose();
    hCPeditPhoneNumberTextController?.dispose();

    hCPeditDOBFocusNode?.dispose();
    hCPeditDOBTextController?.dispose();

    hCPeditHomeaddressFocusNode?.dispose();
    hCPeditHomeaddressTextController?.dispose();

    hCPeditLanguageFocusNode?.dispose();
    hCPeditLanguageTextController?.dispose();

    hCPeditProfessionalsummaryFocusNode?.dispose();
    hCPeditProfessionalsummaryTextController?.dispose();

    hCPeditProfessionalLicenseNumberFocusNode?.dispose();
    hCPeditProfessionalLicenseNumberTextController?.dispose();

    hCPeditIssuingBodyFocusNode?.dispose();
    hCPeditIssuingBodyTextController?.dispose();

    hCPeditLicenseExpirydateFocusNode?.dispose();
    hCPeditLicenseExpirydateTextController?.dispose();

    hCPeditOtherCertificationFocusNode?.dispose();
    hCPeditOtherCertificationTextController?.dispose();

    hCPeditInstitutuionNameFocusNode?.dispose();
    hCPeditInstitutuionNameTextController?.dispose();

    hCPeditYearGraduatedFocusNode?.dispose();
    hCPeditYearGraduatedTextController?.dispose();

    hCPeditAdditionalTrainingFocusNode?.dispose();
    hCPeditAdditionalTrainingTextController?.dispose();

    hCPeditEmployerNameFocusNode?.dispose();
    hCPeditEmployerNameTextController?.dispose();

    hCPeditPositionFocusNode?.dispose();
    hCPeditPositionTextController?.dispose();

    hCPeditStartDateFocusNode?.dispose();
    hCPeditStartDateTextController?.dispose();

    hCPeditEnddateFocusNode?.dispose();
    hCPeditEnddateTextController?.dispose();

    hCPeditResponsibilitiesFocusNode?.dispose();
    hCPeditResponsibilitiesTextController?.dispose();

    hCPeditInsuranceExpitydateFocusNode?.dispose();
    hCPeditInsuranceExpitydateTextController?.dispose();

    hCPeditSinFocusNode?.dispose();
    hCPeditSinTextController?.dispose();

    hCPeditHourlyRateFocusNode?.dispose();
    hCPeditHourlyRateTextController?.dispose();

    hCPeditLanguaheFocusNode?.dispose();
    hCPeditLanguaheTextController?.dispose();

    hCPeditWillingnesstotravelFocusNode?.dispose();
    hCPeditWillingnesstotravelTextController?.dispose();

    editMobileSignatureController?.dispose();
    hCPeditBankNameFocusNode?.dispose();
    hCPeditBankNameTextController?.dispose();

    hCPeditBankAccountNumberFocusNode?.dispose();
    hCPeditBankAccountNumberTextController?.dispose();

    hCPeditInstituionNameFocusNode?.dispose();
    hCPeditInstituionNameTextController?.dispose();

    hCPeditBranchNumberFocusNode?.dispose();
    hCPeditBranchNumberTextController?.dispose();

    hCPeditSinNumberFocusNode?.dispose();
    hCPeditSinNumberTextController?.dispose();

    sideNavBarHealthcareModel.dispose();
    emailAddressFocusNode1?.dispose();
    emailAddressTextController1?.dispose();

    emailAddressFocusNode2?.dispose();
    emailAddressTextController2?.dispose();

    emailAddressFocusNode3?.dispose();
    emailAddressTextController3?.dispose();

    emailAddressFocusNode4?.dispose();
    emailAddressTextController4?.dispose();

    emailAddressFocusNode5?.dispose();
    emailAddressTextController5?.dispose();

    emailAddressFocusNode6?.dispose();
    emailAddressTextController6?.dispose();

    emailAddressFocusNode7?.dispose();
    emailAddressTextController7?.dispose();

    emailAddressFocusNode8?.dispose();
    emailAddressTextController8?.dispose();

    emailAddressFocusNode9?.dispose();
    emailAddressTextController9?.dispose();

    emailAddressFocusNode10?.dispose();
    emailAddressTextController10?.dispose();

    emailAddressFocusNode11?.dispose();
    emailAddressTextController11?.dispose();

    emailAddressFocusNode12?.dispose();
    emailAddressTextController12?.dispose();

    emailAddressFocusNode13?.dispose();
    emailAddressTextController13?.dispose();

    emailAddressFocusNode14?.dispose();
    emailAddressTextController14?.dispose();

    emailAddressFocusNode15?.dispose();
    emailAddressTextController15?.dispose();

    emailAddressFocusNode16?.dispose();
    emailAddressTextController16?.dispose();

    emailAddressFocusNode17?.dispose();
    emailAddressTextController17?.dispose();

    emailAddressFocusNode18?.dispose();
    emailAddressTextController18?.dispose();

    emailAddressFocusNode19?.dispose();
    emailAddressTextController19?.dispose();

    emailAddressFocusNode20?.dispose();
    emailAddressTextController20?.dispose();

    emailAddressFocusNode21?.dispose();
    emailAddressTextController21?.dispose();

    emailAddressFocusNode22?.dispose();
    emailAddressTextController22?.dispose();

    emailAddressFocusNode23?.dispose();
    emailAddressTextController23?.dispose();

    emailAddressFocusNode24?.dispose();
    emailAddressTextController24?.dispose();

    emailAddressFocusNode25?.dispose();
    emailAddressTextController25?.dispose();

    emailAddressFocusNode26?.dispose();
    emailAddressTextController26?.dispose();

    signatureController?.dispose();
  }

  /// Additional helper methods.
  String? get hCPeditRadioButtonValue =>
      hCPeditRadioButtonValueController?.value;
  String? get hCPeditLiabilyInsuranceValue =>
      hCPeditLiabilyInsuranceValueController?.value;
  String? get radioButtonValue1 => radioButtonValueController1?.value;
  String? get radioButtonValue2 => radioButtonValueController2?.value;
  String? get radioButtonValue3 => radioButtonValueController3?.value;
  String? get radioButtonValue4 => radioButtonValueController4?.value;
}
