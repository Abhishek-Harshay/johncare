import '/components/custom_map_widget.dart';
import '/components/side_nav_bar_for_admin/side_nav_bar_for_admin_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'admin_job_details_widget.dart' show AdminJobDetailsWidget;
import 'package:flutter/material.dart';

class AdminJobDetailsModel extends FlutterFlowModel<AdminJobDetailsWidget> {
  ///  State fields for stateful widgets in this page.

  // Model for SideNavBarForAdmin component.
  late SideNavBarForAdminModel sideNavBarForAdminModel;
  // State field(s) for TextField widget.
  FocusNode? textFieldFocusNode;
  TextEditingController? textController;
  String? Function(BuildContext, String?)? textControllerValidator;
  // Model for customMap component.
  late CustomMapModel customMapModel;

  @override
  void initState(BuildContext context) {
    sideNavBarForAdminModel =
        createModel(context, () => SideNavBarForAdminModel());
    customMapModel = createModel(context, () => CustomMapModel());
  }

  @override
  void dispose() {
    sideNavBarForAdminModel.dispose();
    textFieldFocusNode?.dispose();
    textController?.dispose();

    customMapModel.dispose();
  }
}
