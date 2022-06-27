import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'ngx-theme-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss']
})
export class SignaturePadComponent implements OnInit, AfterContentInit {
  @ViewChild('sPad', {static: true}) signaturePadElement;
  @Output() actionExecuted = new EventEmitter<any>();
  signaturePad: any;
  disabled: boolean = false;
  textLine: string = "Draw Here";
  textColor: string = "text-dark";
  constructor() { }

  ngOnInit(): void {
    this.disabled = false;
    this.textLine = 'Draw Here';
  }

  ngAfterContentInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
  }

  ngAfterContentChecked(){
    if (this.signaturePad.isEmpty()) {
      this.textLine = "Draw Here";
      this.disabled = true;
    } else {
      this.textLine = "";
      this.disabled = false;
    }
  }

  changeColor(color) {
    let rgb = 'rgb(' + 0 + ',' + 0 + ',' + 0 + ')';
    this.textColor = 'text-dark';
    if(color == 'danger'){
      this.textColor = 'text-danger';
      rgb = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
    } else if(color == 'blue'){
      this.textColor = 'text-blue';
      rgb = 'rgb(' + 0 + ',' + 0 + ',' + 255 + ')';
    }
    this.signaturePad.penColor = rgb;
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }

  download(dataURL, filename) {
    if (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1) {
      window.open(dataURL);
    } else {
      const blob = this.dataURLToBlob(dataURL);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;

      console.log(a, url, blob);
      return;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
    }
  }

  dataURLToBlob(dataURL) {
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }

  savePNG() {
    if (!this.signaturePad.isEmpty()) {
      const dataURL = this.signaturePad.toDataURL();
      this.actionExecuted.emit( {action: 'draw-signature', value: this.dataURLToBlob(dataURL)} );
      this.download(dataURL, 'signature.png');
    }
  }

  saveJPG() {
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = this.signaturePad.toDataURL('image/jpeg');
      this.download(dataURL, 'signature.jpg');
    }
  }

  saveSVG() {
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = this.signaturePad.toDataURL('image/svg+xml');
      this.download(dataURL, 'signature.svg');
    }
  }
}
