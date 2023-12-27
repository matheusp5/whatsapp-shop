import { PrismaClient, UserCart } from "@prisma/client";
import IUserCartsRepository from "./interfaces/usercarts-repository-interface";
import DatabaseProvider from "../utils/database-provider";


export default class UserCartsRepository implements IUserCartsRepository {
  

  private readonly _database: PrismaClient = DatabaseProvider();

  async findByUserNumber(number: string) {
    return await this._database.userCart.findMany({
      where: {
        userNumber: number
      },
      include: {
        product: true
      }
    })
  }

  async update(userCartId: string, userCart: any) {
    await this._database.userCart.update({
      where: {id: userCartId},
      data: userCart
    })
  }

  async remove(number: string, productId: string) {
    const userCart = await this._database.userCart.findFirst({
      where: {
        userNumber: number,
        productId
      }
    })
    await this._database.userCart.delete({
      where:{
        id: userCart?.id
      }
    })
  }

  async findByNumberAndProductId(number: string, productId: string) {
    return await this._database.userCart.findFirst({
      where: {
        userNumber: number,
        productId
      }
    })
  }

  async findById(id: string): Promise<{ id: string; userNumber: string; quantity: number; productId: string; createdAt: Date; } | null> {
    return await this._database.userCart.findFirst({
      where: {id}
    })
  }

  async create(product: { userNumber: string; productId: string; }): Promise<void> {
    await this._database.userCart.create({
      data: {
        userNumber: product.userNumber,
        productId: product.productId,
        quantity: 1
      }
    })
  }

}