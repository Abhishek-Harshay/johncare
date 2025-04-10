// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class CertificationsStruct extends FFFirebaseStruct {
  CertificationsStruct({
    int? professionalLicenseNumber,
    String? issuingBody,
    String? licenseExpiryDate,
    String? otherCertifications,
    String? uploadCertificate,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _professionalLicenseNumber = professionalLicenseNumber,
        _issuingBody = issuingBody,
        _licenseExpiryDate = licenseExpiryDate,
        _otherCertifications = otherCertifications,
        _uploadCertificate = uploadCertificate,
        super(firestoreUtilData);

  // "ProfessionalLicenseNumber" field.
  int? _professionalLicenseNumber;
  int get professionalLicenseNumber => _professionalLicenseNumber ?? 0;
  set professionalLicenseNumber(int? val) => _professionalLicenseNumber = val;

  void incrementProfessionalLicenseNumber(int amount) =>
      professionalLicenseNumber = professionalLicenseNumber + amount;

  bool hasProfessionalLicenseNumber() => _professionalLicenseNumber != null;

  // "IssuingBody" field.
  String? _issuingBody;
  String get issuingBody => _issuingBody ?? '';
  set issuingBody(String? val) => _issuingBody = val;

  bool hasIssuingBody() => _issuingBody != null;

  // "LicenseExpiryDate" field.
  String? _licenseExpiryDate;
  String get licenseExpiryDate => _licenseExpiryDate ?? '';
  set licenseExpiryDate(String? val) => _licenseExpiryDate = val;

  bool hasLicenseExpiryDate() => _licenseExpiryDate != null;

  // "OtherCertifications" field.
  String? _otherCertifications;
  String get otherCertifications => _otherCertifications ?? '';
  set otherCertifications(String? val) => _otherCertifications = val;

  bool hasOtherCertifications() => _otherCertifications != null;

  // "UploadCertificate" field.
  String? _uploadCertificate;
  String get uploadCertificate => _uploadCertificate ?? '';
  set uploadCertificate(String? val) => _uploadCertificate = val;

  bool hasUploadCertificate() => _uploadCertificate != null;

  static CertificationsStruct fromMap(Map<String, dynamic> data) =>
      CertificationsStruct(
        professionalLicenseNumber:
            castToType<int>(data['ProfessionalLicenseNumber']),
        issuingBody: data['IssuingBody'] as String?,
        licenseExpiryDate: data['LicenseExpiryDate'] as String?,
        otherCertifications: data['OtherCertifications'] as String?,
        uploadCertificate: data['UploadCertificate'] as String?,
      );

  static CertificationsStruct? maybeFromMap(dynamic data) => data is Map
      ? CertificationsStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'ProfessionalLicenseNumber': _professionalLicenseNumber,
        'IssuingBody': _issuingBody,
        'LicenseExpiryDate': _licenseExpiryDate,
        'OtherCertifications': _otherCertifications,
        'UploadCertificate': _uploadCertificate,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'ProfessionalLicenseNumber': serializeParam(
          _professionalLicenseNumber,
          ParamType.int,
        ),
        'IssuingBody': serializeParam(
          _issuingBody,
          ParamType.String,
        ),
        'LicenseExpiryDate': serializeParam(
          _licenseExpiryDate,
          ParamType.String,
        ),
        'OtherCertifications': serializeParam(
          _otherCertifications,
          ParamType.String,
        ),
        'UploadCertificate': serializeParam(
          _uploadCertificate,
          ParamType.String,
        ),
      }.withoutNulls;

  static CertificationsStruct fromSerializableMap(Map<String, dynamic> data) =>
      CertificationsStruct(
        professionalLicenseNumber: deserializeParam(
          data['ProfessionalLicenseNumber'],
          ParamType.int,
          false,
        ),
        issuingBody: deserializeParam(
          data['IssuingBody'],
          ParamType.String,
          false,
        ),
        licenseExpiryDate: deserializeParam(
          data['LicenseExpiryDate'],
          ParamType.String,
          false,
        ),
        otherCertifications: deserializeParam(
          data['OtherCertifications'],
          ParamType.String,
          false,
        ),
        uploadCertificate: deserializeParam(
          data['UploadCertificate'],
          ParamType.String,
          false,
        ),
      );

  @override
  String toString() => 'CertificationsStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is CertificationsStruct &&
        professionalLicenseNumber == other.professionalLicenseNumber &&
        issuingBody == other.issuingBody &&
        licenseExpiryDate == other.licenseExpiryDate &&
        otherCertifications == other.otherCertifications &&
        uploadCertificate == other.uploadCertificate;
  }

  @override
  int get hashCode => const ListEquality().hash([
        professionalLicenseNumber,
        issuingBody,
        licenseExpiryDate,
        otherCertifications,
        uploadCertificate
      ]);
}

CertificationsStruct createCertificationsStruct({
  int? professionalLicenseNumber,
  String? issuingBody,
  String? licenseExpiryDate,
  String? otherCertifications,
  String? uploadCertificate,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    CertificationsStruct(
      professionalLicenseNumber: professionalLicenseNumber,
      issuingBody: issuingBody,
      licenseExpiryDate: licenseExpiryDate,
      otherCertifications: otherCertifications,
      uploadCertificate: uploadCertificate,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

CertificationsStruct? updateCertificationsStruct(
  CertificationsStruct? certifications, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    certifications
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addCertificationsStructData(
  Map<String, dynamic> firestoreData,
  CertificationsStruct? certifications,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (certifications == null) {
    return;
  }
  if (certifications.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && certifications.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final certificationsData =
      getCertificationsFirestoreData(certifications, forFieldValue);
  final nestedData =
      certificationsData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields = certifications.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getCertificationsFirestoreData(
  CertificationsStruct? certifications, [
  bool forFieldValue = false,
]) {
  if (certifications == null) {
    return {};
  }
  final firestoreData = mapToFirestore(certifications.toMap());

  // Add any Firestore field values
  certifications.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getCertificationsListFirestoreData(
  List<CertificationsStruct>? certificationss,
) =>
    certificationss
        ?.map((e) => getCertificationsFirestoreData(e, true))
        .toList() ??
    [];
