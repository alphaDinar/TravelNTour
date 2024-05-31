import axios from "axios";

const apiKey = 'Z2ROSXNnamNqckFMc2NQdGtLQmk'

const headers = {
  'api-key': apiKey,
  'Content-Type': 'application/json',
};


export const sendOTP = async (contact: string) => {
  const url = 'https://sms.arkesel.com/api/otp/generate';
  const payload = {
    "expiry": 10,
    "length": 6,
    "medium": "sms",
    "message": "%otp_code%, Your Maq OTP Expires in 10 mins",
    "number": contact,
    "sender_id": "Super Mc",
    "type": "numeric"
  }

  const response = await axios.post(url, payload, { headers });
  return response;
}


export const verifyOTP = async (contact: string, code: string) => {
  const url = 'https://sms.arkesel.com/api/otp/verify';
  const payload = { "code": code, "number": contact };
  const response = await axios.post(url, payload, { headers });
  return response;
}

export const sendSMS = async (contact: string, message: string) => {
  // const url = `https://sms.arkesel.com/sms/api?action=send-sms`;
  // const payload = {
  //   "action": "send-sms",
  //   "api_key": apiKey,
  //   "to": "233558420368",
  //   "from": "Arkesel",
  //   "sms": "Hello world. Spreading peace and joy only. Remeber to put on your face mask. Stay safe!"
  // }

  // const response = await axios.post(url, payload, { headers });
  await axios.get(`https://sms.arkesel.com/sms/api?action=send-sms&api_key=${apiKey}&to=${contact}&from=Maqete&sms=${message}`);
  // console.log(response);
  // return response;
}


// export const sendSMS = async () => {
//   await axios.get('https://sms.arkesel.com/sms/api?action=send-sms&api_key=Z2ROSXNnamNqckFMc2NQdGtLQmk&to=233558420368&from=Me&sms=YourMessage')

//   // try {
//   //   const response = await axios.get(`https://sms.arkesel.com/sms/api?action=send-sms&api_key=${apiKey}&to=233558420368&from=Arkesel&sms=Hello world. Spreading peace and joy only. Remember to put on your face mask. Stay safe!`);
//   //   console.log(response.data); // Assuming response contains relevant data
//   // } catch (error) {
//   //   console.error(error);
//   // }
// };