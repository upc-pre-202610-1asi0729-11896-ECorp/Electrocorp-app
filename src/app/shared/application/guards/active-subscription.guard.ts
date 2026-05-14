import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';

import { BillingFacade } from '../../../billing/application/services/billing.facade';

export const activeSubscriptionGuard: CanActivateFn = async () => {
  const billingFacade = inject(BillingFacade);
  const router = inject(Router);

  await billingFacade.loadBilling();

  if (billingFacade.hasActiveSubscription()) {
    return true;
  }

  return router.createUrlTree(['/billing/plans']);
};
