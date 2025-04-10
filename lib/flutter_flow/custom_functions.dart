import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:timeago/timeago.dart' as timeago;
import 'lat_lng.dart';
import 'place.dart';
import 'uploaded_file.dart';
import '/backend/backend.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '/backend/schema/structs/index.dart';
import '/backend/schema/enums/enums.dart';
import '/auth/firebase_auth/auth_util.dart';

DateTime convertStringToDateTime(String date) {
  if (date.isEmpty) {
    return DateTime.now();
  }

  List<String> parts = date.split('/');

  if (parts.length != 3) {
    throw FormatException("Invalid date format");
  }

  // Extract day, month, and year
  int day = int.parse(parts[0]);
  int month = int.parse(parts[1]);
  int year = int.parse(parts[2]);

  // Return DateTime object
  return DateTime(year, month, day);
}

List<AttendanceStruct> updateAttendceCopy(
  int index,
  List<AttendanceStruct> currentList,
) {
  List<AttendanceStruct> attendance = List.from(currentList);

  attendance[index] = AttendanceStruct(
      isSendRequest: true,
      isConfirmedArrived: attendance[index].isConfirmedArrived,
      date: attendance[index].date,
      arrivalTime: DateTime.now());

  return attendance;
}

String convertDateTimeToString(DateTime? dateTime) {
  if (dateTime == null) {
    return '';
  }

  String day = dateTime.day.toString().padLeft(2, '0');
  String month = dateTime.month.toString().padLeft(2, '0');
  String year = dateTime.year.toString();

  return "$day/$month/$year";
}

bool isDateBetween(
  DateTime dateToCheck,
  DateTime startDate,
  DateTime endDate,
) {
  return (dateToCheck.isAfter(startDate) ||
          dateToCheck.isAtSameMomentAs(startDate)) &&
      (dateToCheck.isBefore(endDate) || dateToCheck.isAtSameMomentAs(endDate));
}

String generateUniqueId() {
  final random = math.Random();
  const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  String uniqueId = '';

  for (int i = 0; i < 7; i++) {
    uniqueId += characters[random.nextInt(characters.length)];
  }

  return uniqueId;
}

DateTime addMonthDuration(DateTime date) {
  return date.add(Duration(days: 30));
}

double totalSpends(List<RecuriterSpendsJobsStruct> spends) {
  double sum = 0;

  for (var data in spends) {
    sum = sum + data.payment;
  }

  return sum;
}

double last12MonthsEarning(List<UserCompletedJobStruct> earn) {
  double sum = 0;
  DateTime currentDate = DateTime.now();
  DateTime twelveMonthsAgo =
      currentDate.subtract(Duration(days: 365)); // 12 months ago

  for (var data in earn) {
    // Check if the paymentDate is within the last 12 months
    if (data.paymentDate!.isAfter(twelveMonthsAgo)) {
      sum = sum + data.payment;
    }
  }

  return sum;
}

double totalEaring(List<UserCompletedJobStruct> earn) {
  double sum = 0;

  for (var data in earn) {
    sum = sum + data.payment;
  }

  return sum;
}

double totalSubscription(List<SubscriptionsRecord> earn) {
  double sum = 0;

  for (var data in earn) {
    sum = sum + data.amount;
  }

  return sum;
}

int last24Subscription(List<SubscriptionsRecord> subscirptions) {
  int count = 0;
  DateTime currentDate = DateTime.now();
  DateTime twentyFourHoursAgo =
      currentDate.subtract(Duration(hours: 24)); // 24 hours ago

  for (var subscription in subscirptions) {
    // Check if the created field is within the last 24 hours
    if (subscription.createdTime!.isAfter(twentyFourHoursAgo)) {
      count++; // Count the subscriptions created within the last 24 hours
    }
  }

  return count;
}

bool isSlotAvailable(
  List<SlotsStruct> bookedSlots,
  SlotsStruct newSlot,
) {
  DateTime convertStringToDateTime(String date) {
    List<String> parts = date.split('/');

    if (parts.length != 3) {
      throw FormatException("Invalid date format");
    }

    // Extract day, month, and year
    int day = int.parse(parts[0]);
    int month = int.parse(parts[1]);
    int year = int.parse(parts[2]);

    // Return DateTime object
    return DateTime(year, month, day);
  }

  DateTime newStartDate = convertStringToDateTime(newSlot.startDate);
  DateTime newEndDate = convertStringToDateTime(newSlot.endDate);

  for (var slot in bookedSlots) {
    DateTime bookedStartDate = convertStringToDateTime(slot.startDate);
    DateTime bookedEndDate = convertStringToDateTime(slot.endDate);

    // Check for overlap
    if (!(newEndDate.isBefore(bookedStartDate) ||
        newStartDate.isAfter(bookedEndDate))) {
      return false; // Overlapping, user can't apply
    }
  }
  return true;
}

