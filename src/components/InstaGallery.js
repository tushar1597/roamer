import React, { Component } from 'react';
import $ from 'jquery';
//import '../styles/style.css'; //two dots to go one level up
import 'font-awesome/css/font-awesome.min.css';
import tick from '../images/tick.png';
import "../styles/instaGallery.css";
import roamerOnly from '../images/roamer_only.png';
import loading from '../images/load.gif';
import BloggerInstaSelection from './BloggerInstaSelection';
import { BrowserRouter as Router,Redirect} from 'react-router-dom';

class InstaGallery extends Component{
  constructor(props){
    super(props);
    this.state={
      mediaID:null,
      mediaIDArray:null,
      imgURLS:null,
      selectedImgURLS:null,
    }

    this.pushInArray = this.pushInArray.bind(this);
    this.displayTick = this.displayTick.bind(this);
    this.setSelectedImages = this.setSelectedImages.bind(this);
    this.makeResponsive = this.makeResponsive.bind(this);
  }

  makeResponsive(){
    alert("Tushar");
    let width = $("instaimgcontainer0").width();
    $('.insta-img-container').css({height:width});
    $('.insta-img-style').css({height:width});
    $('.insta-img-subcontainer').css({height:width});

  }


pushInArray(){
  var mediaID = [];
  var imageURLS = [];
  for(let i=0;i<this.state.mediaID.data.length;i++){
    mediaID.push(this.state.mediaID.data[i].id);
  }
  this.setState({
    mediaIDArray:mediaID,
  })
  console.log(this.state.mediaIDArray);
for(let i=0;i<this.state.mediaIDArray.length;i++)
{
  $.ajax({
          type: 'GET',
          url: 'https://graph.facebook.com/'+this.state.mediaIDArray[i]+'/?fields=media_url&access_token='+localStorage.getItem('accessToken'),
          dataType: 'json',
          success: function(res){
            imageURLS.push(res.media_url);
          },
          error:function(err){ alert(err);},
          async: false
      });
}


this.setState({
        imgURLS:imageURLS,
      })
    console.log("Image URLS");
    console.log(this.state.imgURLS);
}

/*SetSelectedImages function======================================================================*/
/*To get all the selected images url=============================================================*/
setSelectedImages(){

  let selectedImages = [];
  for(let i=0;i<this.state.imgURLS.length;i++){
    let id='tick'+i.toString();
    if(document.getElementById(id).style.display=='block'){
      let imgid = 'instaimg'+i.toString();
      selectedImages.push(document.getElementById(imgid).style.backgroundImage.slice(4, -1).replace(/"/g, ""));
    }
  }
  console.log("selected Images");
  console.log(selectedImages);
  this.setState(
    {
      selectedImgURLS:selectedImages,
    }
  )
}

displayTick(ind){
let tickElement = document.getElementById(ind);
if(tickElement.style.display=='none'){
  tickElement.style.display='block';
}
else{
  tickElement.style.display='none';
}

}

componentWillMount(){


    $.getJSON(this.props.url, function(data) {

      this.setState({
        mediaID:data,
      })
      console.log(data);
      console.log(this.state.mediaID);
      this.pushInArray();
  }.bind(this));

}

componentDidMount(){ //error
  if(document.getElementById('instaimg0')){
    alert(("#instaimg0").length);
    let width = $("instaimgcontainer0").width();
    $('.insta-img-container').css({height:width});
    $('.insta-img-style').css({height:width});
    $('.insta-img-subcontainer').css({height:width});
  }
}





  render(){
/*Insta-Gallery View====================================================================================*/
    if(this.state.imgURLS!=null && this.state.selectedImgURLS==null){
      {
      //all the img tags
      console.log("UUUUUUUU",this.state.imgURLS);
      let count
      const imgTags = this.state.imgURLS.map((url,index) =>{

        let imgid = "instaimg"+index.toString();
        let imgcontainer = "instaimgcontainer"+index.toString();
        let tickid = "tick"+index.toString();
        return (
              <div className= "col-sm-3 col-3 insta-img-container"><div className="insta-img-subcontainer" id={imgcontainer} key={imgcontainer}><div style={{backgroundImage: `url(${url})`,backgroundSize:"100% 100%",backgroundRepeat:"no-repeat"}} key={imgid} id={imgid} className="insta-img-style" onClick={() => this.displayTick(tickid)}><img src={tick} id={tickid} style={{display:'none',}} className="selectedImg"/></div></div></div>
        )
      });
      console.log(imgTags);



    return (
      <div>
      <div className="container-fluid roamer-header-instagallery"><img className="logo-style-instagallery" src={roamerOnly} mouseEnter={this.makeResponsive}/>
      <button type="button" id="continue-btn-id" className="ig-continue-btn" onClick={this.setSelectedImages}>Continue</button>
      <p className="ig-header-content-1" >Tap to select images to share in Roamer</p>
      </div>

      <div className="container-fluid margin-padding-null">

      <div className="row">
      {imgTags}
      </div>
      </div>
      </div>
    )
  }

}

/*Loading View=====================================================================================================*/
  else if(this.state.imgURLS==null && this.state.selectedImgURLS==null)
  {
    return(
      <div>
      <div className="container-fluid roamer-header-instagallery"><img className="logo-style-instagallery" src={roamerOnly}/>
      <button type="button"  id="continue-btn-id" className="ig-continue-btn">Continue</button>
      <p className="ig-header-content-1">Tap to select images to share in Roamer</p>
      </div>
      <img className="loading" src={loading}/>
      </div>
    )
  }
/*Rendering the BloggerInstaSelection component===================================================*/
  else{
    this.props.setSelectedImages(this.state.selectedImgURLS);
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(this.state.selectedImgURLS);
    /*render the component when the images are fetched========================*/
    if(this.state.selectedImgURLS !== null){
      return (

        <Redirect to="/selectedImages" />



    )
    }
    /*Till the images are not fetched =========================================*/
    else{
      return (
        <h1>Images selected </h1>
      )
    }

  }


  }
}

export default InstaGallery;
