import React, {Component} from "react";
import {Card, CardText} from "material-ui/Card";
import {List, ListItem} from 'material-ui/List';

class EventTable extends Component {

	getFormattedDate(dateString) {
		const monthNames = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
		const date = new Date(dateString);
		return date.getDate() + ". "+ monthNames[date.getMonth()] + " " + date.getFullYear();
	}

	displayAttributes(eventData) {
		if(this.props.displayDetails) {
			console.log(this.props.selectedIndex);
			const currentEvent = this.props.events[this.props.selectedIndex];

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
							onClick={() => this.props.onEventsChange(index)}
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
		return (
			<div className="col-xs-12 col-sm-6">
				<Card className="h100">
					<CardText>
						<List>
							{ this.displayAttributes(this.props.events) }
						</List>
					</CardText>
				</Card>
			</div>
		);
	}
}

export default EventTable;
