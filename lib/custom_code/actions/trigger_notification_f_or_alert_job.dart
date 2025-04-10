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

import '../../backend/push_notifications/push_notifications_util.dart';
import 'index.dart'; // Imports other custom actions

Future triggerNotificationFOrAlertJob(
    JobDetailsRecord job, DocumentReference user, String photoURL) async {
  // Add your function code here!

  List<DateTime> dateTimeList = [];

  for (DateTime date = job.startDate!;
      date.isBefore(job.endDate!.add(const Duration(days: 1)));
      date = date.add(const Duration(days: 1))) {
    dateTimeList.add(DateTime(
      date.year,
      date.month,
      date.day,
      job.timing.startTime!.hour,
      job.timing.startTime!.minute,
    ));
  }

  for (var date in dateTimeList) {
    triggerPushNotification(
      notificationTitle: job.jobName,
      notificationText: 'Are you at Job location?',
      notificationImageUrl: photoURL,
      scheduledTime: date,
      notificationSound: 'default',
      userRefs: [user],
      initialPageName: 'AdminAlljob',
      parameterData: {
        'jobid': job.reference,
      },
    );
  }
}
