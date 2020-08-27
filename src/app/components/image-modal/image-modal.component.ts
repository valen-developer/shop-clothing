import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {

  @Input() product;


  constructor() { }

  ngOnInit(): void {
  }

  hiddenModal(){
    const modalImage = document.getElementById('image-modal');
    modalImage.style.display = 'none';
  }

}
