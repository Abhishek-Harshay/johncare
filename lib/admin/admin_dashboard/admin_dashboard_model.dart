import '/components/side_nav_bar_for_admin/side_nav_bar_for_admin_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import '/index.dart';
import 'admin_dashboard_widget.dart' show AdminDashboardWidget;
import 'package:flutter/material.dart';

class AdminDashboardModel extends FlutterFlowModel<AdminDashboardWidget> {
  ///  Local state fields for this page.

  String status = 'All';

  ///  State fields for stateful widgets in this page.

  // Model for SideNavBarForAdmin component.
  late SideNavBarForAdminModel sideNavBarForAdminModel;
  // State field(s) for TextField widget.
  FocusNode? textFieldFocusNode;
  TextEditingController? textController;
  String? Function(BuildContext, String?)? textControllerValidator;
  // State field(s) for FilterStatus widget.
  String? filterStatusValue;
  FormFieldController<String>? filterStatusValueController;

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
