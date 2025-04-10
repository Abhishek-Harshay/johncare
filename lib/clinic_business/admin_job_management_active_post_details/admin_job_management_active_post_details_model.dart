import '/components/side_nav_bar_for_admin/side_nav_bar_for_admin_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import 'admin_job_management_active_post_details_widget.dart'
    show AdminJobManagementActivePostDetailsWidget;
import 'package:flutter/material.dart';

class AdminJobManagementActivePostDetailsModel
    extends FlutterFlowModel<AdminJobManagementActivePostDetailsWidget> {
  ///  State fields for stateful widgets in this page.

  // Model for SideNavBarForAdmin component.
  late SideNavBarForAdminModel sideNavBarForAdminModel;
  // State field(s) for Switch widget.
  bool? switchValue1;
  // State field(s) for Switch widget.
  bool? switchValue2;
  // State field(s) for DropDown widget.
  String? dropDownValue;
  FormFieldController<String>? dropDownValueController;
  // State field(s) for EducationCertificate widget.
  FocusNode? educationCertificateFocusNode1;
  TextEditingController? educationCertificateTextController1;
  String? Function(BuildContext, String?)?
      educationCertificateTextController1Validator;
  // State field(s) for EducationCertificate widget.
  FocusNode? educationCertificateFocusNode2;
  TextEditingController? educationCertificateTextController2;
  String? Function(BuildContext, String?)?
      educationCertificateTextController2Validator;
  // State field(s) for EducationCertificate widget.
  FocusNode? educationCertificateFocusNode3;
  TextEditingController? educationCertificateTextController3;
  String? Function(BuildContext, String?)?
      educationCertificateTextController3Validator;

  @override
  void initState(BuildContext context) {
    sideNavBarForAdminModel =
        createModel(context, () => SideNavBarForAdminModel());
  }

  @override
  void dispose() {
    sideNavBarForAdminModel.dispose();
    educationCertificateFocusNode1?.dispose();
    educationCertificateTextController1?.dispose();

    educationCertificateFocusNode2?.dispose();
    educationCertificateTextController2?.dispose();

    educationCertificateFocusNode3?.dispose();
    educationCertificateTextController3?.dispose();
  }
}
