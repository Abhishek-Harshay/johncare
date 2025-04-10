import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class LocationRecord extends FirestoreRecord {
  LocationRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "Business" field.
  DocumentReference? _business;
  DocumentReference? get business => _business;
  bool hasBusiness() => _business != null;

  // "Street" field.
  String? _street;
  String get street => _street ?? '';
  bool hasStreet() => _street != null;

  // "CityName" field.
  String? _cityName;
  String get cityName => _cityName ?? '';
  bool hasCityName() => _cityName != null;

  // "Province" field.
  String? _province;
  String get province => _province ?? '';
  bool hasProvince() => _province != null;

  // "PostalCode" field.
  String? _postalCode;
  String get postalCode => _postalCode ?? '';
  bool hasPostalCode() => _postalCode != null;

  // "location" field.
  LatLng? _location;
  LatLng? get location => _location;
  bool hasLocation() => _location != null;

  void _initializeFields() {
    _business = snapshotData['Business'] as DocumentReference?;
    _street = snapshotData['Street'] as String?;
    _cityName = snapshotData['CityName'] as String?;
    _province = snapshotData['Province'] as String?;
    _postalCode = snapshotData['PostalCode'] as String?;
    _location = snapshotData['location'] as LatLng?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('Location');

  static Stream<LocationRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => LocationRecord.fromSnapshot(s));

  static Future<LocationRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => LocationRecord.fromSnapshot(s));

  static LocationRecord fromSnapshot(DocumentSnapshot snapshot) =>
      LocationRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static LocationRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      LocationRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'LocationRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is LocationRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createLocationRecordData({
  DocumentReference? business,
  String? street,
  String? cityName,
  String? province,
  String? postalCode,
  LatLng? location,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'Business': business,
      'Street': street,
      'CityName': cityName,
      'Province': province,
      'PostalCode': postalCode,
      'location': location,
    }.withoutNulls,
  );

  return firestoreData;
}

class LocationRecordDocumentEquality implements Equality<LocationRecord> {
  const LocationRecordDocumentEquality();

  @override
  bool equals(LocationRecord? e1, LocationRecord? e2) {
    return e1?.business == e2?.business &&
        e1?.street == e2?.street &&
        e1?.cityName == e2?.cityName &&
        e1?.province == e2?.province &&
        e1?.postalCode == e2?.postalCode &&
        e1?.location == e2?.location;
  }

  @override
  int hash(LocationRecord? e) => const ListEquality().hash([
        e?.business,
        e?.street,
        e?.cityName,
        e?.province,
        e?.postalCode,
        e?.location
      ]);

  @override
  bool isValidKey(Object? o) => o is LocationRecord;
}
