import { AUTH } from "../constants/actionType";
import * as api from '../api';

import swal from "sweetalert";


export const singin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.singIn(formData);
        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        swal({
            title: error.response.statusText,
            text: error.response.data.message,
            icon: "warning",
        })
    }

}

export const singup = (formData, navigate) => async (dispatch) => {
    try {

        const { data } = await api.singUp(formData);
        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        swal({
            title: error.response.statusText,
            text: error.response.data.message,
            icon: "warning",
        })
    }
}