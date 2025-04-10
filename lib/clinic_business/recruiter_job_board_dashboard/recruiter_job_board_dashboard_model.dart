import '/components/clinic_mobile_nav_bar/clinic_mobile_nav_bar_widget.dart';
import '/components/custom_map_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'recruiter_job_board_dashboard_widget.dart'
    show RecruiterJobBoardDashboardWidget;
import 'package:flutter/material.dart';

class RecruiterJobBoardDashboardModel
    extends FlutterFlowModel<RecruiterJobBoardDashboardWidget> {
  ///  State fields for stateful widgets in this page.

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
  // Model for ClinicMobileNavBar component.
  late ClinicMobileNavBarModel clinicMobileNavBarModel;

  @override
  void initState(BuildContext context) {
    customMapModels1 = FlutterFlowDynamicModels(() => CustomMapModel());
    customMapModels2 = FlutterFlowDynamicModels(() => CustomMapModel());
    customMapModels3 = FlutterFlowDynamicModels(() => CustomMapModel());
    clinicMobileNavBarModel =
        createModel(context, () => ClinicMobileNavBarModel());
  }

  @override
  void dispose() {
    tabBarController?.dispose();
    customMapModels1.dispose();
    customMapModels2.dispose();
    customMapModels3.dispose();
    clinicMobileNavBarModel.dispose();
  }
}
