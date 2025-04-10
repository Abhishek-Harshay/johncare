// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class PaymentandbillinginfoStruct extends FFFirebaseStruct {
  PaymentandbillinginfoStruct({
    String? preferredPaymentMethod,
    String? billingaddress,
    String? bankaccountnumber,
    String? bankname,
    String? institutionnumber,
    String? branchnumber,
    String? sINnumber,
    String? name,
    String? email,
    String? phonenumber,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _preferredPaymentMethod = preferredPaymentMethod,
        _billingaddress = billingaddress,
        _bankaccountnumber = bankaccountnumber,
        _bankname = bankname,
        _institutionnumber = institutionnumber,
        _branchnumber = branchnumber,
        _sINnumber = sINnumber,
        _name = name,
        _email = email,
        _phonenumber = phonenumber,
        super(firestoreUtilData);

  // "PreferredPaymentMethod" field.
  String? _preferredPaymentMethod;
  String get preferredPaymentMethod => _preferredPaymentMethod ?? '';
  set preferredPaymentMethod(String? val) => _preferredPaymentMethod = val;

  bool hasPreferredPaymentMethod() => _preferredPaymentMethod != null;

  // "Billingaddress" field.
  String? _billingaddress;
  String get billingaddress => _billingaddress ?? '';
  set billingaddress(String? val) => _billingaddress = val;

  bool hasBillingaddress() => _billingaddress != null;

  // "Bankaccountnumber" field.
  String? _bankaccountnumber;
  String get bankaccountnumber => _bankaccountnumber ?? '';
  set bankaccountnumber(String? val) => _bankaccountnumber = val;

  bool hasBankaccountnumber() => _bankaccountnumber != null;

  // "Bankname" field.
  String? _bankname;
  String get bankname => _bankname ?? '';
  set bankname(String? val) => _bankname = val;

  bool hasBankname() => _bankname != null;

  // "Institutionnumber" field.
  String? _institutionnumber;
  String get institutionnumber => _institutionnumber ?? '';
  set institutionnumber(String? val) => _institutionnumber = val;

  bool hasInstitutionnumber() => _institutionnumber != null;

  // "Branchnumber" field.
  String? _branchnumber;
  String get branchnumber => _branchnumber ?? '';
  set branchnumber(String? val) => _branchnumber = val;

  bool hasBranchnumber() => _branchnumber != null;

  // "SINnumber" field.
  String? _sINnumber;
  String get sINnumber => _sINnumber ?? '';
  set sINnumber(String? val) => _sINnumber = val;

  bool hasSINnumber() => _sINnumber != null;

  // "Name" field.
  String? _name;
  String get name => _name ?? '';
  set name(String? val) => _name = val;

  bool hasName() => _name != null;

  // "Email" field.
  String? _email;
  String get email => _email ?? '';
  set email(String? val) => _email = val;

  bool hasEmail() => _email != null;

  // "Phonenumber" field.
  String? _phonenumber;
  String get phonenumber => _phonenumber ?? '';
  set phonenumber(String? val) => _phonenumber = val;

  bool hasPhonenumber() => _phonenumber != null;

  static PaymentandbillinginfoStruct fromMap(Map<String, dynamic> data) =>
      PaymentandbillinginfoStruct(
        preferredPaymentMethod: data['PreferredPaymentMethod'] as String?,
        billingaddress: data['Billingaddress'] as String?,
        bankaccountnumber: data['Bankaccountnumber'] as String?,
        bankname: data['Bankname'] as String?,
        institutionnumber: data['Institutionnumber'] as String?,
        branchnumber: data['Branchnumber'] as String?,
        sINnumber: data['SINnumber'] as String?,
        name: data['Name'] as String?,
        email: data['Email'] as String?,
        phonenumber: data['Phonenumber'] as String?,
      );

  static PaymentandbillinginfoStruct? maybeFromMap(dynamic data) => data is Map
      ? PaymentandbillinginfoStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'PreferredPaymentMethod': _preferredPaymentMethod,
        'Billingaddress': _billingaddress,
        'Bankaccountnumber': _bankaccountnumber,
        'Bankname': _bankname,
        'Institutionnumber': _institutionnumber,
        'Branchnumber': _branchnumber,
        'SINnumber': _sINnumber,
        'Name': _name,
        'Email': _email,
        'Phonenumber': _phonenumber,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'PreferredPaymentMethod': serializeParam(
          _preferredPaymentMethod,
          ParamType.String,
        ),
        'Billingaddress': serializeParam(
          _billingaddress,
          ParamType.String,
        ),
        'Bankaccountnumber': serializeParam(
          _bankaccountnumber,
          ParamType.String,
        ),
        'Bankname': serializeParam(
          _bankname,
          ParamType.String,
        ),
        'Institutionnumber': serializeParam(
          _institutionnumber,
          ParamType.String,
        ),
        'Branchnumber': serializeParam(
          _branchnumber,
          ParamType.String,
        ),
        'SINnumber': serializeParam(
          _sINnumber,
          ParamType.String,
        ),
        'Name': serializeParam(
          _name,
          ParamType.String,
        ),
        'Email': serializeParam(
          _email,
          ParamType.String,
        ),
        'Phonenumber': serializeParam(
          _phonenumber,
          ParamType.String,
        ),
      }.withoutNulls;

  static PaymentandbillinginfoStruct fromSerializableMap(
          Map<String, dynamic> data) =>
      PaymentandbillinginfoStruct(
        preferredPaymentMethod: deserializeParam(
          data['PreferredPaymentMethod'],
          ParamType.String,
          false,
        ),
        billingaddress: deserializeParam(
          data['Billingaddress'],
          ParamType.String,
          false,
        ),
        bankaccountnumber: deserializeParam(
          data['Bankaccountnumber'],
          ParamType.String,
          false,
        ),
        bankname: deserializeParam(
          data['Bankname'],
          ParamType.String,
          false,
        ),
        institutionnumber: deserializeParam(
          data['Institutionnumber'],
          ParamType.String,
          false,
        ),
        branchnumber: deserializeParam(
          data['Branchnumber'],
          ParamType.String,
          false,
        ),
        sINnumber: deserializeParam(
          data['SINnumber'],
          ParamType.String,
          false,
        ),
        name: deserializeParam(
          data['Name'],
          ParamType.String,
          false,
        ),
        email: deserializeParam(
          data['Email'],
          ParamType.String,
          false,
        ),
        phonenumber: deserializeParam(
          data['Phonenumber'],
          ParamType.String,
          false,
        ),
      );

  @override
  String toString() => 'PaymentandbillinginfoStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    return other is PaymentandbillinginfoStruct &&
        preferredPaymentMethod == other.preferredPaymentMethod &&
        billingaddress == other.billingaddress &&
        bankaccountnumber == other.bankaccountnumber &&
        bankname == other.bankname &&
        institutionnumber == other.institutionnumber &&
        branchnumber == other.branchnumber &&
        sINnumber == other.sINnumber &&
        name == other.name &&
        email == other.email &&
        phonenumber == other.phonenumber;
  }

  @override
  int get hashCode => const ListEquality().hash([
        preferredPaymentMethod,
        billingaddress,
        bankaccountnumber,
        bankname,
        institutionnumber,
        branchnumber,
        sINnumber,
        name,
        email,
        phonenumber
      ]);
}

