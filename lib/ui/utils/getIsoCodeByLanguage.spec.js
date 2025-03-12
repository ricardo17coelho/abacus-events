import { describe, it, expect } from 'vitest';
import { getIsoCodeByLanguage } from './index.js';

describe('Utils:', () => {
  describe('Given language is [de]', () => {
    const isoCode = 'de';
    it('should get iso code [de]', () => {
      const expectedResult = 'de';
      const result = getIsoCodeByLanguage(isoCode);
      expect(result).toStrictEqual(expectedResult);
    });
  });
  describe('Given language is [fr]', () => {
    const isoCode = 'fr';
    it('should get iso code [fr]', () => {
      const expectedResult = 'fr';
      const result = getIsoCodeByLanguage(isoCode);
      expect(result).toStrictEqual(expectedResult);
    });
  });
  describe('Given language is [it]', () => {
    const isoCode = 'it';
    it('should get iso code [it]', () => {
      const expectedResult = 'it';
      const result = getIsoCodeByLanguage(isoCode);
      expect(result).toStrictEqual(expectedResult);
    });
  });
  describe('Given language is [en]', () => {
    const isoCode = 'en';
    it('should get iso code [en]', () => {
      const expectedResult = 'en';
      const result = getIsoCodeByLanguage(isoCode);
      expect(result).toStrictEqual(expectedResult);
    });
  });
});
