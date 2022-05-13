import { AUTH } from "../constants/actionType";
import * as api from '../api';

export const singin = (formData, navigate) => async (dispatch) => {
    try {

        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const singup = (formData, navigate) => async (dispatch) => {
    try {

        navigate('/');
    } catch (error) {
        console.log(error);
    }
}