import { Message, Whatsapp } from "venom-bot";
import ProductsRepository from "../repository/products-repository";
import UserCartsRepository from "../repository/usercars-repository";


export default class AddCommand  {
  
  private static _productRepository = new ProductsRepository()
  private static _userCartsRepository = new UserCartsRepository();

  static async execute(client: Whatsapp, message: Message): Promise<void> {
    // /comprar 1
    const productId = message.body.split(" ")[1]
    const product = await this._productRepository.findById(productId)
    const from = message.from

    if(product) {
      await this.addToCart(from, product.id)
      client.sendText(message.from, "*Sucesso! O produto foi adicionado ao seu carrinho. ✅*")
    } else {
      await client.sendText(message.from, "*Não foi possível encontrar um produto com o ID " + productId + "*")
    }
  }

  private static async addToCart(userNumber: string, productId: string) {
    const userCart = await this._userCartsRepository.findByNumberAndProductId(userNumber, productId)
    if(userCart != null) {
      await this._userCartsRepository.update(userCart.id, {quantity: userCart.quantity + 1})
    } else {
      await this._userCartsRepository.create({userNumber, productId})
    }
  }
  
}