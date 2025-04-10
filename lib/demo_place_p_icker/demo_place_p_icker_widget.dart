import '/flutter_flow/flutter_flow_place_picker.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:flutter/material.dart';
import 'demo_place_p_icker_model.dart';
export 'demo_place_p_icker_model.dart';

class DemoPlacePIckerWidget extends StatefulWidget {
  const DemoPlacePIckerWidget({super.key});

  static String routeName = 'DemoPlacePIcker';
  static String routePath = '/demoPlacePIcker';

  @override
  State<DemoPlacePIckerWidget> createState() => _DemoPlacePIckerWidgetState();
}

class _DemoPlacePIckerWidgetState extends State<DemoPlacePIckerWidget> {
  late DemoPlacePIckerModel _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => DemoPlacePIckerModel());

    WidgetsBinding.instance.addPostFrameCallback((_) => safeSetState(() {}));
  }

  @override
  void dispose() {
    _model.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
        FocusManager.instance.primaryFocus?.unfocus();
      },
      child: Scaffold(
        key: scaffoldKey,
        backgroundColor: FlutterFlowTheme.of(context).primaryBackground,
        appBar: AppBar(
          backgroundColor: FlutterFlowTheme.of(context).primary,
          automaticallyImplyLeading: false,
          title: Text(
            'Page Title',
            style: FlutterFlowTheme.of(context).headlineMedium.override(
                  fontFamily: 'DM Sans',
                  color: Colors.white,
                  fontSize: 22.0,
                  letterSpacing: 0.0,
                ),
          ),
          actions: [],
          centerTitle: false,
          elevation: 2.0,
        ),
        body: SafeArea(
          top: true,
          child: Column(
            mainAxisSize: MainAxisSize.max,
            children: [
              FlutterFlowPlacePicker(
                iOSGoogleMapsApiKey: 'AIzaSyBOfpnJ6uBTDYf7JMLnUOSR4g3xQGLX4fA',
                androidGoogleMapsApiKey:
                    'AIzaSyBJ3_2xS-1oG1I6RtMqr9T3pUwypQ8dZXo',
                webGoogleMapsApiKey: 'AIzaSyDOVi415w5VeXS8gQK8I8HgqVl6NESo-Cc',
                onSelect: (place) async {
                  safeSetState(() => _model.placePickerValue = place);
                },
                defaultText: 'Select Location',
                icon: Icon(
                  Icons.place,
                  color: FlutterFlowTheme.of(context).info,
                  size: 16.0,
                ),
                buttonOptions: FFButtonOptions(
                  width: 200.0,
                  height: 40.0,
                  color: FlutterFlowTheme.of(context).primary,
                  textStyle: FlutterFlowTheme.of(context).titleSmall.override(
                        fontFamily: 'DM Sans',
                        color: FlutterFlowTheme.of(context).info,
                        letterSpacing: 0.0,
                      ),
                  elevation: 0.0,
                  borderSide: BorderSide(
                    color: Colors.transparent,
                    width: 1.0,
                  ),
                  borderRadius: BorderRadius.circular(8.0),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
