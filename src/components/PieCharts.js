import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux';
import {getPieData} from '../ReduxStore/actions/dataAction';

import { Row, Col,Spinner} from 'react-bootstrap'
import Card from './Card'

import { ResponsiveContainer,PieChart, Pie, Sector, Cell, Legend} from 'recharts'

function PieCharts(props) {

    let [ramData, setRamData] = useState([]);
    let [cpuData, setCPUData] = useState([]);
    let [diskData,setDiskData] = useState([])

    //active
    let [ramActiveData, setRamActiveData] = useState(null);
    let [cpuActiveData, setCPUActiveData] = useState(null);
    let [diskActiveData,setDiskActiveData] = useState(null)


    function transform_Data(){
        setRamData([
            {name: 'percent used', value: props.data.ram.percent_used},
            {name: 'percent not used', value: 100 - props.data.ram.percent_used}

        ])
        setCPUData([
            {name: 'percent used', value: props.data.cpu.percent_used},
            {name: 'percent not used', value: 100 - props.data.cpu.percent_used}
        ])
        let disk_data_trans=[]
        // setDiskData([
        //     ...props.data.disk
        // ])
        props.data.disk.forEach(elem=>{
            disk_data_trans.push({
                name: elem.path,
                percent_used: elem.percent_used
            })
        })
        setDiskData(disk_data_trans)

    }

    const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


    useEffect(()=>{
        props.getPieData()
    },[])

    useEffect(()=>{
        if(props.data !== null){
            transform_Data()
        }
    },[props.data])


    let display = ''

    if(props.isRequesting && ramData.length === 0 && cpuData.length === 0 && diskData.length === 0){
        display = <>
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
        </>
    }else if(props.isError){
        display = <>
            <Col>
                <Card>
                    <div className="m-5"> 
                        Sorry this Error Occured :
                        <br/> 
                        <span className="text-danger">{props.errorMessage}</span>
                    </div>
                </Card>
            </Col>
        </>
    }else if(typeof(props.data) === 'string'){
       display=<> <Col>
            <Card>
                {props.data}
            </Card>
        </Col></>
    }else{
        display = <>
        <Col sm={12} md={4}>
            <Card>
                <div className="w-100 mb-2" style={{height: '300px'}}>
                 <div className="h4"> Ram Usage</div>
                {ramData !== undefined && ramActiveData !== null?(<div>{ramData[ramActiveData].name} : {ramData[ramActiveData].value}</div>):''}
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart
                        >
                           <Pie data={ramData} dataKey="value" innerRadius={50} outerRadius={80} fill="#82ca9d" label onMouseEnter={(data,index)=>setRamActiveData(index)}>

                              {
                                ramData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)
                              } 
                           </Pie>
                            <Legend/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </Col>
        <Col sm={12} md={4}>
            <Card>
                <div className="w-100 mb-2" style={{height: '300px'}}>
                    <div className="h4">CPU Usage</div>
                    {cpuData !== undefined && cpuActiveData !== null?(<div>{cpuData[cpuActiveData].name} : {cpuData[cpuActiveData].value}</div>):''}

                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart
                        >
                           <Pie data={cpuData} dataKey="value" innerRadius={50} outerRadius={80} fill="#82ca9d" label onMouseEnter={(data,index)=>setCPUActiveData(index)}>
                           {
                                cpuData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index+2 % PIE_COLORS.length]} />)
                              }

                           </Pie>
                            <Legend/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </Col>
        <Col sm={12} md={4}>
            <Card>
                <div className="w-100 mb-2" style={{height: '300px'}}>
                    <div className="h4"> Disk Usage</div>
                    {diskData !== undefined && diskActiveData !== null?(<div>{diskData[diskActiveData].name} : {diskData[diskActiveData].percent_used}</div>):''}
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart
                        >
                           <Pie data={diskData} dataKey="percent_used" innerRadius={50} outerRadius={80} fill="#82ca9d" label onMouseEnter={(data,index)=>setDiskActiveData(index)}>

                               {
                                ramData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index+1 % PIE_COLORS.length]} />)
                              }

                           </Pie>
                            <Legend/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </Col>
        </>
    }

    return (
        <div>
            <Row>
                {display}
            </Row> 
        </div>
    )
}


const mapStateToProps = state =>({
    data: state.apiData.data.pie_data,
    isError: state.apiData.isError.pie_data,
    errorMessage: state.apiData.errorMessage.pie_data,
    isRequesting: state.apiData.request.pie_data,
})

export default connect(mapStateToProps,{getPieData})(PieCharts)