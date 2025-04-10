import '/backend/backend.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'admin_push_notification_widget.dart' show AdminPushNotificationWidget;
import 'package:flutter/material.dart';

class AdminPushNotificationModel
    extends FlutterFlowModel<AdminPushNotificationWidget> {
  ///  State fields for stateful widgets in this component.

  final formKey = GlobalKey<FormState>();
  // State field(s) for Message widget.
  FocusNode? messageFocusNode;
  TextEditingController? messageTextController;
  String? Function(BuildContext, String?)? messageTextControllerValidator;
  // Stores action output result for [Firestore Query - Query a collection] action in Button widget.
  List<UsersRecord>? usersData;

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {
    messageFocusNode?.dispose();
    messageTextController?.dispose();
  }
}
