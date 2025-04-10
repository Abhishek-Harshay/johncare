import '/flutter_flow/flutter_flow_util.dart';
import 'review_candidate_web_widget.dart' show ReviewCandidateWebWidget;
import 'package:flutter/material.dart';

class ReviewCandidateWebModel
    extends FlutterFlowModel<ReviewCandidateWebWidget> {
  ///  State fields for stateful widgets in this component.

  // State field(s) for RatingBar widget.
  double? ratingBarValue;
  // State field(s) for Review widget.
  FocusNode? reviewFocusNode;
  TextEditingController? reviewTextController;
  String? Function(BuildContext, String?)? reviewTextControllerValidator;

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {
    reviewFocusNode?.dispose();
    reviewTextController?.dispose();
  }
}
