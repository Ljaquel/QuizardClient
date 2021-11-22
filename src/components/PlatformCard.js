import React from 'react';
import { Link } from "react-router-dom";
import '../styles/QuizCard.css'
import {Image} from 'cloudinary-react'

function PlatformCard({ platform }) {
  return (
    <Link to={`/platform/${platform._id}`} className="searchScreencardDiv card-subtitle text-muted" >
      <div className="p-2 border border-3 border-secondary rounded ">
        <Image cloudName="ljaquel"  width="100" publicId={platform.image.publicId} className='me-2'/>
        <span>{platform.name}</span> 
        <p className="card-text" style={{fontSize: "13px"}}>{platform.description.length < 70 ? platform.description : "Description..."}</p>
      </div>
    </Link>
  )
}

export default PlatformCard;