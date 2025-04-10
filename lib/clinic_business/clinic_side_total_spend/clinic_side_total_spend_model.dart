import '/components/clinic_mobile_nav_bar/clinic_mobile_nav_bar_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'clinic_side_total_spend_widget.dart' show ClinicSideTotalSpendWidget;
import 'package:flutter/material.dart';

class ClinicSideTotalSpendModel
    extends FlutterFlowModel<ClinicSideTotalSpendWidget> {
  ///  State fields for stateful widgets in this page.

  // State field(s) for Switch widget.
  bool? switchValue;
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
