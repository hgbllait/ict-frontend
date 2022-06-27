export interface Signup {
  plan_id?: number;
}

export interface AccountData {
  FullName__c?: string;
  Salutation?: string;
  FirstName?: string;
  LastName?: string;
  Name?: string;
  tnc?: string;
  Gender__c?: string;
  NRIC_Passport_FIN_No__pc?: string;
  Phone?: number;
  PersonMobilePhone?: number;
  PersonEmail?: string;
  PersonBirthdate?: string;
  Property_Type__c?: string;
  Nationality__c?: string;
  Sign_up_Date__c?: string;
  Status__c?: string;
  RecordTypeId?: string;
  PersonMailingCountry?: string;
  PersonMailingStreet?: string;
  PersonMailingPostalCode?: number;
  PersonOtherCountry?: string;
  PersonOtherStreet?: string;
  PersonOtherPostalCode?: number;
  Signup_ID__c?: string;
  Netflix_Acct__c?: string;
  Promoter_Name__c?: string;
  Description?: string;
  Source_Type__c?: string;
  Source_of_Lead__c?: string;
  Sign_Up_Location__c?: string;
  NRIC_Status__c?: string;
  PDPA_Opt_In__c?: string;
  Referred_By_Bill_Rebate__c?: string;
  UTM_Source__c?: string;
  UTM_Medium__c?: string;
  UTM_Campaign__c?: string;
  UTM_Term__c?: string;
  UTM_Content__c?: string;
  nricfront?: string;
  nricback?: string;
  CC_PaymentMethodID?: string;
  update_signup_id?: number;
  signup_flow?: number;
}

export interface Existing {
  nricNo: string;
}

export interface SAF {
  update_signup_id?: number;
  saf_url?: string;
}
