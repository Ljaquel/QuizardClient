import { Component } from "react";
import { AuthContext } from '../context/auth'
import React, { useContext } from 'react'



class ProfileBanner extends Component{
      
      render(){
            
            return(
                  <div>
                        <h1>{this.props.username}</h1>
                  </div>
            )
      }
}

export default ProfileBanner