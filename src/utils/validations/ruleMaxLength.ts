import i18n from '@/plugins/i18n';
import type { ValidationRuleBaseParams } from './types/validationRuleBaseParams';

export interface RuleEmailParams extends ValidationRuleBaseParams {}

/**
 * Rule validate email
 * @param {any} v the given value to validate
 * @param {RuleEmailParams} params
 * @returns validate
 */
const validation = (v: string, params?: RuleEmailParams) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    !v ||
    re.test(String(v)) ||
    (params?.msg ?? i18n.global.t('validation.email'))
  );
};

export default validation;
