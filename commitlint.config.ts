import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(message) => ['WIP', 'db'].some((v) => message.includes(v))]
};

module.exports = Configuration;
