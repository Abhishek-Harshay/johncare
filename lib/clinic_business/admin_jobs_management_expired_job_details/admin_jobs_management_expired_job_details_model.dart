import '/components/side_nav_bar_healthcare/side_nav_bar_healthcare_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import 'admin_jobs_management_expired_job_details_widget.dart'
    show AdminJobsManagementExpiredJobDetailsWidget;
import 'package:flutter/material.dart';

class AdminJobsManagementExpiredJobDetailsModel
    extends FlutterFlowModel<AdminJobsManagementExpiredJobDetailsWidget> {
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
    sideNavBarHealthcareModel =
        createModel(context, () => SideNavBarHealthcareModel());
  }

  @override
  void dispose() {
    sideNavBarHealthcareModel.dispose();
    educationCertificateFocusNode1?.dispose();
    educationCertificateTextController1?.dispose();

    educationCertificateFocusNode2?.dispose();
    educationCertificateTextController2?.dispose();

    educationCertificateFocusNode3?.dispose();
    educationCertificateTextController3?.dispose();
  }
}
