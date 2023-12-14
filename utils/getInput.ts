import axios from 'axios';
import Cookie from './cookie';
import path from 'path'
import fs from 'fs'

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

export async function getFileInput(file: string) {
  return fs.promises.readFile(path.join(__dirname, file), 'utf8')
}