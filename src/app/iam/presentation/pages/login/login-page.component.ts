import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { IamFacade } from '../../../application/services/iam.facade';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, RouterLink, TranslatePipe],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  email = '';
  password = '';

  constructor(readonly iamFacade: IamFacade) {}

  async handleSubmit(): Promise<void> {
    await this.iamFacade.signIn({
      email: this.email,
      password: this.password,
    });
  }
}
