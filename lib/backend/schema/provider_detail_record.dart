import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class ProviderDetailRecord extends FirestoreRecord {
  ProviderDetailRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "user" field.
  DocumentReference? _user;
  DocumentReference? get user => _user;
  bool hasUser() => _user != null;

  // "SpecialtyArea" field.
  String? _specialtyArea;
  String get specialtyArea => _specialtyArea ?? '';
  bool hasSpecialtyArea() => _specialtyArea != null;

  // "YearofExperience" field.
  int? _yearofExperience;
  int get yearofExperience => _yearofExperience ?? 0;
  bool hasYearofExperience() => _yearofExperience != null;

  // "LanguageSpoken" field.
  List<String>? _languageSpoken;
  List<String> get languageSpoken => _languageSpoken ?? const [];
  bool hasLanguageSpoken() => _languageSpoken != null;

  // "AvailableFor" field.
  String? _availableFor;
  String get availableFor => _availableFor ?? '';
  bool hasAvailableFor() => _availableFor != null;

  // "ProfessionalLicNo" field.
  String? _professionalLicNo;
  String get professionalLicNo => _professionalLicNo ?? '';
  bool hasProfessionalLicNo() => _professionalLicNo != null;

  // "ProfessionalSummary" field.
  String? _professionalSummary;
  String get professionalSummary => _professionalSummary ?? '';
  bool hasProfessionalSummary() => _professionalSummary != null;

  // "LicExpiryDate" field.
  DateTime? _licExpiryDate;
  DateTime? get licExpiryDate => _licExpiryDate;
  bool hasLicExpiryDate() => _licExpiryDate != null;

  // "OtherCertification" field.
  String? _otherCertification;
  String get otherCertification => _otherCertification ?? '';
  bool hasOtherCertification() => _otherCertification != null;

  // "UploadCertificate" field.
  String? _uploadCertificate;
  String get uploadCertificate => _uploadCertificate ?? '';
  bool hasUploadCertificate() => _uploadCertificate != null;

  // "HighestDegreeObtained" field.
  String? _highestDegreeObtained;
  String get highestDegreeObtained => _highestDegreeObtained ?? '';
  bool hasHighestDegreeObtained() => _highestDegreeObtained != null;

  // "InstitutionName" field.
  String? _institutionName;
  String get institutionName => _institutionName ?? '';
  bool hasInstitutionName() => _institutionName != null;

  // "YearGraduated" field.
  int? _yearGraduated;
  int get yearGraduated => _yearGraduated ?? 0;
  bool hasYearGraduated() => _yearGraduated != null;

  // "AdditionalTrainingDetails" field.
  String? _additionalTrainingDetails;
  String get additionalTrainingDetails => _additionalTrainingDetails ?? '';
  bool hasAdditionalTrainingDetails() => _additionalTrainingDetails != null;

  // "JobExpStartDate" field.
  DateTime? _jobExpStartDate;
  DateTime? get jobExpStartDate => _jobExpStartDate;
  bool hasJobExpStartDate() => _jobExpStartDate != null;

  // "JobExpEndDate" field.
  DateTime? _jobExpEndDate;
  DateTime? get jobExpEndDate => _jobExpEndDate;
  bool hasJobExpEndDate() => _jobExpEndDate != null;

  // "JobExpEmployerName" field.
  String? _jobExpEmployerName;
  String get jobExpEmployerName => _jobExpEmployerName ?? '';
  bool hasJobExpEmployerName() => _jobExpEmployerName != null;

  // "JobExpPosition" field.
  String? _jobExpPosition;
  String get jobExpPosition => _jobExpPosition ?? '';
  bool hasJobExpPosition() => _jobExpPosition != null;

  // "JobExpResponsiblity" field.
  String? _jobExpResponsiblity;
  String get jobExpResponsiblity => _jobExpResponsiblity ?? '';
  bool hasJobExpResponsiblity() => _jobExpResponsiblity != null;

  // "UploadResume" field.
  String? _uploadResume;
  String get uploadResume => _uploadResume ?? '';
  bool hasUploadResume() => _uploadResume != null;

  // "IBCLibalityInsurance" field.
  bool? _iBCLibalityInsurance;
  bool get iBCLibalityInsurance => _iBCLibalityInsurance ?? false;
  bool hasIBCLibalityInsurance() => _iBCLibalityInsurance != null;

  // "IBCInsuranceExpiryDate" field.
  DateTime? _iBCInsuranceExpiryDate;
  DateTime? get iBCInsuranceExpiryDate => _iBCInsuranceExpiryDate;
  bool hasIBCInsuranceExpiryDate() => _iBCInsuranceExpiryDate != null;

  // "IBCUploadDocumnet" field.
  String? _iBCUploadDocumnet;
  String get iBCUploadDocumnet => _iBCUploadDocumnet ?? '';
  bool hasIBCUploadDocumnet() => _iBCUploadDocumnet != null;

  // "IBCIdentificationProof" field.
  String? _iBCIdentificationProof;
  String get iBCIdentificationProof => _iBCIdentificationProof ?? '';
  bool hasIBCIdentificationProof() => _iBCIdentificationProof != null;

  // "WELegalStatus" field.
  String? _wELegalStatus;
  String get wELegalStatus => _wELegalStatus ?? '';
  bool hasWELegalStatus() => _wELegalStatus != null;

  // "WESin" field.
  String? _wESin;
  String get wESin => _wESin ?? '';
  bool hasWESin() => _wESin != null;

  // "ProfileHourlyRate" field.
  int? _profileHourlyRate;
  int get profileHourlyRate => _profileHourlyRate ?? 0;
  bool hasProfileHourlyRate() => _profileHourlyRate != null;

  // "ProfileWilingtotravel" field.
  bool? _profileWilingtotravel;
  bool get profileWilingtotravel => _profileWilingtotravel ?? false;
  bool hasProfileWilingtotravel() => _profileWilingtotravel != null;

  // "Signature" field.
  String? _signature;
  String get signature => _signature ?? '';
  bool hasSignature() => _signature != null;

  // "Phone_number" field.
  String? _phoneNumber;
  String get phoneNumber => _phoneNumber ?? '';
  bool hasPhoneNumber() => _phoneNumber != null;

  // "Contact_email" field.
  String? _contactEmail;
  String get contactEmail => _contactEmail ?? '';
  bool hasContactEmail() => _contactEmail != null;

  // "JobStatus" field.
  String? _jobStatus;
  String get jobStatus => _jobStatus ?? '';
  bool hasJobStatus() => _jobStatus != null;

  // "worker_id" field.
  String? _workerId;
  String get workerId => _workerId ?? '';
  bool hasWorkerId() => _workerId != null;

  // "Personalinformation" field.
  PersonalinformationStruct? _personalinformation;
  PersonalinformationStruct get personalinformation =>
      _personalinformation ?? PersonalinformationStruct();
  bool hasPersonalinformation() => _personalinformation != null;

  // "Certifications" field.
  CertificationsStruct? _certifications;
  CertificationsStruct get certifications =>
      _certifications ?? CertificationsStruct();
  bool hasCertifications() => _certifications != null;

  // "Education" field.
  EducationStruct? _education;
  EducationStruct get education => _education ?? EducationStruct();
  bool hasEducation() => _education != null;

  // "Workexperience" field.
  WorkExperienceStruct? _workexperience;
  WorkExperienceStruct get workexperience =>
      _workexperience ?? WorkExperienceStruct();
  bool hasWorkexperience() => _workexperience != null;

  // "Insurance" field.
  InsuranceBackgroundChecksStruct? _insurance;
  InsuranceBackgroundChecksStruct get insurance =>
      _insurance ?? InsuranceBackgroundChecksStruct();
  bool hasInsurance() => _insurance != null;

  // "WorkEligibility" field.
  WorkEligibilityStruct? _workEligibility;
  WorkEligibilityStruct get workEligibility =>
      _workEligibility ?? WorkEligibilityStruct();
  bool hasWorkEligibility() => _workEligibility != null;

  // "Profiledetailsforclients" field.
  ProfiledetailsforclientsStruct? _profiledetailsforclients;
  ProfiledetailsforclientsStruct get profiledetailsforclients =>
      _profiledetailsforclients ?? ProfiledetailsforclientsStruct();
  bool hasProfiledetailsforclients() => _profiledetailsforclients != null;

  // "Agreement" field.
  AgreementconsentStruct? _agreement;
  AgreementconsentStruct get agreement =>
      _agreement ?? AgreementconsentStruct();
  bool hasAgreement() => _agreement != null;

  // "HealthcareAvailability" field.
  HealthcareProfessionalAvailabilityStruct? _healthcareAvailability;
  HealthcareProfessionalAvailabilityStruct get healthcareAvailability =>
      _healthcareAvailability ?? HealthcareProfessionalAvailabilityStruct();
  bool hasHealthcareAvailability() => _healthcareAvailability != null;

  // "Profession" field.
  String? _profession;
  String get profession => _profession ?? '';
  bool hasProfession() => _profession != null;

  // "HomeAdress" field.
  String? _homeAdress;
  String get homeAdress => _homeAdress ?? '';
  bool hasHomeAdress() => _homeAdress != null;

  // "DateOfBirth" field.
  DateTime? _dateOfBirth;
  DateTime? get dateOfBirth => _dateOfBirth;
  bool hasDateOfBirth() => _dateOfBirth != null;

  // "FirstName" field.
  String? _firstName;
  String get firstName => _firstName ?? '';
  bool hasFirstName() => _firstName != null;

  // "Gender" field.
  String? _gender;
  String get gender => _gender ?? '';
  bool hasGender() => _gender != null;

  // "LastName" field.
  String? _lastName;
  String get lastName => _lastName ?? '';
  bool hasLastName() => _lastName != null;

  void _initializeFields() {
    _user = snapshotData['user'] as DocumentReference?;
    _specialtyArea = snapshotData['SpecialtyArea'] as String?;
    _yearofExperience = castToType<int>(snapshotData['YearofExperience']);
    _languageSpoken = getDataList(snapshotData['LanguageSpoken']);
    _availableFor = snapshotData['AvailableFor'] as String?;
    _professionalLicNo = snapshotData['ProfessionalLicNo'] as String?;
    _professionalSummary = snapshotData['ProfessionalSummary'] as String?;
    _licExpiryDate = snapshotData['LicExpiryDate'] as DateTime?;
    _otherCertification = snapshotData['OtherCertification'] as String?;
    _uploadCertificate = snapshotData['UploadCertificate'] as String?;
    _highestDegreeObtained = snapshotData['HighestDegreeObtained'] as String?;
    _institutionName = snapshotData['InstitutionName'] as String?;
    _yearGraduated = castToType<int>(snapshotData['YearGraduated']);
    _additionalTrainingDetails =
        snapshotData['AdditionalTrainingDetails'] as String?;
    _jobExpStartDate = snapshotData['JobExpStartDate'] as DateTime?;
    _jobExpEndDate = snapshotData['JobExpEndDate'] as DateTime?;
    _jobExpEmployerName = snapshotData['JobExpEmployerName'] as String?;
    _jobExpPosition = snapshotData['JobExpPosition'] as String?;
    _jobExpResponsiblity = snapshotData['JobExpResponsiblity'] as String?;
    _uploadResume = snapshotData['UploadResume'] as String?;
    _iBCLibalityInsurance = snapshotData['IBCLibalityInsurance'] as bool?;
    _iBCInsuranceExpiryDate =
        snapshotData['IBCInsuranceExpiryDate'] as DateTime?;
    _iBCUploadDocumnet = snapshotData['IBCUploadDocumnet'] as String?;
    _iBCIdentificationProof = snapshotData['IBCIdentificationProof'] as String?;
    _wELegalStatus = snapshotData['WELegalStatus'] as String?;
    _wESin = snapshotData['WESin'] as String?;
    _profileHourlyRate = castToType<int>(snapshotData['ProfileHourlyRate']);
    _profileWilingtotravel = snapshotData['ProfileWilingtotravel'] as bool?;
    _signature = snapshotData['Signature'] as String?;
    _phoneNumber = snapshotData['Phone_number'] as String?;
    _contactEmail = snapshotData['Contact_email'] as String?;
    _jobStatus = snapshotData['JobStatus'] as String?;
    _workerId = snapshotData['worker_id'] as String?;
    _personalinformation =
        snapshotData['Personalinformation'] is PersonalinformationStruct
            ? snapshotData['Personalinformation']
            : PersonalinformationStruct.maybeFromMap(
                snapshotData['Personalinformation']);
    _certifications = snapshotData['Certifications'] is CertificationsStruct
        ? snapshotData['Certifications']
        : CertificationsStruct.maybeFromMap(snapshotData['Certifications']);
    _education = snapshotData['Education'] is EducationStruct
        ? snapshotData['Education']
        : EducationStruct.maybeFromMap(snapshotData['Education']);
    _workexperience = snapshotData['Workexperience'] is WorkExperienceStruct
        ? snapshotData['Workexperience']
        : WorkExperienceStruct.maybeFromMap(snapshotData['Workexperience']);
    _insurance = snapshotData['Insurance'] is InsuranceBackgroundChecksStruct
        ? snapshotData['Insurance']
        : InsuranceBackgroundChecksStruct.maybeFromMap(
            snapshotData['Insurance']);
    _workEligibility = snapshotData['WorkEligibility'] is WorkEligibilityStruct
        ? snapshotData['WorkEligibility']
        : WorkEligibilityStruct.maybeFromMap(snapshotData['WorkEligibility']);
    _profiledetailsforclients = snapshotData['Profiledetailsforclients']
            is ProfiledetailsforclientsStruct
        ? snapshotData['Profiledetailsforclients']
        : ProfiledetailsforclientsStruct.maybeFromMap(
            snapshotData['Profiledetailsforclients']);
    _agreement = snapshotData['Agreement'] is AgreementconsentStruct
        ? snapshotData['Agreement']
        : AgreementconsentStruct.maybeFromMap(snapshotData['Agreement']);
    _healthcareAvailability = snapshotData['HealthcareAvailability']
            is HealthcareProfessionalAvailabilityStruct
        ? snapshotData['HealthcareAvailability']
        : HealthcareProfessionalAvailabilityStruct.maybeFromMap(
            snapshotData['HealthcareAvailability']);
    _profession = snapshotData['Profession'] as String?;
    _homeAdress = snapshotData['HomeAdress'] as String?;
    _dateOfBirth = snapshotData['DateOfBirth'] as DateTime?;
    _firstName = snapshotData['FirstName'] as String?;
    _gender = snapshotData['Gender'] as String?;
    _lastName = snapshotData['LastName'] as String?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('ProviderDetail');

  static Stream<ProviderDetailRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => ProviderDetailRecord.fromSnapshot(s));

  static Future<ProviderDetailRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => ProviderDetailRecord.fromSnapshot(s));

  static ProviderDetailRecord fromSnapshot(DocumentSnapshot snapshot) =>
      ProviderDetailRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static ProviderDetailRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      ProviderDetailRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'ProviderDetailRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is ProviderDetailRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createProviderDetailRecordData({
  DocumentReference? user,
  String? specialtyArea,
  int? yearofExperience,
  String? availableFor,
  String? professionalLicNo,
  String? professionalSummary,
  DateTime? licExpiryDate,
  String? otherCertification,
  String? uploadCertificate,
  String? highestDegreeObtained,
  String? institutionName,
  int? yearGraduated,
  String? additionalTrainingDetails,
  DateTime? jobExpStartDate,
  DateTime? jobExpEndDate,
  String? jobExpEmployerName,
  String? jobExpPosition,
  String? jobExpResponsiblity,
  String? uploadResume,
  bool? iBCLibalityInsurance,
  DateTime? iBCInsuranceExpiryDate,
  String? iBCUploadDocumnet,
  String? iBCIdentificationProof,
  String? wELegalStatus,
  String? wESin,
  int? profileHourlyRate,
  bool? profileWilingtotravel,
  String? signature,
  String? phoneNumber,
  String? contactEmail,
  String? jobStatus,
  String? workerId,
  PersonalinformationStruct? personalinformation,
  CertificationsStruct? certifications,
  EducationStruct? education,
  WorkExperienceStruct? workexperience,
  InsuranceBackgroundChecksStruct? insurance,
  WorkEligibilityStruct? workEligibility,
  ProfiledetailsforclientsStruct? profiledetailsforclients,
  AgreementconsentStruct? agreement,
  HealthcareProfessionalAvailabilityStruct? healthcareAvailability,
  String? profession,
  String? homeAdress,
  DateTime? dateOfBirth,
  String? firstName,
  String? gender,
  String? lastName,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'user': user,
      'SpecialtyArea': specialtyArea,
      'YearofExperience': yearofExperience,
      'AvailableFor': availableFor,
      'ProfessionalLicNo': professionalLicNo,
      'ProfessionalSummary': professionalSummary,
      'LicExpiryDate': licExpiryDate,
      'OtherCertification': otherCertification,
      'UploadCertificate': uploadCertificate,
      'HighestDegreeObtained': highestDegreeObtained,
      'InstitutionName': institutionName,
      'YearGraduated': yearGraduated,
      'AdditionalTrainingDetails': additionalTrainingDetails,
      'JobExpStartDate': jobExpStartDate,
      'JobExpEndDate': jobExpEndDate,
      'JobExpEmployerName': jobExpEmployerName,
      'JobExpPosition': jobExpPosition,
      'JobExpResponsiblity': jobExpResponsiblity,
      'UploadResume': uploadResume,
      'IBCLibalityInsurance': iBCLibalityInsurance,
      'IBCInsuranceExpiryDate': iBCInsuranceExpiryDate,
      'IBCUploadDocumnet': iBCUploadDocumnet,
      'IBCIdentificationProof': iBCIdentificationProof,
      'WELegalStatus': wELegalStatus,
      'WESin': wESin,
      'ProfileHourlyRate': profileHourlyRate,
      'ProfileWilingtotravel': profileWilingtotravel,
      'Signature': signature,
      'Phone_number': phoneNumber,
      'Contact_email': contactEmail,
      'JobStatus': jobStatus,
      'worker_id': workerId,
      'Personalinformation': PersonalinformationStruct().toMap(),
      'Certifications': CertificationsStruct().toMap(),
      'Education': EducationStruct().toMap(),
      'Workexperience': WorkExperienceStruct().toMap(),
      'Insurance': InsuranceBackgroundChecksStruct().toMap(),
      'WorkEligibility': WorkEligibilityStruct().toMap(),
      'Profiledetailsforclients': ProfiledetailsforclientsStruct().toMap(),
      'Agreement': AgreementconsentStruct().toMap(),
      'HealthcareAvailability':
          HealthcareProfessionalAvailabilityStruct().toMap(),
      'Profession': profession,
      'HomeAdress': homeAdress,
      'DateOfBirth': dateOfBirth,
      'FirstName': firstName,
      'Gender': gender,
      'LastName': lastName,
    }.withoutNulls,
  );

  // Handle nested data for "Personalinformation" field.
  addPersonalinformationStructData(
      firestoreData, personalinformation, 'Personalinformation');

  // Handle nested data for "Certifications" field.
  addCertificationsStructData(firestoreData, certifications, 'Certifications');

  // Handle nested data for "Education" field.
  addEducationStructData(firestoreData, education, 'Education');

  // Handle nested data for "Workexperience" field.
  addWorkExperienceStructData(firestoreData, workexperience, 'Workexperience');

  // Handle nested data for "Insurance" field.
  addInsuranceBackgroundChecksStructData(firestoreData, insurance, 'Insurance');

  // Handle nested data for "WorkEligibility" field.
  addWorkEligibilityStructData(
      firestoreData, workEligibility, 'WorkEligibility');

  // Handle nested data for "Profiledetailsforclients" field.
  addProfiledetailsforclientsStructData(
      firestoreData, profiledetailsforclients, 'Profiledetailsforclients');

  // Handle nested data for "Agreement" field.
  addAgreementconsentStructData(firestoreData, agreement, 'Agreement');

  // Handle nested data for "HealthcareAvailability" field.
  addHealthcareProfessionalAvailabilityStructData(
      firestoreData, healthcareAvailability, 'HealthcareAvailability');

  return firestoreData;
}

