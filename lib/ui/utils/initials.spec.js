import { describe, it, expect } from 'vitest';
import { getInitials } from './index.js';

describe('Utils:ui', () => {
  describe('get initials from string)', () => {
    it('should get empty string from provided null value', () => {
      const expectedResult = '';
      const result = getInitials(null);
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get empty string from provided undefined value', () => {
      const expectedResult = '';
      const result = getInitials(undefined);
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get empty string from provided empty string [""]', () => {
      const expectedResult = '';
      const result = getInitials('');
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get initials JD from string [Joe Doe]', () => {
      const expectedResult = 'JD';
      const result = getInitials('Joe Doe');
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get initials JD from string [Joe Alexander Doe]', () => {
      const expectedResult = 'JD';
      const result = getInitials('Joe Alexander Doe');
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get initials JD from string [Joe Alexander Arnold Doe]', () => {
      const expectedResult = 'JD';
      const result = getInitials('Joe Alexander Arnold Doe');
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get initials AR from string [Abacus Research AG]', () => {
      const expectedResult = 'AR';
      const result = getInitials('Abacus Research AG');
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get initials DC from string [UiCorp]', () => {
      const expectedResult = 'DC';
      const result = getInitials('UiCorp');
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get initials DF from string [UiAmazingFlow]', () => {
      const expectedResult = 'DF';
      const result = getInitials('UiAmazingFlow');
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get initials JO from string [Joe]', () => {
      const expectedResult = 'JO';
      const result = getInitials('Joe');
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get initials AG from string [AG AG]', () => {
      const expectedResult = 'AG';
      const result = getInitials('AG AG');
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get initials DC from string [AG AG UiCorp AG]', () => {
      const expectedResult = 'DC';
      const result = getInitials('AG AG UiCorp AG');
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get initials DC from string [AG AG SA UiCorp AG GMBH]', () => {
      const expectedResult = 'DC';
      const result = getInitials('AG AG SA UiCorp AG GMBH');
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get initials DC from string [AG AG SA Ui Corp AG GMBH]', () => {
      const expectedResult = 'DC';
      const result = getInitials('AG AG SA Ui Corp AG GMBH');
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get initials DA from string [🤪🤪D🤪🤪A]', () => {
      const expectedResult = 'DA';
      const result = getInitials('🤪🤪D🤪🤪A');
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get initials DA from string [🤪🤪D🤪🤪A]', () => {
      const expectedResult = 'DA';
      const result = getInitials('🤪🤪D🤪🤪A');
      expect(result).toStrictEqual(expectedResult);
    });
    it('should get empty "" from string [🤪🤪🤪🤪]', () => {
      const expectedResult = '';
      const result = getInitials('🤪🤪🤪🤪');
      expect(result).toStrictEqual(expectedResult);
    });
  });
});
