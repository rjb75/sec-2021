import React, {useEffect, useState} from 'react';
import { LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

function CoinHistory(props) {
    const { coin = 'bitcoin', currency = 'cad', purchase = 71100} = props;

    const [historicalData, setHistoricalData] = useState([]);

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=30&interval=daily`)
        .then(res => res.json())
        .then((result) => {
            const cleanData = result.prices.map((his, i) => {
                return { coin: his[0], cad: his[1], day: i, pur: purchase}
            });
            setHistoricalData(cleanData);
        })
    }, [])

    return (
        <div>
            <LineChart width={1000} height={400} data={historicalData}>
                <Line type="monotone" dataKey="cad" stroke="#0E606B" />
                <Line type="monotone" dataKey="pur" stroke="#F47068" />
                <CartesianGrid stroke='#ccc' />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </div>
    )
}

export default CoinHistory;