double countDuration(
  DateTime startTime,
  DateTime endTime,
  DateTime startDate,
  DateTime endDate,
) {
  if (startTime != null &&
      endTime != null &&
      startDate != null &&
      endDate != null) {
    double hoursPerDay = endTime.difference(startTime).inMinutes / 60.0;

    // Calculate the number of days (inclusive)
    int numberOfDays = endDate.difference(startDate).inDays + 1;

    // Total duration in hours
    return double.parse((hoursPerDay * numberOfDays).toStringAsFixed(2));
  }
  return 0;
}

double countTotalPay(
  double hourlyPay,
  double duration,
) {
  return double.parse((hourlyPay * duration).toStringAsFixed(2));
}

SlotsStruct removeSlots(
  DocumentReference job,
  List<SlotsStruct> allSlots,
) {
  return allSlots.where((e) => e.job == job).first;
}

List<String> splitAtFirstComma(String input) {
  int idx = input.indexOf(',');
  if (idx == -1) {
    return [input];
  }
  return [input.substring(0, idx), input.substring(idx + 2)];
}

List<AttendanceStruct> makeAttendanceJob(JobDetailsRecord job) {
  List<AttendanceStruct> attendance = [];

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
    attendance.add(AttendanceStruct(
        arrivalTime: job.timing.startTime,
        date: date,
        isConfirmedArrived: false,
        isSendRequest: false));
  }

  return attendance;
}

List<AttendanceStruct> updateAttendce(
  int index,
  List<AttendanceStruct> currentList,
  bool isRequest,
) {
  List<AttendanceStruct> attendance = List.from(currentList);

  if (isRequest) {
    attendance[index] = AttendanceStruct(
        isSendRequest: true,
        isConfirmedArrived: attendance[index].isConfirmedArrived,
        date: attendance[index].date,
        arrivalTime: attendance[index].arrivalTime);
  } else {
    attendance[index] = AttendanceStruct(
        isSendRequest: attendance[index].isSendRequest,
        isConfirmedArrived: true,
        date: attendance[index].date,
        arrivalTime: attendance[index].arrivalTime);
  }

  return attendance;
}

bool isDatePassed(DateTime arrivalDateTime) {
  DateTime currentDateTime = DateTime.now();
  return !arrivalDateTime.isAfter(currentDateTime);
}

List<String> allLangauage() {
  List<String> languages = [
    'English (en)',
    'Spanish (es)',
    'French (fr)',
    'German (de)',
    'Italian (it)',
    'Portuguese (pt)',
    'Japanese (ja)',
    'Korean (ko)',
    'Chinese (zh)',
    'Arabic (ar)',
    'Russian (ru)',
    'Hindi (hi)',
    'Bengali (bn)',
    'Turkish (tr)',
    'Dutch (nl)',
    'Swedish (sv)',
    'Greek (el)',
    'Polish (pl)',
    'Czech (cs)',
    'Hungarian (hu)',
    'Romanian (ro)',
    'Thai (th)',
    'Hebrew (he)',
    'Finnish (fi)',
    'Norwegian (no)',
    'Danish (da)',
    'Indonesian (id)',
    'Malay (ms)',
    'Vietnamese (vi)',
    'Filipino (tl)',
    'Swahili (sw)',
    'Ukrainian (uk)',
    'Tamil (ta)',
    'Telugu (te)',
    'Marathi (mr)',
    'Punjabi (pa)',
    'Gujarati (gu)',
    'Malayalam (ml)',
    'Kannada (kn)',
    'Sinhala (si)',
    'Nepali (ne)',
    'Urdu (ur)',
    'Persian (fa)',
    'Pashto (ps)',
    'Kurdish (ku)',
    'Afrikaans (af)',
    'Icelandic (is)',
    'Latvian (lv)',
    'Estonian (et)',
    'Lithuanian (lt)',
    'Belarusian (be)',
    'Slovak (sk)',
    'Slovenian (sl)',
    'Croatian (hr)',
    'Bosnian (bs)',
    'Serbian (sr)',
    'Macedonian (mk)',
    'Albanian (sq)',
    'Georgian (ka)',
    'Armenian (hy)',
    'Azerbaijani (az)',
    'Kazakh (kk)',
    'Uzbek (uz)',
    'Turkmen (tk)',
    'Mongolian (mn)',
    'Khmer (km)',
    'Lao (lo)',
    'Burmese (my)',
    'Tibetan (bo)',
    'Maltese (mt)',
    'Haitian Creole (ht)',
    'Yiddish (yi)',
    'Basque (eu)',
    'Catalan (ca)',
    'Galician (gl)',
    'Irish (ga)',
    'Scottish Gaelic (gd)',
    'Welsh (cy)',
    'Breton (br)',
    'Corsican (co)',
    'Sicilian (scn)',
    'Neapolitan (nap)',
    'Piedmontese (pms)',
    'Ligurian (lij)',
    'Venetian (vec)',
    'Friulian (fur)',
    'Sardinian (sc)',
    'Romanes (rom)',
  ];

  return languages;
}

DateTime addOneDay(DateTime date) {
  DateTime newDate = date.add(Duration(days: 1));

  return newDate;
}

double updateWalletBalance(
  double jobPrice,
  double currentWallet,
) {
  if (currentWallet > jobPrice) {
    return currentWallet - jobPrice;
  } else {
    return 0;
  }
}
