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
        console.log(this.props.resources)
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
                                        <div className = "link-wrapper" 
                                            style = {
                                                {backgroundImage: `url(${QuizImage1})` ,
                                                backgroundRepeat: "no-repeat",
                                                backgroundAttachment: "fixed",
                                                backgroundSize: "cover",
                                                backgroundPosition: "center"
                                            }}>
                                            <h5> {link.text} </h5>
                                            <p> {link.desc} </p>
                                            <a href = {link.link} className = "link"> Visit Link  &rarr; </a>
                                            {/* <img style = {{
                                                height:  `${this.randomNumberGenerator(200, 400)}px`, 
                                                top: `${this.randomNumberGenerator(-50, 50)}px`, 
                                                left: `${this.randomNumberGenerator(-50, 50)}px`}}
                                                src = {QuizImage1} 
                                                alt = "back-image"
                                            /> */}
                                            {/* <img src = {QuizImage1} alt = "img"/> */}
                                        </div>
                                    )}
                                </div>
                            </WatchAndLearn>
                            <UsefulLinks>
                                <h2> Useful Links </h2>
                                <p> We've collected the most useful links we could find to help you in your educational journey!  </p>
                                <div className  = "links-wrapper2">
                                {!!resource.useful_links && resource.useful_links.map((link) =>
                                        <div className = "link-wrapper" style = {
                                            {backgroundImage: `url(${QuizImage1})` ,
                                            backgroundRepeat: "no-repeat",
                                            backgroundAttachment: "fixed",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center bottom"
                                        }}>
                                            <h5> {link.text} </h5>
                                            <p> {link.desc} </p>
                                            <a href = {link.link} className = "link"> Visit Link  &rarr; </a>
                                        </div>
                                    )}
                                </div>
                            </UsefulLinks>
                            <CareerPathways>
                                <h2> Career Pathways </h2>
                                <p> Take a look at some of the career pathways that are available to you right now!</p>
                                <div className  = "links-wrapper3">
                                {!!resource.careers && resource.careers.map((link) =>
                                    <div className = "link-wrapper" style = {
                                        {backgroundImage: `url(${QuizImage1})` ,
                                        backgroundRepeat: "no-repeat",
                                        backgroundAttachment: "fixed",
                                        backgroundSize: "cover",
                                        backgroundPosition: "right top"
                                    }}>
                                        <h5> {link.text} </h5>
                                        <p> {link.desc} </p>
                                        <a href = {link.link} className = "link"> Visit Link  &rarr; </a>
                                    </div>
                                )}
                            </div>
                            </CareerPathways>
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
    background: linear-gradient(90deg,rgb(11,146,191), rgb(42,181,227));
    color: white;
    padding: 30px 40px;
    h1{
        line-height: 1em;
        font-size: 6.8em;
        padding-bottom: 20px;
        color: white;
        @media only screen and (min-width: 1900px) and (max-width: 2350px){
            font-size: 8em;
        }
        @media only screen and (min-width: 2350px){
            font-size: 9em;
        }
        @media only screen and (max-width: 600px) and (min-width: 500px){
            font-size: 6em;
        }
        @media only screen and (max-width: 500px) and (min-width: 400px){
            font-size: 4.8em;
        }
        @media only screen and (max-width: 400px){
            font-size: 3.6em;
        }
    }
    p{
        color: white;
        width: 70%;
        font-size: 1em;
        line-height: 1.8em;
        @media only screen and (min-width: 1900px) and (max-width: 2350px){
            font-size: 1.5em;
        }
        @media only screen and (min-width: 2350px){
            font-size: 1.7em;
        }
        @media only screen and (max-width: 600px){
            width: 88%;
        }
    }
    @media only screen and (min-width: 1900px) and (max-width: 2350px){
        padding: 40px 50px;
    }
    @media only screen and (min-width: 2350px){
        padding: 50px 60px;
    }
    @media only screen and (max-width: 600px){

    }
`
const MainContentContainer = styled.div`
    div{
        width: 84%;
        margin: 0 auto;
        h2{
            font-size: 4.4em;
            @media only screen and (min-width: 1900px) and (max-width: 2350px){
                font-size: 6em;
            }
            @media only screen and (min-width: 2350px){
                font-size: 7em;
            }
        }
        p{
            margin-left: 10px;
            font-size: 1em;
            width: 70%;
            @media only screen and (min-width: 1900px) and (max-width: 2350px){
                font-size: 1.4em;
            }
            @media only screen and (min-width: 2350px){
                font-size: 1.8em;
            }
        }
        @media only screen and (min-width: 1900px) and (max-width: 2350px){
            width: 75%;
        }
        @media only screen and (min-width: 2350px){
            width: 70%;
        }
    }
