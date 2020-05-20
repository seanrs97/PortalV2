import React from "react";
import styled from "styled-components";
import IsEmpty from "./IsEmpty";

import QuizImage1 from "../Images/SVG/quiz-wave-1.svg";
import QuizImage2 from "../Images/SVG/quiz-wave-2.svg";

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

class Quiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quizData: [],

             // Quiz functionality states
             questions:  [],
             currentQuestion: {},
             nextQuestion: {},
             previousQuestion: {},
             answer: "",
             numberOfQuestions: 0,
             numberOfAnsweredQuestions: 0,
             currentQuestionIndex: 0,
             score: 0,
             correctAnswers: 0,
             wrongAnswers: 0,
             hints: 5,
             fiftyFifty: 2,
             usedFiftyFifty: false,
             nextButtonDisabled: false, 
             previousButtonDisabled: true,
             previousRandomNumber: [],
             disableButtons: false,
             time: {},
 
             // Show / Hide components and return states 
             showQuestions: "block",
             showSummary: " ",
             showDialog: "none",
             showOverlay: "none",
             returnHome: false,
             displayQuiz: "translateX(-100%) scale(0)",
             answerMessage: "",
             showConfetti: "none",
             optionDisabled: true,
             backgroundChange: "#23758b",
             homeAppear: "",
             doesQuizExist: "",
             questionDisplay: "",
             showTimeMessage: "translateX(-100%)"

            //  this.interval = null;
            //  this.correctSound = React.createRef();
            //  this.wrongSound = React.createRef();
        }
    }
    async componentDidMount(){
        const quizData = await (await (fetch("/jsonFiles/example-quiz.json"))).json();
        console.log(quizData);
        // Check if quiz exists
        if(quizData.status === 200){
            this.setState({
                quizData: quizData.data,
                questions: quizData.data.questions,
            });
            if(this.state.currentQuestionIndex !== 0){
                this.setState({
                    currentQuestionIndex: 0,
                    score: 0
                });
                this.showOptions();
            }
            this.displayQuestions(
                this.state.questions,
                this.state.currentQuestion,
                this.state.nextQuestion,
                this.state.previousQuestion
            )
            if(this.state.showSummary !== "dissapear 1.2s linear forwards"){
                this.setState({
                    showSummary: "dissapear 1.2s linear forwards"
                })
            }
        } else {
            console.log("QUIZ DOES NOT EXIST")
        }
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
   
    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;

        if(!IsEmpty(this.state.questions)){
            questions = this.state.questions;
            currentQuestion =  questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];

            const correctAnswer = currentQuestion.answers;

            correctAnswer.map((ans) => {
                console.log(ans.correct);
            })

            const answer = currentQuestion.answer;
            this.setState({ 
                currentQuestion, 
                nextQuestion,
                previousQuestion,
                answer,
                previousRandomNumber: [],
            }, () => {
                this.showOptions();
            });
        }
    }
    showOptions = () => {
        const options = Array.from(document.querySelectorAll(".option"));
        options.forEach(option => {
            option.style.visibility = "visible";
        });
        this.setState({
            usedFiftyFifty: false,
            optionDisabled: true,
            backgroundChange: "#23758b"
        })
    }
    startGame = () => {
        let {currentQuestionIndex} = this.state;
        let questions;
        let currentQuestion;
        let nextQuestion;
        let previousQuestion;
        let answer;

        if(this.state.questions === undefined || this.state.questions === ""){
            questions = [
                {
                    "default question": "default answer", 
                    "default question 2": "default answer"
                }
            ];
            currentQuestion = {"default question": "default question 2"};
            nextQuestion = {"default question": "default question 2"};
            previousQuestion = {"default question": "default question 2"};
            answer = "default answer";
        } else {
            questions = this.state.questions;
            currentQuestion = this.state.questions[currentQuestionIndex];
            nextQuestion = this.state.questions[currentQuestionIndex + 1];
            previousQuestion = this.state.questions[currentQuestionIndex - 1];
            answer = this.state.questions[currentQuestionIndex].answer;
        }
        
        // Sets the questions data to state, so they can be used throughout the rest of this component
        if(questions.length === 0 || questions === undefined || currentQuestion.length === 0 || currentQuestion === undefined){
            console.log("somethings gone wrong here")
        } else {
            this.setState({
                questions: questions,
                currentQuestion:currentQuestion,
                nextQuestion: nextQuestion,
                previousQuestion: previousQuestion, 
                numberOfQuestions: questions.length,
                answer:  answer
            });
        }
    }
    // Starts the countdown Timer displayed in the Lifeline section of the quiz. Just a simple countdown clock.
    startTimer = () => {
        const countdownTime = Date.now() + 60000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countdownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) /  (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000 );
            
            if(seconds <= 15){
                this.setState({
                    showTimeMessage: "translateX(0)"
                });
                setTimeout(() => {
                    this.setState({
                        showTimeMessage: "translateX(-100%)"
                    })
                }, 3000);
            }
            if(distance < 0){
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.end();
                });
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                })
            }
        }, 1000);
    }
    startQuiz = () => {
        setTimeout(() => {
            this.setState({
                displayQuiz: "translateX(0) scale(1)",
                homeAppear: "dissapear 1s linear forwards"
            }); 
        }, 800);
        this.startGame();
        this.startTimer();
        this.setState({
            hints: 5,
            fiftyFifty: 2
        });
        if(this.state.currentQuestionIndex !== 0){
            this.resetQuiz();
        }
    }
    render(){
        const {
            currentQuestion, 
            currentQuestionIndex, 
            numberOfQuestions, 
            hints, 
            fiftyFifty,
            time,

            endScore,
            endNumOfQuestions,
            success,
            successMessage
        } = this.state;

        console.log("state", this.state)
        console.log(currentQuestion)
        return (
            <React.Fragment>
                <ContentWrapper>
                    <Home style = {{animation: this.state.homeAppear}}>
                        <div className = "content-container">
                            <h1> Quiz </h1>
                            <div className = "button-container">
                                <button onClick = {this.startQuiz}>Start</button> 
                            </div>
                        </div>
                        <img src = {QuizImage1} className = "top-quiz-wave" />
                        <img src = {QuizImage2} className = "bottom-quiz-wave"/>
                    </Home>
                    <QuizContainer>
                        <div style = {{position: "relative"}}>
                            <Container>
                                <div style = {{background: "orange"}}>
                                    <h1> {currentQuestion.text} </h1>
                                </div>
                                <OptionsContainer>
                                    {!!currentQuestion.answers && currentQuestion.answers.map((ans) =>
                                        <button> {ans.text}</button>
                                    )}
                                </OptionsContainer>





                                
                                {/* {!!this.state.quizData.questions && this.state.quizData.questions.map((question) => {
                                    return (
                                        <div>
                                            <p>{question.text}</p>
                                            <ul>
                                                {!!question.answers && question.answers.map((answer) => 
                                                    <ul>
                                                        <li className = "option"> {answer.text} </li>
                                                    </ul>
                                                )}
                                            </ul>
                                        </div>
                                    )
                                })} */}
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
    margin-bottom: 20px;
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
const Home = styled.div`
    position: absolute;
    width: 100%; 
    left:0;
    top: 0;
    z-index: 3;

    background: #23758b;
    height: 60vh;
    padding: 14px;
    color: white;
    position: relative;
    overflow: hidden;
    transition: 1.6s;

    .content-container{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        h1{
            font-size: 4.5em;
            font-weight: 800;
            text-align: center;
            font-family: dosis;
            @media only screen and (max-width: 430px){
                font-size: 7em;
                font-weight: 800;
            }
            @media only screen and (max-width: 800px) and (min-width: 430px){
                font-size: 8em
            }
            @media only screen and (max-width: 1400px) and (min-width: 800px){
                font-size: 10em;
            }
            @media only screen and (min-width: 1400px) and (max-width: 2000px){
                font-size: 12em;
            }
            @media only screen and (min-width: 2000px){
                font-size: 14em;
            }
        }
        p{
            color: white;
            text-align: center;
            padding: 10px 0;
            @media only screen and (max-width: 430px){
                font-size: 1.1em;
            }
            @media only screen and (max-width: 800px) and (min-width: 430px){
                font-size: 2em;
            }
            @media only screen and (max-width: 1400px) and (min-width: 800px){
                font-size: 2.4em;
            }
            @media only scren and (min-width: 1400px) and (max-width: 2000px){
                font-size: 3.2em;
            }
            @media only screen and (min-width: 2000px){
                font-size: 4em;
            }
        }
        .button-container{
            width: 100%;
            text-align: center;
            button{
                border: 4px solid white;
                background: #3589a1;
                border-radius: 8px;
                font-size: 2.2em;
                padding: 20px 50px;
                color: white;
                transition: .4s all;
                font-weight: 600;
                &:hover{
                    background: #23758b;
                }
                @media only screen and (max-width: 430px){
                    width: 100%;
                }
                @media only screen and (max-width: 800px) and (min-width: 430px){
                    font-size: 2.5em;
                    margin-top: 14px;   
                }
                @media only screen and (max-width: 1400px) and (min-width: 800px){
                    font-size: 2.8em;
                    margin-top: 30px;
                }
                @media only screen and (min-width: 1400px) and (max-width: 2000px){
                    font-size: 3.6em;
                    margin-top: 50px;
                }
                @media only screen and (min-width: 2000px){
                    font-size: 4.8em;
                    margin-top: 80px;
                    padding: 60px 140px;
                }
            }
        }
        @media only screen and (max-width: 1400px) and (min-width: 430px){
            width: 100%;
        }
    }
    .top-quiz-wave{
        position: absolute;
        top: -5%;
        right: 0;
        width: 500px;
        @media only screen and (max-width: 1400px) and (min-width: 800px){
            width: 700px;
        }
        @media only screen and (min-width: 1400px) and (max-width: 2000px){
            width: 850px;
        }
        @media only screen and (min-width: 2000px){
            width: 1200px;
        }
    }
    .bottom-quiz-wave{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 250px;
        @media only screen and (max-width: 1400px) and (min-width: 800px){
            width: 350px;
        }
        @media only screen and (min-width: 1400px) and (max-width: 2000px){
            width: 500px;
        }
        @media only screen and (min-width: 2000px){
            width: 750px;
        }
    }
    @media only screen and (max-width: 430px){
        height: 100vh;
    }
    @media only screen and (max-width: 3000px) and (min-width: 430px){
        height: 100vh;
    }
`
const Container = styled.div`
    width: 97.15%;
    padding: 14px;
    transition: 1.2s all;
    background: #23758b;
    color: white;
    height: 100%;
    z-index: 100000;
    position: relative;
    margin-bottom: 20px;
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
        height: 100%;
        width: 100%;
        padding: 0;
    }
`
const OptionsContainer = styled.div`
    display: inline-block;
    transition: 1s all;
    width: 85%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    margin: 0 auto;
    .option{
        background: rgba(71, 187, 230, 0.6);
        border: none;
        border-radius: 4px;
        display: inline-block;
        width: 90%;
        text-align: center;
        color: white;
        cursor: pointer;
        margin: 10px;
        padding: 10px;
        transition: .3s linear all;
        transition: .3s all;
        font-size: 1.4em;
        &:hover{
            background: rgba(71, 187, 230, 1);
        }
        @media only screen and (max-width: 1050px) and (min-width: 574px){
            padding: 10px;
            font-size: 1.4em;
        }
        @media only screen and (min-width: 1050px) and (max-width: 1500px){
            padding: 20px;
            font-size: 1.75em;
        }
        @media only screen and (min-width: 1500px) and (max-width: 2000px){
            font-size: 2.1em;
            padding: 30px;
        }
        @media only screen and (min-width: 2000px){
            font-size: 4em;
            padding: 70px;
        }
    }
    @media only screen and (max-width: 574px){
        display: block;
        text-align: center;
    }
    @media only screen and (max-width: 800px) and (min-width: 574px){
        width: 100%;
    }
    @media only screen and (max-width: 1500px) and (min-width: 800px){
        width: 100%;
        grid-template-rows: repeat(2, 50%);
        grid-gap: 20px;
        margin-top: 40px;
    }
    @media only screen and (min-width: 1500px) and (max-width: 2000px){
        width: 80%;
        grid-gap: 20px;
        margin-top: 50px;
    }
    @media only screen and (min-width: 2000px){
        grid-gap: 60px;
        margin-top: 60px;
    }
`
export default Quiz;