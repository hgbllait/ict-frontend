export interface SignupPreviewResponse {
    customerDetails: {
        firstname?: string,
        lastname?: string,
        nric?: string,
        gender?: string,
        nationality?: string,
        birthdate?: string,
        email?: string,
        address?: string,
        remarks?: string
    };
    orderDetails: {
        totalPrice?: string
        monthly?: any;
        onetime: {
            oneTimeTotal?: string,
            items?: Array<any>
        };
        annual: {
            annualTotal?: string,
            items?: Array<any>
        };
        entity?: string,
        promoCode?: string,
        debug?: any
    };
    previewData: {
        additionalRemarks?: Array<string>
    };
    meta?: any;
}
