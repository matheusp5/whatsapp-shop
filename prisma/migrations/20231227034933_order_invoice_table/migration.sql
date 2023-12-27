-- CreateTable
CREATE TABLE "tb_orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userNumber" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "tb_orderitems" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "tb_orderitems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "tb_orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tb_orderitems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "tb_products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tb_invoices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "externalReference" TEXT NOT NULL,
    "mercadoPagoId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT "tb_invoices_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "tb_orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
