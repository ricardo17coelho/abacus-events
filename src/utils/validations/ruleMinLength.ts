import i18n from '@/plugins/i18n';
import type { ValidationRuleBaseParams } from './types/validationRuleBaseParams';

export interface RuleMinLengthParams extends ValidationRuleBaseParams {
  length: number;
}

/**
 * Rule validate min length
 * @param {any} v the given value to validate
 * @param {RuleMinLengthParams} params
 * @returns validate
 */
const validation = (v: number | string, params: RuleMinLengthParams) => {
  return (
    String(v).length >= params.length ||
    (params?.msg ?? i18n.global.t('validation.min', params.length))
  );
};

export default validation;
