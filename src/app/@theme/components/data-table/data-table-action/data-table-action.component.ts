import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActionItemSchema} from '../../../../@globals/models';

@Component({
  selector: 'ngx-ui-data-table-action',
  templateUrl: './data-table-action.component.html',
  styleUrls: ['./data-table-action.component.scss'],
})
export class DataTableActionComponent implements OnInit {

  @Input() actions;
  @Input() options ?: any;
  @Input() row;
  @Input() value;

  @Output() actionSelected = new EventEmitter<ActionItemSchema>();

  constructor() { }

  ngOnInit(): void {
    console.log('[DATATABLE ACTION] ACTIONS: ', this.actions );
    console.log('[DATATABLE ACTION] ROW: ', this.row );

    this.initializeActions();
  }

  initializeActions() {
    let actions = this.actions;
    for (let i = 0; i < actions.length; i++ ) {
      console.log('[DATATABLE ACTIONS] Action ' + i, actions[ i ].options );

      let disabled = false;
      if ( actions[i] && actions[i].options && actions[i].options.length > 0 ) {
        const options = actions[i].options;
        for ( let j = 0; j < options.length && !disabled; j++ ) {
          const $validator = options[j].split(':');

          console.log('[DATATABLE ACTIONS] VALIDATORS', $validator, this.row[ $validator[0] ], $validator[1],
            this.row[  $validator[0] ] !== $validator[1] );
          if ( this.row[ $validator[0] ] !== $validator[1] ) {
            disabled = true;
          }

          console.log('[DATATABLE ACTIONS] VALIDATOR ' + j, disabled );
        }

        console.log('[DATATABLE ACTIONS] Post validate Action ' + i, actions );
      }

      console.log('[DATATABLE ACTIONS] DISABLING: ', disabled, actions[i]);
      // actions[i]['disabled'] = disabled;
      console.log('[DATATABLE ACTIONS] DISABLED: ', disabled, actions[i]);
    }

    console.log('[DATATABLE ACTIONS] Action after init', actions );

    this.actions = actions;
  }

  getAction(target) {
    console.log('[DATATABLE ACTION] EXECUTING: ' + target + ' for ' + this.value );

    this.actionSelected.emit({
      action: target,
      value: this.value,
    });
   }

}
