import React from "react";
import styled from "styled-components"; 

class Banner extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <HalfwayBanner>
                {!!this.props.bannerOne && this.props.bannerOne.map((banner) =>
                    <div style = {{background: banner.colour}} key = {banner.id}>
                        <h1> {banner.text} </h1>
                        <p> {banner.desc} </p>
                    </div>
                )}
                {!!this.props.bannerTwo && this.props.bannerTwo.map((banner) =>
                    <div style = {{background: banner.colour}} key = {banner.id}>
                        <h1> {banner.text} </h1>
                        <p> {banner.desc} </p>
                    </div>
                )}
            </HalfwayBanner>
        )
    }
}
const HalfwayBanner = styled.div`
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    div{
        padding: 30px 40px;
        @media only screen and (min-width: 1900px) and (max-width: 2350px){
            padding: 40px 50px;
        }
        @media only screen and (min-width: 2350px){
            padding: 50px 60px;
        }
    }
    h1{
        width: 100%;
        font-size: 4em;
        line-height: 1.2em;
        color: white;
        font-weight: 800;
        width: 90%;
        margin-bottom: 12px;
        @media only screen and (min-width: 1900px) and (max-width: 2350px){
            font-size: 7em;
        }
        @media only screen and (min-width: 2350px){
            font-size: 6em;
        }
        @media only screen and (max-width: 600px) and (min-width: 500px){
            font-size: 3.6em;
        }
        @media only screen and (max-width: 500px) and (min-width: 400px){
            font-size: 3.4em;
        }
        @media only screen and (max-width: 400px){
            font-size: 2.4em;
        }
    }
    p{
        color: white;
        font-size: 1em;
        width: 70%;
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
`
export default Banner;