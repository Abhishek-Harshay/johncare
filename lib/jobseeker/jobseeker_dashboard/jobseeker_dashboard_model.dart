import '/backend/backend.dart';
import '/components/custom_map_widget.dart';
import '/components/job_seeker_mobile_nav_bar/job_seeker_mobile_nav_bar_widget.dart';
import '/components/main_header_widget.dart';
import '/components/side_nav_bar_healthcare/side_nav_bar_healthcare_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/form_field_controller.dart';
import '/index.dart';
import 'jobseeker_dashboard_widget.dart' show JobseekerDashboardWidget;
import 'package:flutter/material.dart';

class JobseekerDashboardModel
    extends FlutterFlowModel<JobseekerDashboardWidget> {
  ///  Local state fields for this page.

  int demo = 0;

  ///  State fields for stateful widgets in this page.

  // Model for SideNavBarHealthcare component.
  late SideNavBarHealthcareModel sideNavBarHealthcareModel;
  // Model for MainHeader component.
  late MainHeaderModel mainHeaderModel;
  // State field(s) for Switch widget.
  bool? switchValue;
  // State field(s) for DropDown widget.
  String? dropDownValue;
  FormFieldController<String>? dropDownValueController;
  // State field(s) for TabBar widget.
  TabController? tabBarController;
  int get tabBarCurrentIndex =>
      tabBarController != null ? tabBarController!.index : 0;

  // Stores action output result for [Backend Call - Read Document] action in Button widget.
  UsersRecord? user;
  // Stores action output result for [Backend Call - Create Document] action in Button widget.
  ChatsRecord? chats;
  // Models for customMap dynamic component.
  late FlutterFlowDynamicModels<CustomMapModel> customMapModels1;
  // State field(s) for TextField widget.
  FocusNode? textFieldFocusNode;
  TextEditingController? textController;
  String? Function(BuildContext, String?)? textControllerValidator;
  // Stores action output result for [Backend Call - Read Document] action in Button widget.
  UsersRecord? userCurrent;
  // Stores action output result for [Backend Call - Create Document] action in Button widget.
  ChatsRecord? chatData;
  // Models for customMap dynamic component.
  late FlutterFlowDynamicModels<CustomMapModel> customMapModels2;
  // State field(s) for FilterStatus widget.
  String? filterStatusValue;
  FormFieldController<String>? filterStatusValueController;
  // Stores action output result for [Firestore Query - Query a collection] action in Button widget.
  AppliedJobRecord? appliedJOb;
  // Stores action output result for [Firestore Query - Query a collection] action in Button widget.
  ChatsRecord? chat;
  // Models for customMap dynamic component.
  late FlutterFlowDynamicModels<CustomMapModel> customMapModels3;
  // Models for customMap dynamic component.
  late FlutterFlowDynamicModels<CustomMapModel> customMapModels4;
  // Model for JobSeekerMobileNavBar component.
  late JobSeekerMobileNavBarModel jobSeekerMobileNavBarModel;

  @override
  void initState(BuildContext context) {
    sideNavBarHealthcareModel =
        createModel(context, () => SideNavBarHealthcareModel());
    mainHeaderModel = createModel(context, () => MainHeaderModel());
    customMapModels1 = FlutterFlowDynamicModels(() => CustomMapModel());
    customMapModels2 = FlutterFlowDynamicModels(() => CustomMapModel());
    customMapModels3 = FlutterFlowDynamicModels(() => CustomMapModel());
    customMapModels4 = FlutterFlowDynamicModels(() => CustomMapModel());
    jobSeekerMobileNavBarModel =
        createModel(context, () => JobSeekerMobileNavBarModel());
  }

  @override
  void dispose() {
    sideNavBarHealthcareModel.dispose();
    mainHeaderModel.dispose();
    tabBarController?.dispose();
    customMapModels1.dispose();
    textFieldFocusNode?.dispose();
    textController?.dispose();

    customMapModels2.dispose();
    customMapModels3.dispose();
    customMapModels4.dispose();
    jobSeekerMobileNavBarModel.dispose();
  }
}
