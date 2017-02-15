import React, {Component} from 'react';
import './bootstrap.min.css';
import './App.css';
import Pageview from './Pageview'
import FilelistTable from './FilelistTable'
import ServerInfo from './ServerInfo'
import ServerCx from './ServerCx'
import SettingsStrip from './SettingsStrip'
import Settings from "./Settings";

class App extends Component {

    server = new ServerCx();

    constructor(props) {
        super(props);

        this.poll = this.poll.bind(this);
        this.deleteFolderAction = this.deleteFolderAction.bind(this);

        this.state = {
            serverInfo: {},
            content: {},
            pageviewChars : []
        };

    }

    componentDidMount() {
        this.poll();
        document.title = process.env.PUBLIC_URL;
        setInterval(this.poll, 10000);
    }

    poll() {
        let self = this;
        this.server.fetchServerData(function (data) {
            data.pageviewChars = self.parseChars(data);
            self.setState(data);
        });
    }


    parseChars(data) {
        let arrChars = ["Files"];
        let strPrevChar = null;
        data.content.folders.forEach(function(item, i) {
            if (strPrevChar === null || strPrevChar !== item.name[0]) {
                strPrevChar = item.name[0];
                arrChars.push(strPrevChar);
            }
        });
        return arrChars;

    }

    deleteFolderAction(strPath) {
        let self = this;
        this.server.deleteCacheAction(strPath, function (data) {
            data.pageviewChars = self.parseChars(data);
            self.setState(data);
        })
    }

    render(data) {
        let self = this;
        return (

            <div className="container">
                <div className="row justify-content-center">
                    <Pageview chars={this.state.pageviewChars} />
                </div>

                <div className="row justify-content-end">
                    <SettingsStrip />
                </div>

                <div className="row">
                    <FilelistTable pageView={self.handlePageviewChange} props={this.state.content} deleteFolderAction={self.deleteFolderAction} />
                </div>

                <div className="row">
                    <ServerInfo props={this.state.serverInfo}/>
                </div>
            </div>

        );


    }
}

export default App;
