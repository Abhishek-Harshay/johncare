import '/components/side_nav_bar_for_admin/side_nav_bar_for_admin_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'admin_job_management_widget.dart' show AdminJobManagementWidget;
import 'package:flutter/material.dart';

class AdminJobManagementModel
    extends FlutterFlowModel<AdminJobManagementWidget> {
  ///  Local state fields for this page.

  int demo = 0;

  ///  State fields for stateful widgets in this page.

  // Model for SideNavBarForAdmin component.
  late SideNavBarForAdminModel sideNavBarForAdminModel;
  // State field(s) for TextField widget.
  FocusNode? textFieldFocusNode;
  TextEditingController? textController;
  String? Function(BuildContext, String?)? textControllerValidator;

  @override
  void initState(BuildContext context) {
    sideNavBarForAdminModel =
        createModel(context, () => SideNavBarForAdminModel());
  }

  @override
  void dispose() {
    sideNavBarForAdminModel.dispose();
    textFieldFocusNode?.dispose();
    textController?.dispose();
  }
}
