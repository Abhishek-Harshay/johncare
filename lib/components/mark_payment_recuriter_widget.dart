import '/auth/firebase_auth/auth_util.dart';
import '/backend/backend.dart';
import '/backend/push_notifications/push_notifications_util.dart';
import '/components/review_candidate_web_widget.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/flutter_flow/custom_functions.dart' as functions;
import 'package:flutter/material.dart';
import 'mark_payment_recuriter_model.dart';
export 'mark_payment_recuriter_model.dart';

class MarkPaymentRecuriterWidget extends StatefulWidget {
  const MarkPaymentRecuriterWidget({
    super.key,
    required this.job,
  });

  final DocumentReference? job;

  @override
  State<MarkPaymentRecuriterWidget> createState() =>
      _MarkPaymentRecuriterWidgetState();
}

class _MarkPaymentRecuriterWidgetState
    extends State<MarkPaymentRecuriterWidget> {
  late MarkPaymentRecuriterModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => MarkPaymentRecuriterModel());

    _model.instructionsTextController ??= TextEditingController();
    _model.instructionsFocusNode ??= FocusNode();

    _model.arrivalHoursFocusNode ??= FocusNode();

    _model.totalPayCustomFocusNode ??= FocusNode();

    WidgetsBinding.instance.addPostFrameCallback((_) => safeSetState(() {}));
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<JobDetailsRecord>(
      stream: JobDetailsRecord.getDocument(widget.job!),
      builder: (context, snapshot) {
        // Customize what your widget looks like when it's loading.
        if (!snapshot.hasData) {
          return Center(
            child: SizedBox(
              width: 50.0,
              height: 50.0,
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(
                  FlutterFlowTheme.of(context).primary,
                ),
              ),
            ),
          );
        }

        final containerJobDetailsRecord = snapshot.data!;

        return Container(
          width: MediaQuery.sizeOf(context).width * 0.4,
          decoration: BoxDecoration(
            color: FlutterFlowTheme.of(context).secondaryBackground,
            borderRadius: BorderRadius.circular(35.0),
          ),
          child: InkWell(
            splashColor: Colors.transparent,
            focusColor: Colors.transparent,
            hoverColor: Colors.transparent,
            highlightColor: Colors.transparent,
            onTap: () async {
              Navigator.pop(context);
            },
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Row(
                  mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Align(
                        alignment: AlignmentDirectional(0.0, 0.0),
                        child: Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(
                              25.0, 30.0, 0.0, 0.0),
                          child: Text(
                            'Healthcare Providers Job Confirmation',
                            style: FlutterFlowTheme.of(context)
                                .bodyMedium
                                .override(
                                  fontFamily: 'DM Sans',
                                  fontSize: 22.0,
                                  letterSpacing: 0.0,
                                  fontWeight: FontWeight.w600,
                                ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding:
                          EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 25.0, 0.0),
                      child: InkWell(
                        splashColor: Colors.transparent,
                        focusColor: Colors.transparent,
                        hoverColor: Colors.transparent,
                        highlightColor: Colors.transparent,
                        onTap: () async {
                          Navigator.pop(context);
                        },
                        child: Icon(
                          Icons.close_rounded,
                          color: FlutterFlowTheme.of(context).primaryText,
                          size: 24.0,
                        ),
                      ),
                    ),
                  ],
                ),
                Padding(
                  padding:
                      EdgeInsetsDirectional.fromSTEB(20.0, 20.0, 20.0, 0.0),
                  child: SingleChildScrollView(
                    child: Column(
                      mainAxisSize: MainAxisSize.max,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Column(
                          mainAxisSize: MainAxisSize.max,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            RichText(
                              textScaler: MediaQuery.of(context).textScaler,
                              text: TextSpan(
                                children: [
                                  TextSpan(
                                    text: 'Any Specific Instructions',
                                    style: FlutterFlowTheme.of(context)
                                        .bodyMedium
                                        .override(
                                          fontFamily: 'DM Sans',
                                          fontSize: 16.0,
                                          letterSpacing: 0.0,
                                          fontWeight: FontWeight.w500,
                                        ),
                                  ),
                                  TextSpan(
                                    text: ' (Optional)',
                                    style: TextStyle(
                                      color: Color(0xFF89969F),
                                      fontSize: 14.0,
                                    ),
                                  )
                                ],
                                style: FlutterFlowTheme.of(context)
                                    .bodyMedium
                                    .override(
                                      fontFamily: 'DM Sans',
                                      fontSize: 16.0,
                                      letterSpacing: 0.0,
                                      fontWeight: FontWeight.w500,
                                    ),
                              ),
                            ),
                            Container(
                              width: double.infinity,
                              child: TextFormField(
                                controller: _model.instructionsTextController,
                                focusNode: _model.instructionsFocusNode,
                                autofocus: false,
                                autofillHints: [AutofillHints.email],
                                obscureText: false,
                                decoration: InputDecoration(
                                  labelStyle: FlutterFlowTheme.of(context)
                                      .labelMedium
                                      .override(
                                        fontFamily: 'DM Sans',
                                        color: Color(0xFF89969F),
                                        fontSize: 16.0,
                                        letterSpacing: 0.0,
                                        fontWeight: FontWeight.w500,
                                      ),
                                  hintText: 'Write job description..',
                                  hintStyle: FlutterFlowTheme.of(context)
                                      .bodyMedium
                                      .override(
                                        fontFamily: 'DM Sans',
                                        color: Color(0xFF89969F),
                                        letterSpacing: 0.0,
                                      ),
                                  enabledBorder: OutlineInputBorder(
                                    borderSide: BorderSide(
                                      color: Color(0xFFC0D1DC),
                                      width: 1.0,
                                    ),
                                    borderRadius: BorderRadius.circular(12.0),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderSide: BorderSide(
                                      color:
                                          FlutterFlowTheme.of(context).primary,
                                      width: 1.0,
                                    ),
                                    borderRadius: BorderRadius.circular(12.0),
                                  ),
                                  errorBorder: OutlineInputBorder(
                                    borderSide: BorderSide(
                                      color: FlutterFlowTheme.of(context).error,
                                      width: 1.0,
                                    ),
                                    borderRadius: BorderRadius.circular(12.0),
                                  ),
                                  focusedErrorBorder: OutlineInputBorder(
                                    borderSide: BorderSide(
                                      color: FlutterFlowTheme.of(context).error,
                                      width: 1.0,
                                    ),
                                    borderRadius: BorderRadius.circular(12.0),
                                  ),
                                  filled: true,
                                  fillColor: FlutterFlowTheme.of(context)
                                      .secondaryBackground,
                                ),
                                style: FlutterFlowTheme.of(context)
                                    .bodyMedium
                                    .override(
                                      fontFamily: 'DM Sans',
                                      letterSpacing: 0.0,
                                    ),
                                maxLines: 6,
                                validator: _model
                                    .instructionsTextControllerValidator
                                    .asValidator(context),
                              ),
                            ),
                          ].divide(SizedBox(height: 10.0)),
                        ),
                        RichText(
                          textScaler: MediaQuery.of(context).textScaler,
                          text: TextSpan(
                            children: [
                              TextSpan(
                                text: 'Arrival Hours',
                                style: FlutterFlowTheme.of(context)
                                    .labelMedium
                                    .override(
                                      fontFamily: 'DM Sans',
                                      color: FlutterFlowTheme.of(context)
                                          .primaryText,
                                      fontSize: 16.0,
                                      letterSpacing: 0.0,
                                      fontWeight: FontWeight.w500,
                                    ),
                              )
                            ],
                            style: FlutterFlowTheme.of(context)
                                .labelMedium
                                .override(
                                  fontFamily: 'DM Sans',
                                  color:
                                      FlutterFlowTheme.of(context).primaryText,
                                  fontSize: 16.0,
                                  letterSpacing: 0.0,
                                  fontWeight: FontWeight.w500,
                                ),
                          ),
                        ),
                        Container(
                          width: double.infinity,
                          child: TextFormField(
                            controller: _model.arrivalHoursTextController ??=
                                TextEditingController(
                              text: (containerJobDetailsRecord.attendanceJob
                                          .where((e) => e.isConfirmedArrived)
                                          .toList()
                                          .length *
                                      (containerJobDetailsRecord.duration /
                                          containerJobDetailsRecord
                                              .attendanceJob.length))
                                  .toString(),
                            ),
                            focusNode: _model.arrivalHoursFocusNode,
                            autofocus: false,
                            autofillHints: [AutofillHints.email],
                            readOnly: true,
                            obscureText: false,
                            decoration: InputDecoration(
                              labelStyle: FlutterFlowTheme.of(context)
                                  .labelMedium
                                  .override(
                                    fontFamily: 'DM Sans',
                                    color: Color(0xFF89969F),
                                    fontSize: 16.0,
                                    letterSpacing: 0.0,
                                    fontWeight: FontWeight.w500,
                                  ),
                              hintStyle: FlutterFlowTheme.of(context)
                                  .bodyMedium
                                  .override(
                                    fontFamily: 'DM Sans',
                                    color: Color(0xFF89969F),
                                    letterSpacing: 0.0,
                                  ),
                              enabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                  color: Color(0xFFC0D1DC),
                                  width: 1.0,
                                ),
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                  color: FlutterFlowTheme.of(context).primary,
                                  width: 1.0,
                                ),
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                              errorBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                  color: FlutterFlowTheme.of(context).error,
                                  width: 1.0,
                                ),
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                              focusedErrorBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                  color: FlutterFlowTheme.of(context).error,
                                  width: 1.0,
                                ),
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                              filled: true,
                              fillColor: FlutterFlowTheme.of(context)
                                  .secondaryBackground,
                            ),
                            style: FlutterFlowTheme.of(context)
                                .bodyMedium
                                .override(
                                  fontFamily: 'DM Sans',
                                  letterSpacing: 0.0,
                                ),
                            validator: _model
                                .arrivalHoursTextControllerValidator
                                .asValidator(context),
                          ),
                        ),
                        RichText(
                          textScaler: MediaQuery.of(context).textScaler,
                          text: TextSpan(
                            children: [
                              TextSpan(
                                text: '  [Total Payable Amount : ',
                                style: TextStyle(),
                              ),
                              TextSpan(
                                text: '\$',
                                style: TextStyle(),
                              ),
                              TextSpan(
                                text: containerJobDetailsRecord.totalPay
                                    .toString(),
                                style: TextStyle(),
                              ),
                              TextSpan(
                                text: ' ]',
                                style: TextStyle(),
                              )
                            ],
                            style: FlutterFlowTheme.of(context)
                                .labelMedium
                                .override(
                                  fontFamily: 'DM Sans',
                                  color:
                                      FlutterFlowTheme.of(context).primaryText,
                                  fontSize: 16.0,
                                  letterSpacing: 0.0,
                                  fontWeight: FontWeight.w500,
                                ),
                          ),
                        ),
                        Container(
                          width: double.infinity,
                          child: TextFormField(
                            controller: _model.totalPayCustomTextController ??=
                                TextEditingController(
                              text: ((containerJobDetailsRecord.attendanceJob
                                              .where(
                                                  (e) => e.isConfirmedArrived)
                                              .toList()
                                              .length *
                                          (containerJobDetailsRecord.duration /
                                              containerJobDetailsRecord
                                                  .attendanceJob.length)) *
                                      containerJobDetailsRecord.hourlyPay
                                          .toDouble())
                                  .toString(),
                            ),
                            focusNode: _model.totalPayCustomFocusNode,
                            autofocus: false,
                            autofillHints: [AutofillHints.email],
                            obscureText: false,
                            decoration: InputDecoration(
                              labelStyle: FlutterFlowTheme.of(context)
                                  .labelMedium
                                  .override(
                                    fontFamily: 'DM Sans',
                                    color: Color(0xFF89969F),
                                    fontSize: 16.0,
                                    letterSpacing: 0.0,
                                    fontWeight: FontWeight.w500,
                                  ),
                              hintStyle: FlutterFlowTheme.of(context)
                                  .bodyMedium
                                  .override(
                                    fontFamily: 'DM Sans',
                                    color: Color(0xFF89969F),
                                    letterSpacing: 0.0,
                                  ),
                              enabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                  color: Color(0xFFC0D1DC),
                                  width: 1.0,
                                ),
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                  color: FlutterFlowTheme.of(context).primary,
                                  width: 1.0,
                                ),
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                              errorBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                  color: FlutterFlowTheme.of(context).error,
                                  width: 1.0,
                                ),
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                              focusedErrorBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                  color: FlutterFlowTheme.of(context).error,
                                  width: 1.0,
                                ),
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                              filled: true,
                              fillColor: FlutterFlowTheme.of(context)
                                  .secondaryBackground,
                            ),
                            style: FlutterFlowTheme.of(context)
                                .bodyMedium
                                .override(
                                  fontFamily: 'DM Sans',
                                  letterSpacing: 0.0,
                                ),
                            validator: _model
                                .totalPayCustomTextControllerValidator
                                .asValidator(context),
                          ),
                        ),
                      ].divide(SizedBox(height: 15.0)),
                    ),
                  ),
                ),
                Padding(
                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 25.0, 0.0, 25.0),
                  child: Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Align(
                        alignment: AlignmentDirectional(1.0, 0.0),
                        child: Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(
                              0.0, 0.0, 10.0, 0.0),
                          child: FFButtonWidget(
                            onPressed: () async {
                              context.safePop();
                            },
                            text: 'Cancel',
                            options: FFButtonOptions(
                              width: 160.0,
                              height: 44.0,
                              padding: EdgeInsets.all(0.0),
                              iconPadding: EdgeInsetsDirectional.fromSTEB(
                                  0.0, 0.0, 0.0, 0.0),
                              color: Colors.transparent,
                              textStyle: FlutterFlowTheme.of(context)
                                  .titleSmall
                                  .override(
                                    fontFamily: 'DM Sans',
                                    color: Color(0xFF22577A),
                                    letterSpacing: 0.0,
                                  ),
                              elevation: 0.0,
                              borderSide: BorderSide(
                                color: Color(0xFF22577A),
                                width: 1.0,
                              ),
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment: AlignmentDirectional(1.0, 0.0),
                        child: Builder(
                          builder: (context) => FFButtonWidget(
                            onPressed: () async {
                              await widget.job!
                                  .update(createJobDetailsRecordData(
                                jobStatus: 'Completed',
                              ));

                              await containerJobDetailsRecord.chat!
                                  .update(createChatsRecordData(
                                isChatDisable: true,
                              ));
                              _model.job =
                                  await JobDetailsRecord.getDocumentOnce(
                                      widget.job!);
                              _model.hiredUser =
                                  await UsersRecord.getDocumentOnce(
                                      _model.job!.hiredApplicant!);

                              await _model.hiredUser!.reference.update({
                                ...mapToFirestore(
                                  {
                                    'bookedSolts': FieldValue.arrayRemove([
                                      getSlotsFirestoreData(
                                        updateSlotsStruct(
                                          functions.removeSlots(
                                              widget.job!,
                                              _model.hiredUser!.bookedSolts
                                                  .toList()),
                                          clearUnsetFields: false,
                                        ),
                                        true,
                                      )
                                    ]),
                                  },
                                ),
                              });
                              _model.providerDetails =
                                  await ProviderDetailRecord.getDocumentOnce(
                                      _model.hiredUser!.providerdetail!);

                              await currentUserReference!.update({
                                ...mapToFirestore(
                                  {
                                    'SpendsJobs': FieldValue.arrayUnion([
                                      getRecuriterSpendsJobsFirestoreData(
                                        createRecuriterSpendsJobsStruct(
                                          job: widget.job,
                                          hProvidersname:
                                              '${_model.providerDetails?.personalinformation.firstName} ${_model.providerDetails?.personalinformation.lastName}',
                                          paymentDate: getCurrentTimestamp,
                                          hourlyRate: containerJobDetailsRecord
                                              .hourlyPay
                                              .toDouble(),
                                          payment: containerJobDetailsRecord
                                              .totalPay,
                                          clearUnsetFields: false,
                                        ),
                                        true,
                                      )
                                    ]),
                                  },
                                ),
                              });

                              await _model.hiredUser!.reference.update({
                                ...mapToFirestore(
                                  {
                                    'userCompletedJobs': FieldValue.arrayUnion([
                                      getUserCompletedJobFirestoreData(
                                        createUserCompletedJobStruct(
                                          job: widget.job,
                                          paymentType: 'Online',
                                          workedhours: 10.0,
                                          paymentDate: getCurrentTimestamp,
                                          payment: containerJobDetailsRecord
                                              .totalPay,
                                          clearUnsetFields: false,
                                        ),
                                        true,
                                      )
                                    ]),
                                  },
                                ),
                              });
                              _model.business =
                                  await BusinessdetailRecord.getDocumentOnce(
                                      currentUserDocument!.buisnessdetail!);

                              await TransactionsRecord.collection
                                  .doc(functions.generateUniqueId())
                                  .set(createTransactionsRecordData(
                                    review: 4.5,
                                    clinicsname:
                                        '${_model.business?.primaryContactInformation.firstName} ${_model.business?.primaryContactInformation.firstName}',
                                    providersname:
                                        '${_model.providerDetails?.personalinformation.firstName} ${_model.providerDetails?.personalinformation.lastName}',
                                    jobtitle: containerJobDetailsRecord.jobName,
                                    jobID: widget.job?.id,
                                    enddate: containerJobDetailsRecord.endDate,
                                    payment: containerJobDetailsRecord.totalPay
                                        .toString(),
                                    totalamount:
                                        containerJobDetailsRecord.totalPay,
                                    commissionamount: 0.0,
                                    status: 'Success',
                                    user: currentUserReference,
                                    job: widget.job,
                                    createdTime: getCurrentTimestamp,
                                  ));
                              _model.businesss =
                                  await BusinessdetailRecord.getDocumentOnce(
                                      currentUserDocument!.buisnessdetail!);

                              await currentUserReference!.update({
                                ...createUsersRecordData(
                                  totalSpends: double.tryParse(
                                      _model.totalPayCustomTextController.text),
                                ),
                                ...mapToFirestore(
                                  {
                                    'onHold': FieldValue.increment(
                                        -(containerJobDetailsRecord.totalPay)),
                                    'Wallet': FieldValue.increment(
                                        containerJobDetailsRecord.totalPay -
                                            double.parse(_model
                                                .totalPayCustomTextController
                                                .text)),
                                  },
                                ),
                              });
                              triggerPushNotification(
                                notificationTitle: 'Your Job Completed !',
                                notificationText:
                                    'You’ve successfully completed job and the owner ${valueOrDefault<String>(
                                  _model.business?.primaryContactInformation
                                      .firstName,
                                  'Unknown',
                                )} , is Confirmed Marked Completed Job.Great job! Ready for your next assignment?',
                                notificationImageUrl: currentUserPhoto != ''
                                    ? currentUserPhoto
                                    : 'https://firebasestorage.googleapis.com/v0/b/backup13thfeb-a0ssgv.firebasestorage.app/o/1000301822_1719697644.png?alt=media&token=c0a9bbf1-f5bb-46fe-95a9-dcd7eabef8d5',
                                notificationSound: 'default',
                                userRefs: [_model.job!.hiredApplicant!],
                                initialPageName: 'JobseekerDashboard',
                                parameterData: {
                                  'index': 3,
                                },
                              );

                              await NotificationsRecord.collection.doc().set({
                                ...createNotificationsRecordData(
                                  fromUser: currentUserReference,
                                  job: widget.job,
                                  message:
                                      'You’ve successfully completed job and the owner ${valueOrDefault<String>(
                                    _model.business?.primaryContactInformation
                                        .firstName,
                                    'Unknown',
                                  )} , is Confirmed Marked Completed Job.Great job! Ready for your next assignment?',
                                  subject: 'Your Job Completed !',
                                  time: getCurrentTimestamp,
                                  type: 'Completed',
                                  image: currentUserPhoto != ''
                                      ? currentUserPhoto
                                      : 'https://firebasestorage.googleapis.com/v0/b/backup13thfeb-a0ssgv.firebasestorage.app/o/1000301822_1719697644.png?alt=media&token=c0a9bbf1-f5bb-46fe-95a9-dcd7eabef8d5',
                                ),
                                ...mapToFirestore(
                                  {
                                    'toUsers': [_model.job?.hiredApplicant],
                                  },
                                ),
                              });
                              Navigator.pop(context);
                              await showDialog(
                                context: context,
                                builder: (dialogContext) {
                                  return Dialog(
                                    elevation: 0,
                                    insetPadding: EdgeInsets.zero,
                                    backgroundColor: Colors.transparent,
                                    alignment: AlignmentDirectional(0.0, 0.0)
                                        .resolve(Directionality.of(context)),
                                    child: ReviewCandidateWebWidget(
                                      job: widget.job!,
                                    ),
                                  );
                                },
                              );

                              safeSetState(() {});
                            },
                            text: 'Save',
                            options: FFButtonOptions(
                              width: 160.0,
                              height: 44.0,
                              padding: EdgeInsetsDirectional.fromSTEB(
                                  0.0, 0.0, 0.0, 0.0),
                              iconPadding: EdgeInsetsDirectional.fromSTEB(
                                  0.0, 0.0, 0.0, 0.0),
                              color: Color(0xFF22577A),
                              textStyle: FlutterFlowTheme.of(context)
                                  .titleSmall
                                  .override(
                                    fontFamily: 'DM Sans',
                                    color: Colors.white,
                                    letterSpacing: 0.0,
                                  ),
                              elevation: 3.0,
                              borderSide: BorderSide(
                                color: Colors.transparent,
                                width: 1.0,
                              ),
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
