import request from './request';
import { IparamObj } from '../types/index';
// https://pixabay.com/api/?key={ 개인 API Key }&q=yellow+flowers&image_type=photo

const BASE_URL = 'https://pixabay.com/api';

const defaultParam = {
    key: process.env.REACT_APP_PIXABAY || '',
    safesearch: 'true',
};

const getWallPapers = async (paramObj: IparamObj) => {
    const params = new URLSearchParams({
        ...defaultParam,
        ...paramObj,
    }).toString();
    const result = await request(`${BASE_URL}/?${params}`);
    return result;
};

export default getWallPapers;
