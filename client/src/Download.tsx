import { Button, TextField } from "@mui/material";
import { useState } from "react";
import DownloadLink from "./components/DownloadLink";

type Props = {
  initialId?: string;
};

const Download = ({ initialId }: Props) => {
  const [id, setId] = useState<string | undefined>(initialId);

  return (
    <>
      <TextField label="Enter ID" onChange={(ev) => setId(ev.target.value)} />
      {id && (
        <>
          <DownloadLink id={id} />
          {!initialId && (
            <button onClick={() => setId(undefined)}>Clear</button>
          )}
        </>
      )}
    </>
  );
};

export default Download;
