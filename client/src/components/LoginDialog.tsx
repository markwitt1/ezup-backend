import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
interface Props {
  open: boolean;
  handleClose: () => void;
  submit: () => void;
}

export default function FormDialog({ open, handleClose, submit }: Props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={submit}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}
