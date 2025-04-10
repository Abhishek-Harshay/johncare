// Automatic FlutterFlow imports
import '/backend/backend.dart';
import '/backend/schema/structs/index.dart';
import '/backend/schema/enums/enums.dart';
import '/actions/actions.dart' as action_blocks;
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'index.dart'; // Imports other custom actions
import '/flutter_flow/custom_functions.dart'; // Imports custom functions
import 'package:flutter/material.dart';
// Begin custom action code
// DO NOT REMOVE OR MODIFY THE CODE ABOVE!

import 'package:geocoding/geocoding.dart';

Future<LatLng> convertAddressTOLatLng(String address) async {
  // Add your function code here!
  try {
    // Fetch the list of locations from the address
    List<Location> locations = await locationFromAddress(address);

    if (locations.isNotEmpty) {
      // Return the first result as a LatLng
      return LatLng(locations.first.latitude, locations.first.longitude);
    } else {
      return LatLng(0.0, 0.0);
    }
  } catch (e) {
    // Handle errors, maybe return a default location or show an error message
    return LatLng(0.0, 0.0);
  }
}
