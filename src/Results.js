import useFetch from "./useFetch";
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import back from "./back.png";
import next from "./next.png";

const Results = () => {

    const { data :results, isPending, error } = useFetch("http://localhost:8080/api/v1/results");
    const back = require('./back.png');
    const next = require('./next.png');
    const history = useHistory();

    const precedingPage =() =>{
        history.push('/create');
    }

    const thankyouPage =() =>{
        history.push("/thankyou");
    }
    useEffect(()=>{
        if(error === "redirect")
            history.push('/create');

    });

    return ( 
        <div>
            <div className="pic">
                <div>
                    <img src = { back } height="35" width="35" onClick={precedingPage}/>
                </div>
                <div>
                    <img src = { next } height="35" width="35" onClick={thankyouPage}/>
                </div>
            </div>
            <h1 style={{color: "#f1356d"}}>Results</h1>
            <table>
                <thead>
                <th>Question</th>
                <th>Percent</th>
                <th>Average</th>
                <th>Minimum</th>
                <th>Maximum</th>
                </thead>
                {(!isPending && !error) && results.map((resultRow, i) => (
                    <tr>
                    <td title={resultRow.question.questionContent +" ["+ resultRow.question.id +"]"}>{i + 1}</td>
                    <td>{resultRow.percentage.toFixed(2)} % </td>
                    <td>{resultRow.average}</td>
                    <td>{resultRow.minimum}</td>
                    <td>{resultRow.maximum}</td>
                    </tr>
                    ))}  
            </table>
            <br/>
            <br/>
            <div className="twoCharts">
            {(!isPending && !error) && 
                <div className="chart">
                    <Bar
                        options = {{
                            plugins: {
                                title: {
                                    color: '#f1356d',
                                    display: true,
                                    align: "start",
                                    text: "Value by percentage",
                                    font:{
                                        size: 33,
                                        family: "Quicksand",
                                    },
                                },
                            },
                            scales:{
                                y:{max: 100}
                            },
                        
                        }}
                        data = {{
                            labels:  results.map((resultRow, i) => resultRow.question.questionContent),
                            datasets: [
                                {
                                    label: "Correct",
                                    data: results.map((resultRow, i) => resultRow.percentage),
                                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                                    borderColor:'rgb(54, 162, 235)',
                                    borderWidth: 1,
                                    borderRadius: 5
                                }
                            ],
                        }}
                    />
                </div>
            }
            <br/>
            <br/>
            {(!isPending && !error) &&
                <div className="chart">
                    <Line
                        data = {{
                            labels :  results.map((resultRow, i) => resultRow.question.questionContent),
                            datasets: [
                            {
                                label: "Maximum",
                                data: results.map((resultRow) => resultRow.maximum),
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                borderColor: 'rgba(255, 99, 132, 0.5)',
                                borderWidth: 1.8,   
                            },
                            {    
                                label: "Average",
                                data: results.map((resultRow) => resultRow.average),
                                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                                borderColor: 'rgba(75, 192, 192, 0.5)',
                                borderWidth: 1.8,
                            },
                            {
                                label: "Minimum",
                                data: results.map((resultRow) => resultRow.minimum),
                                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                                borderColor: 'rgba(54, 162, 235, 0.5)',
                                borderWidth: 1.8,
                            }],

                        }}
                        options ={{
                            elements: {
                                line:{
                                    tension: 0.5,
                                },
                            },
                            plugins: {
                                title: {
                                    color: '#f1356d',
                                    display: true,
                                    align: "start",
                                    text: "Value by milliseconds",
                                    font:{
                                        size: 33,
                                        family: "Quicksand",
                                        color: '#000',
                                    },
                                },
                            },

                        }}

                    />

                </div>
            }</div>

        </div>
);
}
 
export default Results;
