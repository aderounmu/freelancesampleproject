import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'; 
import {getTableData} from '../ReduxStore/actions/dataAction';
import Card from './Card.js'
import { Row, Col,Spinner,Table} from 'react-bootstrap'



function TableView(props) {

	

	useEffect(()=>{
        props.getTableData()    
    },[])




    let display = ''
    if(props.isRequesting && props.data === null ){
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
       display = <> <Col>
            <Card>
                {props.data}
            </Card>
        </Col></>
    }else{
    	let table
        display = <>
            <Card>
            	<div className="py-3">
	           	 	<div className="h4 mb-3">Table of Data Usage</div>
	           	 	<div>
	           	 		<Table responsive="sm" bordered hover>
	           	 			<thead>
	           	 				<tr>
	           	 				{
	           	 					['Type',
	           	 					'Bandwith (MB)',
	           	 					'Recieved Bandwith (MB)',
	           	 					'Transmitted Bandwith (MB)',
	           	 					'Active Connection'
	           	 					].map((value,index) => (<th>{value}</th>))
	           	 				}
	           	 				</tr>
	           	 			</thead>
	           	 			<tbody>
	           	 				{
	           	 					props.data === null? (
	           	 					<tr>
	           	 							<td>Loading.....</td>
	           	 							<td>Loading.....</td>
	           	 							<td>Loading.....</td>
	           	 							<td>Loading.....</td>
	           	 							<td>Loading.....</td>
	           	 					</tr>

	           	 					): props.data.map((value,index)=>(
	           	 						<tr>
	           	 							<td>{value.label}</td>
	           	 							<td>{value.bandwidth/1024}</td>
	           	 							<td>{value.recived_bandwidth/1024}</td>
	           	 							<td>{value.transmit_bandwidth/1024}</td>
	           	 							<td>{value.active_conn_count}</td>
	           	 						</tr>
	           	 					))
	           	 				}
	           	 			</tbody>
	           	 		</Table>

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
    data: state.apiData.data.table_data,
    isError: state.apiData.isError.table_data,
    errorMessage: state.apiData.errorMessage.table_data,
    isRequesting: state.apiData.request.table_data,
})

export default connect(mapStateToProps,{getTableData})(TableView)