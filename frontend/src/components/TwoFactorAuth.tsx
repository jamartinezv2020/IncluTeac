// src/components/TwoFactorAuth.tsx

import React, { useState } from 'react';
import { generate2FA, verify2FAToken } from '../services/apiService'; // Importa las funciones relacionadas con 2FA

const TwoFactorAuth: React.FC<{ userId: string }> = ({ userId }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [token, setToken] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleGenerateQR = async () => {
    try {
      const url = await generate2FA(userId);
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };

  const handleVerifyToken = async () => {
    try {
      const valid = await verify2FAToken(userId, token);
      setIsValid(valid);
    } catch (error) {
      console.error('Failed to verify token:', error);
    }
  };

  return (
    <div>
      <button onClick={handleGenerateQR}>Generate 2FA QR Code</button>
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code for 2FA" />}
      <input type="text" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Enter 2FA Token" />
      <button onClick={handleVerifyToken}>Verify Token</button>
      {isValid !== null && <p>{isValid ? 'Token is valid' : 'Token is invalid'}</p>}
    </div>
  );
};

export default TwoFactorAuth;
