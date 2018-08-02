import React from "react";
import "./ImageCard.css";
// import Btn from "../Btn";

const ImageCard = props => (
        <div className="imageCard">
            <img 
                src = {props.photo ? props.photo : "https://instantedgemarketing.com/wp-content/uploads/2016/10/bigstock-Question-Mark-Asking-Confusion-108659435.jpg"}
                alt = "Global"
                user = {props.user}
                caption = {props.caption}
                likes = {props.likes}
                liked = {props.liked}
            />
            <button className="btn like" type="button" onClick={() => props.handleLikeClick(props.id)}><i className="far fa-heart fa-3x"></i></button>
        </div>
                // {/* <div className = "imageProps">
                    // <div className = "caption">
                    //     <h5>{props.caption}</h5>
                    // </div>
                    // <div className = "user">
                    //     <h5>Posted By {props.user}</h5>
                    // </div>
                    // <div className = "like-amount">
                    //     <h5>Likes {props.likes}</h5>
                    // </div>
                // </div> */}
);

export default ImageCard;