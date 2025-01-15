const PAYMOB_API_KEY = 'YOUR_API_KEY';
const PAYMOB_IFRAME_ID = 'YOUR_IFRAME_ID';
const PAYMOB_INTEGRATION_ID = 'YOUR_INTEGRATION_ID';

interface PayMobAuthResponse {
  token: string;
}

interface PayMobOrderResponse {
  id: number;
  token: string;
}

interface PayMobPaymentKeyResponse {
  token: string;
}

export class PayMobService {
  static async getAuthToken(): Promise<string> {
    const response = await fetch('https://accept.paymob.com/api/auth/tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: PAYMOB_API_KEY
      })
    });

    const data: PayMobAuthResponse = await response.json();
    return data.token;
  }

  static async createOrder(authToken: string, amount: number): Promise<PayMobOrderResponse> {
    const response = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        auth_token: authToken,
        delivery_needed: false,
        amount_cents: amount * 100, // Convert to cents
        currency: 'EGP',
        items: []
      })
    });

    return response.json();
  }

  static async getPaymentKey(
    authToken: string,
    orderId: number,
    amount: number,
    billingData: {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
    }
  ): Promise<string> {
    const response = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        auth_token: authToken,
        amount_cents: amount * 100,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          ...billingData,
          apartment: 'NA',
          floor: 'NA',
          street: 'NA',
          building: 'NA',
          shipping_method: 'NA',
          postal_code: 'NA',
          city: 'NA',
          country: 'NA',
          state: 'NA'
        },
        currency: 'EGP',
        integration_id: PAYMOB_INTEGRATION_ID
      })
    });

    const data: PayMobPaymentKeyResponse = await response.json();
    return data.token;
  }

  static getIframeUrl(paymentKey: string): string {
    return `https://accept.paymob.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;
  }
} 