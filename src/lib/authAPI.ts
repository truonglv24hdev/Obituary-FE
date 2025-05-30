import axios from './Axios';

export async function signIn(email: string, password: string) {
  const res = await axios.post('/api/sign-in', { email, password });
  return res.data.token;
}

export async function signUp(first_name: string, email: string, password: string) {
  const res = await axios.post('/api/sign-up', { first_name, email, password });
  return res.data.token;
}