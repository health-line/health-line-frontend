import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import {connect} from "react-refetch";
import settings from "../../../settings";
import './MeasurementChoice.css'

class MeasurementChoice extends Component {
	constructor() {
		super();
		this.state = {
			selected_datakeys: [],
			selected: []
		};
	}

	isSelected(index) {
		return this.state.selected.indexOf(index) !== -1;
	}

	onRowSelect(selectedRows) {
		let selected_datakeys = [];

		if (selectedRows === "all") {
			this.props.dataKeys.value.map((datakey) => {
				selected_datakeys = selected_datakeys.concat([datakey]);
			});
		}
		else if (selectedRows === 'none') {
			selected_datakeys = [];
		}
		else {
			selectedRows.map((selectedRow) => {
				selected_datakeys = selected_datakeys.concat(this.props.dataKeys.value[selectedRow]);
			})
		}
		this.setState({
			selected_datakeys: selected_datakeys,
			selected: selectedRows
		});
        this.props.onSelectedKeysChanged(selected_datakeys);
    }

	render() {
        const { dataKeys } = this.props;

        if (dataKeys.pending) {
            return <div>Loading...</div>
        } else if (dataKeys.rejected) {
            return <span>{dataKeys.reason}</span>
        } else if (dataKeys.fulfilled) {
            return (
				<Table multiSelectable={true} onRowSelection={selectedRows => this.onRowSelect(selectedRows)}>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn>Displayed easurement Series</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody>
                        {dataKeys.value.map((datakey, index) => {
                            return (
								<TableRow key={index} selected={this.isSelected(index)}>
									<TableRowColumn><span className="data-keys">{datakey.split('_').join(' ').split('-').join(' ').toLowerCase()}</span></TableRowColumn>
								</TableRow>
                            );
                        })}
					</TableBody>
				</Table>
            );
        }
	}
}


export default connect(props => ({
    dataKeys: settings.backendUrl + `/datakeys/`,
}))(MeasurementChoice)
