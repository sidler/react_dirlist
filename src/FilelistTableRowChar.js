/**
 * Created by sidler on 03.02.17.
 */


import React, { Component } from 'react';

class FilelistTableRowChar extends Component {
    render() {
        return (
            <tr >
                <td colSpan="8" className="font-weight-bold"><a name={this.props.char} />{this.props.char}</td>
            </tr>
        );
    }
}

export default FilelistTableRowChar;