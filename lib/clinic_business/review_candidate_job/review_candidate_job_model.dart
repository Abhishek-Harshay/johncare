import '/components/custom_appbar_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'review_candidate_job_widget.dart' show ReviewCandidateJobWidget;
import 'package:flutter/material.dart';

class ReviewCandidateJobModel
    extends FlutterFlowModel<ReviewCandidateJobWidget> {
  ///  State fields for stateful widgets in this page.

  // Model for customAppbar component.
  late CustomAppbarModel customAppbarModel;
  // State field(s) for RatingBar widget.
  double? ratingBarValue;
  // State field(s) for Review widget.
  FocusNode? reviewFocusNode;
  TextEditingController? reviewTextController;
  String? Function(BuildContext, String?)? reviewTextControllerValidator;

  @override
  void initState(BuildContext context) {
    customAppbarModel = createModel(context, () => CustomAppbarModel());
  }

  @override
  void dispose() {
    customAppbarModel.dispose();
    reviewFocusNode?.dispose();
    reviewTextController?.dispose();
  }
}