class ProviderDetailRecordDocumentEquality
    implements Equality<ProviderDetailRecord> {
  const ProviderDetailRecordDocumentEquality();

  @override
  bool equals(ProviderDetailRecord? e1, ProviderDetailRecord? e2) {
    const listEquality = ListEquality();
    return e1?.user == e2?.user &&
        e1?.specialtyArea == e2?.specialtyArea &&
        e1?.yearofExperience == e2?.yearofExperience &&
        listEquality.equals(e1?.languageSpoken, e2?.languageSpoken) &&
        e1?.availableFor == e2?.availableFor &&
        e1?.professionalLicNo == e2?.professionalLicNo &&
        e1?.professionalSummary == e2?.professionalSummary &&
        e1?.licExpiryDate == e2?.licExpiryDate &&
        e1?.otherCertification == e2?.otherCertification &&
        e1?.uploadCertificate == e2?.uploadCertificate &&
        e1?.highestDegreeObtained == e2?.highestDegreeObtained &&
        e1?.institutionName == e2?.institutionName &&
        e1?.yearGraduated == e2?.yearGraduated &&
        e1?.additionalTrainingDetails == e2?.additionalTrainingDetails &&
        e1?.jobExpStartDate == e2?.jobExpStartDate &&
        e1?.jobExpEndDate == e2?.jobExpEndDate &&
        e1?.jobExpEmployerName == e2?.jobExpEmployerName &&
        e1?.jobExpPosition == e2?.jobExpPosition &&
        e1?.jobExpResponsiblity == e2?.jobExpResponsiblity &&
        e1?.uploadResume == e2?.uploadResume &&
        e1?.iBCLibalityInsurance == e2?.iBCLibalityInsurance &&
        e1?.iBCInsuranceExpiryDate == e2?.iBCInsuranceExpiryDate &&
        e1?.iBCUploadDocumnet == e2?.iBCUploadDocumnet &&
        e1?.iBCIdentificationProof == e2?.iBCIdentificationProof &&
        e1?.wELegalStatus == e2?.wELegalStatus &&
        e1?.wESin == e2?.wESin &&
        e1?.profileHourlyRate == e2?.profileHourlyRate &&
        e1?.profileWilingtotravel == e2?.profileWilingtotravel &&
        e1?.signature == e2?.signature &&
        e1?.phoneNumber == e2?.phoneNumber &&
        e1?.contactEmail == e2?.contactEmail &&
        e1?.jobStatus == e2?.jobStatus &&
        e1?.workerId == e2?.workerId &&
        e1?.personalinformation == e2?.personalinformation &&
        e1?.certifications == e2?.certifications &&
        e1?.education == e2?.education &&
        e1?.workexperience == e2?.workexperience &&
        e1?.insurance == e2?.insurance &&
        e1?.workEligibility == e2?.workEligibility &&
        e1?.profiledetailsforclients == e2?.profiledetailsforclients &&
        e1?.agreement == e2?.agreement &&
        e1?.healthcareAvailability == e2?.healthcareAvailability &&
        e1?.profession == e2?.profession &&
        e1?.homeAdress == e2?.homeAdress &&
        e1?.dateOfBirth == e2?.dateOfBirth &&
        e1?.firstName == e2?.firstName &&
        e1?.gender == e2?.gender &&
        e1?.lastName == e2?.lastName;
  }

  @override
  int hash(ProviderDetailRecord? e) => const ListEquality().hash([
        e?.user,
        e?.specialtyArea,
        e?.yearofExperience,
        e?.languageSpoken,
        e?.availableFor,
        e?.professionalLicNo,
        e?.professionalSummary,
        e?.licExpiryDate,
        e?.otherCertification,
        e?.uploadCertificate,
        e?.highestDegreeObtained,
        e?.institutionName,
        e?.yearGraduated,
        e?.additionalTrainingDetails,
        e?.jobExpStartDate,
        e?.jobExpEndDate,
        e?.jobExpEmployerName,
        e?.jobExpPosition,
        e?.jobExpResponsiblity,
        e?.uploadResume,
        e?.iBCLibalityInsurance,
        e?.iBCInsuranceExpiryDate,
        e?.iBCUploadDocumnet,
        e?.iBCIdentificationProof,
        e?.wELegalStatus,
        e?.wESin,
        e?.profileHourlyRate,
        e?.profileWilingtotravel,
        e?.signature,
        e?.phoneNumber,
        e?.contactEmail,
        e?.jobStatus,
        e?.workerId,
        e?.personalinformation,
        e?.certifications,
        e?.education,
        e?.workexperience,
        e?.insurance,
        e?.workEligibility,
        e?.profiledetailsforclients,
        e?.agreement,
        e?.healthcareAvailability,
        e?.profession,
        e?.homeAdress,
        e?.dateOfBirth,
        e?.firstName,
        e?.gender,
        e?.lastName
      ]);

  @override
  bool isValidKey(Object? o) => o is ProviderDetailRecord;
}
