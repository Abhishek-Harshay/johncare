// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class BusinessDetailsForVerificationStruct extends FFFirebaseStruct {
  BusinessDetailsForVerificationStruct({
    String? taxIDHSTnumber,
    String? businessidentificationnumber,
    String? industryLicensesorAccreditation,
    String? insuranceInformation,
    String? uploadBusinessLicenseorRegistrationDocument,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _taxIDHSTnumber = taxIDHSTnumber,
        _businessidentificationnumber = businessidentificationnumber,
        _industryLicensesorAccreditation = industryLicensesorAccreditation,
        _insuranceInformation = insuranceInformation,
        _uploadBusinessLicenseorRegistrationDocument =
            uploadBusinessLicenseorRegistrationDocument,
        super(firestoreUtilData);

  // "TaxIDHSTnumber" field.
  String? _taxIDHSTnumber;
  String get taxIDHSTnumber => _taxIDHSTnumber ?? '';
  set taxIDHSTnumber(String? val) => _taxIDHSTnumber = val;

  bool hasTaxIDHSTnumber() => _taxIDHSTnumber != null;

  // "Businessidentificationnumber" field.
  String? _businessidentificationnumber;
  String get businessidentificationnumber =>
      _businessidentificationnumber ?? '';
  set businessidentificationnumber(String? val) =>
      _businessidentificationnumber = val;

  bool hasBusinessidentificationnumber() =>
      _businessidentificationnumber != null;

  // "IndustryLicensesorAccreditation" field.
  String? _industryLicensesorAccreditation;
  String get industryLicensesorAccreditation =>
      _industryLicensesorAccreditation ?? '';
  set industryLicensesorAccreditation(String? val) =>
      _industryLicensesorAccreditation = val;

  bool hasIndustryLicensesorAccreditation() =>
      _industryLicensesorAccreditation != null;

  // "InsuranceInformation" field.
  String? _insuranceInformation;
  String get insuranceInformation => _insuranceInformation ?? '';
  set insuranceInformation(String? val) => _insuranceInformation = val;

  bool hasInsuranceInformation() => _insuranceInformation != null;

  // "UploadBusinessLicenseorRegistrationDocument" field.
  String? _uploadBusinessLicenseorRegistrationDocument;
  String get uploadBusinessLicenseorRegistrationDocument =>
      _uploadBusinessLicenseorRegistrationDocument ?? '';
  set uploadBusinessLicenseorRegistrationDocument(String? val) =>
      _uploadBusinessLicenseorRegistrationDocument = val;

  bool hasUploadBusinessLicenseorRegistrationDocument() =>
      _uploadBusinessLicenseorRegistrationDocument != null;

  static BusinessDetailsForVerificationStruct fromMap(
          Map<String, dynamic> data) =>
      BusinessDetailsForVerificationStruct(
        taxIDHSTnumber: data['TaxIDHSTnumber'] as String?,
        businessidentificationnumber:
            data['Businessidentificationnumber'] as String?,
        industryLicensesorAccreditation:
            data['IndustryLicensesorAccreditation'] as String?,
        insuranceInformation: data['InsuranceInformation'] as String?,
        uploadBusinessLicenseorRegistrationDocument:
            data['UploadBusinessLicenseorRegistrationDocument'] as String?,
      );

  static BusinessDetailsForVerificationStruct? maybeFromMap(dynamic data) =>
      data is Map
          ? BusinessDetailsForVerificationStruct.fromMap(
              data.cast<String, dynamic>())
          : null;

  Map<String, dynamic> toMap() => {
        'TaxIDHSTnumber': _taxIDHSTnumber,
        'Businessidentificationnumber': _businessidentificationnumber,
        'IndustryLicensesorAccreditation': _industryLicensesorAccreditation,
        'InsuranceInformation': _insuranceInformation,
        'UploadBusinessLicenseorRegistrationDocument':
            _uploadBusinessLicenseorRegistrationDocument,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'TaxIDHSTnumber': serializeParam(
          _taxIDHSTnumber,
          ParamType.String,
        ),
        'Businessidentificationnumber': serializeParam(
          _businessidentificationnumber,
          ParamType.String,
        ),
        'IndustryLicensesorAccreditation': serializeParam(
          _industryLicensesorAccreditation,
          ParamType.String,
        ),
        'InsuranceInformation': serializeParam(
          _insuranceInformation,
          ParamType.String,
        ),
        'UploadBusinessLicenseorRegistrationDocument': serializeParam(
          _uploadBusinessLicenseorRegistrationDocument,
          ParamType.String,
        ),
      }.withoutNulls;

  static BusinessDetailsForVerificationStruct fromSerializableMap(
          Map<String, dynamic> data) =>
      BusinessDetailsForVerificationStruct(
        taxIDHSTnumber: deserializeParam(
          data['TaxIDHSTnumber'],
          ParamType.String,
          false,
        ),
        businessidentificationnumber: deserializeParam(
          data['Businessidentificationnumber'],
          ParamType.String,
          false,
        ),
        industryLicensesorAccreditation: deserializeParam(
          data['IndustryLicensesorAccreditation'],
          ParamType.String,
          false,
        ),
        insuranceInformation: deserializeParam(
          data['InsuranceInformation'],
          ParamType.String,
          false,
        ),
        uploadBusinessLicenseorRegistrationDocument: deserializeParam(
          data['UploadBusinessLicenseorRegistrationDocument'],
          ParamType.String,
          false,
        ),
      );

  @override
  String toString() => 'BusinessDetailsForVerificationStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is BusinessDetailsForVerificationStruct &&
        taxIDHSTnumber == other.taxIDHSTnumber &&
        businessidentificationnumber == other.businessidentificationnumber &&
        industryLicensesorAccreditation ==
            other.industryLicensesorAccreditation &&
        insuranceInformation == other.insuranceInformation &&
        uploadBusinessLicenseorRegistrationDocument ==
            other.uploadBusinessLicenseorRegistrationDocument;
  }

  @override
  int get hashCode => const ListEquality().hash([
        taxIDHSTnumber,
        businessidentificationnumber,
        industryLicensesorAccreditation,
        insuranceInformation,
        uploadBusinessLicenseorRegistrationDocument
      ]);
}

