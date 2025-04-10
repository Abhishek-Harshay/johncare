import '/backend/api_requests/api_calls.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'add_location_widget.dart' show AddLocationWidget;
import 'package:flutter/material.dart';

class AddLocationModel extends FlutterFlowModel<AddLocationWidget> {
  ///  State fields for stateful widgets in this component.

  // State field(s) for location widget.
  FocusNode? locationFocusNode;
  TextEditingController? locationTextController;
  String? Function(BuildContext, String?)? locationTextControllerValidator;
  // Stores action output result for [Backend Call - API (place picker)] action in location widget.
  ApiCallResponse? apiResult8kd;

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {
    locationFocusNode?.dispose();
    locationTextController?.dispose();
  }
}
