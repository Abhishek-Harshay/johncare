import '/backend/backend.dart';
import '/flutter_flow/flutter_flow_calendar.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'duplicate_job_widget.dart' show DuplicateJobWidget;
import 'package:flutter/material.dart';

class DuplicateJobModel extends FlutterFlowModel<DuplicateJobWidget> {
  ///  Local state fields for this component.

  DateTime? date;

  ///  State fields for stateful widgets in this component.

  // State field(s) for Calendar widget.
  DateTimeRange? calendarSelectedDay;
  DateTime? datePicked1;
  DateTime? datePicked2;
  // State field(s) for Duration11 widget.
  FocusNode? duration11FocusNode;
  TextEditingController? duration11TextController;
  String? Function(BuildContext, String?)? duration11TextControllerValidator;
  // State field(s) for Hourlypay11 widget.
  FocusNode? hourlypay11FocusNode;
  TextEditingController? hourlypay11TextController;
  String? Function(BuildContext, String?)? hourlypay11TextControllerValidator;
  // State field(s) for Totalpay11 widget.
  FocusNode? totalpay11FocusNode;
  TextEditingController? totalpay11TextController;
  String? Function(BuildContext, String?)? totalpay11TextControllerValidator;
  // Stores action output result for [Stripe Payment] action in Button widget.
  String? paymentId;
  // Stores action output result for [Backend Call - Create Document] action in Button widget.
  JobDetailsRecord? job;

  @override
  void initState(BuildContext context) {
    calendarSelectedDay = DateTimeRange(
      start: DateTime.now().startOfDay,
      end: DateTime.now().endOfDay,
    );
  }

  @override
  void dispose() {
    duration11FocusNode?.dispose();
    duration11TextController?.dispose();

    hourlypay11FocusNode?.dispose();
    hourlypay11TextController?.dispose();

    totalpay11FocusNode?.dispose();
    totalpay11TextController?.dispose();
  }
}
