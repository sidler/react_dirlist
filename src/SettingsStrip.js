/**
 * Created by sidler on 03.02.17.
 */


import React, { Component } from 'react';
import Settings from './Settings';

class SettingsStrip extends Component {


    constructor(props) {
        super(props);

        this.changeSizeCheckbox = this.changeSizeCheckbox.bind(this);

    }


    changeSizeCheckbox = function(el) {
        Settings.getInstance().setShowSize(this.refs.sizecheck.checked);
    };

    render() {

        return (
            <div className="form-check">
                <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" defaultChecked={Settings.getInstance().getShowSize()} onChange={this.changeSizeCheckbox} ref="sizecheck"/>
                        &nbsp;Show size
                </label>
            </div>
        );
    }
}

export default SettingsStrip;