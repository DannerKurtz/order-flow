#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0690ffd3a5daff70c742df14df357c1f72c05f9eda4271224075d48e4e2150b1/contract';
import endContract from '../../snapshots/0690ffd3a5daff70c742df14df357c1f72c05f9eda4271224075d48e4e2150b1/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/3993d8b44cd69dc60629c86c87794ce4c016ec02b0bafc0bd73d1242deceab90/contract';
import startContract from '../../snapshots/3993d8b44cd69dc60629c86c87794ce4c016ec02b0bafc0bd73d1242deceab90/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'order', column: 'updated_at' }),
      this.dropColumn({ schema: 'public', table: 'product', column: 'updated_at' }),
      this.dropColumn({ schema: 'public', table: 'user', column: 'updated_at' }),
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
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
