/**
 * Created by sidler on 03.02.17.
 */


import React, { Component } from 'react';
import Settings from './Settings';

class FilelistTableRowFolder extends Component {

    render() {

        let strBackend = "";
        if (this.props.item.backend) {
            strBackend = "<a href='"+this.props.item.name+"/index.php?admin=1'><i class='fa fa-sliders'></i> /admin</a>";
        }

        let strInstaller;
        if (this.props.item.installer) {
            strInstaller = "<a href='"+this.props.item.name+"/installer.php'><i class='fa fa-plus-square-o'></i> /installer.php</a>";
        }

        let strDebug;
        if (this.props.item.debug) {
            strDebug = "<a href='"+this.props.item.name+"/debug.php'><i class='fa fa-bug'></i> /debug.php</a>";
        }

        let arrBranches = this.props.item.branches.map(function(item, i) {
            return (
                <div key={i}><i className='fa fa-code-fork' /> {item.branch} {item.name}</div>
            );
        });


        let self = this;
        let arrActions = this.props.item.actions.map(function(item, i) {
            if(item.enabled && item.type === "delcache") {
                return (
                    <a id={"del-a-"+i} key={i} onClick={(e) => {self.props.deleteFolderAction(self.props.item.name); e.preventDefault(); return false;}} href="#"><i className='fa fa-trash-o' /> Delete /project/temp/cache</a>
                );
            }

            return null;
        });


        return (
            <tr >
                <td>{this.props.item.char}</td>
                <td><i className='fa fa-folder-o' /></td>
                <td><a href={this.props.item.name}>{this.props.item.name}</a></td>
                <td dangerouslySetInnerHTML={{__html: strBackend}} />
                <td dangerouslySetInnerHTML={{__html: strInstaller}} />
                <td dangerouslySetInnerHTML={{__html: strDebug}} />
                <td>{arrBranches}</td>
                <td>{arrActions}</td>
                {Settings.getInstance().getShowSize() ? <td>{this.props.item.size}</td> : null}
            </tr>
        );
    }
}

export default FilelistTableRowFolder;