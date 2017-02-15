/**
 * Created by sidler on 03.02.17.
 */


import React, { Component } from 'react';
import Settings from './Settings';

class FilelistTableRowChar extends Component {
    render() {



        let colspan = 8;
        if(Settings.getInstance().getShowSize()) {
            colspan++;
        }

        return (
            <tr >
                <td colSpan={colspan} className="font-weight-bold"><a name={this.props.char} />{this.props.char}</td>
            </tr>
        );
    }
}

export default FilelistTableRowChar;