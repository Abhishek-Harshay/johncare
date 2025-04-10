import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class NotificationsRecord extends FirestoreRecord {
  NotificationsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "fromUser" field.
  DocumentReference? _fromUser;
  DocumentReference? get fromUser => _fromUser;
  bool hasFromUser() => _fromUser != null;

  // "job" field.
  DocumentReference? _job;
  DocumentReference? get job => _job;
  bool hasJob() => _job != null;

  // "message" field.
  String? _message;
  String get message => _message ?? '';
  bool hasMessage() => _message != null;

  // "subject" field.
  String? _subject;
  String get subject => _subject ?? '';
  bool hasSubject() => _subject != null;

  // "time" field.
  DateTime? _time;
  DateTime? get time => _time;
  bool hasTime() => _time != null;

  // "toUsers" field.
  List<DocumentReference>? _toUsers;
  List<DocumentReference> get toUsers => _toUsers ?? const [];
  bool hasToUsers() => _toUsers != null;

  // "type" field.
  String? _type;
  String get type => _type ?? '';
  bool hasType() => _type != null;

  // "image" field.
  String? _image;
  String get image => _image ?? '';
  bool hasImage() => _image != null;

  void _initializeFields() {
    _fromUser = snapshotData['fromUser'] as DocumentReference?;
    _job = snapshotData['job'] as DocumentReference?;
    _message = snapshotData['message'] as String?;
    _subject = snapshotData['subject'] as String?;
    _time = snapshotData['time'] as DateTime?;
    _toUsers = getDataList(snapshotData['toUsers']);
    _type = snapshotData['type'] as String?;
    _image = snapshotData['image'] as String?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('Notifications');

  static Stream<NotificationsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => NotificationsRecord.fromSnapshot(s));

  static Future<NotificationsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => NotificationsRecord.fromSnapshot(s));

  static NotificationsRecord fromSnapshot(DocumentSnapshot snapshot) =>
      NotificationsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static NotificationsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      NotificationsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'NotificationsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is NotificationsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createNotificationsRecordData({
  DocumentReference? fromUser,
  DocumentReference? job,
  String? message,
  String? subject,
  DateTime? time,
  String? type,
  String? image,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'fromUser': fromUser,
      'job': job,
      'message': message,
      'subject': subject,
      'time': time,
      'type': type,
      'image': image,
    }.withoutNulls,
  );

  return firestoreData;
}

class NotificationsRecordDocumentEquality
    implements Equality<NotificationsRecord> {
  const NotificationsRecordDocumentEquality();

  @override
  bool equals(NotificationsRecord? e1, NotificationsRecord? e2) {
    const listEquality = ListEquality();
    return e1?.fromUser == e2?.fromUser &&
        e1?.job == e2?.job &&
        e1?.message == e2?.message &&
        e1?.subject == e2?.subject &&
        e1?.time == e2?.time &&
        listEquality.equals(e1?.toUsers, e2?.toUsers) &&
        e1?.type == e2?.type &&
        e1?.image == e2?.image;
  }

  @override
  int hash(NotificationsRecord? e) => const ListEquality().hash([
        e?.fromUser,
        e?.job,
        e?.message,
        e?.subject,
        e?.time,
        e?.toUsers,
        e?.type,
        e?.image
      ]);

  @override
  bool isValidKey(Object? o) => o is NotificationsRecord;
}
