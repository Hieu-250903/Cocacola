export interface FormFields {
  senderName: string;
  recipientName: string;
  recipientEmail: string;
  cokeVariant: string;
  message: string;
}

export type FormErrors = Partial<Record<keyof FormFields, string>>;

const PROFANITY_WORDS = ['fuck', 'bitch', 'sex', 'cac', 'lon', 'dit', 'cặc', 'lồn', 'địt'];

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 15) return false;
  // Allows alphanumeric characters, spaces, and standard Vietnamese characters/diacritics
  const nameRegex = /^[a-zA-Z0-9\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂÊÔƠƯưăâêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]+$/;
  return nameRegex.test(trimmed);
};

export const hasProfanity = (text: string): boolean => {
  const lowerText = text.toLowerCase().trim();
  return PROFANITY_WORDS.some(word => lowerText.includes(word));
};

export const validateForm = (data: FormFields): { isValid: boolean; errors: FormErrors } => {
  const errors: FormErrors = {};

  // Sender Name validation
  if (!data.senderName.trim()) {
    errors.senderName = 'Vui lòng nhập tên người gửi';
  } else if (!validateName(data.senderName)) {
    errors.senderName = 'Tên người gửi phải từ 2-15 ký tự và không chứa ký tự đặc biệt';
  } else if (hasProfanity(data.senderName)) {
    errors.senderName = 'Tên người gửi chứa từ ngữ không phù hợp';
  }

  // Recipient Name validation
  if (!data.recipientName.trim()) {
    errors.recipientName = 'Vui lòng nhập tên người nhận';
  } else if (!validateName(data.recipientName)) {
    errors.recipientName = 'Tên người nhận phải từ 2-15 ký tự và không chứa ký tự đặc biệt';
  } else if (hasProfanity(data.recipientName)) {
    errors.recipientName = 'Tên người nhận chứa từ ngữ không phù hợp';
  }

  // Recipient Email validation
  if (!data.recipientEmail.trim()) {
    errors.recipientEmail = 'Vui lòng nhập email người nhận';
  } else if (!validateEmail(data.recipientEmail)) {
    errors.recipientEmail = 'Email không hợp lệ (ví dụ: ten@domain.com)';
  }

  // Coke Variant validation
  const validVariants = ['Classic', 'Zero', 'Light'];
  if (!data.cokeVariant || !validVariants.includes(data.cokeVariant)) {
    errors.cokeVariant = 'Vui lòng chọn một dòng sản phẩm hợp lệ';
  }

  // Message validation
  const msgTrimmed = data.message.trim();
  if (!msgTrimmed) {
    errors.message = 'Vui lòng nhập lời chúc';
  } else if (msgTrimmed.length < 10) {
    errors.message = 'Lời chúc phải có ít nhất 10 ký tự';
  } else if (msgTrimmed.length > 100) {
    errors.message = 'Lời chúc không được vượt quá 100 ký tự';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
