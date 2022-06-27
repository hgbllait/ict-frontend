import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ISpinnerState, SpinnerService} from "./@globals/helpers/ui/loader/loader.helper";

@Component({
  selector: 'ngx-app',
  template: '<div *ngIf="visible" class="loader"><div class="circle-loader"></div></div>' +
    '<router-outlet></router-outlet>',
  styles: [
    `
      .loader{
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .circle-loader {
        top: 50%;
        transform: translateY(-50%);
      }

      .circle-loader:before {
        border-top-color: white;
      }

      .circle-loader:after {
        border: 10px solid maroon;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  visible = false;

  private _spinnerStateChanged: Subscription;

  constructor(private _spinnerService: SpinnerService,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this._spinnerStateChanged = this._spinnerService.spinnerState
      .subscribe((state: ISpinnerState) => this.visible = state.show);
  }

  ngOnDestroy() {
    this._spinnerStateChanged.unsubscribe();
  }

  ngAfterViewChecked(){
    this.cdr.detectChanges();
  }
}
