import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.includes('@')) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await axios.post('http://localhost:8070/password/forget-password', { email });
      setMessage({ 
        text: response.data.message || 'Reset link sent! Check your email.', 
        type: 'success' 
      });
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      let errorMessage = 'Failed to send reset link';
      if (err.response) {
        errorMessage = err.response.data.message || 
                      err.response.data.error || 
                      `Server error (${err.response.status})`;
      } else if (err.request) {
        errorMessage = 'Network error - please check your connection';
      } else {
        errorMessage = err.message || 'An unexpected error occurred';
      }
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f5f7fa',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
      }}>
        <h2 style={{
          color: '#2c3e50',
          marginBottom: '10px',
          fontSize: '24px'
        }}>Forgot Password?</h2>
        
        <p style={{
          color: '#7f8c8d',
          marginBottom: '30px',
          fontSize: '15px'
        }}>Enter your email to receive a reset link</p>
        
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            textAlign: 'left'
          }}>
            <label htmlFor="email" style={{
              fontSize: '14px',
              color: '#2c3e50',
              fontWeight: '500'
            }}>Email</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '12px 15px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '15px',
                transition: 'all 0.3s'
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              background: '#3498db',
              color: 'white',
              border: 'none',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              marginTop: '10px',
              opacity: isLoading ? 0.8 : 1,
              pointerEvents: isLoading ? 'none' : 'auto'
            }}
          >
            {isLoading ? (
              <span style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                border: '3px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                borderTopColor: 'white',
                animation: 'spin 1s ease-in-out infinite',
                marginRight: '8px',
                verticalAlign: 'middle'
              }}></span>
            ) : null}
            {isLoading ? 'Processing...' : 'Send Reset Link'}
          </button>
        </form>

        {message.text && (
          <div style={{
            padding: '15px',
            borderRadius: '8px',
            margin: '20px 0',
            fontSize: '14px',
            background: message.type === 'success' ? '#e6ffed' : '#fff1f0',
            color: message.type === 'success' ? '#237b3b' : '#f5222d',
            border: `1px solid ${message.type === 'success' ? '#b7eb8f' : '#ffa39e'}`,
            display: 'flex',
            flexDirection: message.type === 'error' ? 'column' : 'block',
            gap: message.type === 'error' ? '10px' : '0'
          }}>
            {message.text}
            {message.type === 'error' && (
              <button 
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                  background: 'none',
                  border: '1px solid currentColor',
                  color: 'inherit',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  alignSelf: 'flex-end',
                  transition: 'all 0.2s'
                }}
              >
                Try Again
              </button>
            )}
          </div>
        )}

        <div style={{
          marginTop: '20px',
          color: '#7f8c8d',
          fontSize: '14px'
        }}>
          Remembered your password?{' '}
          <span 
            onClick={() => navigate('/login')}
            style={{
              color: '#3498db',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Log in
          </span>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input:focus {
          border-color: #3498db !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        }
        button:hover {
          background: #2980b9 !important;
        }
        span:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}