import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Container } from "@mui/material";
import useStore from "../useStore";
interface Props {}

export default function RegisterPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const register = useStore((state) => state.register);
  const setPage = useStore((state) => state.setPage);

  return (
    <Container>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="username"
          fullWidth
          variant="standard"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="password"
          fullWidth
          type="password"
          variant="standard"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setPage("upload")}>Cancel</Button>
        <Button
          onClick={() => {
            register(username, password).then((success) => {
              if (success) setPage("upload");
            });
          }}
        >
          Register
        </Button>
      </DialogActions>
    </Container>
  );
}
