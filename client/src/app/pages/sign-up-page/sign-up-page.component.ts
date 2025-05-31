import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
  imports: [ReactiveFormsModule, MatFormField, MatInput],
})
export class SignUpPageComponent {
  userService = inject(UserService);
  router = inject(Router);

  emailControl = new FormControl<string>('');
  passwordControl = new FormControl<string>('');

  errorMsg = signal('');

  async signUp() {
    const res = await this.userService.signUp(
      this.emailControl.value || '',
      this.passwordControl.value || ''
    );
    if (!res.success) {
      this.errorMsg.set(res.error);
    }
    this.router.navigate(['/']);
  }
}
