
import useFetch from "./useFetch";

import { useState, useEffect } from 'react';

const Results = () => {

    const { data :results, isPending, error } = useFetch("http://localhost:8000/results/");


    return ( 
        <div>
            <h1>Results</h1>
            <table>
                <thead>
                <th>Question</th>
                <th>Percent</th>
                <th>Average</th>
                <th>Minimum</th>
                <th>Maximum</th>
                </thead>
                {!isPending && results.questions.map((d, i) => (
                    <tr>
                    <td>{i + 1}</td>
                    <td>{d.percent}</td>
                    <td>{d.average}</td>
                    <td>{d.minimum}</td>
                    <td>{d.maximum}</td>
                    </tr>
                    ))}  
            </table>
        </div>
     );
}
 
export default Results;