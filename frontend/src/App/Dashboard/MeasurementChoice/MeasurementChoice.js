import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import "./../Dashboard.css";
import {connect} from "react-refetch";
import settings from "../../../settings";

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
			this.props.value.dataKeys.map((datakey) => {
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
							<TableHeaderColumn>Angezeigte Messreihen</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody>
                        {dataKeys.value.map((datakey, index) => {
                            return (
								<TableRow key={index} selected={this.isSelected(index)}>
									<TableRowColumn>{datakey}</TableRowColumn>
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
