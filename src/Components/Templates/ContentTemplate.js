import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import sal from "sal.js";
import '../../../node_modules/sal.js/dist/sal.css';

import DefaultBanner from "../../Images/headerImages/Banner3.png";

import Header from "./Header.js";
import MainContent from "./MainContent.js";
import Banner from "./Banner.js";
import Quiz from "../Quiz.js"
import NextSteps from "./NextSteps.js";
import Resources from "./Resources.js";


class ContentTemplate extends React.Component {
    targetElement = null;

    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidUpdate(prevProps, prevState){
        sal({
            once: false,
        });
    }
    handleScroll = () => {
        
    }
    componentDidMount(){
        window.onscroll = function(){
            if(window.pageYOffset === 0){
                console.log("at the top innit");
            }
        }
    }
    componentWillUnmount(){
        window.onscroll = null;
    }
    handleScroll = (event) => {
        const target = event.target;

        if(target.scrollHeight - target.scrollTop === target.clientHeight){
            console.log("CUNT")
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
                <MainContent content = {this.props.content} />
                <Banner bannerOne = {this.props.bannerOne} />
                <MainContent content2 = {this.props.content2}/>
                <Banner bannerTwo = {this.props.bannerTwo}/>
                <MainContent content3 = {this.props.content3}/>

                <Quiz style = {{overflowY: "scroll"}} onScroll = {this.handleScroll} quiz = {this.props.quiz} quizColour = {this.props.quizColour}/>

                <Resources resources = {this.props.resources}/>

                <NextSteps 
                    image = {this.props.navImage}
                    navigation = {this.props.navigation}
                />
            </div>
        )
    }
}



export default ContentTemplate;