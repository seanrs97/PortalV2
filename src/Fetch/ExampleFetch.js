import React from "react";
import {Link} from "react-router-dom"

class ExampleFetch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            jsonData: []
        }
    }
    async componentDidMount(){
        const fetchJSON = await (await (fetch(`/jsonFiles/${this.props.jsonName}.json`))).json();
        this.setState({
            jsonData: fetchJSON[0],
            jsonDataId: fetchJSON[0].id,
            jsonDataName: fetchJSON[0].name
        });
    }
    render(){
        return (
            <div>
                <Link to = {`/${this.state.jsonDataId}`}>{this.state.jsonDataName}</Link>
            </div>
        )
    }
}

export default ExampleFetch