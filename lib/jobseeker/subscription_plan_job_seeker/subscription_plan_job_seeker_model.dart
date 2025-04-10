import '/components/custom_appbar_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'subscription_plan_job_seeker_widget.dart'
    show SubscriptionPlanJobSeekerWidget;
import 'package:flutter/material.dart';

class SubscriptionPlanJobSeekerModel
    extends FlutterFlowModel<SubscriptionPlanJobSeekerWidget> {
  ///  State fields for stateful widgets in this page.

  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel;
  // Stores action output result for [Stripe Payment] action in Button widget.
  String? paymentId;
  // Stores action output result for [Stripe Payment] action in Button widget.
  String? paymentIdCopy;
  // Stores action output result for [Stripe Payment] action in Button widget.
  String? paymentIdCopyCopy;

  @override
  void initState(BuildContext context) {
    customAppbarModel = createModel(context, () => CustomAppbarModel());
  }

  @override
  void dispose() {
    customAppbarModel.dispose();
  }
}
