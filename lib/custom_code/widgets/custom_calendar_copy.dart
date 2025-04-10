// Automatic FlutterFlow imports
import '/backend/backend.dart';
import '/backend/schema/structs/index.dart';
import '/backend/schema/enums/enums.dart';
import '/actions/actions.dart' as action_blocks;
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'index.dart'; // Imports other custom widgets
import '/custom_code/actions/index.dart'; // Imports custom actions
import '/flutter_flow/custom_functions.dart'; // Imports custom functions
import 'package:flutter/material.dart';
// Begin custom widget code
// DO NOT REMOVE OR MODIFY THE CODE ABOVE!

import 'index.dart'; // Imports other custom widgets

import 'index.dart'; // Imports other custom widgets

import 'index.dart'; // Imports other custom widgets

import 'package:syncfusion_flutter_datepicker/datepicker.dart';

class CustomCalendarCopy extends StatefulWidget {
  const CustomCalendarCopy({
    super.key,
    this.width,
    this.height,
    required this.startDate,
    required this.endDate,
    required this.jobName,
  });

  final double? width;
  final double? height;
  final List<DateTime> startDate;
  final List<DateTime> endDate;
  final List<String> jobName;

  @override
  State<CustomCalendarCopy> createState() => _CustomCalendarCopyState();
}

class _CustomCalendarCopyState extends State<CustomCalendarCopy> {
  List<PickerDateRange> selectedRanges = [];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < widget.startDate.length; i++) {
      selectedRanges
          .add(PickerDateRange(widget.startDate[i], widget.endDate[i]));
    }

    print("selectedRanges : ${selectedRanges}");
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        SfDateRangePicker(
          monthViewSettings: DateRangePickerMonthViewSettings(
            showTrailingAndLeadingDates: true,
          ),
          headerHeight: 70,
          toggleDaySelection: false,
          selectionRadius: 4,
          view: DateRangePickerView.month,
          selectionMode: DateRangePickerSelectionMode.multiRange,
          todayHighlightColor: Color(0xff5f1178),
          selectionTextStyle:
              const TextStyle(color: Colors.white, fontSize: 17),
          headerStyle: DateRangePickerHeaderStyle(
              backgroundColor: Color(0xfff5f5f5),
              textAlign: TextAlign.center,
              textStyle: TextStyle(
                  color: Color(0xff5f1178),
                  fontWeight: FontWeight.w600,
                  fontSize: 17)),
          selectionColor: Color(0xfff5f5f5),
          selectionShape: DateRangePickerSelectionShape.rectangle,
          startRangeSelectionColor: Color(0xff22577a),
          endRangeSelectionColor: Color(0xff22577a),
          rangeSelectionColor: Color(0xff22577a).applyAlpha(0.75),
          showNavigationArrow: true,
          backgroundColor: Color(0xfff5f5f5),
          viewSpacing: 10,
          showActionButtons: false,
          rangeTextStyle: const TextStyle(color: Colors.white, fontSize: 17),
          showTodayButton: false,
          monthCellStyle: DateRangePickerMonthCellStyle(
            textStyle: TextStyle(color: Color(0xff848484)),
            todayTextStyle: TextStyle(color: Color(0xff5f1178)),
            todayCellDecoration: BoxDecoration(
              border: Border.all(color: Color(0xff5f1178)),
              borderRadius: BorderRadius.all(Radius.circular(10)),
              shape: BoxShape.rectangle,
            ),
          ),
          initialSelectedRanges: selectedRanges,
          onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
            // Do nothing here to disable selection
          },
        ),
        Padding(
          padding: const EdgeInsets.only(top: 60),
          child: Container(
            width: double.infinity,
            height: double.infinity,
            color: Colors.transparent,
          ),
        ),
      ],
    );
  }
}
