import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import '/index.dart';
import 'health_care_provider_registration_widget.dart'
    show HealthCareProviderRegistrationWidget;
import 'package:flutter/material.dart';
import 'package:signature/signature.dart';

class HealthCareProviderRegistrationModel
    extends FlutterFlowModel<HealthCareProviderRegistrationWidget> {
  ///  Local state fields for this page.

  int? demo = 0;

  ///  State fields for stateful widgets in this page.

  final formKey3 = GlobalKey<FormState>();
  final formKey2 = GlobalKey<FormState>();
  final formKey1 = GlobalKey<FormState>();
  // State field(s) for PageView widget.
  PageController? pageViewController;

  int get pageViewCurrentIndex => pageViewController != null &&
          pageViewController!.hasClients &&
          pageViewController!.page != null
      ? pageViewController!.page!.round()
      : 0;
  // State field(s) for HealthCareProviderFirstname14 widget.
  FocusNode? healthCareProviderFirstname14FocusNode;
  TextEditingController? healthCareProviderFirstname14TextController;
  String? Function(BuildContext, String?)?
      healthCareProviderFirstname14TextControllerValidator;
  String? _healthCareProviderFirstname14TextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Enter first name is required';
    }

    return null;
  }

  // State field(s) for HealthCareProviderLastname14 widget.
  FocusNode? healthCareProviderLastname14FocusNode;
  TextEditingController? healthCareProviderLastname14TextController;
  String? Function(BuildContext, String?)?
      healthCareProviderLastname14TextControllerValidator;
  String? _healthCareProviderLastname14TextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Enter last name is required';
    }

    return null;
  }

  // State field(s) for HealthCareProvideremailAddress14 widget.
  FocusNode? healthCareProvideremailAddress14FocusNode;
  TextEditingController? healthCareProvideremailAddress14TextController;
  String? Function(BuildContext, String?)?
      healthCareProvideremailAddress14TextControllerValidator;
  String? _healthCareProvideremailAddress14TextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Enter email is required';
    }

    return null;
  }

  // State field(s) for HealthCareProviderPhonenumber14 widget.
  FocusNode? healthCareProviderPhonenumber14FocusNode;
  TextEditingController? healthCareProviderPhonenumber14TextController;
  String? Function(BuildContext, String?)?
      healthCareProviderPhonenumber14TextControllerValidator;
  String? _healthCareProviderPhonenumber14TextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Enter phone number is required';
    }

    return null;
  }

  // State field(s) for HealthCareProviderGender14 widget.
  String? healthCareProviderGender14Value;
  FormFieldController<String>? healthCareProviderGender14ValueController;
  DateTime? datePicked1;
  // State field(s) for HealthCareProviderHomeaddress14 widget.
  FocusNode? healthCareProviderHomeaddress14FocusNode;
  TextEditingController? healthCareProviderHomeaddress14TextController;
  String? Function(BuildContext, String?)?
      healthCareProviderHomeaddress14TextControllerValidator;
  // State field(s) for workAuthorization widget.
  bool? workAuthorizationValue;
  // Stores action output result for [Custom Action - convertAddressTOLatLng] action in Button widget.
  LatLng? latlng;
  // State field(s) for HealthCareProviderProfession14 widget.
  String? healthCareProviderProfession14Value;
  FormFieldController<String>? healthCareProviderProfession14ValueController;
  // State field(s) for HealthCareProviderSpecialityarea14 widget.
  String? healthCareProviderSpecialityarea14Value;
  FormFieldController<String>?
      healthCareProviderSpecialityarea14ValueController;
  // State field(s) for HealthCareProviderYearOfExperience14 widget.
  int? healthCareProviderYearOfExperience14Value;
  // State field(s) for HealthCareProviderLanguage widget.
  List<String>? healthCareProviderLanguageValue;
  FormFieldController<List<String>>? healthCareProviderLanguageValueController;
  // State field(s) for HealthCareProviderProfessionalsummary14 widget.
  FocusNode? healthCareProviderProfessionalsummary14FocusNode;
  TextEditingController? healthCareProviderProfessionalsummary14TextController;
  String? Function(BuildContext, String?)?
      healthCareProviderProfessionalsummary14TextControllerValidator;
  // State field(s) for HealthCareProviderProfessionallicensenumber14 widget.
  FocusNode? healthCareProviderProfessionallicensenumber14FocusNode;
  TextEditingController?
      healthCareProviderProfessionallicensenumber14TextController;
  String? Function(BuildContext, String?)?
      healthCareProviderProfessionallicensenumber14TextControllerValidator;
  // State field(s) for HealthCareProviderIssuingbody14 widget.
  FocusNode? healthCareProviderIssuingbody14FocusNode;
  TextEditingController? healthCareProviderIssuingbody14TextController;
  String? Function(BuildContext, String?)?
      healthCareProviderIssuingbody14TextControllerValidator;
  DateTime? datePicked2;
  // State field(s) for otherCertificate widget.
  FocusNode? otherCertificateFocusNode;
  TextEditingController? otherCertificateTextController;
  String? Function(BuildContext, String?)?
      otherCertificateTextControllerValidator;
  bool isDataUploading1 = false;
  FFUploadedFile uploadedLocalFile1 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl1 = '';

  // State field(s) for HealthCareProviderHighestdegreeobtained14 widget.
  String? healthCareProviderHighestdegreeobtained14Value;
  FormFieldController<String>?
      healthCareProviderHighestdegreeobtained14ValueController;
  // State field(s) for HealthCareProviderInstitutionname14 widget.
  FocusNode? healthCareProviderInstitutionname14FocusNode;
  TextEditingController? healthCareProviderInstitutionname14TextController;
  String? Function(BuildContext, String?)?
      healthCareProviderInstitutionname14TextControllerValidator;
  // State field(s) for HealthCareProviderYeargraduated14 widget.
  FocusNode? healthCareProviderYeargraduated14FocusNode;
  TextEditingController? healthCareProviderYeargraduated14TextController;
  String? Function(BuildContext, String?)?
      healthCareProviderYeargraduated14TextControllerValidator;
  // State field(s) for HealthCareProviderAdditionaltrainingorcourses14 widget.
  FocusNode? healthCareProviderAdditionaltrainingorcourses14FocusNode;
  TextEditingController?
      healthCareProviderAdditionaltrainingorcourses14TextController;
  String? Function(BuildContext, String?)?
      healthCareProviderAdditionaltrainingorcourses14TextControllerValidator;
  // State field(s) for HealthCareProviderEmployername14 widget.
  FocusNode? healthCareProviderEmployername14FocusNode;
  TextEditingController? healthCareProviderEmployername14TextController;
  String? Function(BuildContext, String?)?
      healthCareProviderEmployername14TextControllerValidator;
  // State field(s) for HealthCareProviderPosition14 widget.
  FocusNode? healthCareProviderPosition14FocusNode;
  TextEditingController? healthCareProviderPosition14TextController;
  String? Function(BuildContext, String?)?
      healthCareProviderPosition14TextControllerValidator;
  DateTime? datePicked3;
  DateTime? datePicked4;
  // State field(s) for HealthCareProviderResponsibilities14 widget.
  FocusNode? healthCareProviderResponsibilities14FocusNode;
  TextEditingController? healthCareProviderResponsibilities14TextController;
  String? Function(BuildContext, String?)?
      healthCareProviderResponsibilities14TextControllerValidator;
  bool isDataUploading2 = false;
  FFUploadedFile uploadedLocalFile2 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl2 = '';

  // State field(s) for MobileIBCinsurance14 widget.
  FormFieldController<String>? mobileIBCinsurance14ValueController;
  DateTime? datePicked5;
  bool isDataUploading3 = false;
  FFUploadedFile uploadedLocalFile3 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl3 = '';

  bool isDataUploading4 = false;
  FFUploadedFile uploadedLocalFile4 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl4 = '';

  // State field(s) for HealthCareProviderLegalStatus14 widget.
  String? healthCareProviderLegalStatus14Value;
  FormFieldController<String>? healthCareProviderLegalStatus14ValueController;
  // State field(s) for HealthCareProvidersin14 widget.
  FocusNode? healthCareProvidersin14FocusNode;
  TextEditingController? healthCareProvidersin14TextController;
  String? Function(BuildContext, String?)?
      healthCareProvidersin14TextControllerValidator;
  bool isDataUploading5 = false;
  FFUploadedFile uploadedLocalFile5 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl5 = '';

  // State field(s) for HealthCareProviderHoulyrate14 widget.
  FocusNode? healthCareProviderHoulyrate14FocusNode;
  TextEditingController? healthCareProviderHoulyrate14TextController;
  String? Function(BuildContext, String?)?
      healthCareProviderHoulyrate14TextControllerValidator;
  // State field(s) for Willing widget.
  FormFieldController<String>? willingValueController;
  // State field(s) for Terms widget.
  bool? termsValue;
  // State field(s) for Consent widget.
  bool? consentValue;
  // State field(s) for Signature14 widget.
  SignatureController? signature14Controller;
  String uploadedSignatureUrl = '';

  @override
  void initState(BuildContext context) {
    healthCareProviderFirstname14TextControllerValidator =
        _healthCareProviderFirstname14TextControllerValidator;
    healthCareProviderLastname14TextControllerValidator =
        _healthCareProviderLastname14TextControllerValidator;
    healthCareProvideremailAddress14TextControllerValidator =
        _healthCareProvideremailAddress14TextControllerValidator;
    healthCareProviderPhonenumber14TextControllerValidator =
        _healthCareProviderPhonenumber14TextControllerValidator;
  }

  @override
  void dispose() {
    healthCareProviderFirstname14FocusNode?.dispose();
    healthCareProviderFirstname14TextController?.dispose();

    healthCareProviderLastname14FocusNode?.dispose();
    healthCareProviderLastname14TextController?.dispose();

    healthCareProvideremailAddress14FocusNode?.dispose();
    healthCareProvideremailAddress14TextController?.dispose();

    healthCareProviderPhonenumber14FocusNode?.dispose();
    healthCareProviderPhonenumber14TextController?.dispose();

    healthCareProviderHomeaddress14FocusNode?.dispose();
    healthCareProviderHomeaddress14TextController?.dispose();

    healthCareProviderProfessionalsummary14FocusNode?.dispose();
    healthCareProviderProfessionalsummary14TextController?.dispose();

    healthCareProviderProfessionallicensenumber14FocusNode?.dispose();
    healthCareProviderProfessionallicensenumber14TextController?.dispose();

    healthCareProviderIssuingbody14FocusNode?.dispose();
    healthCareProviderIssuingbody14TextController?.dispose();

    otherCertificateFocusNode?.dispose();
    otherCertificateTextController?.dispose();

    healthCareProviderInstitutionname14FocusNode?.dispose();
    healthCareProviderInstitutionname14TextController?.dispose();

    healthCareProviderYeargraduated14FocusNode?.dispose();
    healthCareProviderYeargraduated14TextController?.dispose();

    healthCareProviderAdditionaltrainingorcourses14FocusNode?.dispose();
    healthCareProviderAdditionaltrainingorcourses14TextController?.dispose();

    healthCareProviderEmployername14FocusNode?.dispose();
    healthCareProviderEmployername14TextController?.dispose();

    healthCareProviderPosition14FocusNode?.dispose();
    healthCareProviderPosition14TextController?.dispose();

    healthCareProviderResponsibilities14FocusNode?.dispose();
    healthCareProviderResponsibilities14TextController?.dispose();

    healthCareProvidersin14FocusNode?.dispose();
    healthCareProvidersin14TextController?.dispose();

    healthCareProviderHoulyrate14FocusNode?.dispose();
    healthCareProviderHoulyrate14TextController?.dispose();

    signature14Controller?.dispose();
  }

  /// Additional helper methods.
  String? get mobileIBCinsurance14Value =>
      mobileIBCinsurance14ValueController?.value;
  String? get willingValue => willingValueController?.value;
}
