import React, {Component} from 'react';
import './App.css';
import Pageview from './Pageview'
import FilelistTable from './FilelistTable'
import ServerInfo from './ServerInfo'
import ServerCx from './ServerCx'

class App extends Component {



    constructor(props) {
        super(props);

        this.poll = this.poll.bind(this);

        this.state = {
            serverInfo: {},
            content: {},
            pageviewChars : []
        };

    }

    componentDidMount() {
        this.poll();
        setInterval(this.poll, 5000);
    }

    poll() {
        let self = this;
        let server = new ServerCx();
        server.fetchServerData(function (data) {
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

    render(data) {
        let self = this;
        return (

            <div className="container">
                <div className="row justify-content-center">
                    <Pageview chars={this.state.pageviewChars} />
                </div>

                <div className="row">
                    <FilelistTable pageView={self.handlePageviewChange} props={this.state.content}/>
                </div>

                <div className="row">
                    <ServerInfo props={this.state.serverInfo}/>
                </div>
            </div>

        );


    }
}

export default App;
