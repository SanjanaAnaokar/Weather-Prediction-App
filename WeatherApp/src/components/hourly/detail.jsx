import React, { Component } from 'react';

class Detail extends Component {
    test(a) {
        console.log(a)
    }
    render() {
        return (
            <div>
                {this.test(this.props)}
                {this.test(window.location.href)}
            </div>
        )
    }
}
export default Detail;