/**
 * Created by sidler on 03.02.17.
 */


import React, { Component } from 'react';
import FilelistTableRowFolder from './FilelistTableRowFolder'
import FilelistTableRowFile from './FilelistTableRowFile'
import FilelistTableRowChar from './FilelistTableRowChar'

class FilelistTable extends Component {


    render() {

        if(this.props.props.folders === undefined) {
            return null;
        }

        let strPrevChar = null;
        let folders = this.props.props.folders.map(function(item, i) {
            let strChar ;
            if(strPrevChar === null || strPrevChar !== item.name[0]) {
                strPrevChar = item.name[0];
                strChar = <FilelistTableRowChar char={strPrevChar} key={strPrevChar}/>
            }

            let strFolder = <FilelistTableRowFolder name={item.name} backend={item.backend} installer={item.installer}  key={i} />

            return ([strChar, strFolder]);
        });

        let files = this.props.props.files.map(function(item, i) {
            return(
                <FilelistTableRowFile name={item.name} key={i} />
            );
        });


        return (
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Name</th>
                    <th>Backend</th>
                    <th>Installer</th>
                    <th>Debug</th>
                    <th>Branch</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {folders}
                <FilelistTableRowChar char="Files" key="Files"/>
                {files}
                </tbody>

            </table>
        );
    }
}

export default FilelistTable;