import { EventEmitter } from "@angular/core";
import { Base64Component } from "./img-base64.component";

describe('Base64Component', () => {
  let component: Base64Component;

  beforeEach(() => {
    component = new Base64Component()
  });

  it('should test selecFile', () => {
    const file = new DataTransfer();
    file.items.add(new File([''], './test.png'));
    let file_ = file.files.item
    component.selecFile(file_)
    let fileReceived: File = (file.files as FileList)[0];
    component.fileName = fileReceived.name;

    expect(component.fileName).toEqual('Select a file...')
  });

  it('should test readFile', () => {
/*     component.uploaded = new EventEmitter();
    let uploaded = spyOn(component.uploaded, 'emit');
    uploaded('');
    expect(uploaded).toHaveBeenCalled(); */
  });
});

/*

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

*/
