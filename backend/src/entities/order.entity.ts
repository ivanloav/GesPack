import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Customer } from "./customer.entity";
import { Product } from "./product.entity";
import { Brand } from "./brand.entity";
import { Action } from "./action.entity";
import { ActionCategory } from "./action-category.entity";
import { ActionPriorityType } from "./action-priority-type.entity";
import { OrdersPayment } from "./orders-payment.entity";

@Entity("orders")
export class Order {
  @PrimaryColumn({ type: "bigint" })
  siteId: number;

  @PrimaryColumn({ type: "bigint" })
  orderId: number;

  @Column({ type: "timestamp", nullable: true })
  orderDatetime: Date;

  @Column({ type: "bigint" })
  brandId: number;

  @Column({ type: "text", nullable: true })
  source: string;

  @Column({ type: "bigint", nullable: true })
  actionId: number;

  @Column({ type: "int", nullable: true })
  actionCategoryId: number;

  @Column({ type: "int", nullable: true })
  actionPriorityId: number;

  @Column({ type: "numeric", precision: 19, scale: 4, nullable: true })
  shippingCost: number;

  @Column({ type: "numeric", precision: 19, scale: 4, nullable: true })
  mandatoryShippingFee: number;

  @Column({ type: "bigint", nullable: true })
  customerId: number;

  @Column({ type: "text", nullable: true })
  gender: string;

  @Column({ type: "text", nullable: true })
  firstName: string;

  @Column({ type: "text", nullable: true })
  lastName: string;

  @Column({ type: "bigint" })
  paymentTypeId: number;

  @Column({ type: "boolean", default: false })
  isPaid: boolean;

  @Column({ type: "date", nullable: true })
  paidDate: Date;

  @Column({ type: "boolean", default: false })
  isInvoiced: boolean;

  @Column({ type: "date", nullable: true })
  invoicedDate: Date;

  @Column({ type: "bigint", default: 0 })
  orderLines: number;

  @Column({ type: "float", default: 0 })
  weight: number;

  @Column({ type: "numeric", precision: 19, scale: 4, nullable: true })
  orderAmount: number;

  @Column({ type: "numeric", precision: 19, scale: 4, nullable: true })
  bi1: number;

  @Column({ type: "numeric", precision: 19, scale: 4, nullable: true })
  bi2: number;

  @Column({ type: "numeric", precision: 19, scale: 4, nullable: true })
  tva1: number;

  @Column({ type: "numeric", precision: 19, scale: 4, nullable: true })
  tva2: number;

  @Column({ type: "text", nullable: true })
  returnStatus: string;

  @Column({ type: "text", nullable: true })
  shippingType: string;

  @Column({ type: "boolean", default: false })
  isAnnulled: boolean;

  @Column({ type: "date", nullable: true })
  annulledDate: Date;

  @Column({ type: "text", nullable: true })
  annulledBy: string;

  @Column({ type: "text", nullable: true })
  createdBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "text", nullable: true })
  modifiedBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  modifiedAt: Date;

  // 🔗 Relaciones

  @ManyToOne(() => Customer)
  @JoinColumn([
    { name: "siteId", referencedColumnName: "siteId" },
    { name: "customerId", referencedColumnName: "customerId" },
  ])
  customer: Customer;

  @ManyToOne(() => Brand)
  @JoinColumn([
    { name: "siteId", referencedColumnName: "siteId" },
    { name: "brandId", referencedColumnName: "brandId" },
  ])
  brand: Brand;

  @ManyToOne(() => Action)
  @JoinColumn([
    { name: "siteId", referencedColumnName: "siteId" },
    { name: "actionId", referencedColumnName: "actionId" },
  ])
  action: Action;

  @ManyToOne(() => ActionCategory)
  @JoinColumn([
    { name: "siteId", referencedColumnName: "siteId" },
    { name: "actionCategoryId", referencedColumnName: "actionCategoryId" },
  ])
  actionCategory: ActionCategory;

  @ManyToOne(() => ActionPriorityType)
  @JoinColumn([
    { name: "siteId", referencedColumnName: "siteId" },
    { name: "actionPriorityId", referencedColumnName: "actionPriorityId" },
  ])
  actionPriority: ActionPriorityType;

  @ManyToOne(() => OrdersPayment)
  @JoinColumn([
    { name: "siteId", referencedColumnName: "siteId" },
    { name: "orderId", referencedColumnName: "orderId" },
  ])
  payment: OrdersPayment;

  @ManyToOne(() => Product, (product) => product.orders)
  @JoinColumn([
  { name: "siteId", referencedColumnName: "siteId" },
  { name: "productId", referencedColumnName: "productId" },
])
product: Product;

}
