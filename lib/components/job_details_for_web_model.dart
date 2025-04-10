import '/backend/backend.dart';
import '/components/side_nav_barfor_recuriter/side_nav_barfor_recuriter_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'job_details_for_web_widget.dart' show JobDetailsForWebWidget;
import 'package:flutter/material.dart';

class JobDetailsForWebModel extends FlutterFlowModel<JobDetailsForWebWidget> {
  ///  State fields for stateful widgets in this component.

  // Model for SideNavBarforRecuriter component.
  late SideNavBarforRecuriterModel sideNavBarforRecuriterModel;
  // State field(s) for TextField widget.
  FocusNode? textFieldFocusNode;
  TextEditingController? textController;
  String? Function(BuildContext, String?)? textControllerValidator;
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
    textFieldFocusNode?.dispose();
    textController?.dispose();
  }
}
