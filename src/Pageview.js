/**
 * Created by sidler on 03.02.17.
 */


import React, { Component } from 'react';
import PageviewButton from './PageviewButton'

class Pageview extends Component {


    render() {

        let arrChars = this.props.chars;


        let strButtons = [];
        for(let i = 0; i < arrChars.length; i++) {
            let strChar = arrChars[i];

            strButtons.push(
                <PageviewButton char={strChar} key={'anch'+strChar}/>
            );
        }

        return (
            <div className="btn-group btn-group-sm" role="group">
                {strButtons}
            </div>
        );
    }
}

export default Pageview;