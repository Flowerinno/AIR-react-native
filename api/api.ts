import {REACT_APP_SERVER_URL} from '@env';
import axios from 'axios';

export const createBlobAPI = async () => {
  try {
    const createdBlob: any = await axios.post(`${REACT_APP_SERVER_URL}/blobs`, {
      callback_url: 'http://google.com',
    });
    return createdBlob.data;
  } catch (error: any) {
    console.log('error while creating a blob');
  }
};

export const uploadToBlobAPI = async (url: string, image: string) => {
  try {
    let file: any = await fetch(`file://${image}`);
    file = await file.blob();

    await fetch(url, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAPI = async (id: string) => {
  const result = await axios.get(`${REACT_APP_SERVER_URL}/blobs/${id}`);
  return result.data;
};
