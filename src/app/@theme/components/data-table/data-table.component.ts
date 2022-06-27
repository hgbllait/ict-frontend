import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import {RequestFormService} from '../../../@globals/services/api/request-form';
import {
  DatatableColumnSchema,
  DatatableFilterSchema,
  Page,
  ActionItemSchema,
  StandardResponse
} from '../../../@globals/models';
import {Observable, Subject, Subscription} from 'rxjs';
import {DataTableDirective} from "angular-datatables";
import Responsive from 'datatables.net-responsive';

@Component({
  selector: 'ngx-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements AfterViewInit, OnInit, OnDestroy {

  @Input()
  public actions;
  @Input()
  public display;
  @Input()
  public endpoint;
  @Input()
  public header;
  @Input()
  public target;
  @Input()
  public equipments;

  @Input()
  public updateTableData: Observable<void>;

  @Output() actionExecuted = new EventEmitter<ActionItemSchema>();
  @Output() filterUpdated = new EventEmitter<any>();

  @ViewChild('actionTemplate') actionTemplate: TemplateRef<any>;

  page = new Page();
  rows = new Array<any>();
  columns: Array<any>;
  selectedFilters: any;
  selectedFiltersString: string;

  updateFilterTrigger: Subject<void> = new Subject<void>();
  // region Table Behavior
  private updateTableDataSubscription: Subscription;
  // endregion Table Behavior


  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  @Input()
  public optionsTable: DataTables.Settings = {};

  constructor(private dataService: RequestFormService
  ){
  }

  ngOnInit(): void {
    this.optionsTable = {
      responsive: {
        details: {
          renderer: Responsive.renderer.listHiddenNodes()
        }
      },
      lengthMenu: [ [5, 10, 20, -1], [5, 25, 20, "All"] ],
      pagingType: 'full_numbers',
      pageLength: 5,
      order:[],
      processing: true,
      autoWidth: true,
      columnDefs: [
        { width: "5%", targets: 4 }
      ]
    };
    this.updateTableDataSubscription = this.updateTableData.subscribe(() => {
      console.log( '[Data Table] Triggering data update');
      this.fetchData();
    });
  }

  ngOnDestroy() {
    if ( this.updateTableDataSubscription ) {
      this.updateTableDataSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.fetchData();
  }

  actionMade( $event: ActionItemSchema ) {
    console.log('DATATABLE ACTION DONE:', $event.action, $event.value );
    this.actionExecuted.emit( $event );
  }

  fetchData() {
    this.rows = [];
    this.dataService.call( this.endpoint, {} )
        .subscribe( ( response: any ) => {
          console.log('[DATATABLE] Data from endpoint: ', response.data[ this.target ] );
          console.log(response.data);
          this.equipments = response.data.equipment;
          this.updateFilterTrigger.next();
        });
  }
}
