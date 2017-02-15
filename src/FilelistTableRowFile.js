/**
 * Created by sidler on 03.02.17.
 */


import React, { Component } from 'react';
import Settings from './Settings';

class FilelistTableRowFile extends Component {

    render() {

        let colspan = 6;


        return (
            <tr >
                <td></td>
                <td><i className='fa fa-file-code-o'/></td>
                <td colSpan={colspan}><a href={this.props.item.name}>{this.props.item.name}</a></td>
                {Settings.getInstance().getShowSize() ? <td>{this.props.item.size}</td> : null}
            </tr>
        );
    }
}

export default FilelistTableRowFile;