import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-pass',
  templateUrl: './modal-pass.component.html',
  styleUrls: ['./modal-pass.component.css'],
})
export class ModalPassComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  hidden() {
    const modal = document.getElementById('modalpass');
    modal.style.display = 'none';
  }
  showNotify() {
    const not = document.getElementById('modalnotify');
    const modal = document.getElementById('modalpass');

    not.style.display = 'block';
    setTimeout(() => {
      not.classList.add('fadeOut');
      modal.classList.add('fadeOut');

      setTimeout(() => {
        not.style.display = 'none';
        modal.style.display = 'none';
        not.classList.remove('fadeOut');
        modal.classList.remove('fadeOut');
      }, 1000);
    }, 2000);
  }
}
