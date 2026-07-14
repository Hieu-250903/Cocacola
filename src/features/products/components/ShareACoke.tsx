import { useState } from 'react';
import './ShareACoke.css';
import { validateForm } from '../utils/validation';
import type { FormFields, FormErrors } from '../utils/validation';

const ShareACoke = () => {
  const [formData, setFormData] = useState<FormFields>({
    senderName: '',
    recipientName: '',
    recipientEmail: '',
    cokeVariant: 'Classic',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being modified
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateForm(formData);
    
    // Simulate slight API delay for better UX micro-interaction
    setTimeout(() => {
      setIsSubmitting(false);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      setErrors({});
      setIsSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setFormData({
      senderName: '',
      recipientName: '',
      recipientEmail: '',
      cokeVariant: 'Classic',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  // Gracefully handle displaying "BẠN" if recipient name is empty
  const displayNameOnCan = formData.recipientName.trim() || 'BẠN';

  return (
    <section className="share-coke-section">
      <div className="share-coke-container">
        <div className="share-coke-content">
          <h2>Share a Coke with...</h2>
          <p>Tạo một lon Coca-Cola mang đậm dấu ấn cá nhân để dành tặng cho bản thân hoặc những người thân yêu.</p>

          {isSubmitted ? (
            <div className="success-message" role="alert">
              <h3>Gửi thành công! 🎉</h3>
              <p>Lon Coca-Cola mang tên <strong>{formData.recipientName}</strong> đã được gửi tới <strong>{formData.recipientEmail}</strong>.</p>
              <div className="success-summary">
                <p><strong>Người gửi:</strong> {formData.senderName}</p>
                <p><strong>Vị đã chọn:</strong> {formData.cokeVariant}</p>
                <p><strong>Lời chúc:</strong> "{formData.message}"</p>
              </div>
              <button 
                type="button" 
                onClick={handleReset} 
                className="submit-btn reset-btn"
                aria-label="Tạo thêm một lon Coca-Cola mới"
              >
                Tạo lon mới
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="coke-form" noValidate>
              {Object.keys(errors).length > 0 && (
                <div className="error-summary-box" role="alert">
                  <p>Vui lòng sửa các lỗi sau để tiếp tục:</p>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="senderName" className="form-label">Tên của bạn (Người gửi)</label>
                <input
                  type="text"
                  id="senderName"
                  name="senderName"
                  placeholder="Nhập tên người gửi..."
                  value={formData.senderName}
                  onChange={handleInputChange}
                  maxLength={15}
                  aria-invalid={!!errors.senderName}
                  aria-describedby={errors.senderName ? "senderName-error" : undefined}
                  className={`coke-input-field ${errors.senderName ? 'input-error' : ''}`}
                  required
                />
                {errors.senderName && (
                  <span id="senderName-error" className="error-text" role="alert">
                    {errors.senderName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="recipientName" className="form-label">Tên in trên lon (Người nhận)</label>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  placeholder="Nhập tên người nhận..."
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  maxLength={15}
                  aria-invalid={!!errors.recipientName}
                  aria-describedby={errors.recipientName ? "recipientName-error" : undefined}
                  className={`coke-input-field ${errors.recipientName ? 'input-error' : ''}`}
                  required
                />
                {errors.recipientName && (
                  <span id="recipientName-error" className="error-text" role="alert">
                    {errors.recipientName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="recipientEmail" className="form-label">Email người nhận</label>
                <input
                  type="email"
                  id="recipientEmail"
                  name="recipientEmail"
                  placeholder="Nhập email bạn bè..."
                  value={formData.recipientEmail}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.recipientEmail}
                  aria-describedby={errors.recipientEmail ? "recipientEmail-error" : undefined}
                  className={`coke-input-field ${errors.recipientEmail ? 'input-error' : ''}`}
                  required
                />
                {errors.recipientEmail && (
                  <span id="recipientEmail-error" className="error-text" role="alert">
                    {errors.recipientEmail}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="cokeVariant" className="form-label">Chọn vị Coca-Cola</label>
                <select
                  id="cokeVariant"
                  name="cokeVariant"
                  value={formData.cokeVariant}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.cokeVariant}
                  aria-describedby={errors.cokeVariant ? "cokeVariant-error" : undefined}
                  className="coke-select-field"
                >
                  <option value="Classic">Coca-Cola Classic (Đỏ truyền thống)</option>
                  <option value="Zero">Coca-Cola Zero Sugar (Đen không đường)</option>
                  <option value="Light">Coca-Cola Light (Bạc ăn kiêng)</option>
                </select>
                {errors.cokeVariant && (
                  <span id="cokeVariant-error" className="error-text" role="alert">
                    {errors.cokeVariant}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Lời chúc gửi kèm</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Nhập lời chúc của bạn (10-100 ký tự)..."
                  value={formData.message}
                  onChange={handleInputChange}
                  maxLength={100}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`coke-textarea-field ${errors.message ? 'input-error' : ''}`}
                  required
                />
                <div className="char-count">
                  {formData.message.length}/100 ký tự
                </div>
                {errors.message && (
                  <span id="message-error" className="error-text" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi tặng lon Coca-Cola'}
              </button>
            </form>
          )}
        </div>

        <div className="share-coke-visual">
          <div className="coke-can-wrapper">
             <div className="coke-can">
                <div className="coke-can-top"></div>
                <div className={`coke-can-body ${formData.cokeVariant.toLowerCase()}`}>
                   <div className="coke-label">
                     <span className="coke-brand-name">Coca-Cola</span>
                     <span className="custom-name">{displayNameOnCan}</span>
                   </div>
                </div>
                <div className="coke-can-bottom"></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareACoke;
