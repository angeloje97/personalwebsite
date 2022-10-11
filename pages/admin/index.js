import { useRouter } from "next/router";
import Input from "../../src/components/elements/Input";
import Button from "../../src/components/elements/Button";
import style from "./admin.module.css";
import CardHeader from "../../src/components/cards/CardHeader";
import Card from "../../src/components/cards/Card";
import React, { useEffect, useState } from "react";
import { authActions } from "../../src/store/auth";
import { useDispatch, useSelector } from "react-redux";

const Admin = () => {
  return (
    <React.Fragment>
      <LoginForm />
    </React.Fragment>
  );
};

const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/login", {
      method: "PUT",
      body: JSON.stringify({
        username: name.trim(),
        password: password.trim(),
      }),
      "Content-Type": "Application/json",
    });
    const data = await response.json();

    if (!response.ok) {
      handleIncorrectUserName(data);
      return;
    }

    handleSuccessful(data);
  };

  const handleSuccessful = (data) => {
    dispatch(authActions.login(data.body));
    router.push("/");
  };
  const handleIncorrectUserName = (data) => {};

  if (isAuthenticated) {
    return (
      <Card className={`${style.card}`}>
        <div className={style.singleCard}>
          <h3>Already Logged In</h3>
          <Button>Change Password</Button>
          <Button>Logout</Button>
        </div>
      </Card>
    );
  }
  return (
    <CardHeader
      className={style.card}
      header={<h3>Admin</h3>}
      headertype="centered"
      bodytype="centered"
    >
      <form onSubmit={handleSubmit} className={style.form}>
        <Input
          type="username"
          id="username"
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="Username"
        ></Input>
        <Input
          type="password"
          id="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Password"
        ></Input>
        <Button type="submit">Login</Button>
      </form>
    </CardHeader>
  );
};

export default Admin;
