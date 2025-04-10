import '/components/side_nav_barfor_recuriter/side_nav_barfor_recuriter_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'admin_job_board_job_post_details_expired_widget.dart'
    show AdminJobBoardJobPostDetailsExpiredWidget;
import 'package:flutter/material.dart';

class AdminJobBoardJobPostDetailsExpiredModel
    extends FlutterFlowModel<AdminJobBoardJobPostDetailsExpiredWidget> {
  ///  State fields for stateful widgets in this page.

  // Model for SideNavBarforRecuriter component.
  late SideNavBarforRecuriterModel sideNavBarforRecuriterModel;
  // State field(s) for Switch widget.
  bool? switchValue1;
  // State field(s) for Switch widget.
  bool? switchValue2;
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
    sideNavBarforRecuriterModel =
        createModel(context, () => SideNavBarforRecuriterModel());
  }

  @override
  void dispose() {
    sideNavBarforRecuriterModel.dispose();
    educationCertificateFocusNode1?.dispose();
    educationCertificateTextController1?.dispose();

    educationCertificateFocusNode2?.dispose();
    educationCertificateTextController2?.dispose();

    educationCertificateFocusNode3?.dispose();
    educationCertificateTextController3?.dispose();
  }
}
