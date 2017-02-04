/**
 * Created by sidler on 03.02.17.
 */


import React, { Component } from 'react';
import PageviewButton from './PageviewButton'

class Pageview extends Component {
    render() {
        return (
            <div className="btn-group btn-group-sm" role="group" aria-label="First group">
                <PageviewButton/>
                <PageviewButton/>
            </div>
        );
    }
}

export default Pageview;