/**
 * Created by sidler on 03.02.17.
 */


import React, { Component } from 'react';
import FilelistTableRowFolder from './FilelistTableRowFolder'
import FilelistTableRowFile from './FilelistTableRowFile'
import FilelistTableRowChar from './FilelistTableRowChar'
import Settings from './Settings';

class FilelistTable extends Component {


    /**
     * Callback to pass the characters up the tree
     * @param arrChars
     */
    passCharsToPageview(arrChars) {
        if(this.props.pageView) {
            this.props.pageView(arrChars);
        }
    }





    render() {
        let self = this;


        if(this.props.props.folders === undefined) {
            return null;
        }

        let arrChars = ["Files"];
        let strPrevChar = null;
        let folders = this.props.props.folders.map(function(item, i) {
            let strChar ;
            if(strPrevChar === null || strPrevChar !== item.name[0]) {
                strPrevChar = item.name[0];
                strChar = <FilelistTableRowChar char={strPrevChar} key={strPrevChar}/>
                arrChars.push(strPrevChar);
            }

            let strFolder = <FilelistTableRowFolder item={item} deleteFolderAction={self.props.deleteFolderAction}/>

            return ([strChar, strFolder]);
        });

        this.passCharsToPageview(arrChars);

        let files = this.props.props.files.map(function(item, i) {
            return(
                <FilelistTableRowFile item={item} key={i} />
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
                    {Settings.getInstance().getShowSize() ? <th>Size</th> : null}
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