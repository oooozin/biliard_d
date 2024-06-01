import { endpoints } from "../../constants/endpoints";
import { delRequest, getRequest, postRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { category, order, tables, update, updateorder } from "./counterSlice";

export const counterService = {
    tables: async (dispatch, params) => {
        const response = await getRequest(endpoints.table, params);
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(tables(response.data));
            dispatch(
                updateNotification({
                    variant: "success",
                    message: response.message,
                })
            );
        }
        return response;
    },  
    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.category, params);
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(
                category(response.data.data ? response.data.data : response.data)
            );            
        }
        return response;
    },          
    checkin: async (payload, dispatch) => {
        const response = await postRequest(endpoints.order, payload);
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(updateNotification({
                variant : 'success',
                  message : response.message
            }))
        }
        return response;
    },  
    createinvoice: async ( payload, dispatch) => {
        const response = await postRequest(endpoints.invoice, payload);
        await httpServiceHandler(dispatch, response);
       
        if (response.status === 200) {
            dispatch(updateNotification({
                variant : 'success',
                  message : response.message
            }))
        }
        return response;
    },
    deleteinvoice: async ( payload, id, dispatch) => {
        const response = await delRequest(`${endpoints.invoice}/${id}`, payload);
        await httpServiceHandler(dispatch, response);
       
        if (response.status === 200) {
            dispatch(updateNotification({
                variant : 'success',
                  message : response.message
            }))
        }
        return response;
    },
    orderlist: async (dispatch, id) => {
        const response = await getRequest(`${endpoints.order}/${id}`);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(order(response.data));
        }
        
        return response;
    },
    show: async (dispatch, id) => {
        const response = await getRequest(`${endpoints.table}/${id}`);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(update(response.data));
        }
        
        return response;
    },
    checkout: async ( payload, id, dispatch) => {
        const response = await postRequest(`${endpoints.order}/${id}`, payload);
        await httpServiceHandler(dispatch, response);
       
        if (response.status === 200) {
            dispatch(updateNotification({
                variant : 'success',
                  message : response.message
            }))
        }
        return response;
    },
};
