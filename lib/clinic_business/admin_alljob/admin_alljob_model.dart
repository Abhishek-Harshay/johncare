import '/backend/backend.dart';
import '/components/custom_appbar_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'admin_alljob_widget.dart' show AdminAlljobWidget;
import 'package:flutter/material.dart';

class AdminAlljobModel extends FlutterFlowModel<AdminAlljobWidget> {
  ///  State fields for stateful widgets in this page.

  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel;
  // Stores action output result for [Backend Call - Read Document] action in Button widget.
  BusinessdetailRecord? buisnessDetailsCopy;
  // Stores action output result for [Backend Call - Read Document] action in Button widget.
  BusinessdetailRecord? buisnessDetails;

  @override
  void initState(BuildContext context) {
    customAppbarModel = createModel(context, () => CustomAppbarModel());
  }

  @override
  void dispose() {
    customAppbarModel.dispose();
  }
}
