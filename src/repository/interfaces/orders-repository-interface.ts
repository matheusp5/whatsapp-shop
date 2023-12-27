import { Order } from "@prisma/client"


export default interface IOrdersRepository {
  findAllByUserNumber(number: string)
  create(number: string, email: string): Promise<{qrcode: string, copy: string, external: string}>
  findById(id: string): Promise<Order | null>
}