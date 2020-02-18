import React, { Component } from "react";

export default class Selection extends Component {
  changeHandler = (value, id) => {
    if (value) {
      this.props.onSelect(id);
    } else {
      // handle de-select later
    }
  };

  render() {
    const { rowData, selectedId } = this.props;
    const { selectNum, selectString } = rowData;
    const isChecked = selectNum === selectedId;

    return (
        <React.Fragment>
        <tr>
            <td>
            <input
                id={`checkbox_${selectNum}`}
                checked={isChecked}
                onChange={e => this.changeHandler(e.target.checked, selectNum)}
                type="checkbox"
                name="record"
            />
            </td>
            <td>{selectString}</td>
        </tr>
        </React.Fragment>
    );
  }
}