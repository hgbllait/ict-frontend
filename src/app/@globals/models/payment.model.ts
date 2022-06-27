
export interface Payment {
    accept_t_n_c?: number;
    cc_payment?: string;
    update_signup_id?: string;
    signup_flow?: number;
}

export interface Success {
    update_signup_id?: string;
    signup_flow?: number;
}
