import React, {Component} from "react";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import "./../Dashboard.css";
import {connect} from "react-refetch";
import settings from "../../../settings";
import data from "../../../data/mocked_data.json";

class LifeDiagram extends Component {
	constructor() {
		super();
		this.data = data;
	}

	componentDidMount() {
		document.addEventListener("DOMContentLoaded", function() {
			Array.from(document.getElementsByClassName("recharts-reference-area-rect")).forEach(item => {
				if(item.nextSibling) {
					const x = parseFloat(item.getAttribute("x"));
					const width = parseFloat(item.getAttribute("width")) / 2;
					item.nextSibling.firstChild.setAttribute("x", width + x);
				}
			});
		});
	}

	render() {
        const { data } = this.props;

        if (data.pending) {
            return <div>Loading...</div>;
        } else if (data.rejected) {
            return <span>{data.reason}</span>;
        } else if (data.fulfilled) {
        	console.log(this.props.selectedKeys);
            return (
				<ResponsiveContainer height={300}>
					<AreaChart
						data={data.value}
						margin={{top: 20, right: 30, left: 0, bottom: 0}}>
						<XAxis dataKey="DATE"/>
						<CartesianGrid strokeDasharray="3 3"/>
						<Tooltip />
                        {this.props.selectedKeys.map((datakey, index) => {
                            return (<YAxis yAxisId={datakey} hide={true} key={index}/>);
                        })}
                        {this.props.selectedKeys.map((datakey, index) => {
                            return (
								<Area type="monotone" dataKey={datakey} yAxisId={datakey} stroke="#8884d8"
									  fill="#8884d8" key={index}/>
                            );
                        })}
					</AreaChart>
				</ResponsiveContainer>
            );
        }
	}
}


export default connect(props => ({
	data: settings.backendUrl + `/user/${props.userId}/data/${props.selectedKeys.join("+")}/start/${props.startDate}/end/${props.endDate}`
}))(LifeDiagram)
