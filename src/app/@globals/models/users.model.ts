export class User {
  length: number;
    constructor(
        public id: string,
        public email: string,
        public name: string,
        public employee_id: string,
        public username: string,
        public address ?: string,
        public company ?: string,
        public phone ?: string,
        public website ?: string,
        public created_at ?: string,
    ) { }
}
