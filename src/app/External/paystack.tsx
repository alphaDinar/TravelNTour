import axios from 'axios';
export const createPayLink = async (amount: number, tid: string, email: string) => {
  // const host = 'http://localhost:3000';
  const host = 'https://travel-n-tour.vercel.app';
  const url = "https://api.paystack.co/transaction/initialize";

  const data = {
    email: email,
    amount: amount,
    callback_url: `${host}/myTours?tid=${tid}`,
    metadata: { cancel_action: `${host}/myTours?tid=${tid}` }
  };

  const response = await axios.post(url, data, {
    headers: {
      // Authorization: `Bearer sk_test_0442b213d2c6710e6313d112dd1e7b11f8cd2f32`,
      // Authorization: `Bearer sk_live_d3fb0b127d4908c2381db2df50bb135ac4ea0876`,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_API_KEY}`,
      'Cache-Control': 'no-cache'
    }
  })

  const payObj = {
    link: response.data.data.authorization_url,
    ref: response.data.data.reference
  }

  return payObj;
}

export const verifyPayment = async (payRef: string) => {
  const url = `https://api.paystack.co/transaction/verify/${payRef}`;

  const response = await axios.get(url, {
    headers: {
      // Authorization: `Bearer sk_test_0442b213d2c6710e6313d112dd1e7b11f8cd2f32`,
      // Authorization: `Bearer sk_live_d3fb0b127d4908c2381db2df50bb135ac4ea0876`,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_API_KEY}`,
      'Cache-Control': 'no-cache'
    }
  })

  return response.status;
}