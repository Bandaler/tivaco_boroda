"use client";

import { useState, useEffect, useRef } from 'react';
import { applyPhoneMaskToInput } from '@/utils/phoneMask';
import Link from 'next/link';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isAccepted, setIsAccepted] = useState(true); 
  const API_URL = process.env.API_SECRET_URL_FORM;

  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (phoneInputRef.current) {
      applyPhoneMaskToInput(phoneInputRef.current);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAccepted) {
      setStatus('Вы должны принять условия соглашения.');
      return;
    }

    setStatus('Отправка...');

    try {
      const res = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus(json.message || 'Спасибо! Сообщение отправлено.');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        setStatus(json.error || 'Ошибка при отправке формы');
      }
    } catch (error) {
      if (error instanceof Error) {
        setStatus('Ошибка сети: ' + error.message);
      } else {
        setStatus('Неизвестная ошибка');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='counsultation-form'>
      <div className="input-wrap name-input">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </div>
      <div className="input-wrap phone-input">
        <input
          name="phone"
          ref={phoneInputRef}
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
      </div>
      <div className="input-wrap email-input">
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      <div className="input-wrap message-input">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Comment"
          required
        />
      </div>

      {/* Кастомный чекбокс согласия */}
      <div className="input-wrap checkbox-wrap">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={isAccepted}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsAccepted(e.target.checked)}
          />
          <span className="checkbox-mark"></span>
          <span className="checkbox-label">consent to the terms of the <Link href={'/policy'}>privacy Policy</Link></span>
        </label>
      </div>

      <button type="submit" className='submit' disabled={!isAccepted}>Send</button>
      <p>{status}</p>
    </form>
  );
}
