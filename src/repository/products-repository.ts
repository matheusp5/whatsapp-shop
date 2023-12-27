import { PrismaClient } from "@prisma/client";
import IProductsRepository from "./interfaces/products-repository-interface";
import DatabaseProvider from "../utils/database-provider";

export default class ProductsRepository implements IProductsRepository {
  
  private readonly _database: PrismaClient = DatabaseProvider();

  async findAll(): Promise<{ id: string; name: string; price: number; createdAt: Date; }[]> {
    return await this._database.product.findMany();
  }

  async findById(id: string): Promise<{ id: string; name: string; price: number; createdAt: Date; } | null> {
    return await this._database.product.findFirst({
      where:{id}
    })
  }
  async create(product: { name: string; price: number; }): Promise<void> {
    await this._database.product.create({data: product})
  }



  
}