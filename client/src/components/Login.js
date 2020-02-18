import React, {useState} from "react";
//import "./login.css"
import '../styles/login.css'


//import Checkbox from "./Checkbox"


//import {Button,FormControl,FormGroup,FormLabel} from "react-bootstrap";

function Login(props){

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const staticEmail = "abc@gmail.com";
      const staticPassword = "12345";

    function validateForm(){
       return email.length > 0 && password.length>0;
    }

    function handleSubmit(event){
        event.preventDefault();
    }
    

    function emailChange(e){
        setEmail(e.target.value)
    }
    function passwordChange(e){
        setPassword(e.target.value)
        console.log(password);
  }

    function buttonClick(event){
        event.preventDefault();
       if(
           password === staticPassword
                    &&
           email===staticEmail 
         ){
           console.log("Working");
           props.setAuthentication(true)
          }
       else{
           console.log("not working");
           alert("enter correct details")
           
     }
    }

    
    
    

    return(
    
    
      <div id="loginBoard">
          <div id="header">
          
          <img src={require('../icons/block8.png')} id="logo_img" alt="User"></img>
          <h4>&nbsp;&nbsp;LMS | LOGIN</h4>
          </div>
          <form onSubmit = {handleSubmit}  >
              
    
              
          <div className="groupfield">
            <input type="text" 
              placeholder ="Email" 
              onChange = {emailChange}/>
          </div>
              
          <div className="groupfield">
           <input 
              id = "passwordmask"
              type="password" 
              placeholder ="Password"
              onChange={passwordChange}/>
          </div>
              
        <div id="buttonA">
              <input id = "check" type ="checkbox" name ="check1"  /> <span>Remember me</span> <br/>
              <a href="/">Forgot Password</a><br/><br/>
              <button onClick ={buttonClick} 
                block bsSize="large" 
                disabled={!validateForm()} 
                type="submit">
                Log in
              </button>

        </div>
              
        
      
      
              
              
              
          </form>
      </div>
    ); 

}

export default Login;