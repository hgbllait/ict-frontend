import { ReferralData } from "./ReferralData";

export interface UserAccountData {
  RecordTypeId: any;
  Entity__c: any;
  FirstName: any;
  Name?: any;
  LastName: any;
  Phone: any;
  Tnc: any;
  PersonEmail: any;
  Promoter_Name__c: any;
  Sign_Up_Location__c: any;
  UTM_Source__c: any;
  UTM_Medium__c: any;
  UTM_Campaign__c: any;
  UTM_Term__c: any;
  UTM_Content__c: any;
  Signup_ID__c: any;
  update_signup_id: any;
  ip: any;
  device: any;
  signup_flow: any;
  Source_of_Lead__c: any;
  Referred_By_Bill_Rebate__c?: any;
  OSP_Promo_Code__c?: any;
  referralCode?: any;
  referral_data?: ReferralData[];
}
