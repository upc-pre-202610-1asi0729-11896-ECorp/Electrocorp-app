import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { Plan } from '../../../domain/model/plan.entity';
import { ProcessPaymentDto } from '../../../application/dtos/process-payment.dto';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent {
  @Input({ required: true }) plan!: Plan;
  @Input() loading = false;

  @Output() confirmPayment = new EventEmitter<ProcessPaymentDto>();
  @Output() cancelPayment = new EventEmitter<void>();

  holderName = '';
  cardNumber = '';
  expirationDate = '';
  cvv = '';

  onCardNumberChange(value: string): void {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 16);

    this.cardNumber = digitsOnly
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  onExpirationDateChange(value: string): void {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 4);

    if (digitsOnly.length <= 2) {
      this.expirationDate = digitsOnly;
      return;
    }

    this.expirationDate = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
  }

  onCvvChange(value: string): void {
    this.cvv = value.replace(/\D/g, '').slice(0, 3);
  }

  onConfirm(): void {
    this.confirmPayment.emit({
      planCode: this.plan.code,
      amount: this.plan.monthlyPrice,
      holderName: this.holderName,
      cardNumber: this.cardNumber,
      expirationDate: this.expirationDate,
      cvv: this.cvv,
    });
  }

  onCancel(): void {
    this.cancelPayment.emit();
  }
}
