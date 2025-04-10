import '/components/side_nav_barfor_recuriter/side_nav_barfor_recuriter_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'help_support_recuriter_web_widget.dart'
    show HelpSupportRecuriterWebWidget;
import 'package:flutter/material.dart';

class HelpSupportRecuriterWebModel
    extends FlutterFlowModel<HelpSupportRecuriterWebWidget> {
  ///  Local state fields for this page.

  String status = 'All';

  ///  State fields for stateful widgets in this page.

  // Model for SideNavBarforRecuriter component.
  late SideNavBarforRecuriterModel sideNavBarforRecuriterModel;
  // State field(s) for tickets widget.
  FocusNode? ticketsFocusNode;
  TextEditingController? ticketsTextController;
  String? Function(BuildContext, String?)? ticketsTextControllerValidator;

  @override
  void initState(BuildContext context) {
    sideNavBarforRecuriterModel =
        createModel(context, () => SideNavBarforRecuriterModel());
  }

  @override
  void dispose() {
    sideNavBarforRecuriterModel.dispose();
    ticketsFocusNode?.dispose();
    ticketsTextController?.dispose();
  }
}
