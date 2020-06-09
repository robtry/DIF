import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
	{
		name: '1',
		ingreso: 4000,
		egreso: 2400
		//amt: 2400
	},
	{
		name: '2',
		ingreso: 3000,
		egreso: 1398
		//amt: 2210
	},
	{
		name: '3',
		ingreso: 2000,
		egreso: 9800
		//amt: 2290
	},
	{
		name: '4',
		ingreso: 2780,
		egreso: 3908
		//amt: 2000
	},
	{
		name: '5',
		ingreso: 1890,
		egreso: 4800
		//amt: 2181
	},
	{
		name: '6',
		ingreso: 2390,
		egreso: 3800
		//amt: 2500
	},
	{
		name: '7',
		ingreso: 3490,
		egreso: 4300
		//amt: 2100
	}
];

const LineGraph = (props) => {
	//console.log('currentSize', props.size)
	return (
		<LineChart width={props.size * 0.8} height={300} data={data}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line type="monotone" dataKey="ingreso" stroke="#8884d8" activeDot={{ r: 8 }} />
			<Line type="monotone" dataKey="egreso" stroke="#82ca9d" />
		</LineChart>
	);
};

export default LineGraph;
