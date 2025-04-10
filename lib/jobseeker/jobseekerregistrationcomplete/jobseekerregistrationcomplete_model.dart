import '/components/side_nav_bar_healthcare/side_nav_bar_healthcare_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import 'jobseekerregistrationcomplete_widget.dart'
    show JobseekerregistrationcompleteWidget;
import 'package:flutter/material.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';

class JobseekerregistrationcompleteModel
    extends FlutterFlowModel<JobseekerregistrationcompleteWidget> {
  ///  State fields for stateful widgets in this page.

  // Model for SideNavBarHealthcare component.
  late SideNavBarHealthcareModel sideNavBarHealthcareModel;
  // State field(s) for Switch widget.
  bool? switchValue;
  // State field(s) for DropDown widget.
  String? dropDownValue;
  FormFieldController<String>? dropDownValueController;
  DateTime? datePicked1;
  // State field(s) for FirstName16 widget.
  FocusNode? firstName16FocusNode;
  TextEditingController? firstName16TextController;
  String? Function(BuildContext, String?)? firstName16TextControllerValidator;
  // State field(s) for LastName16 widget.
  FocusNode? lastName16FocusNode;
  TextEditingController? lastName16TextController;
  String? Function(BuildContext, String?)? lastName16TextControllerValidator;
  // State field(s) for Contactemai16 widget.
  FocusNode? contactemai16FocusNode;
  TextEditingController? contactemai16TextController;
  String? Function(BuildContext, String?)? contactemai16TextControllerValidator;
  // State field(s) for Phonenumber16 widget.
  FocusNode? phonenumber16FocusNode;
  TextEditingController? phonenumber16TextController;
  String? Function(BuildContext, String?)? phonenumber16TextControllerValidator;
  // State field(s) for Gender16 widget.
  String? gender16Value;
  FormFieldController<String>? gender16ValueController;
  // State field(s) for Dateofbirth16 widget.
  FocusNode? dateofbirth16FocusNode;
  TextEditingController? dateofbirth16TextController;
  final dateofbirth16Mask = MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)? dateofbirth16TextControllerValidator;
  DateTime? datePicked2;
  // State field(s) for Homeaddress16 widget.
  FocusNode? homeaddress16FocusNode;
  TextEditingController? homeaddress16TextController;
  String? Function(BuildContext, String?)? homeaddress16TextControllerValidator;
  // State field(s) for Profession16 widget.
  String? profession16Value;
  FormFieldController<String>? profession16ValueController;
  // State field(s) for YearsOfExperienceCounter16 widget.
  int? yearsOfExperienceCounter16Value;
  // State field(s) for Professionalsummary16 widget.
  FocusNode? professionalsummary16FocusNode;
  TextEditingController? professionalsummary16TextController;
  String? Function(BuildContext, String?)?
      professionalsummary16TextControllerValidator;
  // State field(s) for AvailableForButton16 widget.
  FormFieldController<String>? availableForButton16ValueController;
  // State field(s) for Specialityarea16 widget.
  String? specialityarea16Value;
  FormFieldController<String>? specialityarea16ValueController;
  // State field(s) for Language16 widget.
  FocusNode? language16FocusNode;
  TextEditingController? language16TextController;
  String? Function(BuildContext, String?)? language16TextControllerValidator;
  // State field(s) for Professionallicensenumber16 widget.
  FocusNode? professionallicensenumber16FocusNode;
  TextEditingController? professionallicensenumber16TextController;
  String? Function(BuildContext, String?)?
      professionallicensenumber16TextControllerValidator;
  // State field(s) for Issuingbody16 widget.
  FocusNode? issuingbody16FocusNode;
  TextEditingController? issuingbody16TextController;
  String? Function(BuildContext, String?)? issuingbody16TextControllerValidator;
  // State field(s) for Licenseexpirydate16 widget.
  FocusNode? licenseexpirydate16FocusNode;
  TextEditingController? licenseexpirydate16TextController;
  final licenseexpirydate16Mask = MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)?
      licenseexpirydate16TextControllerValidator;
  DateTime? datePicked3;
  // State field(s) for Othercertifications16 widget.
  FocusNode? othercertifications16FocusNode;
  TextEditingController? othercertifications16TextController;
  String? Function(BuildContext, String?)?
      othercertifications16TextControllerValidator;
  bool isDataUploading1 = false;
  FFUploadedFile uploadedLocalFile1 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl1 = '';

  // State field(s) for Highestdegreeobtained16 widget.
  String? highestdegreeobtained16Value;
  FormFieldController<String>? highestdegreeobtained16ValueController;
  // State field(s) for Institutionname16 widget.
  FocusNode? institutionname16FocusNode;
  TextEditingController? institutionname16TextController;
  String? Function(BuildContext, String?)?
      institutionname16TextControllerValidator;
  // State field(s) for Yeargraduated16 widget.
  FocusNode? yeargraduated16FocusNode;
  TextEditingController? yeargraduated16TextController;
  String? Function(BuildContext, String?)?
      yeargraduated16TextControllerValidator;
  // State field(s) for Additionaltrainingorcourses16 widget.
  FocusNode? additionaltrainingorcourses16FocusNode;
  TextEditingController? additionaltrainingorcourses16TextController;
  String? Function(BuildContext, String?)?
      additionaltrainingorcourses16TextControllerValidator;
  // State field(s) for Employername16 widget.
  FocusNode? employername16FocusNode;
  TextEditingController? employername16TextController;
  String? Function(BuildContext, String?)?
      employername16TextControllerValidator;
  // State field(s) for jobexpPosition16 widget.
  FocusNode? jobexpPosition16FocusNode;
  TextEditingController? jobexpPosition16TextController;
  String? Function(BuildContext, String?)?
      jobexpPosition16TextControllerValidator;
  // State field(s) for Jobexpstartdate widget.
  FocusNode? jobexpstartdateFocusNode;
  TextEditingController? jobexpstartdateTextController;
  final jobexpstartdateMask = MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)?
      jobexpstartdateTextControllerValidator;
  DateTime? datePicked4;
  // State field(s) for Jobexpenddate widget.
  FocusNode? jobexpenddateFocusNode;
  TextEditingController? jobexpenddateTextController;
  final jobexpenddateMask = MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)? jobexpenddateTextControllerValidator;
  DateTime? datePicked5;
  // State field(s) for jobexpResponsibilities widget.
  FocusNode? jobexpResponsibilitiesFocusNode;
  TextEditingController? jobexpResponsibilitiesTextController;
  String? Function(BuildContext, String?)?
      jobexpResponsibilitiesTextControllerValidator;
  bool isDataUploading2 = false;
  FFUploadedFile uploadedLocalFile2 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl2 = '';

  // State field(s) for profflibinsurance16 widget.
  FormFieldController<String>? profflibinsurance16ValueController;
  // State field(s) for Insuranceexpirydate16 widget.
  FocusNode? insuranceexpirydate16FocusNode;
  TextEditingController? insuranceexpirydate16TextController;
  final insuranceexpirydate16Mask = MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)?
      insuranceexpirydate16TextControllerValidator;
  bool isDataUploading3 = false;
  FFUploadedFile uploadedLocalFile3 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl3 = '';

  bool isDataUploading4 = false;
  FFUploadedFile uploadedLocalFile4 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl4 = '';

  // State field(s) for LegalStatus16 widget.
  String? legalStatus16Value;
  FormFieldController<String>? legalStatus16ValueController;
  // State field(s) for Sin16 widget.
  FocusNode? sin16FocusNode;
  TextEditingController? sin16TextController;
  String? Function(BuildContext, String?)? sin16TextControllerValidator;

  @override
  void initState(BuildContext context) {
    sideNavBarHealthcareModel =
        createModel(context, () => SideNavBarHealthcareModel());
  }

  @override
  void dispose() {
    sideNavBarHealthcareModel.dispose();
    firstName16FocusNode?.dispose();
    firstName16TextController?.dispose();

    lastName16FocusNode?.dispose();
    lastName16TextController?.dispose();

    contactemai16FocusNode?.dispose();
    contactemai16TextController?.dispose();

    phonenumber16FocusNode?.dispose();
    phonenumber16TextController?.dispose();

    dateofbirth16FocusNode?.dispose();
    dateofbirth16TextController?.dispose();

    homeaddress16FocusNode?.dispose();
    homeaddress16TextController?.dispose();

    professionalsummary16FocusNode?.dispose();
    professionalsummary16TextController?.dispose();

    language16FocusNode?.dispose();
    language16TextController?.dispose();

    professionallicensenumber16FocusNode?.dispose();
    professionallicensenumber16TextController?.dispose();

    issuingbody16FocusNode?.dispose();
    issuingbody16TextController?.dispose();

    licenseexpirydate16FocusNode?.dispose();
    licenseexpirydate16TextController?.dispose();

    othercertifications16FocusNode?.dispose();
    othercertifications16TextController?.dispose();

    institutionname16FocusNode?.dispose();
    institutionname16TextController?.dispose();

    yeargraduated16FocusNode?.dispose();
    yeargraduated16TextController?.dispose();

    additionaltrainingorcourses16FocusNode?.dispose();
    additionaltrainingorcourses16TextController?.dispose();

    employername16FocusNode?.dispose();
    employername16TextController?.dispose();

    jobexpPosition16FocusNode?.dispose();
    jobexpPosition16TextController?.dispose();

    jobexpstartdateFocusNode?.dispose();
    jobexpstartdateTextController?.dispose();

    jobexpenddateFocusNode?.dispose();
    jobexpenddateTextController?.dispose();

    jobexpResponsibilitiesFocusNode?.dispose();
    jobexpResponsibilitiesTextController?.dispose();

    insuranceexpirydate16FocusNode?.dispose();
    insuranceexpirydate16TextController?.dispose();

    sin16FocusNode?.dispose();
    sin16TextController?.dispose();
  }

  /// Additional helper methods.
  String? get availableForButton16Value =>
      availableForButton16ValueController?.value;
  String? get profflibinsurance16Value =>
      profflibinsurance16ValueController?.value;
}
