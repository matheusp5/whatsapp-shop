import { Product, UserCart } from "@prisma/client";


export default interface IUserCartsRepository {
  findByUserNumber(number: string): Promise<Array<UserCart>>;
  findById(id: string): Promise<UserCart | null>
  create(product: UserCart): Promise<void>
  update(userCartId: string, userCart: UserCart): Promise<void>
  findByNumberAndProductId(number: string, productId: string)
  remove(number: string, productId: string): Promise<void>;
}