`
const WatchAndLearn = styled.div`
    margin-top: 40px !important;
    .links-wrapper{
        width: 100%;
        display: grid;
        grid-gap: 20px;
        grid-template-columns: repeat(3, 1fr);
        margin-top: 30px;
        @media only screen and (max-width: 1000px) and (min-width: 600px){
            grid-template-columns: repeat(2, 1fr);
        }
        @media only screen and (max-width: 600px){
            grid-template-columns: repeat(1, 1fr);
        }

        .link-wrapper{
            width: 100%;
            border: 1.5px solid #5c5c5c;
            border-radius: 8px;
            position: relative;
            background: #ff6161;
            overflow: hidden;
            min-height: 35vh;
            @media only screen and (max-width: 1200px) and (min-width: 1000px){
                min-height: 28vh;
            }
            @media only screen and (max-width: 1000px) and (min-width: 600px){
                min-height: 25vh;
            }
            @media only screen and (max-width: 600px){
                min-height: 20vh;
            }
            h5{
                font-size: 1.5em;
                padding: 16px;
                font-weight: 800;
                font-family: Dosis;
                line-height: 1.4em;
                text-transform: uppercase;
                color: white;
                @media only screen and (min-width: 1900px) and (max-width: 2350px){
                    font-size: 2.6em;
                }
                @media only screen and (min-width: 2350px){
                    font-size: 3em;
                }
            }
            p{
                color: white;
                font-size: 0.9em;
                padding: 0 16px;
                margin-left: 4px;
                padding-bottom: 50px;
                font-weight: 600;
                @media only screen and (min-width: 1900px) and (max-width: 2350px){
                    font-size: 1.3em;
                }
                @media only screen and (min-width: 2350px){
                    font-size: 1.5em;
                }
            }
            .link{
                padding-bottom: 8px;
                padding-left: 16px;
                padding-right: 16px;
                padding-top: 8px;
                position: absolute;
                bottom: 0;
                text-decoration: none;
                color: white;
                font-weight: 600;
                @media only screen and (min-width: 1900px) and (max-width: 2350px){
                    font-size: 1.4em;
                }
                @media only screen and (min-width: 2350px){
                    font-size: 1.6em;
                }
            }
            &:nth-child(1n){
                background: #2AB5E3;

            }
            &:nth-child(2n){
                background: #24AEDC;

            }
            &:nth-child(3n){
                background: #1EA7D5;
            }
            &:nth-child(4n){
                background: #17A0CD;

            }
            &:nth-child(5n){
                background: #1199C6;

            }
            &:nth-child(6n){
                background: #0B92BF;
            }
        }
    }
