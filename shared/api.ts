/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Checkout interfaces for Zedy/EzzyPag integration
 */
export interface CheckoutCustomer {
  name: string;
  email: string;
  document: string;
  phone: string;
}

export interface CheckoutItem {
  name: string;
  quantity: number;
  unit_amount: number;
}

export interface CreditCardData {
  number: string;
  holderName: string;
  expMonth: number;
  expYear: number;
  cvv: string;
}

export interface PaymentMethodData {
  type: "credit_card" | "pix";
  card_token?: string;
}

export interface CheckoutRequest {
  amount: number;
  currency: string;
  reference_id: string;
  customer: CheckoutCustomer;
  items: CheckoutItem[];
  payment_method: PaymentMethodData;
  postback_url?: string;
}

export interface CheckoutResponse {
  success: boolean;
  checkout_url?: string;
  transaction_id?: string;
  error?: string;
}
