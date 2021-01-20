import { LOAD_ALL_CATS, GET_CAT, GET_SINGLE_CAT } from './types';
import { IAction } from './interface';

export const loadAllCats = (payload: any):IAction => ({
    type: LOAD_ALL_CATS,
    payload
});

export const getCatBreed = (payload: any):IAction => ({
    type: GET_CAT,
    payload
});

export const getSingleCat = (payload: any): IAction => ({
    type: GET_SINGLE_CAT,
    payload
})