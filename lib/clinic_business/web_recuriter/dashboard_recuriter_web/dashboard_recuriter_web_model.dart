import '/components/custom_map_widget.dart';
import '/components/side_nav_barfor_recuriter/side_nav_barfor_recuriter_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'dashboard_recuriter_web_widget.dart' show DashboardRecuriterWebWidget;
import 'package:flutter/material.dart';

class DashboardRecuriterWebModel
    extends FlutterFlowModel<DashboardRecuriterWebWidget> {
  ///  Local state fields for this page.

  String status = 'All';

  ///  State fields for stateful widgets in this page.

  // Model for SideNavBarforRecuriter component.
  late SideNavBarforRecuriterModel sideNavBarforRecuriterModel;
  // State field(s) for TabBar widget.
  TabController? tabBarController;
  int get tabBarCurrentIndex =>
      tabBarController != null ? tabBarController!.index : 0;

  // Models for customMap dynamic component.
  late FlutterFlowDynamicModels<CustomMapModel> customMapModels1;
  // Models for customMap dynamic component.
  late FlutterFlowDynamicModels<CustomMapModel> customMapModels2;
  // Models for customMap dynamic component.
  late FlutterFlowDynamicModels<CustomMapModel> customMapModels3;

  @override
  void initState(BuildContext context) {
    sideNavBarforRecuriterModel =
        createModel(context, () => SideNavBarforRecuriterModel());
    customMapModels1 = FlutterFlowDynamicModels(() => CustomMapModel());
    customMapModels2 = FlutterFlowDynamicModels(() => CustomMapModel());
    customMapModels3 = FlutterFlowDynamicModels(() => CustomMapModel());
  }

  @override
  void dispose() {
    sideNavBarforRecuriterModel.dispose();
    tabBarController?.dispose();
    customMapModels1.dispose();
    customMapModels2.dispose();
    customMapModels3.dispose();
  }
}
