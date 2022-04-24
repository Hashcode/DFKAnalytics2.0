import { TextField } from "@mui/material";
import React from "react";

export default function IdInput({ callback, value, setValue }) {
  return (
    <div className={`col-12`}>
      <TextField
        variant="outlined"
        label="Id and 0x Address Input, you can't search for hero Ids and Wallets at the same time (yet)."
        multiline
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="IdInput"
        onBlur={callback}
        rows={4}
        fullWidth={true}
      />
    </div>
  );
}
