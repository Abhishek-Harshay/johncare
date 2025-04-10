import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'clinic_side_registration_individual_widget.dart'
    show ClinicSideRegistrationIndividualWidget;
import 'package:flutter/material.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';
import 'package:signature/signature.dart';

class ClinicSideRegistrationIndividualModel
    extends FlutterFlowModel<ClinicSideRegistrationIndividualWidget> {
  ///  Local state fields for this page.

  DocumentReference? created;

  bool anotherAddress = false;

  ///  State fields for stateful widgets in this page.

  final formKey = GlobalKey<FormState>();
  // State field(s) for PageView widget.
  PageController? pageViewController;

  int get pageViewCurrentIndex => pageViewController != null &&
          pageViewController!.hasClients &&
          pageViewController!.page != null
      ? pageViewController!.page!.round()
      : 0;
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

  // State field(s) for BirthDate19 widget.
  FocusNode? birthDate19FocusNode;
  TextEditingController? birthDate19TextController;
  final birthDate19Mask = MaskTextInputFormatter(mask: '##/##/####');
  String? Function(BuildContext, String?)? birthDate19TextControllerValidator;
  DateTime? datePicked;
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
  // State field(s) for TermsAndConditions widget.
  bool? termsAndConditionsValue;
  // State field(s) for ConsentForCheck widget.
  bool? consentForCheckValue;
  // State field(s) for Signature widget.
  SignatureController? signatureController;
  String uploadedSignatureUrl = '';

  @override
  void initState(BuildContext context) {
    firstName19TextControllerValidator = _firstName19TextControllerValidator;
    lastName19TextControllerValidator = _lastName19TextControllerValidator;
    emailAddress19TextControllerValidator =
        _emailAddress19TextControllerValidator;
    phonenumber19TextControllerValidator =
        _phonenumber19TextControllerValidator;
  }

  @override
  void dispose() {
    firstName19FocusNode?.dispose();
    firstName19TextController?.dispose();

    lastName19FocusNode?.dispose();
    lastName19TextController?.dispose();

    emailAddress19FocusNode?.dispose();
    emailAddress19TextController?.dispose();

    phonenumber19FocusNode?.dispose();
    phonenumber19TextController?.dispose();

    birthDate19FocusNode?.dispose();
    birthDate19TextController?.dispose();

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

    signatureController?.dispose();
  }
}
