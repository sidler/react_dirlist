/**
 * Created by sidler on 03.02.17.
 */


import React, { Component } from 'react';

class FilelistTableRowFolder extends Component {
    render() {

        let strBackend = "";
        if (this.props.backend) {
            strBackend = "<a href='"+this.props.name+"/index.php?admin=1'><i class='fa fa-sliders'></i> /admin</a>";
        }

        let strInstaller;
        if (this.props.installer) {
            strInstaller = "<a href='"+this.props.name+"/installer.php'><i class='fa fa-plus-square-o'></i> /installer.php</a>";
        }

        let strDebug;
        if (this.props.debug) {
            strDebug = "<a href='"+this.props.name+"/debug.php'><i class='fa fa-bug'></i> /debug.php</a>";
        }

        let arrBranches = this.props.branches.map(function(item, i) {
            return (
                <div key={i}><i className='fa fa-code-fork' /> {item.branch} {item.name}</div>
            );
        });


        let arrActions = this.props.actions.map(function(item, i) {
            if(item.enabled && item.type === "delcache") {
                return (
                    <a key={i} onClick="" href="#"><i className='fa fa-trash-o' /> Delete /project/temp/cache</a>
                );
            }

            return null;
        });


        return (
            <tr >
                <td>{this.props.char}</td>
                <td><i className='fa fa-folder-o' /></td>
                <td><a href="{this.props.name}">{this.props.name}</a></td>
                <td dangerouslySetInnerHTML={{__html: strBackend}} />
                <td dangerouslySetInnerHTML={{__html: strInstaller}} />
                <td dangerouslySetInnerHTML={{__html: strDebug}} />
                <td>{arrBranches}</td>
                <td>{arrActions}</td>
            </tr>
        );
    }
}

export default FilelistTableRowFolder;