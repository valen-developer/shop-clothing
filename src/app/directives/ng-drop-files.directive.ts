import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]',
})
export class NgDropFilesDirective {
  @Output() onMouseDragOver: EventEmitter<boolean> = new EventEmitter();
  @Input() files: any[] = [];

  constructor() {}

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.preventDft(event);
    this.onMouseDragOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event) {
    this.onMouseDragOver.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event) {
    this.preventDft(event);
    this.onMouseDragOver.emit(false);

    const transfer = this.getTransfer(event);
    this.extractFiles(transfer.files);
  }

  private extractFiles(fileList: []) {
    Array.from(fileList).forEach((file) => {
      this.files.push(file);
    });
  }

  // Compatibility with diferent browsers
  private getTransfer(event) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }

  // Validators
  private preventDft(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private isImg(filetype: string): boolean {
    return filetype === '' || filetype === undefined
      ? false
      : filetype.startsWith('image')
      ? true
      : false;
  }

  private onlyOne(fileList): boolean {
    if (fileList.length > 0) return true;
    return false;
  }
}
