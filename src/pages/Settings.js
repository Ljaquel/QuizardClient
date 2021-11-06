import React, { useContext, useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { GET_USER, UPDATE_USER, CHANGE_PASSWORD } from "../Calls";
import SettingsSidebar from "../components/settings/SettingsSidebar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import { useForm } from "../hooks/useForm";
import Loading from "../components/Loading";

const Settings = () => {
  const { user } = useContext(AuthContext);
  const [isEdited, setIsEdited] = useState(false);
  const [updateUserFields, { data: updatedUser }] = useMutation(UPDATE_USER);
  const [changePassword, { data: status }] = useMutation(CHANGE_PASSWORD);
  const {
    data: userData,
    loading,
    // error,
  } = useQuery(GET_USER, {
    variables: { userID: user._id },
  });
  const [{ fields: userFields }, { handleChange: handleUserFieldChange }] =
    useForm({
      email: userData.email,
      username: userData.username,
    });
  const [
    { fields: passwordFields },
    { handleChange: handlePasswordFieldChange },
  ] = useForm({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleToggleSettings = (e) => {
    setIsEdited(!isEdited);
  };
  const handleUserChange = (e) => {
    e.preventDefault();
    updateUserFields({ variables: userFields });
    console.log(updatedUser);
  };
  const handlePasswordChange = (e) => {
    e.preventDefault();
    changePassword({ variables: passwordFields });
    console.log(status);
  };
  useEffect(() => {}, []);
  if (loading) return <Loading />;
  return (
    <Container fluid>
      <Row>
        <Col md={2} lg={2}>
          <SettingsSidebar />
        </Col>
        <Col md={10} lg={10}>
          <Row>
            <div>
              <Button variant="primary" onClick={handleToggleSettings}>
                <PencilSquare />
              </Button>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label> Email </Form.Label>
                  <Form.Control
                    readOnly={!isEdited}
                    type="email"
                    placeholder="Enter email"
                    defaultValue={userFields.email}
                    onChange={handleUserFieldChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label> Username </Form.Label>
                  <Form.Control
                    readOnly={!isEdited}
                    type="text"
                    placeholder="Username"
                    defaultValue={userFields.username}
                    onChange={handleUserFieldChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleUserChange}
                >
                  Save
                </Button>
              </Form>
            </div>
          </Row>
          <br />
          <Row>
            <div>
              {isEdited ? (
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Current Password </Form.Label>
                    <Form.Control
                      id="currentPassword"
                      type="password"
                      placeholder="Current Password"
                      onChange={handlePasswordFieldChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label> New Password </Form.Label>
                    <Form.Control
                      id="newPassword"
                      type="password"
                      placeholder="New Password"
                      onChange={handlePasswordFieldChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label> Confirm Password </Form.Label>
                    <Form.Control
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      onChange={handlePasswordFieldChange}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handlePasswordChange}
                  >
                    Save
                  </Button>
                </Form>
              ) : null}
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
