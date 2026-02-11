import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../context/I18nContext';

declare global {
  interface Window {
    paypal?: any;
  }
}

type PayPalCheckoutProps = {
  amount: number;
  currency?: string;
  disabled?: boolean;
  onApproved: (details: { orderId: string; capture?: any }) => void;
};

const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID as string | undefined;
let paypalSdkPromise: Promise<any> | null = null;

const loadPayPalSdk = (currency: string) => {
  if (!CLIENT_ID) {
    return Promise.reject(new Error('Missing PayPal client ID.'));
  }
  if (window.paypal) {
    return Promise.resolve(window.paypal);
  }
  if (!paypalSdkPromise) {
    paypalSdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
        CLIENT_ID
      )}&currency=${encodeURIComponent(currency)}&components=buttons`;
      script.async = true;
      script.onload = () => resolve(window.paypal);
      script.onerror = () => reject(new Error('Failed to load PayPal SDK.'));
      document.body.appendChild(script);
    });
  }
  return paypalSdkPromise;
};

export default function PayPalCheckout({
  amount,
  currency = 'USD',
  disabled,
  onApproved,
}: PayPalCheckoutProps) {
  const paypalRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState('');
  const { t } = useI18n();

  useEffect(() => {
    if (!paypalRef.current || !CLIENT_ID || disabled) return;
    let cancelled = false;
    setError('');

    const renderButtons = async () => {
      try {
        const paypal = await loadPayPalSdk(currency);
        if (cancelled || !paypalRef.current) return;

        const createOrder = async () => {
          const response = await fetch('/.netlify/functions/paypal-create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount,
              currency,
            }),
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data?.message || 'Unable to create PayPal order.');
          }
          return data.id;
        };

        const captureOrder = async (orderId: string) => {
          const response = await fetch('/.netlify/functions/paypal-capture-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId }),
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data?.message || 'Unable to capture PayPal order.');
          }
          return data;
        };

        const onApprove = async (data: any) => {
          const capture = await captureOrder(data.orderID);
          onApproved({ orderId: data.orderID, capture });
        };

        paypalRef.current.innerHTML = '';
        paypal
          .Buttons({
            createOrder,
            onApprove,
            onError: (err: any) =>
              setError(err?.message || t('PayPal payment failed.')),
            style: { layout: 'vertical', height: 42 },
          })
          .render(paypalRef.current);

        if (cardRef.current && paypal?.FUNDING && paypal?.isFundingEligible) {
          cardRef.current.innerHTML = '';
          if (paypal.isFundingEligible(paypal.FUNDING.CARD)) {
            paypal
              .Buttons({
                fundingSource: paypal.FUNDING.CARD,
                createOrder,
                onApprove,
                onError: (err: any) =>
                  setError(err?.message || t('Card payment failed.')),
                style: { layout: 'vertical', height: 42 },
              })
              .render(cardRef.current);
          }
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message || t('PayPal failed to initialize.'));
        }
      }
    };

    renderButtons();

    return () => {
      cancelled = true;
      if (paypalRef.current) paypalRef.current.innerHTML = '';
      if (cardRef.current) cardRef.current.innerHTML = '';
    };
  }, [amount, currency, disabled, onApproved]);

  if (!CLIENT_ID) {
    return (
      <div className="paypal-note">
        {t('PayPal is not configured yet. Add your PayPal client ID to enable card payments.')}
      </div>
    );
  }

  return (
    <div className="paypal-stack">
      <div className="paypal-label">{t('Pay with card or PayPal')}</div>
      <div ref={paypalRef} />
      <div ref={cardRef} />
      {error && <div className="note">{error}</div>}
    </div>
  );
}
