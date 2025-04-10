import '/components/side_nav_bar_healthcare/side_nav_bar_healthcare_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'health_care_provider_subscription_plan_widget.dart'
    show HealthCareProviderSubscriptionPlanWidget;
import 'package:flutter/material.dart';

class HealthCareProviderSubscriptionPlanModel
    extends FlutterFlowModel<HealthCareProviderSubscriptionPlanWidget> {
  ///  State fields for stateful widgets in this page.

  // Model for SideNavBarHealthcare component.
  late SideNavBarHealthcareModel sideNavBarHealthcareModel;
  // State field(s) for Checkbox widget.
  bool? checkboxValue1;
  // State field(s) for Checkbox widget.
  bool? checkboxValue2;
  // Stores action output result for [Stripe Payment] action in Button widget.
  String? paymentId;
  // State field(s) for Checkbox widget.
  bool? checkboxValue3;
  // State field(s) for Checkbox widget.
  bool? checkboxValue4;
  // State field(s) for Checkbox widget.
  bool? checkboxValue5;
  // State field(s) for Checkbox widget.
  bool? checkboxValue6;
  // State field(s) for Checkbox widget.
  bool? checkboxValue7;

  @override
  void initState(BuildContext context) {
    sideNavBarHealthcareModel =
        createModel(context, () => SideNavBarHealthcareModel());
  }

  @override
  void dispose() {
    sideNavBarHealthcareModel.dispose();
  }
}
