import '/components/side_nav_bar_for_admin/side_nav_bar_for_admin_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'admin_profile_managment_health_provider_widget.dart'
    show AdminProfileManagmentHealthProviderWidget;
import 'package:flutter/material.dart';

class AdminProfileManagmentHealthProviderModel
    extends FlutterFlowModel<AdminProfileManagmentHealthProviderWidget> {
  ///  Local state fields for this page.

  String type = 'Provider details';

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
