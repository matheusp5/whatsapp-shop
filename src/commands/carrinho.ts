import { Message, Whatsapp } from "venom-bot";
import ProductsRepository from "../repository/products-repository";
import UserCartsRepository from "../repository/usercars-repository";


export default class CartCommand  {
  
  private static _productRepository = new ProductsRepository()
  private static _userCartsRepository = new UserCartsRepository();

  static async execute(client: Whatsapp, message: Message): Promise<void> {
    const userCarts = await this._userCartsRepository.findByUserNumber(message.from);

    if (userCarts.length > 0) {
      await client.sendText(message.from, "*Seu carrinho 🤑*");

      const cartDetailsPromises = userCarts.map(async (cart) => {
        const product = await this._productRepository.findById(cart.productId);
        return `*#${product?.id} Produto: ${product?.name}. Quantidade: ${cart.quantity}*`;
      });

      const cartDetails = await Promise.all(cartDetailsPromises);

      const text = cartDetails.join('\n');
      await client.sendText(message.from, text);
    } else {
      await client.sendText(message.from, "*Seu carrinho está vazio.*");
    }

  }

  
}