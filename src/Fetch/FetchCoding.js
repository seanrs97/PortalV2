import React from "react";
import {Route, Switch} from "react-router-dom";

import HighLevelPage from "../Components/Templates/HighLevelPage.js";

class FetchCoding extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            json: []
        }
    }
    async componentDidMount(){
        const codingIntro = await (await (fetch("/coding.json"))).json();
        this.setState({
            json: codingIntro[0],
            buttons: codingIntro[0].buttons
        })
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path = "/coding" render = {
                        props =>
                        <HighLevelPage
                            image = {this.state.json.image}
                            imageTab = {this.state.json.imageTab}
                            imageMob = {this.state.json.imageMob}
                            headerColour = {this.state.json.headerColour}
                            name = {this.state.json.name}
                            description = {this.state.json.description}

                            buttons = {this.state.buttons}

                            navImage = {this.state.json.image}
                            navigation = {this.state.jsonNavigation}

                        />} />
                </Switch>
            </div>
        )
    }
}


export default FetchCoding;