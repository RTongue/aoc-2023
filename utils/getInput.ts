import axios from 'axios';
import Cookie from './cookie';

export async function getInput(url: string) {
  try {
    const res = await axios.get(url, {
      headers: { Cookie }
    })
    return res.data
  } catch (e) {
    console.error(e)
  }
}