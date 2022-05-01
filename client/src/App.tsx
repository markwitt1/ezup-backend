import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { SyntheticEvent } from "react";
import LoginPage from "./components/LoginPage";
import LoginDialog from "./components/LoginPage";
import MyUploadsPage from "./components/MyUploadsPage";
import RegisterPage from "./components/RegisterPage";
import Download from "./Download";
import Upload from "./Upload";
import useStore from "./useStore";

type Props = {};

const App = (props: Props) => {
  const page = useStore((state) => state.page);
  const setPage = useStore((state) => state.setPage);
  const username = useStore((state) => state.username);
  const logout = useStore((state) => state.logout);

  if (page === "login") {
    return <LoginPage />;
  } else if (page === "register") {
    return <RegisterPage />;
  } else if (page === "my-uploads") {
    return <MyUploadsPage />;
  }

  return (
    <Container>
      {username ? (
        <>
          <Typography>Logged in as {username}</Typography>
          <Button onClick={() => logout()}>Logout</Button>
          <Button onClick={() => setPage("my-uploads")}>My uploads</Button>
        </>
      ) : (
        <>
          <Button onClick={() => setPage("login")}>Login</Button>
          <Button onClick={() => setPage("register")}>Register</Button>
        </>
      )}
      <Tabs
        value={page === "upload" ? 0 : 1}
        onChange={(ev, i) => {
          if (i === 0) {
            setPage("upload");
          } else {
            setPage("download");
          }
        }}
      >
        <Tab label="Upload" />
        <Tab label="Download" />
      </Tabs>
      {page === "upload" ? <Upload /> : <Download />}
    </Container>
  );
};

export default App;
