import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { GET_USER } from "../../Calls";
import { AuthContext } from "../../context/auth";
import { Container } from "react-bootstrap";

const SettingsSidebar = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useQuery(GET_USER);
  return (
    <div>
      <div>
        <h4>{user.username}</h4>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default SettingsSidebar;
