import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { SyntheticEvent } from "react";
import LoginDialog from "./components/LoginDialog";
import Download from "./Download";
import Upload from "./Upload";

type Props = {};

const App = (props: Props) => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [loginOpen, setLoginOpen] = React.useState(false);

  const [username, setUsername] = React.useState<string | null>(null);

  const toggleLoginOpen = () => setLoginOpen(!loginOpen);
  const handleLoginSubmit = (values) => {};

  return (
    <Container maxWidth="sm">
      <Button onClick={toggleLoginOpen}>Login</Button>
      <LoginDialog open={loginOpen} handleClose={toggleLoginOpen} submit={} />
      <Tabs
        value={tabIndex}
        onChange={(ev, i) => {
          setTabIndex(i);
        }}
      >
        <Tab label="Upload" />
        <Tab label="Download" />
      </Tabs>
      {tabIndex === 0 ? <Upload /> : <Download />}
    </Container>
  );
};

export default App;
