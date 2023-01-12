import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'base64',
  template: ''
})
export class Base64Component {
  fileName: string = 'Select a file...';
  noFileName: boolean = false;
  imgSrc: any = '';
  color: string = '';
  uploaded = new EventEmitter();

  selecFile(file: any) {
    if(file.target.files.length > 0) {
        let file_ = file.target as HTMLInputElement,
            fileReceived: File = (file_.files as FileList)[0]

        this.fileName = fileReceived.name;
        this.readFile(fileReceived);
    }
    else this.fileName = 'Select a file...';
  }

  readFile(file: any) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      this.imgSrc = filereader.result;
      console.log('BASE64', this.imgSrc)
      this.uploaded.emit(filereader.result);
    }
  }
}
