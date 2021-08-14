import React from "react";
import Header from "./Header";
import Footer from "./Footer";


export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {name: "Tsutomu"};
    }
    render(){
        setTimeout(
           () => { this.setState({name: "Hello"}); }
         , 1000
         );
        let components = [<Header />,<Footer />]
        return (
        <dev>
            {this.state.name}
            {components}
        </dev>    
        );
    }
}