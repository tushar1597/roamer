import React from "react";
import RoamerLogo from "./RoamerLogo.png";
import turtle from "./turtle.png";
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';
import "./Roamer_login_page.css";

export class Login extends React.Component {
    render(){
        return(
            <div className='divBackground'>
                <img className="LogoStyle centerMe" src={RoamerLogo} alt="Turtle logo"/>
                <h4 className="textStyle">VISUAL SEARCH FOR TRAVEL BLOGS</h4>
                <div>
                    <a href="#"><img className="turtleStyle centerMe" src={turtle} alt="turtle"/></a>
                </div>
                <h5 className="textStyle" style={{marginTop:`4%`}}>Tap the Turtle to Start Roaming</h5>
                <button className="btn btn-primary centerMe" style={{marginTop:`2%`,marginBottom:`2%`}}><strong>Create a Roamer Account</strong></button>
                <h4 className='textStyle'>Sign up to share your travel blog*.</h4>
                <button className='btn btn-primary centerMe' style={{marginTop:`2%`}}><strong>Sign up with Instagram</strong></button>
                <h5 className='textStyle'>*Instagram business account only</h5>
            </div>
        );
    }
}
export default Login;