import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useStore from "../useStore";

import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

const MyUploadsPage = () => {
  const setPage = useStore((state) => state.setPage);

  const [myUploads, setMyUploads] = useState<string[]>([]);
  const fetchData = async () => {
    const res = axios.get("/users/myUploads");

    res.then((res) => {
      setMyUploads(res.data.data.uploads);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Typography>My uploads</Typography>
      <List>
        {myUploads.map((uploadName) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={uploadName} />
            <ListItemSecondaryAction>
              <IconButton
                component="a"
                href={`${process.env.REACT_APP_API_URL || ""}/download/${
                  uploadName.split(".")[0]
                }`}
              >
                <DownloadIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={async () => {
                  await axios.delete(`/users/myUploads/${uploadName}`);
                  fetchData();
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button onClick={() => setPage("upload")}>Back</Button>
    </div>
  );
};

export default MyUploadsPage;
