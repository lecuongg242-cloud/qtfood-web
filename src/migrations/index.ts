import * as migration_20260928_091351_initial from './20260928_091351_initial';
import * as migration_20260928_094824_product_iso_badge from './20260928_094824_product_iso_badge';
import * as migration_20260928_100232_stores from './20260928_100232_stores';
import * as migration_20260928_122053_posts_policies from './20260928_122053_posts_policies';
import * as migration_20260928_144057_cms_p5 from './20260928_144057_cms_p5';

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
    name: '20260928_100232_stores',
  },
  {
    up: migration_20260928_122053_posts_policies.up,
    down: migration_20260928_122053_posts_policies.down,
    name: '20260928_122053_posts_policies',
  },
  {
    up: migration_20260928_144057_cms_p5.up,
    down: migration_20260928_144057_cms_p5.down,
    name: '20260928_144057_cms_p5'
  },
];
