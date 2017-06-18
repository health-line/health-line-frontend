import React, {Component} from "react";
import {Card, CardText} from "material-ui/Card";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import "./Dashboard.css";
import User from "./User/User";
import { connect, PromiseState } from 'react-refetch'
import LifeDiagram from "./LifeDiagram/LifeDiagram";
import settings from '../../settings';
//import users from '../../data/users.json';
import data from "../../data/mocked_data.json";
// import data from '../../data/peak_min-peak_max-steps-data.json';
import datakeys from "../../data/datakeys.json";

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			selected_datakeys: [],
			selected: []
		};
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

	isSelected(index) {
		return this.state.selected.indexOf(index) !== -1;
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
		console.log(this.state.selected_datakeys);
		this.setState({
			selected_datakeys: selected_datakeys,
			selected: selectedRows
		});
		console.log(this.state.selected_datakeys);
	}

	render() {
		return (
			<div className="dashboard container">

				<User userId={this.props.match.params.userId} />
				<div className="row">
					<div className="mt100 col-xs-12">
					<Card className="h100">
						<CardText>
							<LifeDiagram userId={this.props.match.params.userId} startDate="20160101" endDate="20161201" selectedKeys={["STEPS", "WEIGHT"]} />
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

										{datakeys.map((datakey, index) => {
											return(
												<TableRow selected={this.isSelected(index)}>
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
    dataKeys: settings.backendUrl + `/datakeys/`,
}))(Dashboard)
