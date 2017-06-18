import React, {Component} from "react";
import { connect, PromiseState } from 'react-refetch';
import {Card, CardText} from "material-ui/Card";
import {List, ListItem} from 'material-ui/List';
import settings from '../../../settings';

class EventTable extends Component {

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
								{eventData.map((event) => {
									return(
										<ListItem
											primaryText={event["TITLE"]}
											secondaryText={event["DESCRIPTION"]}/>
									);
								})}
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
