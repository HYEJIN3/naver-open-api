import React from 'react';
import axios from 'axios';

export const apiUrl: string = '/v1/datalab/shopping/category/';

export const instance = axios.create({
  baseURL: apiUrl,
  timeout: 1000,
  headers: {
    'X-Naver-Client-Id': process.env.REACT_APP_ID,
    'X-Naver-Client-Secret': process.env.REACT_APP_SECRET,
    'Content-Type': 'application/json',
  },
});
