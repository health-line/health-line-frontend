import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, ReferenceLine, ReferenceArea, CartesianGrid, Tooltip} from 'recharts';
import './Dashboard.css';

class Dashboard extends Component {
	constructor() {
		super();
		this.data = [
			{name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
			{name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
			{name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
			{name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
			{name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
			{name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
			{name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
		];
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
		return (
			<div className="dashboard">
				<Card>
					<CardText>
						<List>
							<ListItem primaryText="Name" leftIcon={<ContentInbox />} />
							<ListItem primaryText="Alter" leftIcon={<ActionGrade />} />
							<ListItem primaryText="Geboren" leftIcon={<ContentSend />} />
							<ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
							<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
						</List>
					</CardText>
					<CardActions>
						<FlatButton label="Informationen bearbeiten" />
					</CardActions>
				</Card>

				<ResponsiveContainer height={300}>
					<AreaChart
								data={this.data}
					           margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
						<YAxis dataKey="pv" />
						<XAxis dataKey="name" />
						<CartesianGrid strokeDasharray="3 3" />
						<Tooltip />
						<ReferenceArea x1="Page C" x2="Page D" stroke="red" strokeOpacity={0.3}  label="test"  />
						<Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
						<Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" />
					</AreaChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default Dashboard;
