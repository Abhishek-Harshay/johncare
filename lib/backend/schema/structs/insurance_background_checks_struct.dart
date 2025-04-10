// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class InsuranceBackgroundChecksStruct extends FFFirebaseStruct {
  InsuranceBackgroundChecksStruct({
    bool? professionalliabilityinsurance,
    String? insurancEexpiryDate,
    String? uploadDocument,
    String? identificationProof,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _professionalliabilityinsurance = professionalliabilityinsurance,
        _insurancEexpiryDate = insurancEexpiryDate,
        _uploadDocument = uploadDocument,
        _identificationProof = identificationProof,
        super(firestoreUtilData);

  // "Professionalliabilityinsurance" field.
  bool? _professionalliabilityinsurance;
  bool get professionalliabilityinsurance =>
      _professionalliabilityinsurance ?? false;
  set professionalliabilityinsurance(bool? val) =>
      _professionalliabilityinsurance = val;

  bool hasProfessionalliabilityinsurance() =>
      _professionalliabilityinsurance != null;

  // "InsurancEexpiryDate" field.
  String? _insurancEexpiryDate;
  String get insurancEexpiryDate => _insurancEexpiryDate ?? '';
  set insurancEexpiryDate(String? val) => _insurancEexpiryDate = val;

  bool hasInsurancEexpiryDate() => _insurancEexpiryDate != null;

  // "UploadDocument" field.
  String? _uploadDocument;
  String get uploadDocument => _uploadDocument ?? '';
  set uploadDocument(String? val) => _uploadDocument = val;

  bool hasUploadDocument() => _uploadDocument != null;

  // "IdentificationProof" field.
  String? _identificationProof;
  String get identificationProof => _identificationProof ?? '';
  set identificationProof(String? val) => _identificationProof = val;

  bool hasIdentificationProof() => _identificationProof != null;

  static InsuranceBackgroundChecksStruct fromMap(Map<String, dynamic> data) =>
      InsuranceBackgroundChecksStruct(
        professionalliabilityinsurance:
            data['Professionalliabilityinsurance'] as bool?,
        insurancEexpiryDate: data['InsurancEexpiryDate'] as String?,
        uploadDocument: data['UploadDocument'] as String?,
        identificationProof: data['IdentificationProof'] as String?,
      );

  static InsuranceBackgroundChecksStruct? maybeFromMap(dynamic data) => data
          is Map
      ? InsuranceBackgroundChecksStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'Professionalliabilityinsurance': _professionalliabilityinsurance,
        'InsurancEexpiryDate': _insurancEexpiryDate,
        'UploadDocument': _uploadDocument,
        'IdentificationProof': _identificationProof,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'Professionalliabilityinsurance': serializeParam(
          _professionalliabilityinsurance,
          ParamType.bool,
        ),
        'InsurancEexpiryDate': serializeParam(
          _insurancEexpiryDate,
          ParamType.String,
        ),
        'UploadDocument': serializeParam(
          _uploadDocument,
          ParamType.String,
        ),
        'IdentificationProof': serializeParam(
          _identificationProof,
          ParamType.String,
        ),
      }.withoutNulls;

  static InsuranceBackgroundChecksStruct fromSerializableMap(
          Map<String, dynamic> data) =>
      InsuranceBackgroundChecksStruct(
        professionalliabilityinsurance: deserializeParam(
          data['Professionalliabilityinsurance'],
          ParamType.bool,
          false,
        ),
        insurancEexpiryDate: deserializeParam(
          data['InsurancEexpiryDate'],
          ParamType.String,
          false,
        ),
        uploadDocument: deserializeParam(
          data['UploadDocument'],
          ParamType.String,
          false,
        ),
        identificationProof: deserializeParam(
          data['IdentificationProof'],
          ParamType.String,
          false,
        ),
      );

  @override
  String toString() => 'InsuranceBackgroundChecksStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is InsuranceBackgroundChecksStruct &&
        professionalliabilityinsurance ==
            other.professionalliabilityinsurance &&
        insurancEexpiryDate == other.insurancEexpiryDate &&
        uploadDocument == other.uploadDocument &&
        identificationProof == other.identificationProof;
  }

  @override
  int get hashCode => const ListEquality().hash([
        professionalliabilityinsurance,
        insurancEexpiryDate,
        uploadDocument,
        identificationProof
      ]);
}

InsuranceBackgroundChecksStruct createInsuranceBackgroundChecksStruct({
  bool? professionalliabilityinsurance,
  String? insurancEexpiryDate,
  String? uploadDocument,
  String? identificationProof,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    InsuranceBackgroundChecksStruct(
      professionalliabilityinsurance: professionalliabilityinsurance,
      insurancEexpiryDate: insurancEexpiryDate,
      uploadDocument: uploadDocument,
      identificationProof: identificationProof,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

InsuranceBackgroundChecksStruct? updateInsuranceBackgroundChecksStruct(
  InsuranceBackgroundChecksStruct? insuranceBackgroundChecks, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    insuranceBackgroundChecks
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addInsuranceBackgroundChecksStructData(
  Map<String, dynamic> firestoreData,
  InsuranceBackgroundChecksStruct? insuranceBackgroundChecks,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (insuranceBackgroundChecks == null) {
    return;
  }
  if (insuranceBackgroundChecks.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields = !forFieldValue &&
      insuranceBackgroundChecks.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final insuranceBackgroundChecksData =
      getInsuranceBackgroundChecksFirestoreData(
          insuranceBackgroundChecks, forFieldValue);
  final nestedData =
      insuranceBackgroundChecksData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields =
      insuranceBackgroundChecks.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getInsuranceBackgroundChecksFirestoreData(
  InsuranceBackgroundChecksStruct? insuranceBackgroundChecks, [
  bool forFieldValue = false,
]) {
  if (insuranceBackgroundChecks == null) {
    return {};
  }
  final firestoreData = mapToFirestore(insuranceBackgroundChecks.toMap());

  // Add any Firestore field values
  insuranceBackgroundChecks.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getInsuranceBackgroundChecksListFirestoreData(
  List<InsuranceBackgroundChecksStruct>? insuranceBackgroundCheckss,
) =>
    insuranceBackgroundCheckss
        ?.map((e) => getInsuranceBackgroundChecksFirestoreData(e, true))
        .toList() ??
    [];
