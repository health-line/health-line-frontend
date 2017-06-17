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
import './../Dashboard.css';
import users from '../../../data/users.json';
import data from '../../../data/mocked_data.json';
import datakeys from '../../../data/datakeys.json';

class User extends Component {

	render() {
		return (
			<div className="row">
				<div className="col-xs-12 col-sm-6">
					<Card className="h100">
						<CardText>
							<List>
								<ListItem primaryText="John Doe" leftIcon={<PersonIcon />} />
								<ListItem primaryText="46 Jahre" leftIcon={<FavoriteIcon />} />
								<ListItem primaryText="1,75 Meter" leftIcon={<AccessibilityIcon />} />
								<ListItem primaryText="Männlich" leftIcon={<WCIcon />} />
							</List>
						</CardText>
						<CardActions>
							<FlatButton label="Informationen bearbeiten" />
						</CardActions>
					</Card>
				</div>
				<div className="col-xs-12 col-sm-6">
					<Card className="h100">
						<CardText>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHeaderColumn>ID</TableHeaderColumn>
										<TableHeaderColumn>Name</TableHeaderColumn>
										<TableHeaderColumn>Status</TableHeaderColumn>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableRowColumn>1</TableRowColumn>
										<TableRowColumn>John Smith</TableRowColumn>
										<TableRowColumn>Employed</TableRowColumn>
									</TableRow>
									<TableRow>
										<TableRowColumn>2</TableRowColumn>
										<TableRowColumn>Randal White</TableRowColumn>
										<TableRowColumn>Unemployed</TableRowColumn>
									</TableRow>
									<TableRow>
										<TableRowColumn>3</TableRowColumn>
										<TableRowColumn>Stephanie Sanders</TableRowColumn>
										<TableRowColumn>Employed</TableRowColumn>
									</TableRow>
									<TableRow>
										<TableRowColumn>4</TableRowColumn>
										<TableRowColumn>Steve Brown</TableRowColumn>
										<TableRowColumn>Employed</TableRowColumn>
									</TableRow>
									<TableRow>
										<TableRowColumn>5</TableRowColumn>
										<TableRowColumn>Christopher Nolan</TableRowColumn>
										<TableRowColumn>Unemployed</TableRowColumn>
									</TableRow>
								</TableBody>
							</Table>
						</CardText>
					</Card>
				</div>
			</div>
		);
	}
}


export default connect(props => ({
    users: `/users/${props.userId}`,
    likesFetch: `/users/${props.userId}/likes`
}))(User)

