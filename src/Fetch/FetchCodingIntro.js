import React from "react";
import {Route, Switch} from "react-router-dom";

import HighLevelPage from "../Components/Templates/HighLevelPage.js";
import ContentTemplate from "../Components/Templates/ContentTemplate.js";

import queryString from "query-string";

class FetchCodingIntro extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            json: []
        }
    }
    async componentDidMount(){
        const codingIntro = await (await (fetch("/jsonFiles/codingIntro.json"))).json();

        this.setState({
            json: codingIntro[0],
            jsonNavigation: codingIntro[0].navigation,
            bannerOne: codingIntro[0].bannerOne,
            bannerTwo: codingIntro[0].bannerTwo,
            content: codingIntro[0].content,
            content2: codingIntro[0].content2,
            content3: codingIntro[0].content3,
            quiz: codingIntro[0].quiz,
            resources: codingIntro[0].resources
        })
        console.log(this.state.quiz)
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path = "/coding-introduction" render = {
                        props =>
                        <ContentTemplate
                            image = {this.state.json.image}
                            imageTab = {this.state.json.imageTab}
                            imageMob = {this.state.json.imageMob}
                            headerColour = {this.state.json.headerColour}
                            name = {this.state.json.name}
                            description = {this.state.json.description}

                            content = {this.state.content}
                            content2 = {this.state.content2}
                            content3 = {this.state.content3}

                            bannerOne = {this.state.bannerOne}
                            bannerTwo = {this.state.bannerTwo}

                            quiz = {this.state.quiz}
                            
                            navImage = {this.state.json.image}
                            navigation = {this.state.jsonNavigation}

                            resources = {this.state.resources}
                        />} />
                </Switch>
            </div>
        )
    }
}


export default FetchCodingIntro;