import * as migration_20260928_091351_initial from './20260928_091351_initial';
import * as migration_20260928_094824_product_iso_badge from './20260928_094824_product_iso_badge';
import * as migration_20260928_100232_stores from './20260928_100232_stores';

export const migrations = [
  {
    up: migration_20260928_091351_initial.up,
    down: migration_20260928_091351_initial.down,
    name: '20260928_091351_initial',
  },
  {
    up: migration_20260928_094824_product_iso_badge.up,
    down: migration_20260928_094824_product_iso_badge.down,
    name: '20260928_094824_product_iso_badge',
  },
  {
    up: migration_20260928_100232_stores.up,
    down: migration_20260928_100232_stores.down,
    name: '20260928_100232_stores'
  },
];
