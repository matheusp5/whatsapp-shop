import { Message, Whatsapp } from "venom-bot";
import ProductCommand from "./commands/produtos";
import CartCommand from "./commands/carrinho";
import AddCommand from "./commands/comprar";
import RemoveCommand from "./commands/remover";
import FinishCommand from "./commands/finalizar";
import OrdersRepository from "./repository/orders-repository";

let whatsappClient: Whatsapp

export function initWhatsappBot(client: Whatsapp) {
  whatsappClient = client
  client.onMessage(onMessage)
}


let payerLevel: {number: string, level: number}[] = []

export async function onMessage(message: Message) {
  const body: string = message.body
  const from: string = message.from 

  if(!message.isGroupMsg) {

    const payer = payerLevel.find(x => x.number == from)
    if(payer != null) {
      if(payer.level == 1) {
        if(body.toLocaleLowerCase() == 'cancelar') {
          await whatsappClient.sendText(from, '*Seu pedido foi cancelado. ❌*')
          payerLevel = payerLevel.filter(x => x.number != from)
        } else {
          const payment = await new OrdersRepository().create(from, body)
          await whatsappClient.sendText(from, `*Ótima notícia! ✅*\n*Seu pedido foi registrado.*\n*ID: ${payment.external}*\nPague o PIX abaixo.`);
          await whatsappClient.sendText(from, payment.copy);
        }
      }
    }

    if(body.startsWith("/")) {
      switch(body.toLowerCase().split(" ")[0]){
        case '/produtos': ProductCommand.execute(whatsappClient, message); break;
        case '/adicionar': AddCommand.execute(whatsappClient, message); break;
        case '/remover': RemoveCommand.execute(whatsappClient, message); break;
        case '/carrinho': CartCommand.execute(whatsappClient, message); break;
        case '/finalizar': 
          FinishCommand.execute(whatsappClient, message);
          payerLevel.push({
            number: message.from,
            level: 1
          })
          break;
        default: whatsappClient.sendText(from, 'Desculpe, não entendi. 😞'); break;
      } 
    }

  } 
}