`
const UsefulLinks = styled.div`
    margin-top: 100px !important;
    .links-wrapper2{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
        margin-left: -10px;
        margin: 0 auto;
        .link-wrapper{
            flex-grow: 0.5;
            width: 40%;
            border: 1.5px solid #5c5c5c;
            border-radius: 8px;
            position: relative;
            background: #ff6161;
            overflow: hidden;
            min-height: 35vh;
            justify-content: space-between;
            margin: 10px;

            @media only screen and (max-width: 1200px) and (min-width: 1000px){
                min-height: 28vh;
            }
            @media only screen and (max-width: 1000px) and (min-width: 600px){
                min-height: 25vh;
                width: 45%;
            }
            @media only screen and (max-width: 600px){
                width: 100%;
                min-height: 20vh;
            }
            &:nth-child(1n){
                flex-grow: 6;
                @media only screen and (max-width: 1000px) and (min-width: 600px){
                    flex-grow: 0;
                }
            }
            &:nth-child(2n){
                flex-grow: 0.1;
                @media only screen and (max-width: 1000px) and (min-width: 600px){
                    flex-grow: 0;
                }
            }
            &:nth-child(3n){
                flex-grow: 0.1;
                @media only screen and (max-width: 1000px) and (min-width: 600px){
                    min-height: 0;
                }
            }
            &:nth-child(4n){
                flex-grow: 6;
                @media only screen and (max-width: 1000px) and (min-width: 600px){
                    flex-grow: 0;
                }
            }

            h5{
                font-size: 1.5em;
                padding: 16px;
                font-weight: 800;
                font-family: Dosis;
                line-height: 1.4em;
                text-transform: uppercase;
                color: white;
                @media only screen and (min-width: 1900px) and (max-width: 2350px){
                    font-size: 2.6em;
                }
                @media only screen and (min-width: 2350px){
                    font-size: 3em;
                }
            }
            p{
                font-size: 0.9em;
                padding: 0 16px;
                margin-left: 4px;
                padding-bottom: 50px;
                font-weight: 600;
                color: white;
                @media only screen and (min-width: 1900px) and (max-width: 2350px){
                    font-size: 1.3em;
                }
                @media only screen and (min-width: 2350px){
                    font-size: 1.5em;
                }
            }
            .link{
                padding-bottom: 8px;
                padding-left: 16px;
                padding-right: 16px;
                padding-top: 8px;
                position: absolute;
                bottom: 0;
                text-decoration: none;
                color: white;
                font-weight: 600;
                @media only screen and (min-width: 1900px) and (max-width: 2350px){
                    font-size: 1.4em;
                }
                @media only screen and (min-width: 2350px){
                    font-size: 1.6em;
                }
            }
            &:nth-child(1n){
                background: #2AB5E3;
            }
            &:nth-child(2n){
                background: #20A9D7;
            }
            &:nth-child(3n){
                background: #159ECB;
            }
            &:nth-child(4n){
                background: #0B92BF;
            }
        }
    }

`
const CareerPathways = styled.div`
    margin-top: 100px !important;
    .links-wrapper3{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
        margin-left: -10px;
        margin: 0 auto;
        .link-wrapper{
            flex-grow: 0.5;
            width: 40%;
            border: 1.5px solid #5c5c5c;
            border-radius: 8px;
            position: relative;
            background: #ff6161;
            overflow: hidden;
            min-height: 35vh;

            justify-content: space-between;
            margin: 10px;

            @media only screen and (max-width: 1200px) and (min-width: 1000px){
                min-height: 28vh;
            }
            @media only screen and (max-width: 1000px) and (min-width: 600px){
                min-height: 25vh;
                width: 45%;
            }
            @media only screen and (max-width: 600px){
                width: 100%;
                min-height: 20vh;
            }
            &:nth-child(1){
                background: none;
            }
            &:nth-child(2){
                background: none;
            }
            &:nth-child(1n){
                flex-grow: 0.1;
                @media only screen and (max-width: 1000px){
                    flex-grow: 0;
                }
            }
            &:nth-child(2n){
                flex-grow: 6;
                @media only screen and (max-width: 1000px){
                    flex-grow: 0;
                }
            }
            h5{
                font-size: 1.5em;
                padding: 16px;
                font-weight: 800;
                font-family: Dosis;
                line-height: 1.4em;
                text-transform: uppercase;
                color: #4d4d4d;
                @media only screen and (min-width: 1900px) and (max-width: 2350px){
                    font-size: 2.6em;
                }
                @media only screen and (min-width: 2350px){
                    font-size: 3em;
                }
            }
            p{
                font-size: 0.9em;
                padding: 0 16px;
                margin-left: 4px;
                padding-bottom: 50px;
                font-weight: 600;
                @media only screen and (min-width: 1900px) and (max-width: 2350px){
                    font-size: 1.3em;
                }
                @media only screen and (min-width: 2350px){
                    font-size: 1.5em;
                }
            }
            .link{
                padding-bottom: 8px;
                padding-left: 16px;
                padding-right: 16px;
                padding-top: 8px;
                position: absolute;
                bottom: 0;
                text-decoration: none;
                color: #4d4d4d;
                font-weight: 600;
                @media only screen and (min-width: 1900px) and (max-width: 2350px){
                    font-size: 1.4em;
                }
                @media only screen and (min-width: 2350px){
                    font-size: 1.6em;
                }
            }
            &:nth-child(3n){
                background: #2AB5E3;
                h5{
                    color: white;
                }
                p{
                    color: white;
                }
                .link{
                    color: white;
                }
            }
            &:nth-child(4n){
                background: #20A9D7;
                h5{
                    color: white;
                }
                p{
                    color: white;
                }
                .link{
                    color: white;
                }
            }
        }
`
export default Resources