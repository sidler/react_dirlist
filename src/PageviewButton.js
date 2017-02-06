/**
 * Created by sidler on 03.02.17.
 */


import React, { Component } from 'react';

class PageviewButton extends Component {
    render() {
        return (
            <a role='button' className='btn btn-secondary' href={'#'+this.props.char} >{this.props.char}</a>
        );
    }
}

export default PageviewButton;