import { useState } from 'react';
import './ShareACoke.css';

const ShareACoke = () => {
  const [name, setName] = useState('BẠN');

  return (
    <section className="share-coke-section">
      <div className="share-coke-container">
        <div className="share-coke-content">
          <h2>Share a Coke with...</h2>
          <p>Tạo một lon Coca-Cola mang đậm dấu ấn cá nhân để dành tặng cho bản thân hoặc những người thân yêu.</p>
          <input 
            type="text" 
            placeholder="Nhập tên của bạn..." 
            maxLength={15}
            onChange={(e) => setName(e.target.value || 'BẠN')}
            className="name-input"
          />
        </div>
        <div className="share-coke-visual">
          <div className="coke-can-wrapper">
             <div className="coke-can">
                <div className="coke-can-top"></div>
                <div className="coke-can-body">
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
