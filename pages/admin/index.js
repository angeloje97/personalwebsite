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
  const [data, setData] = useState({ username: "", password: "" });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, password } = data;

    const response = await fetch("/api/login", {
      method: "PUT",
      body: JSON.stringify({
        username: username.trim(),
        password: password.trim(),
      }),
      "Content-Type": "Application/json",
    });
    const responseData = await response.json();

    if (!response.ok) {
      handleIncorrectUserName(responseData);
      return;
    }

    handleSuccessful(responseData);
  };

  const handleSuccessful = (data) => {
    dispatch(authActions.login(data.body));
    router.push("/");
  };

  const updateData = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    setData((prev) => {
      const newData = { ...prev };
      newData[id] = value;
      return newData;
    });
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
          value={data.username}
          onChange={updateData}
          placeholder="Username"
        ></Input>
        <Input
          type="password"
          id="password"
          value={data.password}
          onChange={updateData}
          placeholder="Password"
        ></Input>
        <Button type="submit">Login</Button>
      </form>
    </CardHeader>
  );
};

export default Admin;
