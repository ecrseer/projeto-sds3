import axios from 'axios';
import { SaleSum } from 'components/types/sale';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { BASE_URL } from 'utils/requests';

type ChartData = {
    labels: string[];
    series: number[];
}
function DonutChart(){
    
    
    

    const [chartData,setChartData] = useState<ChartData>({labels:[],series:[]});

    useEffect(()=>{
        axios.get(`${BASE_URL }/sales/amount-by-seller`)
        .then((resposta)=>{
            const data = resposta.data as SaleSum[];
            const myLabels = data.map(x => x.sellerName);
            const mySeries = data.map(x => x.sum);

            setChartData({labels:myLabels, series:mySeries});
            console.log(chartData)
        })

    },[])
    
     
    
    const options = {
        legend: {
            show: true
        }
    }
        return(
            <Chart options={{...options,
                labels:chartData.labels}}
            series={chartData.series}
            type="donut"
            height="240"
            />
        )
    }
    
    export default DonutChart;