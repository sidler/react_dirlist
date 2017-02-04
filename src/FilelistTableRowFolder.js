/**
 * Created by sidler on 03.02.17.
 */


import React, { Component } from 'react';

class FilelistTableRowFolder extends Component {
    render() {
        return (
            <tr >
                <td>{this.props.char}</td>
                <td><i className='fa fa-folder-o' /></td>
                <td>{this.props.name}</td>
                <td>{this.props.backend}</td>
                <td>{this.props.installer}</td>
                <td>Debug</td>
                <td>Branch</td>
                <td>Actions</td>
            </tr>
        );
    }
}

export default FilelistTableRowFolder;