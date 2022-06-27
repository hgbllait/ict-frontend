import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormActionSchema} from '../../../../@globals/models/schemas/components/form-action.schema';

@Component({
  selector: 'ngx-ui-forms-action',
  templateUrl: './forms-action.component.html',
  styleUrls: ['./forms-action.component.scss'],
})
export class FormsActionComponent implements OnInit {

  @Input() actions;
  @Input() align = 'left'

  @Output() onButtonClick = new EventEmitter<FormActionSchema>();

  constructor() { }

  ngOnInit(): void {
  }

  getAction(data) {
    console.log('[FORM] ACTION EXECUTING: ', data );

    this.onButtonClick.emit({
      target: data.target,
      call: data.call,
      action_type: data.action_type,
    });
  }

  returnZero() {
    return 0;
  }

}
