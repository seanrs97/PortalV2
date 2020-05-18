import React from "react";
import styled from "styled-components";

class Quiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <React.Fragment>
                <ContentWrapper>
                    <QuizContainer>
                        <div style = {{position: "relative"}}>
                            <Container>
                                {!!this.props.quiz && this.props.quiz.map((content) =>
                                    <div>
                                        <p> Quiz Name: {content.name} </p>
                                        <p> ID: {content.id} </p>
                                        {!!content.questions && content.questions.map((qs) => 
                                            <div>
                                                <p> {qs.text} </p>
                                                {!!qs.answers && qs.answers.map((ans) =>
                                                    <li> {ans.text} </li>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Container>
                        </div>
                    </QuizContainer>
                </ContentWrapper>
            </React.Fragment>
        )
    }
}

const ContentWrapper = styled.div`
    position: relative;
    overflow: hidden;
    height: 100vh;
`
const QuizContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    transition: 1.2s all;
`
const Container = styled.div`
    width: 97.15%;
    padding: 14px;
    transition: 1.2s all;
    background: #23758b;
    color: white;
    height: 60vh;
    z-index: 100000;
    position: relative;
    .main-content-container{
        top: 30%;
        position: absolute;
        transform: translateY(-30%);
        @media only screen and (max-width: 574px){
            width: 100%;
        }
        @media only screen and (max-width: 800px) and  (min-width: 574px){
            left: 50%;
            top: 44%;
            transform: translate(-50%, -50%);
            width: 94%;
        }
        @media only screen and (max-width: 1050px) and (min-width: 800px){
            left: 50%;
            top: 44%;
            transform: translate(-50%, -50%);
            width: 84%;
        }
        @media only screen and (min-width: 1050px) and (max-width: 1500px){
            width: 84%;
            left: 50%;
            top: 44%;
            transform: translate(-50%, -50%);
        }
        @media only screen and (min-width: 1500px) and (max-width: 2000px){
            top: 40%;
            left: 50%;
            width: 75%;
            transform: translate(-50%, -50%);
        }
        @media only screen and (min-width: 2000px){
            top: 40%;
            left: 50%;
            width: 68%;
            transform: translate(-50%, -50%);
        }
    }
    .quitQuiz{
        font-weight: 800;
        color: white;
        position: absolute;
        top: 12px;
        left: 12px;
        font-size: 1.7em;
        cursor: pointer;
        z-index:
        @media only screen and (max-width: 800px) and (min-width: 574px){
            font-size: 2.2em;
            top: 15px;
            left: 15px;
        }
        @media only screen and (max-width: 1500px) and (min-width: 800px){
            top: 30px;
            left: 30px;
            font-size: 3em;
        }
        @media only screen and (min-width: 1500px) and (max-width: 2000px){
            top: 40px;
            left: 40px;
            font-size: 3.4em;
        }
        @media only screen and (min-width: 2000px){
            top: 60px;
            left: 60px;
            font-size: 5em;
        }
    }
    h1{ 
        text-align: center;
        font-weight: 400;
        font-size: 6em;
        color: white;
    }
    .numberOfQuestionsContainer{
        text-align: center;
        font-size: 1em;
        font-weight: 100;
        transition: 1s all;
        .qNumber{
            color: white;
            font-weight: 100;
            @media only screen and (max-width: 1050px) and (min-width: 574px){
                font-size: 1.6em;
            }
            @media only screen and (max-width: 1500px) and (min-width: 1050px){
                font-size: 2em;
            }
            @media only screen and (min-width: 1500px) and (max-width: 2000px){
                font-size: 2.2em;
            }
            @media only screen and (min-width: 2000px){
                font-size: 3.4em;
            }
        }
    }
    @media only screen and (max-width: 7000px){
        height: 100vh;
        width: 100%;
        padding: 0;
    }
`
export default Quiz;