const getPayPalConfig = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const env = process.env.PAYPAL_ENV || 'sandbox';
  if (!clientId || !clientSecret) {
    throw new Error('Missing PayPal credentials.');
  }
  const baseUrl = env === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
  return { clientId, clientSecret, baseUrl };
};

const getAccessToken = async (baseUrl, clientId, clientSecret) => {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error_description || 'Unable to fetch PayPal token.');
  }
  return data.access_token;
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ message: 'Method not allowed.' }) };
  }

  try {
    const { baseUrl, clientId, clientSecret } = getPayPalConfig();
    const body = JSON.parse(event.body || '{}');
    const amount = Number(body.amount);
    const currency = body.currency || 'USD';

    if (!Number.isFinite(amount) || amount <= 0) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Invalid amount.' }) };
    }

    const accessToken = await getAccessToken(baseUrl, clientId, clientSecret);

    const response = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toFixed(2),
            },
          },
        ],
      }),
    });

    const data = await response.json();
    return {
      statusCode: response.ok ? 200 : response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error?.message || 'PayPal error.' }),
    };
  }
};
