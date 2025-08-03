import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Order } from "./order.entity";
import { Bundle } from "./bundle.entity";

@Entity("products")
export class Product {
  @PrimaryColumn({ type: "bigint" })
  siteId: number;

  @PrimaryColumn({ type: "bigint" })
  productId: number;

  @Column({ type: "text" })
  reference: string;

  @Column({ type: "text", nullable: true })
  catalog: string;

  @Column({ type: "text", nullable: true })
  action: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "numeric", precision: 10, scale: 3, nullable: true })
  weight: number;

  @Column({ type: "numeric", precision: 10, scale: 3, nullable: true })
  vat: number;

  @Column({ type: "text", nullable: true })
  pickingLocation: string;

  @Column({ type: "text", nullable: true })
  storageLocation: string;

  @Column({ type: "smallint", nullable: true })
  packaging: number;

  @Column({ type: "numeric", precision: 19, scale: 4, nullable: true })
  price: number;

  @Column({ type: "int", nullable: true })
  unitsPerPack: number;

  @Column({ type: "int", nullable: true })
  stock: number;

  @Column({ type: "numeric", precision: 19, scale: 4, nullable: true })
  cost: number;

  @Column({ type: "text", nullable: true })
  additionalInfo: string;

  @Column({ type: "smallint", nullable: true })
  vatType: number;

  @Column({ type: "text", nullable: true })
  status: string;

  @Column({ type: "smallint", nullable: true })
  blockedStock: number;

  @Column({ type: "boolean", default: false })
  isShippedBySupplier: boolean;

  @Column({ type: "text", nullable: true })
  createdBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "text", nullable: true })
  modifiedBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  modifiedAt: Date;

  // Relaciones si las necesitas
  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];

  @OneToMany(() => Bundle, (bundle) => bundle.product)
  bundles: Bundle[];
}
