import React from 'react';

export default React.createClass({
    displayName: 'If',
    render(){
        return this.props.when ? this.props.children : <noscript />;
    }
});