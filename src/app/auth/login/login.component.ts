import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  modalNotifyMessage: string = '';
  private routeTo = 'home';

  constructor(
    private fb: FormBuilder,
    private usersService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });
    route.params.forEach((param: any) => {
      this.routeTo = param.returnPage;
    });
  }

  ngOnInit(): void {
    this.getEmailFromBrowser();
  }

  async onSubmit() {
    const dataForm = this.loginForm.value;

    // Save on LocalStorage
    if (dataForm.remember) this.rememberEmail();
    else this.notRememberEmail();

    // TODO:
    //Connect DB
    try {
      const resp = await this.usersService.login(dataForm);
      this.router.navigate([`/${this.routeTo}`]);
    } catch (error) {
      this.showModalNotify('No se ha podido ingresar', false);
    }
  }

  showModalRecoveryPass() {
    const modal = document.getElementById('modalpass');
    modal.style.display = 'block';
  }

  private showModalNotify(message: string, ok: boolean) {
    const modalNotify = document.getElementById('modalnotify');
    if (ok) {
      modalNotify.style.backgroundColor = 'green';
      this.modalNotifyMessage = message;
    } else {
      modalNotify.style.backgroundColor = 'red';
      this.modalNotifyMessage = message;
    }

    modalNotify.style.display = 'block';
    setTimeout(() => {
      modalNotify.classList.add('fadeOut');
      setTimeout(() => {
        modalNotify.style.display = 'none';
        modalNotify.classList.remove('fadeOut');
      }, 1000);
    }, 2000);
  }

  private getEmailFromBrowser() {
    const email = localStorage.getItem('email');
    if (email)
      this.loginForm.reset({
        email: email,
        remember: true,
      });
  }

  private rememberEmail() {
    localStorage.setItem('email', this.loginForm.value.email);
  }

  private notRememberEmail() {
    localStorage.setItem('email', '');
  }
}
