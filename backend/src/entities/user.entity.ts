import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'user_name', type: 'text' })
  userName: string;

  @Column({ name: 'user_password', type: 'text' })
  userPassword: string;

  @Column({ name: 'email', type: 'text', nullable: true })
  email: string;

  @Column({ name: 'is_customer', type: 'boolean', default: false })
  isCustomer: boolean;

  @Column({ name: 'is_admin', type: 'boolean', default: false })
  isAdmin: boolean;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'is_cb', type: 'boolean', default: false })
  isCb: boolean;

  @Column({ name: 'is_list', type: 'boolean', default: false })
  isList: boolean;

  @Column({ name: 'bd_customer', type: 'text', nullable: true })
  bdCustomer: string;

  @Column({ name: 'created_by', type: 'text', nullable: true })
  createdBy: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'modified_by', type: 'text', nullable: true })
  modifiedBy: string;

  @Column({ name: 'modified_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  modifiedAt: Date;
}