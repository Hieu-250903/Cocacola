import { describe, it, expect } from 'vitest';
import { 
  validateEmail, 
  validateName, 
  hasProfanity, 
  validateForm
} from '../validation';
import type { FormFields } from '../validation';

describe('Validation Helpers', () => {
  describe('validateEmail', () => {
    it('should validate correct emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
    });

    it('should invalidate incorrect emails', () => {
      expect(validateEmail('testexample.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('test@domain')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
    });
  });

  describe('validateName', () => {
    it('should validate names between 2 and 15 characters without special symbols', () => {
      expect(validateName('Alex')).toBe(true);
      expect(validateName('Nguyễn Văn A')).toBe(true);
      expect(validateName('Coca 123')).toBe(true);
    });

    it('should invalidate names that are too short or too long', () => {
      expect(validateName('A')).toBe(false); // Too short
      expect(validateName('a'.repeat(16))).toBe(false); // Too long
    });

    it('should invalidate names with special symbols', () => {
      expect(validateName('Alex@123')).toBe(false);
      expect(validateName('John_Doe')).toBe(false);
      expect(validateName('John!')).toBe(false);
    });
  });

  describe('hasProfanity', () => {
    it('should detect profanity words case-insensitively', () => {
      expect(hasProfanity('fuck')).toBe(true);
      expect(hasProfanity('some BITCH word')).toBe(true);
      expect(hasProfanity('địt nhau')).toBe(true);
    });

    it('should allow normal names', () => {
      expect(hasProfanity('Hieu')).toBe(false);
      expect(hasProfanity('Coca-Cola')).toBe(false);
    });
  });
});

describe('validateForm', () => {
  const validData: FormFields = {
    senderName: 'Minh Hieu',
    recipientName: 'Gia Huy',
    recipientEmail: 'friend@example.com',
    cokeVariant: 'Classic',
    message: 'Chúc bạn một ngày vui vẻ cùng Coca-Cola!'
  };

  it('should return isValid true when all data is valid', () => {
    const result = validateForm(validData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('should return errors for invalid email', () => {
    const result = validateForm({ ...validData, recipientEmail: 'invalid-email' });
    expect(result.isValid).toBe(false);
    expect(result.errors.recipientEmail).toBeDefined();
  });

  it('should return errors for short messages', () => {
    const result = validateForm({ ...validData, message: 'Short' });
    expect(result.isValid).toBe(false);
    expect(result.errors.message).toBeDefined();
  });

  it('should return errors for profane names', () => {
    const result = validateForm({ ...validData, recipientName: 'Bitch' });
    expect(result.isValid).toBe(false);
    expect(result.errors.recipientName).toBeDefined();
  });
});
