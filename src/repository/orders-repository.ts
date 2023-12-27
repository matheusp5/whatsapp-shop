import { PrismaClient } from "@prisma/client";
import DatabaseProvider from "../utils/database-provider";
import IOrdersRepository from "./interfaces/orders-repository-interface";
import {randomUUID} from "crypto"
import Payment from "../payment";

export default class OrdersRepository implements IOrdersRepository {

  private readonly _database: PrismaClient = DatabaseProvider();

  async findAllByUserNumber(number: string){
    return (await this._database.order.findMany({
      where: {
        userNumber: number
      }
    })).map(async (e) => {
      return {
        id: e.id,
        total: e.total,
        userNumber: number,
        products: await this._database.orderItems.findMany({where: {orderId: e.id}}),
        invoice: await this._database.invoice.findFirst({where: {orderId: e.id}})
      }
    });
  }
  
  async create(number: string, email: string): Promise<{qrcode: string, copy: string, external: string}> {
    const cartItems = await this._database.userCart.findMany({
      where: {
        userNumber: number
      },
      include: {
        product: true
      }
    })
    let total = 0;
    cartItems.forEach(e => {
      total += e.product.price * e.quantity;
    })

    const externalReference = randomUUID().toString()
    const order = await this._database.order.create({
      data: {
        userEmail: email,
        total,
        userNumber: number
      }
    })

    
    for(let cartItem of cartItems) {
      await this._database.orderItems.create({
        data: {
          orderId: order.id,
          productId: cartItem.productId,
          quantity: cartItem.quantity
        }
      })
    }

    const payment = await new Payment().createPayment(externalReference, total, email)

    await this._database.invoice.create({
      data: {
        externalReference,
        total,
        orderId: order.id,
        mercadoPagoId: payment.id
      }
    })
    
    return {
      ...payment,
      external: externalReference
    }

  }

  async findById(id: string) {
    return await this._database.order.findFirst({
      where: {id}
    })
  }
  
}