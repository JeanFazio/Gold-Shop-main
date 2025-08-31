/**
 * Tipos para webhooks/postbacks da EzzyPag
 */

export interface WebhookCustomer {
  id: number;
  externalRef: string | null;
  name: string;
  email: string;
  phone: string;
  birthdate: string | null;
  createdAt: string;
  document: {
    number: string;
    type: string;
  };
  address?: {
    street: string;
    streetNumber: string;
    complement: string | null;
    zipCode: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
  };
}

export interface WebhookCard {
  id: number;
  brand: string;
  holderName: string;
  lastDigits: string;
  expirationMonth: number;
  expirationYear: number;
  reusable: boolean;
  createdAt: string;
}

export interface WebhookItem {
  externalRef: string | null;
  title: string;
  unitPrice: number;
  quantity: number;
  tangible: boolean;
}

export interface WebhookSplit {
  recipientId: number;
  amount: number;
  netAmount: number;
}

export interface WebhookFee {
  fixedAmount: number;
  spreadPercentage: number;
  estimatedFee: number;
  netAmount: number;
}

export interface WebhookTransaction {
  id: number;
  amount: number;
  refundedAmount: number;
  companyId: number;
  installments: number;
  paymentMethod: string;
  status: "pending" | "paid" | "refused" | "refunded" | "chargeback";
  postbackUrl: string | null;
  metadata: any;
  traceable: boolean;
  secureId: string;
  secureUrl: string;
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
  ip: string | null;
  externalRef: string | null;
  customer: WebhookCustomer;
  card: WebhookCard | null;
  boleto: any;
  pix: any;
  shipping: any;
  refusedReason: string | null;
  items: WebhookItem[];
  splits: WebhookSplit[];
  refunds: any[];
  delivery: any;
  fee: WebhookFee;
}

export interface WebhookCheckoutSettings {
  defaultPaymentMethod: string;
  requestAddress: boolean;
  requestPhone: boolean;
  requestDocument: boolean;
  traceable: boolean;
  card: {
    enabled: boolean;
    freeInstallments: number;
    maxInstallments: number;
  };
  boleto: {
    enabled: boolean;
    expiresInDays: number;
  };
  pix: {
    enabled: boolean;
    expiresInDays: number;
  };
}

export interface WebhookCheckout {
  id: number;
  companyId: number;
  description: string | null;
  amount: number;
  secureId: string;
  secureUrl: string;
  postbackUrl: string;
  createdAt: string;
  settings: WebhookCheckoutSettings;
  items: WebhookItem[];
  splits: WebhookSplit[];
  transaction: WebhookTransaction;
}

export interface TransactionWebhook {
  id: number;
  type: "transaction";
  objectId: string;
  url: string;
  data: WebhookTransaction;
}

export interface CheckoutWebhook {
  id: number;
  type: "checkout";
  objectId: string;
  url: string;
  data: WebhookCheckout;
}

export type EzzyPagWebhook = TransactionWebhook | CheckoutWebhook;

export interface WebhookProcessResult {
  success: boolean;
  message: string;
  orderStatus?: string;
}
