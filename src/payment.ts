import mercadopago from "mercadopago";
import { CreatePaymentPayload } from "mercadopago/models/payment/create-payload.model";

export default class Payment {
  private readonly MERCADOPAGO_KEY: string = "YOUR_MP_ACCESS_TOKEN";

  constructor() {
    mercadopago.configure({
      access_token: this.MERCADOPAGO_KEY
    })
  }

  public async createPayment(external: string, total: number, email: string): Promise<{qrcode: string, copy: string, id: string}> {
    const paymentData: CreatePaymentPayload = {
      transaction_amount: total,
      description: 'Pagamento',
      payment_method_id: 'pix',
      installments: 1,
      payer: {
        email,
      },
    };

    const payment = await mercadopago.payment.create(paymentData)
    const qrcode = payment.body.point_of_interaction.transaction_data.qr_code_base64;
    const copy = payment.body.point_of_interaction.transaction_data.qr_code;
  
    return {
      qrcode,
      copy,
      id: payment.body.id.toString()
    }
  }
}