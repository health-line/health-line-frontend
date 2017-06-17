import React, { Component } from 'react';
import {Card, CardActions, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';
import PersonIcon from 'material-ui/svg-icons/social/person';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import AccessibilityIcon from 'material-ui/svg-icons/action/accessibility';
import WCIcon from 'material-ui/svg-icons/notification/wc';
import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, ReferenceArea, CartesianGrid, Tooltip} from 'recharts';
import { connect, PromiseState } from 'react-refetch'
import './Dashboard.css';
import users from '../../data/users.json';
import data from '../../data/mocked_data.json';
import datakeys from '../../data/datakeys.json';
import User from './User/User';

class Dashboard extends Component {
	constructor() {
		super();
		this.data = data.dates;
		this.state = {
			selected_datakeys: []
		}
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

	onRowSelect(selectedRows) {
		console.log(selectedRows);
		let selected_datakeys = [];

		if (selectedRows === "all") {
			datakeys.map((datakey) => {
				selected_datakeys = selected_datakeys.concat([datakey]);
			});
		}
		else if (selectedRows === 'none') {
			selected_datakeys = [];
		}
		else {
			selectedRows.map((selectedRow) => {
				selected_datakeys = selected_datakeys.concat(datakeys[selectedRow]);
			})
		}
		this.setState({selected_datakeys: selected_datakeys});
	}

	render() {
		return (
			<div className="dashboard container">

				<User />
				<div className="row">
					<div className="mt100 col-xs-12">
					<Card className="h100">
						<CardText>
							<ResponsiveContainer height={300}>
								<AreaChart
									data={this.data}
									margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
									<YAxis dataKey="heart-rate-max" />
									<XAxis dataKey="date" />
									<CartesianGrid strokeDasharray="3 3" />
									<Tooltip />
									<ReferenceArea x1="Page C" x2="Page D" stroke="red" strokeOpacity={0.3}  label="test"  />
									{this.state.selected_datakeys.map((datakey) => {
										<Area type="monotone" dataKey={datakey} stroke="#8884d8" fill="#8884d8"/>
									})}
								</AreaChart>
							</ResponsiveContainer>
						</CardText>
					</Card>
					</div>
				</div>

				<div className="row">
					<div className="mt100 col-xs-12">
						<Card className="h100">
							<CardText>
								<Table multiSelectable={true} onRowSelection={selectedRows => this.onRowSelect(selectedRows)}>
									<TableHeader>
										<TableRow>
											<TableHeaderColumn>Angezeigte Messreihen</TableHeaderColumn>
										</TableRow>
									</TableHeader>
									<TableBody>

										{datakeys.map((datakey) => {
											return(
												<TableRow>
													<TableRowColumn>{datakey}</TableRowColumn>
												</TableRow>
											);
										})}

									</TableBody>
								</Table>
							</CardText>
						</Card>
					</div>
				</div>

			</div>
		);
	}
}


export default connect(props => ({
    userFetch: `/users/${props.userId}`,
    likesFetch: `/users/${props.userId}/likes`
}))(Dashboard)