PaymentandbillinginfoStruct createPaymentandbillinginfoStruct({
  String? preferredPaymentMethod,
  String? billingaddress,
  String? bankaccountnumber,
  String? bankname,
  String? institutionnumber,
  String? branchnumber,
  String? sINnumber,
  String? name,
  String? email,
  String? phonenumber,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    PaymentandbillinginfoStruct(
      preferredPaymentMethod: preferredPaymentMethod,
      billingaddress: billingaddress,
      bankaccountnumber: bankaccountnumber,
      bankname: bankname,
      institutionnumber: institutionnumber,
      branchnumber: branchnumber,
      sINnumber: sINnumber,
      name: name,
      email: email,
      phonenumber: phonenumber,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

PaymentandbillinginfoStruct? updatePaymentandbillinginfoStruct(
  PaymentandbillinginfoStruct? paymentandbillinginfo, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    paymentandbillinginfo
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addPaymentandbillinginfoStructData(
  Map<String, dynamic> firestoreData,
  PaymentandbillinginfoStruct? paymentandbillinginfo,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (paymentandbillinginfo == null) {
    return;
  }
  if (paymentandbillinginfo.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields = !forFieldValue &&
      paymentandbillinginfo.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final paymentandbillinginfoData = getPaymentandbillinginfoFirestoreData(
      paymentandbillinginfo, forFieldValue);
  final nestedData =
      paymentandbillinginfoData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields =
      paymentandbillinginfo.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getPaymentandbillinginfoFirestoreData(
  PaymentandbillinginfoStruct? paymentandbillinginfo, [
  bool forFieldValue = false,
]) {
  if (paymentandbillinginfo == null) {
    return {};
  }
  final firestoreData = mapToFirestore(paymentandbillinginfo.toMap());

  // Add any Firestore field values
  paymentandbillinginfo.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getPaymentandbillinginfoListFirestoreData(
  List<PaymentandbillinginfoStruct>? paymentandbillinginfos,
) =>
    paymentandbillinginfos
        ?.map((e) => getPaymentandbillinginfoFirestoreData(e, true))
        .toList() ??
    [];
