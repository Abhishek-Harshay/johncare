import '/components/clinic_mobile_nav_bar/clinic_mobile_nav_bar_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'profilemanagement_clinic_widget.dart'
    show ProfilemanagementClinicWidget;
import 'package:flutter/material.dart';

class ProfilemanagementClinicModel
    extends FlutterFlowModel<ProfilemanagementClinicWidget> {
  ///  State fields for stateful widgets in this page.

  // Model for ClinicMobileNavBar component.
  late ClinicMobileNavBarModel clinicMobileNavBarModel;

  @override
  void initState(BuildContext context) {
    clinicMobileNavBarModel =
        createModel(context, () => ClinicMobileNavBarModel());
  }

  @override
  void dispose() {
    clinicMobileNavBarModel.dispose();
  }
}
