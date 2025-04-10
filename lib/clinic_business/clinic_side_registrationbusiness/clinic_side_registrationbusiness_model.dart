import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import '/index.dart';
import 'clinic_side_registrationbusiness_widget.dart'
    show ClinicSideRegistrationbusinessWidget;
import 'package:flutter/material.dart';
import 'package:signature/signature.dart';

class ClinicSideRegistrationbusinessModel
    extends FlutterFlowModel<ClinicSideRegistrationbusinessWidget> {
  ///  Local state fields for this page.

  DocumentReference? created;

  bool anotherAddress = false;

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
  // State field(s) for BusinessClinicname19 widget.
  FocusNode? businessClinicname19FocusNode;
  TextEditingController? businessClinicname19TextController;
  String? Function(BuildContext, String?)?
      businessClinicname19TextControllerValidator;
  String? _businessClinicname19TextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Enter business/clinic name is required';
    }

    return null;
  }

  // State field(s) for TypeofBusiness19 widget.
  String? typeofBusiness19Value;
  FormFieldController<String>? typeofBusiness19ValueController;
  // State field(s) for Businessregistrationnumber19 widget.
  FocusNode? businessregistrationnumber19FocusNode;
  TextEditingController? businessregistrationnumber19TextController;
  String? Function(BuildContext, String?)?
      businessregistrationnumber19TextControllerValidator;
  // State field(s) for noOfLocation19 widget.
  int? noOfLocation19Value;
  // State field(s) for FirstName19 widget.
  FocusNode? firstName19FocusNode;
  TextEditingController? firstName19TextController;
  String? Function(BuildContext, String?)? firstName19TextControllerValidator;
  String? _firstName19TextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Enter first name is required';
    }

    return null;
  }

  // State field(s) for LastName19 widget.
  FocusNode? lastName19FocusNode;
  TextEditingController? lastName19TextController;
  String? Function(BuildContext, String?)? lastName19TextControllerValidator;
  String? _lastName19TextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Enter last name is required';
    }

    return null;
  }

  // State field(s) for emailAddress19 widget.
  FocusNode? emailAddress19FocusNode;
  TextEditingController? emailAddress19TextController;
  String? Function(BuildContext, String?)?
      emailAddress19TextControllerValidator;
  String? _emailAddress19TextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Enter email is required';
    }

    return null;
  }

  // State field(s) for Phonenumber19 widget.
  FocusNode? phonenumber19FocusNode;
  TextEditingController? phonenumber19TextController;
  String? Function(BuildContext, String?)? phonenumber19TextControllerValidator;
  String? _phonenumber19TextControllerValidator(
      BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Enter phone number is required';
    }

    return null;
  }

  // State field(s) for PositionTitle19 widget.
  FocusNode? positionTitle19FocusNode;
  TextEditingController? positionTitle19TextController;
  String? Function(BuildContext, String?)?
      positionTitle19TextControllerValidator;
  // State field(s) for Alternativecontact19 widget.
  FocusNode? alternativecontact19FocusNode;
  TextEditingController? alternativecontact19TextController;
  String? Function(BuildContext, String?)?
      alternativecontact19TextControllerValidator;
  // State field(s) for streetName19 widget.
  FocusNode? streetName19FocusNode;
  TextEditingController? streetName19TextController;
  String? Function(BuildContext, String?)? streetName19TextControllerValidator;
  // State field(s) for cityName19 widget.
  FocusNode? cityName19FocusNode;
  TextEditingController? cityName19TextController;
  String? Function(BuildContext, String?)? cityName19TextControllerValidator;
  // State field(s) for Province19 widget.
  FocusNode? province19FocusNode;
  TextEditingController? province19TextController;
  String? Function(BuildContext, String?)? province19TextControllerValidator;
  // State field(s) for PostalCode19 widget.
  FocusNode? postalCode19FocusNode;
  TextEditingController? postalCode19TextController;
  String? Function(BuildContext, String?)? postalCode19TextControllerValidator;
  // Stores action output result for [Custom Action - convertAddressTOLatLng] action in Button widget.
  LatLng? mainlatlng2;
  // State field(s) for Professionalsneeded19 widget.
  String? professionalsneeded19Value;
  FormFieldController<String>? professionalsneeded19ValueController;
  // State field(s) for Typesofshifts19 widget.
  String? typesofshifts19Value;
  FormFieldController<String>? typesofshifts19ValueController;
  // State field(s) for TypicalShiftDuration19 widget.
  int? typicalShiftDuration19Value;
  // State field(s) for Expectedfrequencyofuse19 widget.
  FocusNode? expectedfrequencyofuse19FocusNode;
  TextEditingController? expectedfrequencyofuse19TextController;
  String? Function(BuildContext, String?)?
      expectedfrequencyofuse19TextControllerValidator;
  // State field(s) for taxIDorGSTNo19 widget.
  FocusNode? taxIDorGSTNo19FocusNode;
  TextEditingController? taxIDorGSTNo19TextController;
  String? Function(BuildContext, String?)?
      taxIDorGSTNo19TextControllerValidator;
  // State field(s) for BuisnessID19 widget.
  FocusNode? buisnessID19FocusNode;
  TextEditingController? buisnessID19TextController;
  String? Function(BuildContext, String?)? buisnessID19TextControllerValidator;
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

  // State field(s) for Skill widget.
  FocusNode? skillFocusNode;
  TextEditingController? skillTextController;
  String? Function(BuildContext, String?)? skillTextControllerValidator;
  String? _skillTextControllerValidator(BuildContext context, String? val) {
    if (val == null || val.isEmpty) {
      return 'Enter language skills is required';
    }

    return null;
  }

  bool isDataUploading4 = false;
  FFUploadedFile uploadedLocalFile4 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl4 = '';

  // State field(s) for TermsAndConditions widget.
  bool? termsAndConditionsValue;
  // State field(s) for ConsentForCheck widget.
  bool? consentForCheckValue;
  // State field(s) for Signature widget.
  SignatureController? signatureController;
  String uploadedSignatureUrl = '';

  @override
  void initState(BuildContext context) {
    businessClinicname19TextControllerValidator =
        _businessClinicname19TextControllerValidator;
    firstName19TextControllerValidator = _firstName19TextControllerValidator;
    lastName19TextControllerValidator = _lastName19TextControllerValidator;
    emailAddress19TextControllerValidator =
        _emailAddress19TextControllerValidator;
    phonenumber19TextControllerValidator =
        _phonenumber19TextControllerValidator;
    skillTextControllerValidator = _skillTextControllerValidator;
  }

  @override
  void dispose() {
    businessClinicname19FocusNode?.dispose();
    businessClinicname19TextController?.dispose();

    businessregistrationnumber19FocusNode?.dispose();
    businessregistrationnumber19TextController?.dispose();

    firstName19FocusNode?.dispose();
    firstName19TextController?.dispose();

    lastName19FocusNode?.dispose();
    lastName19TextController?.dispose();

    emailAddress19FocusNode?.dispose();
    emailAddress19TextController?.dispose();

    phonenumber19FocusNode?.dispose();
    phonenumber19TextController?.dispose();

    positionTitle19FocusNode?.dispose();
    positionTitle19TextController?.dispose();

    alternativecontact19FocusNode?.dispose();
    alternativecontact19TextController?.dispose();

    streetName19FocusNode?.dispose();
    streetName19TextController?.dispose();

    cityName19FocusNode?.dispose();
    cityName19TextController?.dispose();

    province19FocusNode?.dispose();
    province19TextController?.dispose();

    postalCode19FocusNode?.dispose();
    postalCode19TextController?.dispose();

    expectedfrequencyofuse19FocusNode?.dispose();
    expectedfrequencyofuse19TextController?.dispose();

    taxIDorGSTNo19FocusNode?.dispose();
    taxIDorGSTNo19TextController?.dispose();

    buisnessID19FocusNode?.dispose();
    buisnessID19TextController?.dispose();

    skillFocusNode?.dispose();
    skillTextController?.dispose();

    signatureController?.dispose();
  }
}
