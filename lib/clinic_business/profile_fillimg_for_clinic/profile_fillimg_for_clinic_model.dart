import '/components/custom_appbar_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import 'profile_fillimg_for_clinic_widget.dart'
    show ProfileFillimgForClinicWidget;
import 'package:flutter/material.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';
import 'package:signature/signature.dart';

class ProfileFillimgForClinicModel
    extends FlutterFlowModel<ProfileFillimgForClinicWidget> {
  ///  Local state fields for this page.

  DocumentReference? created;

  bool anotherAddress = false;

  ///  State fields for stateful widgets in this page.

  final formKey1 = GlobalKey<FormState>();
  final formKey2 = GlobalKey<FormState>();
  final formKey3 = GlobalKey<FormState>();
  // State field(s) for PageView widget.
  PageController? pageViewController;

  int get pageViewCurrentIndex => pageViewController != null &&
          pageViewController!.hasClients &&
          pageViewController!.page != null
      ? pageViewController!.page!.round()
      : 0;
  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel1;
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
  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel2;
  // State field(s) for FirstName19 widget.
  FocusNode? firstName19FocusNode;
  TextEditingController? firstName19TextController;
  String? Function(BuildContext, String?)? firstName19TextControllerValidator;
  // State field(s) for LastName19 widget.
  FocusNode? lastName19FocusNode;
  TextEditingController? lastName19TextController;
  String? Function(BuildContext, String?)? lastName19TextControllerValidator;
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
  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel3;
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
  LatLng? mainlatlng23;
  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel4;
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
  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel5;
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

  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel6;
  // State field(s) for Skill widget.
  FocusNode? skillFocusNode;
  TextEditingController? skillTextController;
  String? Function(BuildContext, String?)? skillTextControllerValidator;
  bool isDataUploading4 = false;
  FFUploadedFile uploadedLocalFile4 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl4 = '';

  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel7;
  // State field(s) for Signature14 widget.
  SignatureController? signature14Controller;
  String uploadedSignatureUrl = '';
  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel8;
  // State field(s) for ContactphonenumberHelp widget.
  FocusNode? contactphonenumberHelpFocusNode;
  TextEditingController? contactphonenumberHelpTextController;
  String? Function(BuildContext, String?)?
      contactphonenumberHelpTextControllerValidator;
  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel9;
  // State field(s) for method widget.
  String? methodValue;
  FormFieldController<String>? methodValueController;
  // State field(s) for billingAdress widget.
  FocusNode? billingAdressFocusNode;
  TextEditingController? billingAdressTextController;
  String? Function(BuildContext, String?)? billingAdressTextControllerValidator;
  // State field(s) for backAccount widget.
  FocusNode? backAccountFocusNode;
  TextEditingController? backAccountTextController;
  String? Function(BuildContext, String?)? backAccountTextControllerValidator;
  // State field(s) for backName widget.
  FocusNode? backNameFocusNode;
  TextEditingController? backNameTextController;
  String? Function(BuildContext, String?)? backNameTextControllerValidator;
  // State field(s) for Institutionnumber widget.
  FocusNode? institutionnumberFocusNode;
  TextEditingController? institutionnumberTextController;
  String? Function(BuildContext, String?)?
      institutionnumberTextControllerValidator;
  // State field(s) for Branchnumber widget.
  FocusNode? branchnumberFocusNode1;
  TextEditingController? branchnumberTextController1;
  String? Function(BuildContext, String?)? branchnumberTextController1Validator;
  // State field(s) for Branchnumber widget.
  FocusNode? branchnumberFocusNode2;
  TextEditingController? branchnumberTextController2;
  String? Function(BuildContext, String?)? branchnumberTextController2Validator;
  // State field(s) for Name widget.
  FocusNode? nameFocusNode;
  TextEditingController? nameTextController;
  String? Function(BuildContext, String?)? nameTextControllerValidator;
  // State field(s) for Email widget.
  FocusNode? emailFocusNode;
  TextEditingController? emailTextController;
  String? Function(BuildContext, String?)? emailTextControllerValidator;
  // State field(s) for Phonenumber widget.
  FocusNode? phonenumberFocusNode;
  TextEditingController? phonenumberTextController;
  String? Function(BuildContext, String?)? phonenumberTextControllerValidator;

  @override
  void initState(BuildContext context) {
    customAppbarModel1 = createModel(context, () => CustomAppbarModel());
    businessClinicname19TextControllerValidator =
        _businessClinicname19TextControllerValidator;
    customAppbarModel2 = createModel(context, () => CustomAppbarModel());
    emailAddress19TextControllerValidator =
        _emailAddress19TextControllerValidator;
    phonenumber19TextControllerValidator =
        _phonenumber19TextControllerValidator;
    customAppbarModel3 = createModel(context, () => CustomAppbarModel());
    customAppbarModel4 = createModel(context, () => CustomAppbarModel());
    customAppbarModel5 = createModel(context, () => CustomAppbarModel());
    customAppbarModel6 = createModel(context, () => CustomAppbarModel());
    customAppbarModel7 = createModel(context, () => CustomAppbarModel());
    customAppbarModel8 = createModel(context, () => CustomAppbarModel());
    customAppbarModel9 = createModel(context, () => CustomAppbarModel());
  }

  @override
  void dispose() {
    customAppbarModel1.dispose();
    businessClinicname19FocusNode?.dispose();
    businessClinicname19TextController?.dispose();

    businessregistrationnumber19FocusNode?.dispose();
    businessregistrationnumber19TextController?.dispose();

    customAppbarModel2.dispose();
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

    birthDate19FocusNode?.dispose();
    birthDate19TextController?.dispose();

    alternativecontact19FocusNode?.dispose();
    alternativecontact19TextController?.dispose();

    customAppbarModel3.dispose();
    streetName19FocusNode?.dispose();
    streetName19TextController?.dispose();

    cityName19FocusNode?.dispose();
    cityName19TextController?.dispose();

    province19FocusNode?.dispose();
    province19TextController?.dispose();

    postalCode19FocusNode?.dispose();
    postalCode19TextController?.dispose();

    customAppbarModel4.dispose();
    expectedfrequencyofuse19FocusNode?.dispose();
    expectedfrequencyofuse19TextController?.dispose();

    customAppbarModel5.dispose();
    taxIDorGSTNo19FocusNode?.dispose();
    taxIDorGSTNo19TextController?.dispose();

    buisnessID19FocusNode?.dispose();
    buisnessID19TextController?.dispose();

    customAppbarModel6.dispose();
    skillFocusNode?.dispose();
    skillTextController?.dispose();

    customAppbarModel7.dispose();
    signature14Controller?.dispose();
    customAppbarModel8.dispose();
    contactphonenumberHelpFocusNode?.dispose();
    contactphonenumberHelpTextController?.dispose();

    customAppbarModel9.dispose();
    billingAdressFocusNode?.dispose();
    billingAdressTextController?.dispose();

    backAccountFocusNode?.dispose();
    backAccountTextController?.dispose();

    backNameFocusNode?.dispose();
    backNameTextController?.dispose();

    institutionnumberFocusNode?.dispose();
    institutionnumberTextController?.dispose();

    branchnumberFocusNode1?.dispose();
    branchnumberTextController1?.dispose();

    branchnumberFocusNode2?.dispose();
    branchnumberTextController2?.dispose();

    nameFocusNode?.dispose();
    nameTextController?.dispose();

    emailFocusNode?.dispose();
    emailTextController?.dispose();

    phonenumberFocusNode?.dispose();
    phonenumberTextController?.dispose();
  }
}
