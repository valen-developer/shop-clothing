import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  notify = 'No se ha podido enviar el email';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = fb.group({
      name: ['', [Validators.required]],
      addr: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.registerForm.valid) {
      const resp = await this.userService.registerUser(this.registerForm.value);
      if (resp.ok)
        this.showModalNotify(
          resp.ok,
          'Email enviado. Revisa tu bandeja de entrada'
        );
      else this.showModalNotify(resp.ok, 'Mail no se ha podido enviar');
    }
  }

  private showModalNotify(ok: boolean, message: string) {
    this.notify = message;

    const modal = document.getElementById('modalnotify');
    if (ok) modal.style.backgroundColor = 'green';
    else modal.style.backgroundColor = 'red';

    modal.style.display = 'block';

    setTimeout(() => {
      modal.classList.add('fadeOut');
      setTimeout(() => {
        modal.classList.remove('fadeOut');
        modal.style.display = 'none';
      }, 1000);
    }, 2000);
  }
}
