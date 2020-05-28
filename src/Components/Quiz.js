// To find where data is being pulled from, check ComponentDidMount
// To find how questions are being displayed, check the DisplayQuestions method
// To find how the quiz is being submitted, check the SubmitQuiz method. >> Note this is just a mock up and isn't in use currently

// To find the JSON file for the quiz, go to the public folder and then jsonfiles/example-quiz.json

// To find the HTML is being rendered to the UI, check the Render Method
// To find any styles, check the Styled components at the bottom of the page





import React from "react";
import styled from "styled-components";
import IsEmpty from "./IsEmpty";
import Summary from "./Summary";

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import QuizImage1 from "../Images/SVG/quiz-wave-1.svg";
import QuizImage2 from "../Images/SVG/quiz-wave-2.svg";

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
             showTimeMessage: "translateX(-100%)",

             answeredQuestions: [],

             quizShow: "",
             quizScale: "0",

             showMainOverlay: "none",
             overlayOpacity: "0",
             overlayVisibility: "hidden"    
        }
        this.interval = null
        this.targetElement = null;
    }
    async componentDidMount(){

        this.targetElement = document.querySelectorAll("#quizAndSummary");
        const quizData = await (await (fetch("/example-quiz.json"))).json();
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
            if(this.state.showSummary !== "dissapear 1s linear forwards"){
                this.setState({
                    showSummary: "dissapear 1s linear forwards"
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

            this.setState({ 
                currentQuestion, 
                nextQuestion,
                previousQuestion,
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
    }
    startGame = () => {
        let {currentQuestionIndex} = this.state;

        let questions = this.state.questions;
        let currentQuestion = this.state.questions[currentQuestionIndex];
        let nextQuestion = this.state.questions[currentQuestionIndex + 1];
        let previousQuestion = this.state.questions[currentQuestionIndex - 1];
        let answer = this.state.questions[currentQuestionIndex].answer;
        
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
        let quizScaleSize;
        console.log(window.innerWidth);
        if(window.innerWidth < 580){
            quizScaleSize = "100%"
        } else {
            quizScaleSize = "88%"
        }
        setTimeout(() => {
            this.setState({
                displayQuiz: "translateX(0) scale(1)",
                quizShow: "block",
                quizScale: quizScaleSize,
                // homeAppear: "dissapear 1s linear forwards",
                showMainOverlay: "block",

                overlayVisibility: "visible",
                overlayOpacity: 0.7
            }); 
        }, 800);
        this.showTargetElement();
        this.startGame();
        this.startTimer();
        if(this.state.currentQuestionIndex !== 0){
            this.resetQuiz();
        }
    }
    resetQuiz = () => { 
        clearInterval(this.interval);
        this.showOptions();
        this.setState({
            showQuestions: "block",
            currentQuestionIndex: 0,
            currentQuestion: this.state.questions[0],
            nextQuestion: this.state.questions[0 + 1],
            answer: this.state.questions[0].answer,
            previousQuestion: undefined,
            endNumOfQuestions: 0,
            endNumOfAnsweredQuestions: 0,
            success: "",
            successMessage: "",
            score: 0,
            endScore: 0,
            showSummary: "dissapear 1s linear forwards",
            displayQuiz: "translateX(0) scale(1)",
            showConfetti: "none",
            questionDisplay: "translateX(0)"

        });
        this.startTimer();
    }
    handleOptionClick = (e) => {
        console.log(e.target.innerHTML.toLowerCase()); 

        this.setState({
            questionDisplay: "translateX(350%)",
            answeredQuestions: [...this.state.answeredQuestions, e.target.innerHTML.toLowerCase()]
        });
        setTimeout(() => {
            this.setState({
                questionDisplay: "translateX(0)"
            });
            this.setState(prevState => ({
                score: prevState.score + 1,
                currentQuestionIndex: prevState.currentQuestionIndex +1,
                numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
                answerMessage: ""
            }), () => {
                if(this.state.nextQuestion === undefined){
                    this.setState({
                        questionDisplay: "translateX(900%)"
                    });
                    this.end();
                } else {
                    this.displayQuestions(
                        this.state.questions,
                        this.state.currentQuestion,
                        this.state.nextQuestion,
                        this.state.previousQuestion
                    )
                }
            })
        }, 1000)
    }
    // THIS IS WHERE WE LIKELY SEND THE QUESTIONS BACK TO THE BACKEND
    submitQuiz = () => {
        // SEND THIS TO BACKEND TO BE CHECKED 
        console.log("answered questions", this.state.answeredQuestions);

        fetch("http://backendServer/api/quiz/answers", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(this.state.answeredQuestions)
            .then((result) => {
                if(result.json().wonQuiz === true){
                    console.log("Quiz Passed");
                    this.setState({
                        quizWon: true
                    })
                } else {
                    console.log("Quiz Failed");
                    this.setState({
                        quizWon: false
                    })
                }
            })
        })
    }

    // SHOW PLAYERS RESULTS
    end  = () => {
        const { state } = this;
        let playerResult = "failed";
        let successMessage = "Please try again!";

        console.log("answered questions", this.state.answeredQuestions);

        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
        };

        if(playerStats.score === playerStats.numberOfQuestions){
            playerResult = "passed"
            successMessage = "Well done, you can now move on!"
            setTimeout(() => {
                this.setState({
                    showConfetti: "block"
                });
            }, 2400)
        }
        this.setState({
            endScore: playerStats.score,
            endNumOfQuestions: playerStats.numberOfQuestions,
            endNumOfAnsweredQuestions: playerStats.numberOfAnsweredQuestions,
            endNumberOfCorrectAnswers: playerStats.correctAnswers,
            endNumberOfWrongAnswers: playerStats.wrongAnswers,
            success: playerResult,
            successMessage: successMessage,

        });
        setTimeout(() => {
            this.setState({
                showQuestions: "none",
                numberOfAnsweredQuestions: 0,
                currentQuestionIndex: playerStats.numberOfQuestions - 1,
                time: {
                    minutes: 0,
                    seconds: 0
                },
                showSummary: "appear 1s linear forwards",
                displayQuiz: "translateX(-100%) scale(0)",
            });
            clearInterval(this.interval);
            console.log(this.state);
        }, 100)
    }
    // Used when the user selects 'no' from the dialog menu to resume the quiz
    resumeQuiz = () => {
        console.log("pause state", this.state.time.seconds)
        this.setState({
            showDialog: "none",
            showOverlay: "none"
        });
        const currentTime = this.state.time.seconds + "000";
        const resumeTime = parseInt(currentTime) ;

        const countdownTime = Date.now() + resumeTime;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countdownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) /  (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000 );

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
    quitQuiz = () => {
        console.log("are you sure you want to quit this quiz?");
        this.setState({
            showDialog: "block",
            showOverlay: "block",
        });
        clearInterval(this.interval);
    }
    exitQuiz = () => {
        this.setState({
            showDialog: "none",
            showOverlay: "none",
            // homeAppear: "appear 1s linear forwards",
            displayQuiz: "translateX(0) scale(1)",

            quizShow: "none",
            quizScale: "0",
            showMainOverlay: "none",

            overlayVisibility: "hidden",
            overlayOpacity: 0
        });
        this.hideTargetElement();
    }
    returnHome = () => {
        this.setState({
            // homeAppear: "appear 1s linear forwards",
            showSummary: "dissapear 1s linear forwards",
            quizShow: "none",
            quizScale: "0",

            showMainOverlay: "none",

            overlayVisibility: "hidden",
            overlayOpacity: 0
        });
        this.hideTargetElement();
    }
    showTargetElement = () => {
        // ... some logic to show target element
     
        // 3. Disable body scroll
        disableBodyScroll(this.targetElement);
      };
     
      hideTargetElement = () => {
        // ... some logic to hide target element
     
        // 4. Re-enable body scroll
        enableBodyScroll(this.targetElement);
      };
    render(){
        const {
            currentQuestion, 
            currentQuestionIndex, 
            numberOfQuestions, 
            time,

            endScore,
            endNumOfQuestions,
            success,
            successMessage
        } = this.state;
        return (
            <React.Fragment>
                <div style = {{
                    position: "fixed", 
                    height: "100vh",
                    width: "100%",
                    background: "grey",
                    top: "0",
                    left: "0",
                    zIndex: "1000000000000000000",
                    transition: "1s all",

                    visibility: this.state.overlayVisibility,
                    opacity: this.state.overlayOpacity
                }}></div>
                <ContentWrapper onScroll = {this.handleScroll} style = {{animation: this.state.doesQuizExist}}>
                    <Home style = {{animation: this.state.homeAppear, background: this.props.quizColour}}>
                        <div className = "content-container">
                            <h1> Quiz </h1>
                            <div className = "button-container">
                                <button onClick = {this.startQuiz}>Start</button> 
                            </div>
                        </div>
                        <img src = {QuizImage1} className = "top-quiz-wave" />
                        <img src = {QuizImage2} className = "bottom-quiz-wave"/>
                    </Home>
                    <QuizAndSummaryContainer id = "quizAndSummary" style = {{height: this.state.quizScale}}>
                        <QuizContainer>
                            <div style = {{position: "relative"}}>
                            <DialogContainer style = {{display: this.state.showDialog, zIndex: "100000001"}}>
                                    <h1> Are you sure you want to quit the quiz? </h1>
                                    <button onClick = {this.exitQuiz}> Yes </button>
                                    <button onClick = {this.resumeQuiz}> No </button>
                                </DialogContainer>
                                <OverlayContainer style = {{display: this.state.showOverlay, zIndex: "100000000"}}/>


                                <Container style = {{background: this.props.quizColour}}>
                                    <span onClick = {this.quitQuiz} className = "quitQuiz" > X </span>
                                    <div className = "main-content-container">
                                        <p style = {{transform: this.state.questionDisplay}} className = "numberOfQuestionsContainer">
                                            <span className = "qNumber">
                                                Question {currentQuestionIndex + 1} of {numberOfQuestions}
                                            </span>
                                        </p>
                                        <H5 style = {{transform: this.state.questionDisplay}}> {currentQuestion.text} </H5>
                                        <OptionsContainer>
                                            {!!currentQuestion.answers && currentQuestion.answers.map((ans) =>
                                                <button style = {{transform: this.state.questionDisplay}} disabled = {!this.state.optionDisabled} className = "option" onClick = {this.handleOptionClick}> {ans.text}</button>
                                            )}
                                        </OptionsContainer>
                                        <LifelineContainer style = {{transform: this.state.questionDisplay}}>
                                            <p>
                                                <span className = "timer help-icon"></span>
                                                <span className = "">{time.minutes}:{time.seconds}</span>
                                            </p>
                                        </LifelineContainer>
                                    </div>
                                    <TimeMessage style = {{transform: this.state.showTimeMessage}}>
                                        <h1> Time is Running Out! </h1>
                                    </TimeMessage>
                                </Container>
                            </div>
                        </QuizContainer>
                        <SummaryContainer style = {{animation: this.state.showSummary}}>
                            <Summary
                                    quizColour = {this.props.quizColour}
                                    score = {endScore}
                                    numOfQuestions = {endNumOfQuestions}
                                    success = {success}
                                    successMessage = {successMessage}
                                    playAgain = {this.resetQuiz}
                                    homeReturn = {this.returnHome}
                                    showConfetti = {this.state.showConfetti}

                                    style = {{background: this.props.quizColour}}
                                />
                        </SummaryContainer>
                    </QuizAndSummaryContainer>
                </ContentWrapper>
            </React.Fragment>
        )
    }
}


const ContentWrapper = styled.div`
    // position: relative;
    overflow: hidden;
    height: 40vh;
    @media only screen and (max-width: 580px){
        height: 60vh;
    }
`
/* HOME PAGE STYLES */ 
const Home = styled.div`
    position: absolute;
    width: 100%; 
    left:0;
    top: 0;
    z-index: 10001;
    color: white;
    position: relative;
    overflow: hidden;
    transition: 1.6s;
    height: 40vh;

    .content-container{
        display: flex;
        align-items: center;
        h1{
            font-size: 4.5em;
            font-weight: 800;
            text-align: left;
            font-family: dosis;
            color: white;
            width: 40%;
            margin: 0 auto;
            @media only screen and (max-width: 430px){
                font-size: 7em;
                font-weight: 800;
                width: 100%;
                text-align: center;
            }
            @media only screen and (max-width: 800px) and (min-width: 430px){
                font-size: 8em;
                text-align: center;
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
        .button-container{
            width: 40%;
            text-align: center;
            button{
                border: 4px solid white;
                cursor: pointer;
                background: linear-gradient(90deg,rgba(11,146,191, 0.5),rgba(42,181,227, 0.5));
                border-radius: 8px;
                font-size: 2.2em;
                padding: 20px 50px;
                color: white;
                transition: .4s all;
                font-weight: 600;
                &:hover{
                    background: linear-gradient(90deg,rgba(11,146,191, 1),rgba(42,181,227, 1));
                }
                @media only screen and (max-width: 430px){
                    width: 100%;
                    padding: 10px 40px;
                }
                @media only screen and (max-width: 800px) and (min-width: 430px){
                    font-size: 2.2em;
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
            @media only screen and (max-width: 580px){
                margin: 0 auto;
            }
        }
        @media only screen and (max-width: 1400px) and (min-width: 430px){
            width: 100%;
            height: 40vh;
        }
        @media only screen and (max-width: 560px) and (min-width: 430px){
            display: block;
        }
        @media only screen and (max-width: 430px){
            display: block;
            height: 60vh;
        }
    }
    .top-quiz-wave{
        position: absolute;
        top: -5%;
        right: 0;
        width: 500px;


        display: none;


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
        display: none;

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
        height: 60vh;
    }
    @media only screen and (max-width: 3000px) and (min-width: 430px){
        height: 60vh;
    }
`
const QuizAndSummaryContainer = styled.div`
    position: fixed;
    height: 82vh;
    width: 88%;
    top: 50%;
    left: 50%;
    z-index: 99999999999999999999;
    transform: translate(-50%, -50%);
    border-radius: 8px; 

    // display: none;
    transition: .7s all;
    overflow: hidden;
    @media only screen and (max-width: 576px){
        width: 100%;
        height: 100vh;
        border-radius: 0;
    }
`
/* MAIN QUIZ STYLES */
const QuizContainer = styled.div`
    // position: absolute;
    // top: 0;
    // left: 0;
    // width: 100%;
    // z-index: 2;
    // transition: 1.2s all;
    // height: 100vh;
    z-index: 999999999999999999999999999;
`
const Container = styled.div`
    width: 97.15%;
    padding: 14px;
    transition: 1.2s all;
    color: white;
    height: 82vh;
    z-index: 100000;
    position: relative;
    @media only screen and (max-width: 580px){
        height: 100vh;
        padding: 0;
        width: 100%;
    }


    .main-content-container{
        top: 30%;
        position: absolute;
        transform: translateY(-30%);
        @media only screen and (max-width: 574px){
            width: 100%;
            height: 100vh;
            top: 38%;
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
            top: 44%;
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
                font-size: 1em;
            }
            @media only screen and (max-width: 1500px) and (min-width: 1050px){
                font-size: 1.4em;
            }
            @media only screen and (min-width: 1500px) and (max-width: 2000px){
                font-size: 1.5em;
            }
            @media only screen and (min-width: 2000px){
                font-size: 2.8em;
            }
        }
    }
    // @media only screen and (max-width: 7000px){
    //     height: 100vh;
    //     width: 100%;
    //     padding: 0;
    // }
`
const OverlayContainer = styled.div`
    position:absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.35;
    background: black;
    z-index: 6665;
    transition: .6s all;
    display: none;
`
const DialogContainer = styled.div`
    transform: translate(-50%,-50%);
    position: absolute;
    width: 30%;
    padding: 40px 20px;
    background: white;
    color: black;
    top: 50%;
    left: 50%;
    text-align: center;
    z-index: 6666;
    border-radius: 10px;
    h1{
        font-size: 1.4em;
        color: black;
        font-weight: 600;
        font-family: sans-serif;
        @media only screen and (max-width: 800px) and (min-width: 430px){
            font-size: 1.6em
        }
        @media only screen and (min-width: 800px) and (max-width: 1100px){
            font-size: 1.8em;
        }
        @media only screen and (min-width: 1100px) and (max-width: 2000px){
            font-size: 2.2em;
        }
        @media only screen and (min-width: 2000px){
            font-size: 2.8em;
        }
    }
    button{
        width: 35%;
        margin: 10px;
        border-radius: 5px;
        border: none;
        padding: 10px;
        cursor: pointer;
        background: #e8e8e8;
        font-size: 1.1em;
        @media only screen and (max-width: 110px) and (min-width: 430px){
            font-size: 1.2em;
            width: 40%;
            padding: 16px;
        }
        @media only screen and (min-width: 1100px) and (max-width: 2000px){
            font-size: 1.4em;
        }
        @media only screen and (min-width: 2000px){
            font-size: 1.7em;
            padding: 20px;
        }
    }
    @media only screen and (max-width: 430px){
        width: 80%;
    }
    @media only screen and (max-width: 800px) and (min-width: 430px){
        width: 60%;
    }
    @media only screen and (min-width: 800px) and (max-width: 1100px){
        width: 48%;
    }
    @media only screen and (min-width: 1100px) and (max-width: 2000px){
        width: 40%;
    }
    @media only screen and (min-width: 2000px){
        width: 35%;
    }
`
const LifelineContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    transition: 1s all;
    margin: 0 auto;
    color: white;
    margin-top: 30px;
    p{
        padding: 14px 20px;
        position: relative;
        text-align: center;
        background: rgba(71,187,230,0.6);
        margin: 0 8px;
        border-radius: 4px;
        margin: 0 auto;
        span{
            color: white;
            &:nth-child(1){
                @media only screen and (max-width: 1050px) and (min-width: 574px){
                    margin-right: 8px;
                }
                @media only screen and (max-width: 1500px) and (min-width: 1050px){
                    margin-right: 10px;
                }
            }
            @media only screen and (max-width: 1500px) and (min-width: 1050px){
                font-size: 1.3em;
            }
        }
        &:nth-child(1){
            flex-grow: 1.5;
            @media only screen and (max-width: 800px) and (min-width: 430px){
                flex-grow: 0.8;
            }
            @media only screen and (max-width: 1050px) and (min-width: 800px){
                flex-grow: 0.7;
            }
            @media only screen and (min-width: 1050px) and (max-width: 1500px){
                flex-grow: 0.5;
            }
            @media only screen and (min-width: 1500px) and (max-width: 2000px){
                flex-grow: 0.6;
            }
            @media only screen and (min-width: 2000px){
                flex-grow: 0.7;
            }
        }
        @media only screen and (max-width: 1050px) and (min-width: 574px){
            font-size: 1.2em;
            padding: 16px 12px;
        }
        @media only screen and (max-width: 1500px) and (min-width: 1050px){
            padding: 25px 40px;

            font-size: 1.2em;
        }
        @media only screen and (min-width: 1500px) and (max-width: 2000px){
            font-size: 1.8em;
            padding: 18px 40px;
        }
        @media only screen and (min-width: 2000px){
            font-size: 2.6em;
            padding: 30px 50px;
        }
    }
    @media only screen and (max-width: 800px) and (min-width: 574px){
        width: 60%;
        margin-top: 20px;
    }
    @media only screen and (max-width: 1050px) and (min-width: 800px){
        margin-top: 60px;
        width: 100%;
    }
    @media only screen and (min-width: 1050px) and (max-width: 1500px){
        margin-top: 30px;
        width: 100%;
    }
    @media only screen and (min-width: 1500px) and (max-width: 2000px){
        width: 100%;
        margin-top: 30px;
    }
    @media only screen and (min-width: 2000px){
        width: 66%;
        margin-top: 40px;
    }
`
const H5 = styled.h5`
    font-size: 2em;
    margin-bottom: 20px;
    line-height: 1.35em;
    text-align: center;
    padding: 0 20px;
    transition: 1s all;
    color: white;
    margin-top: 20px;
    @media only screen and (max-width: 800px) and (min-width: 574px){
        font-size: 1.85em;
        margin-top: 30px;
    }
    @media only screen and (max-width: 1050px) and (min-width: 800px){
        font-size: 2.1em;
        margin-top: 20px;
    }
    @media only screen and (min-width: 1050px) and (max-width: 1500px){
        font-size: 2.5em;   
        margin-top: 20px;
    }
    @media only screen and (min-width: 1500px) and (max-width: 2000px){
        font-size: 2.9em;
        margin-top: 10px;
    }
    @media only screen and (min-width: 2000px){
        font-size: 4.2em;
        margin-top: 20px;
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
            font-size: 1.1em;
        }
        @media only screen and (min-width: 1050px) and (max-width: 1500px){
            padding: 20px;
            font-size: 1.45em;
        }
        @media only screen and (min-width: 1500px) and (max-width: 2000px){
            font-size: 1.6em;
            padding: 22px;
        }
        @media only screen and (min-width: 2000px){
            font-size: 2.6em;
            padding: 40px;
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
        width: 86%;
        grid-template-rows: repeat(2, 50%);
        grid-gap: 16px;
        margin-top: 22px;
    }
    @media only screen and (min-width: 1500px) and (max-width: 2000px){
        width: 76%;
        grid-gap: 16px;
        margin-top: 22px;
    }
    @media only screen and (min-width: 2000px){
        grid-gap: 60px;
        margin-top: 60px;
    }
`
const TimeMessage = styled.div`
    position: absolute;
    bottom: 5%;
    width: 100%;
    transition: .3s all;
    h1{
        font-weight: 800;
        font-size: 2.8em;
    }
`

const SummaryContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 9999999999999999999999999991;
`
export default Quiz;
