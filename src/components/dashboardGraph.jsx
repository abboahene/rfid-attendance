import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios'

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const DashboardGraph = (props) => {

    const graphGetEventsForSelectedClub = useCallback(async () => {
        console.log('prop.club', props.clubName)
       const res = await axios.get(`http://localhost:3002/attenders/graphdata/${props.clubName}`)
       return res.data
    }, [props.clubName])

    let [avgEvnt,setAvgEvnt] = useState({avg: 0, evnt: 0})

    useEffect(() => {
        let thisChart
        graphGetEventsForSelectedClub().then( graphData => {
            console.log(graphData)
            setAvgEvnt( {avg: graphData.averageAttendance, evnt: (graphData.event_names || []).length} )
            let ctx = document.getElementById('myChart')
            thisChart = new Chart(ctx, {
                
                data: {
                    labels: graphData.event_names,
                    datasets: [
                        {
                            type: 'line',
                            label: 'Number of Attenders',
                            data: graphData.eventAttendersCount,
                            backgroundColor: 'rgb(252, 200, 30)',
                            borderWidth: 5,
                            borderCoolr: 'rgb(252, 200, 30)'
                        },{
                        type: 'bar',
                        label: 'Number of Attenders',
                        data: graphData.eventAttendersCount,
                        backgroundColor: 'rgba(78, 196, 98)',
                        borderWidth: 0
                        }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            })
        })

        return () => {
            if(thisChart !== undefined) thisChart.destroy() 
    };
        
    }, [graphGetEventsForSelectedClub])

    
        
    return ( 
        <>
            <div className="row">
                <div className="col-8">
                    <canvas id="myChart" className="shadow-sm rounded p-4"></canvas>
                </div>
                <div className="col-4">
                    <div className="row h-100">
                        <div className="col-12 my-3 h-45 w-100 shadow-sm rounded d-flex flex-column justify-content-center text-center">
                        <i className="fa fa-2x fa-tachometer text-danger">Avg.</i> <h1 id="average">{(avgEvnt.avg||0).toFixed(2)}</h1>
                        </div>
                        <div className="col-12 my-1 mb-4 h-45 w-100 shadow-sm rounded d-flex flex-column justify-content-center text-center">
                            <i className="fa fa-2x fa-calendar text-success">Evnt.</i> <h1>{avgEvnt.evnt}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default DashboardGraph;