import React, { Component } from 'react';


class ErrorBoundary extends Component {
    state = {  
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) => {
        this.setState({ hasError: true, errorMessage: error });
    }
    render() { 
        if (this.state.hasError) {
            return <h1>{this.state.errorMessage}</h1>
        }
        return this.props.children;
    }
}
 
export default ErrorBoundary;

var user = {firstName: "Vasya", sayHi: function() {alert(this.firstName)}};
setTimeout(user.sayHi, 1000)