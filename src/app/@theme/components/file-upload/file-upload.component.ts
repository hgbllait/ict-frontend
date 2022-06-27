import {Component, EventEmitter, OnInit, Output} from '@angular/core';
declare var $: any;

@Component({
  selector: 'ngx-theme-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Output() actionExecuted = new EventEmitter<any>();
  currentInput;
  disabled: boolean = true;
  ngOnInit() {
    $(() => {
      var drEvent = $('.dropify').dropify();
      $(drEvent)
        .on('dropify.afterClear', (e, args) => {
          this.disabled = true;
        });

    });
  }

  upload(){
    if(this.currentInput.length > 0) {
      this.actionExecuted.emit( {action: 'upload-signature', value: this.currentInput[0]} );
    }
  }

  onFileSelected(event) {
    this.currentInput = event.target.files;
    this.disabled = false;
  }

}
