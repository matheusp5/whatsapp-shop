import { Product } from "@prisma/client";


export default interface IProductsRepository {
  findAll(): Promise<Array<Product>>;
  findById(id: string): Promise<Product | null>
  create(product: Product): Promise<void>
}