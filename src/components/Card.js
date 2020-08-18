import React from 'react'
import './card.css'
export default function Card(props) {
    return (
        <div className="shadow dashboard-card" > 
            <div className="mx-2 my-2 px-2 py-2">
                {props.children}
            </div>
        </div>
    )
}
