import '/components/side_nav_barfor_recuriter/side_nav_barfor_recuriter_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'total_spend_recuriter_web_widget.dart'
    show TotalSpendRecuriterWebWidget;
import 'package:flutter/material.dart';

class TotalSpendRecuriterWebModel
    extends FlutterFlowModel<TotalSpendRecuriterWebWidget> {
  ///  Local state fields for this page.

  String status = 'All';

  ///  State fields for stateful widgets in this page.

  // Model for SideNavBarforRecuriter component.
  late SideNavBarforRecuriterModel sideNavBarforRecuriterModel;

  @override
  void initState(BuildContext context) {
    sideNavBarforRecuriterModel =
        createModel(context, () => SideNavBarforRecuriterModel());
  }

  @override
  void dispose() {
    sideNavBarforRecuriterModel.dispose();
  }
}
