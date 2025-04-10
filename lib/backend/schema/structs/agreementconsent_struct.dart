// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class AgreementconsentStruct extends FFFirebaseStruct {
  AgreementconsentStruct({
    String? signature,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _signature = signature,
        super(firestoreUtilData);

  // "signature" field.
  String? _signature;
  String get signature => _signature ?? '';
  set signature(String? val) => _signature = val;

  bool hasSignature() => _signature != null;

  static AgreementconsentStruct fromMap(Map<String, dynamic> data) =>
      AgreementconsentStruct(
        signature: data['signature'] as String?,
      );

  static AgreementconsentStruct? maybeFromMap(dynamic data) => data is Map
      ? AgreementconsentStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'signature': _signature,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'signature': serializeParam(
          _signature,
          ParamType.String,
        ),
      }.withoutNulls;

  static AgreementconsentStruct fromSerializableMap(
          Map<String, dynamic> data) =>
      AgreementconsentStruct(
        signature: deserializeParam(
          data['signature'],
          ParamType.String,
          false,
        ),
      );

  @override
  String toString() => 'AgreementconsentStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is AgreementconsentStruct && signature == other.signature;
  }

  @override
  int get hashCode => const ListEquality().hash([signature]);
}

AgreementconsentStruct createAgreementconsentStruct({
  String? signature,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    AgreementconsentStruct(
      signature: signature,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

AgreementconsentStruct? updateAgreementconsentStruct(
  AgreementconsentStruct? agreementconsent, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    agreementconsent
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addAgreementconsentStructData(
  Map<String, dynamic> firestoreData,
  AgreementconsentStruct? agreementconsent,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (agreementconsent == null) {
    return;
  }
  if (agreementconsent.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && agreementconsent.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final agreementconsentData =
      getAgreementconsentFirestoreData(agreementconsent, forFieldValue);
  final nestedData =
      agreementconsentData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields = agreementconsent.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getAgreementconsentFirestoreData(
  AgreementconsentStruct? agreementconsent, [
  bool forFieldValue = false,
]) {
  if (agreementconsent == null) {
    return {};
  }
  final firestoreData = mapToFirestore(agreementconsent.toMap());

  // Add any Firestore field values
  agreementconsent.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getAgreementconsentListFirestoreData(
  List<AgreementconsentStruct>? agreementconsents,
) =>
    agreementconsents
        ?.map((e) => getAgreementconsentFirestoreData(e, true))
        .toList() ??
    [];
