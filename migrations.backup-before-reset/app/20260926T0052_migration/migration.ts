#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/3993d8b44cd69dc60629c86c87794ce4c016ec02b0bafc0bd73d1242deceab90/contract';
import startContract from '../../snapshots/3993d8b44cd69dc60629c86c87794ce4c016ec02b0bafc0bd73d1242deceab90/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/477dd9d934db3ce9367b078d668c0c77541174e9d699f3f4e132f0d1e9815bce/contract';
import endContract from '../../snapshots/477dd9d934db3ce9367b078d668c0c77541174e9d699f3f4e132f0d1e9815bce/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'order', column: 'created_at' }),
      this.dropColumn({ schema: 'public', table: 'order', column: 'total_price' }),
      this.dropColumn({ schema: 'public', table: 'order', column: 'updated_at' }),
      this.dropConstraint({
        schema: 'public',
        table: 'order',
        constraint: 'order_user_id_fkey',
        kind: 'foreignKey',
      }),
      this.dropIndex({ schema: 'public', table: 'order', index: 'order_user_id_idx_6c952402' }),
      this.dropColumn({ schema: 'public', table: 'order', column: 'user_id' }),
      this.dropColumn({ schema: 'public', table: 'product', column: 'created_at' }),
      this.dropColumn({ schema: 'public', table: 'product', column: 'is_active' }),
      this.dropColumn({ schema: 'public', table: 'product', column: 'updated_at' }),
      this.dropColumn({ schema: 'public', table: 'productOrder', column: 'created_at' }),
      this.dropConstraint({
        schema: 'public',
        table: 'productOrder',
        constraint: 'productOrder_order_id_fkey',
        kind: 'foreignKey',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'productOrder',
        constraint: 'productOrder_product_id_fkey',
        kind: 'foreignKey',
      }),
      this.dropIndex({
        schema: 'public',
        table: 'productOrder',
        index: 'productOrder_order_id_idx_39ad19ad',
      }),
      this.dropColumn({ schema: 'public', table: 'productOrder', column: 'order_id' }),
      this.dropIndex({
        schema: 'public',
        table: 'productOrder',
        index: 'productOrder_product_id_idx_22a2b7d2',
      }),
      this.dropColumn({ schema: 'public', table: 'productOrder', column: 'product_id' }),
      this.dropColumn({ schema: 'public', table: 'user', column: 'created_at' }),
      this.dropColumn({ schema: 'public', table: 'user', column: 'first_name' }),
      this.dropColumn({ schema: 'public', table: 'user', column: 'is_active' }),
      this.dropColumn({ schema: 'public', table: 'user', column: 'last_name' }),
      this.dropColumn({ schema: 'public', table: 'user', column: 'updated_at' }),
      this.addColumn({
        schema: 'public',
        table: 'order',
        column: col('createdAt', 'timestamptz', {
          notNull: true,
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'product',
        column: col('createdAt', 'timestamptz', {
          notNull: true,
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'product',
        column: col('isActive', 'bool', {
          notNull: true,
          default: lit(true),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'productOrder',
        column: col('createdAt', 'timestamptz', {
          notNull: true,
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('createdAt', 'timestamptz', {
          notNull: true,
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('isActive', 'bool', {
          notNull: true,
          default: lit(true),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'order',
        column: col('totalPrice', 'numeric(10,2)', {
          codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 10, scale: 2 } },
        }),
      }),
      this.dataTransform(endContract, 'backfill-order-totalPrice', {
        check: () => placeholder('backfill-order-totalPrice:check'),
        run: () => placeholder('backfill-order-totalPrice:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'order', column: 'totalPrice' }),
      this.addColumn({
        schema: 'public',
        table: 'order',
        column: col('updatedAt', 'timestamptz', {
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.dataTransform(endContract, 'backfill-order-updatedAt', {
        check: () => placeholder('backfill-order-updatedAt:check'),
        run: () => placeholder('backfill-order-updatedAt:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'order', column: 'updatedAt' }),
      this.addColumn({
        schema: 'public',
        table: 'order',
        column: col('userId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-order-userId', {
        check: () => placeholder('backfill-order-userId:check'),
        run: () => placeholder('backfill-order-userId:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'order', column: 'userId' }),
      this.addColumn({
        schema: 'public',
        table: 'product',
        column: col('updatedAt', 'timestamptz', {
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.dataTransform(endContract, 'backfill-product-updatedAt', {
        check: () => placeholder('backfill-product-updatedAt:check'),
        run: () => placeholder('backfill-product-updatedAt:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'product', column: 'updatedAt' }),
      this.addColumn({
        schema: 'public',
        table: 'productOrder',
        column: col('orderId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-productOrder-orderId', {
        check: () => placeholder('backfill-productOrder-orderId:check'),
        run: () => placeholder('backfill-productOrder-orderId:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'productOrder', column: 'orderId' }),
      this.addColumn({
        schema: 'public',
        table: 'productOrder',
        column: col('productId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-productOrder-productId', {
        check: () => placeholder('backfill-productOrder-productId:check'),
        run: () => placeholder('backfill-productOrder-productId:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'productOrder', column: 'productId' }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('firstName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-user-firstName', {
        check: () => placeholder('backfill-user-firstName:check'),
        run: () => placeholder('backfill-user-firstName:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'user', column: 'firstName' }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('lastName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-user-lastName', {
        check: () => placeholder('backfill-user-lastName:check'),
        run: () => placeholder('backfill-user-lastName:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'user', column: 'lastName' }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('updatedAt', 'timestamptz', {
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.dataTransform(endContract, 'backfill-user-updatedAt', {
        check: () => placeholder('backfill-user-updatedAt:check'),
        run: () => placeholder('backfill-user-updatedAt:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'user', column: 'updatedAt' }),
      this.createIndex({
        schema: 'public',
        table: 'order',
        index: 'order_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'productOrder',
        index: 'productOrder_orderId_idx_d284871b',
        columns: ['orderId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'productOrder',
        index: 'productOrder_productId_idx_5858600a',
        columns: ['productId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'order',
        foreignKey: {
          name: 'order_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'productOrder',
        foreignKey: {
          name: 'productOrder_orderId_fkey',
          columns: ['orderId'],
          references: { schema: 'public', table: 'order', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'productOrder',
        foreignKey: {
          name: 'productOrder_productId_fkey',
          columns: ['productId'],
          references: { schema: 'public', table: 'product', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
