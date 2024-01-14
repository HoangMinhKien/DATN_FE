import axios from 'axios';
import { BaseResponse } from './response';
import { store } from 'store/configureStore';
import { authActions } from 'store/slice/auth';

export const baseDomain = 'http://Localhost:8092';

export async function apiPost(url: string, payload: any, header: any) {
  try {
    url = baseDomain + url;
    const { data } = await axios.post<BaseResponse>(url, payload, {
      headers: header,
    });
    if (data.error === 2) {
      store.dispatch(authActions.requestError());
    }
    return data;
  } catch (error) {
    store.dispatch(authActions.requestError());
    if (axios.isAxiosError(error)) {
      console.log('error: ', error.message);
    } else {
      console.log('error: ', 'undefined');
    }
    const response: BaseResponse = {
      data: undefined,
      error: 1,
      message: 'system_error',
    }; 
    return response;
  }
}

export async function apiGet(url: string, header: any) {
  try {
    url = baseDomain + url;
    const { data } = await axios.get<BaseResponse>(url, {
      headers: header,
    });
    if (data.error === 2) {
      store.dispatch(authActions.requestError());
    }
    return data;
  } catch (error) {
    store.dispatch(authActions.requestError());
    if (axios.isAxiosError(error)) {
      console.log('error: ', error.message);
    } else {
      console.log('error: ', 'undefined');
    }
    const response: BaseResponse = {
      data: undefined,
      error: 1,
      message: 'system_error',
    };
    return response;
  }
}

export async function apiDelete(url: string, header: any) {
  try {
    url = baseDomain + url;
    const { data } = await axios.delete<BaseResponse>(url, {
      headers: header,
    });
    if (data.error === 2) {
      store.dispatch(authActions.requestError());
    }
    return data;
  } catch (error) {
    store.dispatch(authActions.requestError());
    if (axios.isAxiosError(error)) {
      console.log('error: ', error.message);
    } else {
      console.log('error: ', 'undefined');
    }
    const response: BaseResponse = {
      data: undefined,
      error: 1,
      message: 'system_error',
    };
    return response;
  }
}
