import { useState } from 'react';
import './ShareACoke.css';

const ShareACoke = () => {
  const [name, setName] = useState('BẠN');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState('Classic');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name || name === 'BẠN') {
      newErrors.name = 'Vui lòng nhập tên';
    }
    if (!email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!email.includes('@')) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!message) {
      newErrors.message = 'Vui lòng nhập lời chúc';
    } else if (message.length < 5) {
      newErrors.message = 'Lời chúc quá ngắn';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <section className="share-coke-section">
      <div className="share-coke-container">
        <div className="share-coke-content">
          <h2>Share a Coke with...</h2>
          <p>Tạo một lon Coca-Cola mang đậm dấu ấn cá nhân để dành tặng cho bản thân hoặc những người thân yêu.</p>
          
          {submitted ? (
            <div className="success-message">
              <h3>Gửi thành công!</h3>
              <p>Lon Coca-Cola mang tên {name} đã được gửi tới {email}.</p>
              <button onClick={() => {
                setSubmitted(false);
                setName('BẠN');
                setEmail('');
                setMessage('');
              }} className="submit-btn">Tạo lon mới</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="coke-form">
              <div className="form-group">
                <label className="form-label">Tên trên lon</label>
                <input 
                  type="text" 
                  placeholder="Nhập tên..." 
                  value={name === 'BẠN' ? '' : name}
                  maxLength={15}
                  onChange={(e) => setName(e.target.value || 'BẠN')}
                  className="coke-input-field"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Email người nhận</label>
                <input 
                  type="text" 
                  placeholder="Nhập email bạn bè..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="coke-input-field"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Chọn vị Coca-Cola</label>
                <select 
                  value={product} 
                  onChange={(e) => setProduct(e.target.value)}
                  className="coke-select-field"
                >
                  <option value="Classic">Coca-Cola Classic</option>
                  <option value="Zero">Coca-Cola Zero Sugar</option>
                  <option value="Light">Coca-Cola Light</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Lời chúc</label>
                <textarea 
                  placeholder="Nhập lời chúc..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="coke-textarea-field"
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              <button type="submit" className="submit-btn">Gửi lon Coca-Cola</button>
            </form>
          )}
        </div>
        
        <div className="share-coke-visual">
          <div className="coke-can-wrapper">
             <div className="coke-can">
                <div className="coke-can-top"></div>
                <div className={`coke-can-body ${product.toLowerCase()}`}>
                   <div className="coke-label">
                     <span className="coke-brand-name">Coca-Cola</span>
                     <span className="custom-name">{name}</span>
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

