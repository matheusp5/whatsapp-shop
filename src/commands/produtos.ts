import { Message, Whatsapp } from "venom-bot";
import ProductsRepository from "../repository/products-repository";


export default class ProductCommand  {
  private static _productRepository = new ProductsRepository()
  
  static async execute(client: Whatsapp, message: Message): Promise<void> {
    const products = await this._productRepository.findAll();
    if(products.length == 0) {
      await client.sendText(message.from, "*Nenhum produto encontrado em nosso estoque. 😔*");
    } else {
      await client.sendText(message.from, "*Veja todos os produtos. 😊*");
      let text = '';
      products.forEach((product, i) => {
        text += `*#${product.id}* _${product.name}: R$ ${product.price.toString().replace(".", ",")}_`
        if(i != products.length - 1) {
          text += '\n'
        }
      })
      await client.sendText(message.from, text);
    }

  }
  
}