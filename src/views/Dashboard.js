import React from 'react';
import{Container } from 'react-bootstrap'
import LineGraph from '../components/LineGraph'
import PieCharts from '../components/PieCharts'
import TableView from '../components/TableView'

export default function Dashboard() {
    return (
        <div>
           <div className="mt-5 h2 text-center">Welcome to the dashboard</div>
           <Container>
                <div><PieCharts/></div>
                <div><LineGraph/></div>
                <div><TableView/></div>
           </Container>
        </div>
    )
}
