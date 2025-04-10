import '/components/job_seeker_mobile_nav_bar/job_seeker_mobile_nav_bar_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'profilemanagement_job_seeker_widget.dart'
    show ProfilemanagementJobSeekerWidget;
import 'package:flutter/material.dart';

class ProfilemanagementJobSeekerModel
    extends FlutterFlowModel<ProfilemanagementJobSeekerWidget> {
  ///  State fields for stateful widgets in this page.

  // Model for JobSeekerMobileNavBar component.
  late JobSeekerMobileNavBarModel jobSeekerMobileNavBarModel;

  @override
  void initState(BuildContext context) {
    jobSeekerMobileNavBarModel =
        createModel(context, () => JobSeekerMobileNavBarModel());
  }

  @override
  void dispose() {
    jobSeekerMobileNavBarModel.dispose();
  }
}
