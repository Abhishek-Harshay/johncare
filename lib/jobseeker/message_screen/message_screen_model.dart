import '/backend/backend.dart';
import '/components/custom_appbar_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'message_screen_widget.dart' show MessageScreenWidget;
import 'package:flutter/material.dart';

class MessageScreenModel extends FlutterFlowModel<MessageScreenWidget> {
  ///  Local state fields for this page.

  String? messageString;

  ///  State fields for stateful widgets in this page.

  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel;
  // State field(s) for message widget.
  FocusNode? messageFocusNode;
  TextEditingController? messageTextController;
  String? Function(BuildContext, String?)? messageTextControllerValidator;
  // Stores action output result for [Backend Call - Read Document] action in Container widget.
  ChatsRecord? chat;

  @override
  void initState(BuildContext context) {
    customAppbarModel = createModel(context, () => CustomAppbarModel());
  }

  @override
  void dispose() {
    customAppbarModel.dispose();
    messageFocusNode?.dispose();
    messageTextController?.dispose();
  }
}
