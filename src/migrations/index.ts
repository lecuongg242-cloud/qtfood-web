import * as migration_20260928_091351_initial from './20260928_091351_initial';

export const migrations = [
  {
    up: migration_20260928_091351_initial.up,
    down: migration_20260928_091351_initial.down,
    name: '20260928_091351_initial'
  },
];
