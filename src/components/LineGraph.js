import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {getLineData} from '../ReduxStore/actions/dataAction';
import { Row, Col,Spinner} from 'react-bootstrap'
import './card.css'


import Card from './Card.js';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'



function LineGraph(props) {

    let [lineData, setLineData] = useState([])


    function transfrom_data(){
        let item = []
        let dataLength = props.data.time.length
        for (let i = 0; i < dataLength; i++) {
            item.push({
                time: props.data.time[i],
                total: props.data.total[i]/1024,
                recived: props.data.recived[i]/1024,
                transmited: props.data.transmited[i]/1024,
            })
        }
        //console.log(item)
        setLineData(item)
    }

    useEffect(()=>{
        props.getLineData()    
    },[])

    useEffect(()=>{
        if(props.data !== null){
            transfrom_data()
        }
    },[props.data])

    let display = ''
    if(props.isRequesting && lineData.length === 0 ){
        display = <>
            <Row>
            <Col>
               <div className="m-5">
                   <Row className="align-items-center justify-content-center">
                       <Col className="align-self-center" sm={6}>
                            <div className="mb-2">
                               <Spinner animation="border" varaint="primary" size="lg">
                               </Spinner>
                            </div>
                            Give us a Moment While we Get this for you
                       </Col>
                   </Row>            
                </div>
            </Col>
            </Row>
        </>
    }else if(props.isError){
        display = <>
            <Row>
            <Col>
                <Card>
                    <div className="m-5"> 
                        Sorry this Error Occured :
                        <br/> 
                        <span className="text-danger">{props.errorMessage}</span>
                    </div>
                </Card>
            </Col>
            </Row>
        </>
    }else if(typeof(props.data) === 'string'){
       display=<> <Col>
            <Card>
                {props.data}
            </Card>
        </Col></>
    }else{
        display = <>
            <Card>
            <div className="w-100">
                <div className="h4">Data Usage of Time</div>
                <div class="linechart-responsive">
                <ResponsiveContainer height='100%' width="100%">
                    <LineChart
                    data={lineData}
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time"/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#0088FE" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="recived" stroke="#FFBB28" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="transmited" stroke="#FF8042" activeDot={{ r: 8 }} />

                  </LineChart>
                </ResponsiveContainer>
                </div>
            </div>
            </Card>
        </>
    }


    




    return (
        <div>
            {display}  
        </div>
    )
}

const mapStateToProps = state =>({
    data: state.apiData.data.line_data,
    isError: state.apiData.isError.line_data,
    errorMessage: state.apiData.errorMessage.line_data,
    isRequesting: state.apiData.request.line_data,
})

export default connect(mapStateToProps,{getLineData})(LineGraph)