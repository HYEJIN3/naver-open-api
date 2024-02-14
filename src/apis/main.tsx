import React from 'react';
import { instance, apiUrl } from './axios';

export async function PostSearchTrend(params: object) {
  return instance.post('keyword/age', params);
}
