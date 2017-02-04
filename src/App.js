import React, {Component} from 'react';
import './App.css';
import Pageview from './Pageview'
import FilelistTable from './FilelistTable'
import ServerInfo from './ServerInfo'
import ServerCx from './ServerCx'

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            "serverInfo": {},
            "content": {}
        }
    }

    componentDidMount() {
        let self = this;
        this.poll(self);
        setInterval(this.poll, 5000, self);
    }

    poll(self) {
        let server = new ServerCx();
        server.fetchServerData(function (data) {
            self.setState(data);
        });
    }


    render(data) {
        return (


            <div className="container">
                <div className="row justify-content-center">
                    <Pageview/>
                </div>

                <div className="row">
                    <FilelistTable props={this.state.content}/>
                </div>

                <div className="row">
                    <ServerInfo props={this.state.serverInfo}/>
                </div>
            </div>

        );
    }
}

export default App;
