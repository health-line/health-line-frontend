import React, {Component} from "react";
import { connect, PromiseState } from 'react-refetch';
import {Card, CardText} from "material-ui/Card";
import {List, ListItem} from 'material-ui/List';
import settings from '../../../settings';

class EventTable extends Component {

	constructor() {
		super();
		this.state = {
			displayDetails: false,
			displayedEvent: 0
		};
		this.onEventClick = this.onEventClick.bind(this);
	}

	onEventClick(index) {
		this.setState({
			displayDetails: true,
			displayedEvent: index
		});
	}

	getFormattedDate(dateString) {
		const monthNames = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
		const date = new Date(dateString);
		return date.getDate() + ". "+ monthNames[date.getMonth()] + " " + date.getFullYear();
	}

	displayAttributes(eventData) {
		if(this.state.displayDetails) {
			console.log(this.state.displayedEvent);
			const currentEvent = eventData[this.state.displayedEvent];

			return(
				<List>
					<ListItem
						primaryText={currentEvent["TITLE"]}
						secondaryText="Title"/>
					<ListItem
						primaryText={currentEvent["DESCRIPTION"]}
						secondaryText="Description"/>
					<ListItem
						primaryText={this.getFormattedDate(currentEvent["DATE_START"])}
						secondaryText="Start Date"/>
					<ListItem
						primaryText={this.getFormattedDate(currentEvent["DATE_END"])}
						secondaryText="End Date"/>
				</List>
			);
		}
		else {
			return(
				eventData.map((event, index) => {
					return(
						<ListItem
							onClick={() => this.onEventClick(index)}
							primaryText={event["TITLE"]}
							secondaryText={event["DESCRIPTION"]}/>
					);
				})
			);
		}
	}

	onDisplayEventDetails() {

	}

	render() {
		const { events } = this.props;
		if (events.pending) {
			return <div>Loading...</div>
		} else if (events.rejected) {
			return <span>{events.reason}</span>
		} else if (events.fulfilled) {
			const eventData = events.value;
			return (
				<div className="col-xs-12 col-sm-6">
					<Card className="h100">
						<CardText>
							<List>
								{ this.displayAttributes(eventData) }
							</List>
						</CardText>
					</Card>
				</div>
			);
		}
	}
}

export default connect(props => ({
	events: settings.backendUrl + `/user/${props.userId}/events/`,
}))(EventTable)
