import '/components/job_seeker_mobile_nav_bar/job_seeker_mobile_nav_bar_widget.dart';
import '/components/main_header_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'health_care_providers_my_earning_page_widget.dart'
    show HealthCareProvidersMyEarningPageWidget;
import 'package:flutter/material.dart';

class HealthCareProvidersMyEarningPageModel
    extends FlutterFlowModel<HealthCareProvidersMyEarningPageWidget> {
  ///  State fields for stateful widgets in this page.

  // Model for MainHeader component.
  late MainHeaderModel mainHeaderModel;
  // Model for JobSeekerMobileNavBar component.
  late JobSeekerMobileNavBarModel jobSeekerMobileNavBarModel;

  @override
  void initState(BuildContext context) {
    mainHeaderModel = createModel(context, () => MainHeaderModel());
    jobSeekerMobileNavBarModel =
        createModel(context, () => JobSeekerMobileNavBarModel());
  }

  @override
  void dispose() {
    mainHeaderModel.dispose();
    jobSeekerMobileNavBarModel.dispose();
  }
}
