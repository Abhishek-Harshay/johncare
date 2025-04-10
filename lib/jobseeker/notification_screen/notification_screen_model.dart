import '/backend/backend.dart';
import '/components/custom_appbar_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'notification_screen_widget.dart' show NotificationScreenWidget;
import 'package:flutter/material.dart';

class NotificationScreenModel
    extends FlutterFlowModel<NotificationScreenWidget> {
  ///  State fields for stateful widgets in this page.

  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel;
  // Stores action output result for [Backend Call - Read Document] action in Container widget.
  JobDetailsRecord? job;

  @override
  void initState(BuildContext context) {
    customAppbarModel = createModel(context, () => CustomAppbarModel());
  }

  @override
  void dispose() {
    customAppbarModel.dispose();
  }
}
