
export interface ShortForm {
    signup_meta_id: number;
    signup_id: number;
    signup_meta_key: string;
    signup_meta_value: string;
}

export interface SQLResult {
    signup_meta_id: number;
    signup_id: number;
    signup_meta_key: string;
    signup_meta_value: string;
}

export interface Args {
    id: number;
}

export interface User {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface PromoCode {
    voucher?: string;
    signup_id?: string;
    plan_segment?: string;
}
