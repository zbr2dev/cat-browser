import { LOAD_ALL_CATS, GET_CAT, GET_SINGLE_CAT, SET_LOADER, SET_ERROR } from './types';
import { IInitialState, IAction } from './interface';

const initialState: IInitialState = {
    cats: [],
    singleBreed: null,
    singleCat: null,
    loader: false,
    error: false,
}

const store = (state = initialState, action: IAction) => {
    switch (action.type) {
        case LOAD_ALL_CATS: {
            return {
                ...state,
                cats: state.cats.concat(action.payload)
            }
        }
        case GET_CAT: {
            return {
                ...state,
                singleBreed: action.payload
            }
        }
        case GET_SINGLE_CAT: {
            return {
                ...state,
                singleCat: action.payload
            }
        }
        case SET_LOADER: {
            return {
                ...state,
                loader: action.payload
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export default store;