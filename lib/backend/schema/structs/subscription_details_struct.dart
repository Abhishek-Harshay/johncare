// ignore_for_file: unnecessary_getters_setters

import 'package:cloud_firestore/cloud_firestore.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class SubscriptionDetailsStruct extends FFFirebaseStruct {
  SubscriptionDetailsStruct({
    String? plan,
    double? price,
    DateTime? purchaseTime,
    DateTime? expiredTime,
    List<String>? benefits,
    FirestoreUtilData firestoreUtilData = const FirestoreUtilData(),
  })  : _plan = plan,
        _price = price,
        _purchaseTime = purchaseTime,
        _expiredTime = expiredTime,
        _benefits = benefits,
        super(firestoreUtilData);

  // "plan" field.
  String? _plan;
  String get plan => _plan ?? '';
  set plan(String? val) => _plan = val;

  bool hasPlan() => _plan != null;

  // "price" field.
  double? _price;
  double get price => _price ?? 0.0;
  set price(double? val) => _price = val;

  void incrementPrice(double amount) => price = price + amount;

  bool hasPrice() => _price != null;

  // "purchase_time" field.
  DateTime? _purchaseTime;
  DateTime? get purchaseTime => _purchaseTime;
  set purchaseTime(DateTime? val) => _purchaseTime = val;

  bool hasPurchaseTime() => _purchaseTime != null;

  // "expired_time" field.
  DateTime? _expiredTime;
  DateTime? get expiredTime => _expiredTime;
  set expiredTime(DateTime? val) => _expiredTime = val;

  bool hasExpiredTime() => _expiredTime != null;

  // "benefits" field.
  List<String>? _benefits;
  List<String> get benefits => _benefits ?? const [];
  set benefits(List<String>? val) => _benefits = val;

  void updateBenefits(Function(List<String>) updateFn) {
    updateFn(_benefits ??= []);
  }

  bool hasBenefits() => _benefits != null;

  static SubscriptionDetailsStruct fromMap(Map<String, dynamic> data) =>
      SubscriptionDetailsStruct(
        plan: data['plan'] as String?,
        price: castToType<double>(data['price']),
        purchaseTime: data['purchase_time'] as DateTime?,
        expiredTime: data['expired_time'] as DateTime?,
        benefits: getDataList(data['benefits']),
      );

  static SubscriptionDetailsStruct? maybeFromMap(dynamic data) => data is Map
      ? SubscriptionDetailsStruct.fromMap(data.cast<String, dynamic>())
      : null;

  Map<String, dynamic> toMap() => {
        'plan': _plan,
        'price': _price,
        'purchase_time': _purchaseTime,
        'expired_time': _expiredTime,
        'benefits': _benefits,
      }.withoutNulls;

  @override
  Map<String, dynamic> toSerializableMap() => {
        'plan': serializeParam(
          _plan,
          ParamType.String,
        ),
        'price': serializeParam(
          _price,
          ParamType.double,
        ),
        'purchase_time': serializeParam(
          _purchaseTime,
          ParamType.DateTime,
        ),
        'expired_time': serializeParam(
          _expiredTime,
          ParamType.DateTime,
        ),
        'benefits': serializeParam(
          _benefits,
          ParamType.String,
          isList: true,
        ),
      }.withoutNulls;

  static SubscriptionDetailsStruct fromSerializableMap(
          Map<String, dynamic> data) =>
      SubscriptionDetailsStruct(
        plan: deserializeParam(
          data['plan'],
          ParamType.String,
          false,
        ),
        price: deserializeParam(
          data['price'],
          ParamType.double,
          false,
        ),
        purchaseTime: deserializeParam(
          data['purchase_time'],
          ParamType.DateTime,
          false,
        ),
        expiredTime: deserializeParam(
          data['expired_time'],
          ParamType.DateTime,
          false,
        ),
        benefits: deserializeParam<String>(
          data['benefits'],
          ParamType.String,
          true,
        ),
      );

  @override
  String toString() => 'SubscriptionDetailsStruct(${toMap()})';

  @override
  bool operator ==(Object other) {
    const listEquality = ListEquality();
    return other is SubscriptionDetailsStruct &&
        plan == other.plan &&
        price == other.price &&
        purchaseTime == other.purchaseTime &&
        expiredTime == other.expiredTime &&
        listEquality.equals(benefits, other.benefits);
  }

  @override
  int get hashCode => const ListEquality()
      .hash([plan, price, purchaseTime, expiredTime, benefits]);
}

SubscriptionDetailsStruct createSubscriptionDetailsStruct({
  String? plan,
  double? price,
  DateTime? purchaseTime,
  DateTime? expiredTime,
  Map<String, dynamic> fieldValues = const {},
  bool clearUnsetFields = true,
  bool create = false,
  bool delete = false,
}) =>
    SubscriptionDetailsStruct(
      plan: plan,
      price: price,
      purchaseTime: purchaseTime,
      expiredTime: expiredTime,
      firestoreUtilData: FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
        delete: delete,
        fieldValues: fieldValues,
      ),
    );

SubscriptionDetailsStruct? updateSubscriptionDetailsStruct(
  SubscriptionDetailsStruct? subscriptionDetails, {
  bool clearUnsetFields = true,
  bool create = false,
}) =>
    subscriptionDetails
      ?..firestoreUtilData = FirestoreUtilData(
        clearUnsetFields: clearUnsetFields,
        create: create,
      );

void addSubscriptionDetailsStructData(
  Map<String, dynamic> firestoreData,
  SubscriptionDetailsStruct? subscriptionDetails,
  String fieldName, [
  bool forFieldValue = false,
]) {
  firestoreData.remove(fieldName);
  if (subscriptionDetails == null) {
    return;
  }
  if (subscriptionDetails.firestoreUtilData.delete) {
    firestoreData[fieldName] = FieldValue.delete();
    return;
  }
  final clearFields =
      !forFieldValue && subscriptionDetails.firestoreUtilData.clearUnsetFields;
  if (clearFields) {
    firestoreData[fieldName] = <String, dynamic>{};
  }
  final subscriptionDetailsData =
      getSubscriptionDetailsFirestoreData(subscriptionDetails, forFieldValue);
  final nestedData =
      subscriptionDetailsData.map((k, v) => MapEntry('$fieldName.$k', v));

  final mergeFields =
      subscriptionDetails.firestoreUtilData.create || clearFields;
  firestoreData
      .addAll(mergeFields ? mergeNestedFields(nestedData) : nestedData);
}

Map<String, dynamic> getSubscriptionDetailsFirestoreData(
  SubscriptionDetailsStruct? subscriptionDetails, [
  bool forFieldValue = false,
]) {
  if (subscriptionDetails == null) {
    return {};
  }
  final firestoreData = mapToFirestore(subscriptionDetails.toMap());

  // Add any Firestore field values
  subscriptionDetails.firestoreUtilData.fieldValues
      .forEach((k, v) => firestoreData[k] = v);

  return forFieldValue ? mergeNestedFields(firestoreData) : firestoreData;
}

List<Map<String, dynamic>> getSubscriptionDetailsListFirestoreData(
  List<SubscriptionDetailsStruct>? subscriptionDetailss,
) =>
    subscriptionDetailss
        ?.map((e) => getSubscriptionDetailsFirestoreData(e, true))
        .toList() ??
    [];
