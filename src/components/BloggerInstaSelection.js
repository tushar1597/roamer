import React, { Component } from 'react';
import $ from 'jquery';
import 'font-awesome/css/font-awesome.min.css';
import tick from '../images/tick.png';
import "../styles/instaGallery.css";
import roamerOnly from '../images/roamer_only.png';
import loading from '../images/load.gif';
import "../styles/BloggerSelection.css";
import AddContentModal from "../components/addContentModal";
import demo1 from '../images/1.jpg';
import demo2 from '../images/2.jpg';
import demo3 from '../images/3.jpg';

class BloggerInstaSelection extends Component{
  constructor(props){
    super(props);
    this.redirect_to_selected_img = this.redirect_to_selected_img.bind(this);
    this.getSelectedImage = this.getSelectedImage.bind(this);
    this.slideUp = this.slideUp.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
    this.addComment = this.addComment.bind(this);
    this.state={
      imgClicked:false,
      selectedImgURL:null,
    }
  }

slideUp(){
  $('#additional-div-id').show();
  //$(window).scrollTop($('#addContentFormId').offset().top);
  $('html,body').animate({
           scrollTop: $("#addContentFormId").offset().top},
           'slow');
}
setDisplay(){
  console.log("h1");
    $('#additional-div-id').hide();
}

redirect_to_selected_img(imgURL){
  this.setState(
    {
      selectedImgURL:imgURL,
    }
  )
}

addComment(e){
  e.preventDefault();
  
}

componentDidMount(){
  /*If the slideshow screen appears*/
  if($("body").find(".active").length!=0){
    this.getSelectedImage();
  }

}

getSelectedImage(){
    let e = $(".active");
    let selected_img_url= e.children([0]).prop("src");
     console.log(selected_img_url);
     /*here we could get the location from the database and change according to the image*/
}

  render(){
    /*This displays the instagram selected images on the slideshow*/
    if(this.state.selectedImgURL==null){
    const imgTags = this.props.selectedImgURLS.map((url,index) =>{

      let imgid = "instaimg"+index.toString();
      let imgsubcontainerid = "instaimgsubcontainer"+index.toString();
      let imgcarouselid = "imgcarousel"+index.toString();
      if(index==0)
      {
        return(
          <div key={imgcarouselid} className="carousel-item  active">
            <img className="d-block w-100" src={url} alt="Loading"/>
          </div>
        )
      }
      else{
      return (

          <div key={imgcarouselid} className="carousel-item">
            <img className="d-block w-100" src={url} alt="Loading"/>
          </div>
      )}
    });



    const liTags = this.props.selectedImgURLS.map((url,index)=>{
      let liTagId = "liCarousel"+index.toString();
      return(
        <li key={liTagId} data-target="#carouselExampleIndicators" data-slide-to={index}></li>
      )
    })

    return (
      <div>
      <div className="container-fluid selected-img-header" id="entire-content-id">
        <img className="roamerOnly" src={roamerOnly}/>
      </div>

      <div className="container-fluid padding-null" >
      <button type="button" id="continue-btn-id" className="ig-continue-btn" >Continue</button><br className="break-style-1"/>
      <p className="ig-header-content" >Add location, travel tips and URLS</p>
      <button type="button" id="add-location-id" className="add-location-btn"  data-toggle="modal" data-target="#addContentModal">Add Location</button>
        <AddContentModal/>
{/*carousel slide show==============================================================================*/}
      <div id="carouselExampleIndicators" className="carousel carousel-custom slide" data-ride="carousel" data-interval={false}>
        <ol className="carousel-indicators">
          {liTags}
        </ol>
        <div className="carousel-inner">

              {imgTags}
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" onClick={this.getSelectedImage}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" onClick={this.getSelectedImage}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
{/*=======================================================================================================*/}

      </div>

      <form className="addContentForm"  id="addContentFormId">
        <input type="text" className="addContentInput" id="addContentInputId" placeholder="Write a comment..." onBlur={this.setDisplay} onMouseUp={this.slideUp}/>
        <button type="submit" className="post-btn" onClick={this.addComment}>Post</button>
      </form>
      <div className="additional-div" id="additional-div-id"/>
      </div>
    )
  }
  /*When any image is clicked===========================================================
  else if(this.state.selectedImgURL!=null){
    console.log(this.state.selectedImgURL.url);
    return(
    <div>
    <div className="container-fluid roamer-header-instagallery"><img className="logo-style-instagallery" src={roamerOnly}/>
    <button type="button" id="continue-btn-id" className="ig-continue-btn" >Continue</button>
    <p className="ig-header-content" >Add location, travel tips and URLS</p>
    </div>
    <div className="container-fluid selected-content-container">
    <button type="button" id="add-location-id" className="add-location-btn"  data-toggle="modal" data-target="#addContentModal">Add Location</button>
    <img className="selected-img-style container-fluid" src={this.state.selectedImgURL.url}/>
    <AddContentModal/>
    </div>
    </div>

  )
  }
*/
}
}

export default BloggerInstaSelection
