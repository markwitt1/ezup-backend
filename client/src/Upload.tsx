import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Container from "@mui/material/Container";
import DownloadLink from "./components/DownloadLink";

type Props = {};

const Upload = (props: Props) => {
  const [zipID, setZipID] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadFiles = useCallback(async () => {
    if (files.length === 0) {
      return;
    }
    console.log("uploading files");
    const formData = new FormData();

    for (const file in files) {
      formData.append("file", files[file]);
    }

    console.log(formData);

    const res = await axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    if (res.status === 200) {
      console.log(res.data.data.id);
      setZipID(res.data.data.id);
    }
  }, [files]);

  if (zipID) {
    return (
      <Container>
        <Typography>Success: Your zip File ID is {zipID}</Typography>
        <DownloadLink id={zipID} />
      </Container>
    );
  }
  return (
    <>
      <Box border="2px solid black" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </Box>
      <Box>
        {files.map((file) => (
          <Typography>{file.name}</Typography>
        ))}
      </Box>
      <Button onClick={() => setFiles([])}>Clear</Button>
      <Button onClick={() => uploadFiles()}>Submit</Button>
    </>
  );
};

export default Upload;
