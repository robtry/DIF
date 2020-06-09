import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const FormatChart = (props) => {
	const [ data, setData ] = useState([]);

	useEffect(
		() => {
			const items = [];
			// console.log('mod', props.modificados);
			// console.log('cre', props.creados);
			if (props.modificados.length >= props.creados.length) {
				for (let i = 0; i < props.modificados.length; i++) {
					const countCre = props.creados.find((m) => m._id === props.modificados[i]._id);
					items.push({
						name: props.modificados[i]._id,
						modificados: props.modificados[i].count,
						creados: countCre ? countCre.count : 0
					});
				}
			} else {
				for (let i = 0; i < props.creados.length; i++) {
					const countMod = props.modificados.find((m) => m._id === props.creados[i]._id);
					items.push({
						name: props.creados[i]._id,
						creados: props.creados[i].count,
						modificados: countMod ? countMod.count : 0
					});
				}
			}
			//console.log('set', items);
			setData(items);
		},
		[ setData, props.modificados, props.creados ]
	);

	return (
		<BarChart
			width={props.size * 0.8}
			height={300}
			data={data}
			margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 10
			}}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="creados" fill="#8884d8" />
			<Bar dataKey="modificados" fill="#82ca9d" />
		</BarChart>
	);
};

export default FormatChart;
