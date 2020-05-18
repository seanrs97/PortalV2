import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import sal from "sal.js";
import '../../../node_modules/sal.js/dist/sal.css';

import DefaultBanner from "../../Images/headerImages/Banner3.png";

import Header from "./Header.js";
import Buttons from "./Buttons.js";
import NextSteps from "./NextSteps.js";


class HighLevelPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div>
                <Header
                    image = {this.props.image}
                    imageTab = {this.props.imageTab}
                    imageMob = {this.props.imageMob}
                    headerColour = {this.props.headerColour}
                    name = {this.props.name}
                    description = {this.props.description}
                />
                <Buttons buttons = {this.props.buttons}/>
                <NextSteps 
                    image = {this.props.navImage}
                    navigation = {this.props.navigation}
                />
            </div>
        )
    }
}

HighLevelPage.propTypes = {
    image: PropTypes.string,
    imageTab: PropTypes.string,
    imageMob: PropTypes.string,
    name: PropTypes.string,
    headerColour: PropTypes.string,
    description: PropTypes.string,
    buttons: PropTypes.array,
    navigation: PropTypes.array
}
HighLevelPage.defaultProps = {
    image: `${DefaultBanner}`,
    imageTab: `${DefaultBanner}`,
    imageMob: `${DefaultBanner}`,
    name: "Topic Name",
    headerColour: "white",
    description: "A description of the topic belongs here, I wonder where it went...",
}

export default HighLevelPage;