/**
 * Created by sidler on 03.02.17.
 */


import React, { Component } from 'react';

class FilelistTableRowFile extends Component {
    render() {
        return (
            <tr >
                <td></td>
                <td><i className='fa fa-file-code-o'/></td>
                <td colSpan="6">{this.props.name}</td>
            </tr>
        );
    }
}

export default FilelistTableRowFile;