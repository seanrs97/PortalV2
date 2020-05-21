import React from "react";
import ExampleFetch from "./ExampleFetch";

class ExampleGet extends React.Component {
    constructor(){
        super();
        this.state = { 

        }
    }
    render(){
        return (
            <div>
                <ExampleFetch
                    jsonName = "codingIntro"
                />
            </div>
        )
    }
}

export default ExampleGet;