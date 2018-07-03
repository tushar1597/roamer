import React, { Component } from 'react';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router,Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import InstaGallery from './components/InstaGallery';
import LandingPage from './components/LandingPage';
import logo from './logo.png';
import BloggerInstaSelection from './components/BloggerInstaSelection';
import BlogURL from './components/BlogURL';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoggedIn:false,
      accessToken:'',
      selectedInstaAccountId:null,
      isPolicyAccepted:false,
      selectedImgURLS:null,
      isBlogURL:false,
    }
    this.setAppState = this.setAppState.bind(this);
    this.setInstaAccountId = this.setInstaAccountId.bind(this);
    this.setPolicyAccepted = this.setPolicyAccepted.bind(this);
    this.setSelectedImages = this.setSelectedImages.bind(this);
    this.setIsBlogURL=this.setIsBlogURL.bind(this);
   }

  setAppState(isLoggedIn,accessToken){
    this.setState(
      {
        isLoggedIn,
        accessToken,
      }
    );

  }

  setInstaAccountId(selectedInstaAccountId){
    //console.log("in app",selectedInstaAccountId);
    this.setState({selectedInstaAccountId,}
  )

  }

  setSelectedImages(selectedImgURLS){
      this.setState({selectedImgURLS,})
  }

  setIsBlogURL(isBlogURL){
    this.setState({
      isBlogURL,
    })
  }

  setPolicyAccepted(){
    this.setState({
      isPolicyAccepted:true,
    })
  }

  render() {
    return (
      <div>
        <Router>
        <div>

        <Route path="/instaGallery" exact strict render={
          ()=>{
              if(localStorage.getItem('isBlogURL')=='true'){
                const url = "https://graph.facebook.com/"+localStorage.getItem('instaAccount')+"/media?access_token="+localStorage.getItem('accessToken');
            return (
              <div>

              <InstaGallery accessToken={this.state.accessToken} url={url} setSelectedImages={this.setSelectedImages}/>
              </div>
            );
          }
          else{
            return(
              <div>
              <BlogURL setIsBlogURL={this.setIsBlogURL}/>
              </div>
            )
          }
        }
        }/>

        <Route path="/" exact strict render={
          ()=>(
            (localStorage.getItem('isPolicyApproved')!='true') ? <LandingPage setPolicyAccepted={this.setPolicyAccepted} setAppState={this.setAppState} setInstaAccountId={this.setInstaAccountId}/> : (<Redirect to="/instaGallery" />)
          )
        }/>

        <Route path="/selectedImages" exact strict render={
          ()=>{
            if(this.state.selectedImgURLS!=null){
            return (
              <BloggerInstaSelection selectedImgURLS={this.state.selectedImgURLS}/>
            )}
            else{
              return(
              <h1>Hello</h1>)
            }
          }

        }/>

        </div>
        </Router>
      </div>
    );
  }
}

export default App;
