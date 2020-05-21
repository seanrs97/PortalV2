import React from "react";
import styled from "styled-components";

import QuizImage1 from "../../Images/SVG/quiz-wave-1.svg";
import QuizImage2 from "../../Images/SVG/quiz-wave-2.svg";


class Resources extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            randomHeight: 0
        }
    }
    randomNumberGenerator = (min, max) => {
        let range = max - min;
        let random = Math.random();
        random = random * (range + 1);
        random = random + min;
    
        return random;
    }
    render(){
        return (
            <Container>
                {!!this.props.resources && this.props.resources.map((resource) =>
                    <ContentContainer>
                        <Header key = {resource.title}>
                            <h1 className = "content-text">{resource.title}</h1>
                            <p> {resource.text} </p>
                        </Header>
                        <MainContentContainer>
                            <WatchAndLearn>
                                <h2> Watch and Learn </h2>
                                <p> We've scoured the interet to find the most helpful videos, games, quizzes, websites and everything in between! We hope these will help you in your educational journey!</p>
                                <div className = "links-wrapper">
                                    {!!resource.watch_and_learn && resource.watch_and_learn.map((link) =>
                                        <div className = "link-wrapper">
                                            <h5> {link.text} </h5>
                                            <p> {link.desc} </p>
                                            <a href = {link.link} className = "link"> Visit Link  &rarr; </a>
                                            <img style = {{
                                                height:  `${this.randomNumberGenerator(200, 400)}px`, 
                                                top: `${this.randomNumberGenerator(-50, 50)}px`, 
                                                left: `${this.randomNumberGenerator(-50, 50)}px`}}
                                                src = {QuizImage1} 
                                                alt = "back-image"
                                            />
                                        </div>
                                    )}
                                </div>
                            </WatchAndLearn>
                            <UsefulLinks>
                                <h2> Useful Links </h2>
                                <p> We've collected the most useful links we could find to help you in your educational journey!  </p>
                                <div className  = "links-wrapper2">
                                {!!resource.useful_links && resource.useful_links.map((link) =>
                                        <div className = "link-wrapper">
                                            <h5> {link.text} </h5>
                                            <p> {link.desc} </p>
                                            <a href = {link.link} className = "link"> Visit Link  &rarr; </a>
                                            <img style = {{
                                                height:  `${this.randomNumberGenerator(200, 400)}px`, 
                                                top: `${this.randomNumberGenerator(-50, 50)}px`, 
                                                left: `${this.randomNumberGenerator(-50, 50)}px`}}
                                                src = {QuizImage1} 
                                                alt = "back-image"
                                            />
                                        </div>
                                    )}
                                </div>
                            </UsefulLinks>
                        </MainContentContainer>
                    </ContentContainer>
                )}
            </Container>
        )
    }
}

const Container = styled.div`
    margin-top: 20px;
`
const ContentContainer = styled.div`

`
const Header = styled.div`
    background: #23758b;
    color: white;
    padding: 30px 40px;
    h1{
        line-height: 1em;
        font-size: 6.8em;
        padding-bottom: 20px;
    }
    p{
        color: white;
        width: 70%;
        font-size: 1em;
        line-height: 1.8em;
    }
`
const MainContentContainer = styled.div`
    div{
        width: 84%;
        margin: 0 auto;
        h2{
            font-size: 4.4em;
        }
        p{
            margin-left: 10px;
            font-size: 1em;
            width: 70%;
        }
        .links-wrapper{
            width: 100%;
            display: grid;
            grid-gap: 20px;
            grid-template-columns: repeat(3, 1fr);
            margin-top: 30px;
            .link-wrapper{
                width: 100%;
                border: 1.5px solid black;
                border-radius: 8px;
                position: relative;
                background: #ff6161;
                overflow: hidden;
                h5{
                    font-size: 1.5em;
                    padding: 16px;
                    font-weight: 800;
                    font-family: Dosis;
                    line-height: 1.4em;
                    text-transform: uppercase;
                }
                p{
                    font-size: 0.9em;
                    padding: 0 16px;
                    margin-left: 4px;
                    padding-bottom: 50px;
                    font-weight: 600;
                }
                .link{
                    padding-bottom: 8px;
                    padding-left: 16px;
                    padding-right: 16px;
                    padding-top: 8px;
                    position: absolute;
                    bottom: 0;
                    text-decoration: none;
                    color: black;
                    font-weight: 600;
                }
                img{
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0.4;
                    height: 300px;
                }
                &:nth-child(2n){
                    background: #7a99ff;
                }
                &:nth-child(3n){
                    background: #21c225;
                }
                &:nth-child(4n){
                    background: #f2c56b;
                }
            }
        }
        .links-wrapper2{
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            flex-direction: row;
            margin-left: -10px;
            .link-wrapper{
                flex-grow: 0.5;
                width: 40%;
                border: 1.5px solid black;
                border-radius: 8px;
                position: relative;
                background: #ff6161;
                overflow: hidden;

                justify-content: space-between;
                margin: 10px;
                &:nth-child(1n){
                    flex-grow: 6;
                }
                &:nth-child(2n){
                    flex-grow: 0.1;
                }
                &:nth-child(3n){
                    flex-grow: 0.1;
                }
                &:nth-child(4n){
                    flex-grow: 6;
                }

                h5{
                    font-size: 1.5em;
                    padding: 16px;
                    font-weight: 800;
                    font-family: Dosis;
                    line-height: 1.4em;
                    text-transform: uppercase;
                }
                p{
                    font-size: 0.9em;
                    padding: 0 16px;
                    margin-left: 4px;
                    padding-bottom: 50px;
                    font-weight: 600;
                }
                .link{
                    padding-bottom: 8px;
                    padding-left: 16px;
                    padding-right: 16px;
                    padding-top: 8px;
                    position: absolute;
                    bottom: 0;
                    text-decoration: none;
                    color: black;
                    font-weight: 600;
                }
                img{
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0.4;
                    height: 300px;
                }
                &:nth-child(2n){
                    background: #7a99ff;
                }
                &:nth-child(3n){
                    background: #21c225;
                }
                &:nth-child(4n){
                    background: #f2c56b;
                }
            }
        }
    }
`
const WatchAndLearn = styled.div`

`
const UsefulLinks = styled.div`

`

export default Resources