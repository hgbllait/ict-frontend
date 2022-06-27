import {ButtonSchema} from './button.schema';

export class FormSchema {
    fields: Array<FormFieldSchema> | any;
    button: ButtonSchema[];

    constructor(
    ) { }
}

export class FormFieldSchema {
    id ?: any;
    class ?: any;
    title ?: any;
    type ?: any;
    min ?: any;
    max ?: any;
    placeholder ?: any;
    width ?: any;
    required ?: boolean;
    data ?: any;
    widget ?: any;
    readOnly ?: any;
    default ?: any;
    format ?: any;
    oneOf ?: any; // ToDo: Enhance Select

    constructor(
    ) { }
}
