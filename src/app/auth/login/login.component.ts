import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSubmit(event) {
    event.preventDefault();
  }

  showModalRecoveryPass(){
    const modal = document.getElementById('modalpass');
    modal.style.display = 'block';

  }
}
