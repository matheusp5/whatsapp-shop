import { Message, Whatsapp } from "venom-bot";
import ProductsRepository from "../repository/products-repository";
import UserCartsRepository from "../repository/usercars-repository";


export default class FinishCommand  {
  
  private static _userCartsRepository = new UserCartsRepository();

  static async execute(client: Whatsapp, message: Message): Promise<void> {
    const userCarts = await this._userCartsRepository.findByUserNumber(message.from);
    let total = 0;

    if (userCarts.length > 0) {
      await client.sendText(message.from, "*Revise seu pedido*");

      const cartDetailsPromises = userCarts.map(async (cart) => {
        total += cart.product.price * cart.quantity;
        return `*#${cart.product.id} Produto: ${cart.product.name}. Quantidade: ${cart.quantity}*`;
      });

      const cartDetails = await Promise.all(cartDetailsPromises);

      const text = cartDetails.join('\n');
      
      await client.sendText(message.from, text);
      await client.sendText(message.from, `*Total: R$ ${total.toString().replace(".", ",")}*\n*Pagamento: PIX*`);
      await client.sendText(message.from, "*Seu pedido está correto?*\n_Se estiver correto, digite seu e-mail._ \n_Caso desejar cancelar, apenas escreva 'cancelar'_");
    } else {
      await client.sendText(message.from, "*Seu carrinho está vazio.*");
    }

  }

  
}