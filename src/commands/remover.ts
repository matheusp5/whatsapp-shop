import { Message, Whatsapp } from "venom-bot";
import ProductsRepository from "../repository/products-repository";
import UserCartsRepository from "../repository/usercars-repository";


export default class RemoveCommand  {
  
  private static _userCartsRepository = new UserCartsRepository();

  static async execute(client: Whatsapp, message: Message): Promise<void> {
    const productId = message.body.split(" ")[1]
    const userCart = await this._userCartsRepository.findByNumberAndProductId(message.from, productId);

    if(userCart) {
      await this._userCartsRepository.remove(message.from, productId)
      client.sendText(message.from, "*Sucesso! O produto foi removido do seu carrinho. ✅*")
    } else {
      await client.sendText(message.from, "*Esse produto não está no seu carrinho.*")
    }
  }

  
}