BusinessDetailsForVerificationStruct
    createBusinessDetailsForVerificationStruct({
  String? taxIDHSTnumber,
  String? businessidentificationnumber,
  String? industryLicensesorAccreditation,
  String? insuranceInformation,
  String? uploadBusinessLicenseorRegistrationDocument,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
        BusinessDetailsForVerificationStruct(
          taxIDHSTnumber: taxIDHSTnumber,
          businessidentificationnumber: businessidentificationnumber,
          industryLicensesorAccreditation: industryLicensesorAccreditation,
          insuranceInformation: insuranceInformation,
          uploadBusinessLicenseorRegistrationDocument:
              uploadBusinessLicenseorRegistrationDocument,
          firestoreUtilData: FirestoreUtilData(
            clearUnsetFields: clearUnsetFields,
            create: create,
            delete: delete,
            fieldValues: fieldValues,
          ),
        );

BusinessDetailsForVerificationStruct?
    updateBusinessDetailsForVerificationStruct(
  BusinessDetailsForVerificationStruct? businessDetailsForVerification, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
        businessDetailsForVerification
          ?..firestoreUtilData = FirestoreUtilData(
            clearUnsetFields: clearUnsetFields,
            create: create,
          );

void addBusinessDetailsForVerificationStructData(
  Map<String, dynamic> firestoreData,
  BusinessDetailsForVerificationStruct? businessDetailsForVerification,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (businessDetailsForVerification == null) {
    return;
  }
  if (businessDetailsForVerification.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields = !forFieldValue &&
      businessDetailsForVerification.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final businessDetailsForVerificationData =
      getBusinessDetailsForVerificationFirestoreData(
          businessDetailsForVerification, forFieldValue);
  final nestedData = businessDetailsForVerificationData
      .map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields =
      businessDetailsForVerification.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getBusinessDetailsForVerificationFirestoreData(
  BusinessDetailsForVerificationStruct? businessDetailsForVerification, [
  bool forFieldValue = false,
]) {
  if (businessDetailsForVerification == null) {
    return {};
  }
  final firestoreData = mapToFirestore(businessDetailsForVerification.toMap());

  // Add any Firestore field values
  businessDetailsForVerification.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getBusinessDetailsForVerificationListFirestoreData(
  List<BusinessDetailsForVerificationStruct>? businessDetailsForVerifications,
) =>
    businessDetailsForVerifications
        ?.map((e) => getBusinessDetailsForVerificationFirestoreData(e, true))
        .toList() ??
    [];
