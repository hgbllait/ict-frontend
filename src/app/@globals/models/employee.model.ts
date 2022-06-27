export class Employee {
    constructor(
        public id: string,
        public full_name: string,
        public first_name: string,
        public last_name: string,
        public address: string,
        public email ?: string,
        public contact_number ?: number,
        public image ?: string,
        public status ?: string,
    ) { }
}
