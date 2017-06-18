import React, {Component} from "react";
import {Area, AreaChart, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {connect, PromiseState} from "react-refetch";
import settings from "../../../settings";
import AreaLabel from "./AreaLabel";
import data from "../../../data/mocked_data.json";

const keyColors = {
    "WEIGHT": "#FFCA28",
    "STEPS": "#82ca9d",
    "SLEEP_QUALITY": "#26C6DA",
    "RUNNING": "#82ca9d",
    "WARNING": "#FF5722",
};

class LifeDiagram extends Component {
	constructor() {
		super();
		this.data = data;
	}

	componentDidUpdate() {
        setTimeout(function(){
            Array.from(document.getElementsByClassName("recharts-reference-area-rect")).forEach(item => {
                if(item.nextSibling) {
                    const x = parseFloat(item.getAttribute("x"));
                    const y = parseFloat(item.getAttribute("y"));
                    const width = parseFloat(item.getAttribute("width")) / 2;
                    const height = parseFloat(item.getAttribute("height")) / 10;
                    item.nextSibling.firstChild.setAttribute("x", width + x);
                    item.nextSibling.firstChild.setAttribute("y", height + y);
                }
            });
		}, 500);
	}

	render() {
        const { data, events } = this.props;

        const allFetches = PromiseState.all([data, events])

        if (allFetches.pending) {
            return <div>Loading...</div>;
        } else if (allFetches.rejected) {
            return <span>{allFetches.reason}</span>;
        } else if (allFetches.fulfilled) {
            return (
				<ResponsiveContainer height={300}>
					<AreaChart
						data={data.value.sort((a, b) => {
                            return (new Date(a["DATE"]) - new Date(b["DATE"]));
                        })}
						margin={{top: 20, right: 30, left: 0, bottom: 0}}>
                        <defs>
                            <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={keyColors.RUNNING} stopOpacity={0.8}/>
                                <stop offset="95%" stopColor={keyColors.RUNNING} stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorGesundheit" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={keyColors.WARNING} stopOpacity={0.8}/>
                                <stop offset="95%" stopColor={keyColors.WARNING} stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorSTEPS" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={keyColors.STEPS} stopOpacity={0.4}/>
                                <stop offset="95%" stopColor={keyColors.STEPS} stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorWEIGHT" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={keyColors.WEIGHT} stopOpacity={0.4}/>
                                <stop offset="95%" stopColor={keyColors.WEIGHT} stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorSLEEP_QUALITY" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={keyColors.SLEEP_QUALITY} stopOpacity={0.4}/>
                                <stop offset="50%" stopColor={keyColors.SLEEP_QUALITY} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
						<XAxis xAxisId={0} dataKey="DATE"/>
						<Tooltip />
                        {this.props.selectedKeys.map((datakey, index) => {
                            return (<YAxis yAxisId={datakey} hide={true} key={`yaxis`+index.toString()}/>);
                        })}
                        {this.props.selectedKeys.map((datakey, index) => {
                            const gradientString = "url(#color" + datakey + ")";
                            return (
								<Area
                                    type="monotone"
                                    dataKey={datakey}
                                    yAxisId={datakey}
                                    fill={gradientString}
                                    stroke={keyColors.SLEEP_QUALITY}
                                    strokeOpacity={1}
                                    fillOpacity={1}
                                    key={`area`+index.toString()} />
                            );
                        })}
						{events.value.map((dataEvent, index) => {
							const startDateString = new Date(dataEvent["DATE_START"]).toISOString().split("T")[0];
                            const endDateString = new Date(dataEvent["DATE_END"]).toISOString().split("T")[0];
                            let gradientString = "url(#colorEvents)";
                            if (dataEvent["TYPE"] === "HEALTH_DATA") {
                                gradientString = "url(#colorGesundheit)";
                            }
							return (
								<ReferenceArea
									xAxisId={0}
									yAxisId={this.props.selectedKeys[0]}
									x1={startDateString}
									x2={endDateString}
									label={<AreaLabel label={dataEvent["TITLE"]} />}
									key={`refAreaEvents`+index.toString()}
                                    fill={gradientString}
									strokeOpacity={0.3} />
							);
						})}
					</AreaChart>
				</ResponsiveContainer>
            );
        }
	}
}


export default connect(props => ({
	events: settings.backendUrl + `/user/${props.userId}/events/`,
	data: settings.backendUrl + `/user/${props.userId}/data/${props.selectedKeys.join("+")}/start/${props.startDate}/end/${props.endDate}`
}))(LifeDiagram)
