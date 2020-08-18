import {GET_PIE_DATA, GET_LINE_DATA, GET_TABLE_DATA} from '../actions/types'
import {REQUEST_PIE_DATA, REQUEST_LINE_DATA, REQUEST_TABLE_DATA} from '../actions/types'
import {FAILED_PIE_DATA,  FAILED_LINE_DATA, FAILED_TABLE_DATA} from '../actions/types'
import {REQUEST_END_PIE_DATA, REQUEST_END_LINE_DATA, REQUEST_END_TABLE_DATA} from '../actions/types'
import {REMOVE_PIE_FAILURE, REMOVE_LINE_FAILURE, REMOVE_TABLE_FAILURE } from '../actions/types'






//api helper function 

async function API(url,dispatch,errorType, successType,endRequest){
    const API_URL = 'http://128.199.0.16:3000/users/';
    let token = localStorage.getItem('token');
    try{
        let success = true;
        try {
            var res = await fetch(API_URL+url,{
                method: 'GET',
                headers:{
                    'Authorization': 'bearer '+token
                }
            })
        } catch (error) {
            dispatch({
                type: errorType,
                payload: error.message
            })
            success = false;
        }
        if(success){
            let data = await res.json()
            dispatch({
                type: successType,
                payload: data.message
            })
        }
    }finally{
        dispatch({
            type: endRequest,
        })
    }
}

//action to get data for pie chart

export const getPieData = () => dispatch =>{

    dispatch({
        type: REQUEST_PIE_DATA
    })
    dispatch({
        type: REMOVE_PIE_FAILURE
    })
    API('pie-chart',dispatch,FAILED_PIE_DATA,GET_PIE_DATA,REQUEST_END_PIE_DATA)

}

//action to get data for line chart

export const getLineData = () => dispatch =>{
    dispatch({
        type: REQUEST_LINE_DATA
    })
    dispatch({
        type: REMOVE_LINE_FAILURE
    })
    API('line-graph',dispatch,FAILED_LINE_DATA,GET_LINE_DATA,REQUEST_END_LINE_DATA)
}

//action to get data for table 

export const getTableData = () => dispatch =>{
    dispatch({
        type: REQUEST_TABLE_DATA
    })
    dispatch({
        type: REMOVE_TABLE_FAILURE
    })
    API('table-view',dispatch,FAILED_TABLE_DATA,GET_TABLE_DATA,REQUEST_END_TABLE_DATA)

}

