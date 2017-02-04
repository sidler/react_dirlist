/**
 * Created by sidler on 03.02.17.
 */


import React, { Component } from 'react';

class ServerInfo extends Component {
    render() {

        if(this.props === null) {
            return (<pre></pre>);
        }

        let data = this.props.props;
        return (
            <pre>
            <code>PHP Version: {data.phpversion}  Hostname: {data.hostname} Webserver: {data.webserver}</code>
            </pre>
        );
    }
}

export default ServerInfo;