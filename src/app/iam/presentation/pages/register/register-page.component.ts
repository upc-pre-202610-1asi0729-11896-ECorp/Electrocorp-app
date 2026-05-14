import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { IamFacade } from '../../../application/services/iam.facade';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, RouterLink, TranslatePipe],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  fullName = '';
  email = '';
  password = '';

  constructor(readonly iamFacade: IamFacade) {}

  async handleSubmit(): Promise<void> {
    await this.iamFacade.signUp({
      fullName: this.fullName,
      email: this.email,
      password: this.password,
    });

    if (!this.iamFacade.error()) {
      this.fullName = '';
      this.email = '';
      this.password = '';
    }
  }
}
