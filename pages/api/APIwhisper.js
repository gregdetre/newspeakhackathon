import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await axios.post(
        'https://api.assemblyai.com/v2/realtime/token',
        { expires_in: 3600 },
        { headers: { authorization: 'b252b894e357462aae8a485365599d88' } }
      );
      console.log(response);
      const { data } = response;
      res.status(200).json(data);
    } catch (error) {
      const {
        response: { status, data },
      } = error;
      res.status(status).json(data);
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}