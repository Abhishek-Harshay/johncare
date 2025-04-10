import '/backend/backend.dart';
import '/components/side_nav_barfor_recuriter/side_nav_barfor_recuriter_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'job_details_recuriter_web_widget.dart'
    show JobDetailsRecuriterWebWidget;
import 'package:flutter/material.dart';

class JobDetailsRecuriterWebModel
    extends FlutterFlowModel<JobDetailsRecuriterWebWidget> {
  ///  State fields for stateful widgets in this page.

  // Model for SideNavBarforRecuriter component.
  late SideNavBarforRecuriterModel sideNavBarforRecuriterModel;
  // Stores action output result for [Backend Call - Read Document] action in Button widget.
  BusinessdetailRecord? buisnessDetailsCopy;
  // Stores action output result for [Backend Call - Read Document] action in Button widget.
  BusinessdetailRecord? buisnessDetails;

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
