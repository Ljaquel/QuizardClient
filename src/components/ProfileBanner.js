import { Component } from "react";
import { AuthContext } from '../context/auth'



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