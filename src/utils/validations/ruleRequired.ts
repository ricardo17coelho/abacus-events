
import i18n from '@/plugins/i18n';
import type { ValidationRuleBaseParams } from './types/validationRuleBaseParams';
import { isNullOrUndefined } from '../isNullOrUndefined';
import { isEmptyArray } from '../isEmptyArray';

export interface RuleRequiredParams extends ValidationRuleBaseParams {
  allowFalse: boolean;
}

/**
 * Rule validate required
 * @param {any} v the given value to validate
 * @param {RuleRequiredParams} params
 * @returns validate
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validation = (v: any, params?: RuleRequiredParams) => {
  const errorText = params?.msg ?? i18n.global.t('validation.required');

  if (isNullOrUndefined(v) || isEmptyArray(v)) {
    return errorText;
  }

  // in case a field considers `false` as an empty value like checkboxes.
  if (v === false && !params?.allowFalse) {
    return errorText;
  }

  return !!String(v).trim().length || errorText;
};

export default validation;
