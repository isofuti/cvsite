import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TelegramApp = () => {
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const handleSend = () => {
    if (!message.trim()) return;
    const url = `https://t.me/nonenewfriends?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#e4eef6' }}>
      {/* Telegram Header */}
      <div style={{ background: '#fff', padding: '10px 20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #dcdcdc' }}>
        <div style={{ width: '40px', height: '40px', background: '#007aff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', fontWeight: 'bold', marginRight: '15px' }}>
          E
        </div>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#000' }}>Egor Khromov</div>
          <div style={{ fontSize: '12px', color: '#007aff' }}>{t('tg_online')}</div>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ alignSelf: 'flex-start', background: '#fff', padding: '10px 15px', borderRadius: '15px 15px 15px 0', maxWidth: '80%', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
          {t('tg_welcome_msg')}
        </div>
      </div>

      {/* Input Area */}
      <div style={{ background: '#fff', padding: '15px', display: 'flex', gap: '10px', alignItems: 'flex-end', borderTop: '1px solid #dcdcdc' }}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('tg_placeholder')}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            resize: 'none',
            maxHeight: '100px',
            minHeight: '20px',
            fontFamily: 'inherit',
            fontSize: '14px',
            padding: '10px',
            background: '#f1f1f1',
            borderRadius: '10px'
          }}
          rows={1}
        />
        <button 
          onClick={handleSend}
          style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#007aff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', flexShrink: 0 }}
        >
          <Send size={18} style={{ marginLeft: '-2px' }} />
        </button>
      </div>
    </div>
  );
};
