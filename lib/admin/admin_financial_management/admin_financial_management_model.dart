import '/components/side_nav_bar_for_admin/side_nav_bar_for_admin_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import 'admin_financial_management_widget.dart'
    show AdminFinancialManagementWidget;
import 'package:flutter/material.dart';

class AdminFinancialManagementModel
    extends FlutterFlowModel<AdminFinancialManagementWidget> {
  ///  Local state fields for this page.

  String type = 'Subscription';

  ///  State fields for stateful widgets in this page.

  // Model for SideNavBarForAdmin component.
  late SideNavBarForAdminModel sideNavBarForAdminModel;
  // State field(s) for TextField widget.
  FocusNode? textFieldFocusNode;
  TextEditingController? textController;
  String? Function(BuildContext, String?)? textControllerValidator;
  // State field(s) for FilterCity widget.
  String? filterCityValue;
  FormFieldController<String>? filterCityValueController;
  // State field(s) for FilterActive widget.
  String? filterActiveValue;
  FormFieldController<String>? filterActiveValueController;
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
