import { Box, Tooltip } from "@mui/material";
import React from "react";
import { appendageColor } from "../../Logic/HeroBase";

export default function HeroColorCell({ children }) {
  return (
    <Tooltip placement="top" title={`Color hex code: #${children}`}>
      <Box
        sx={{
          fontWeight: 1000,
          color: `#${children}`,
        }}
      >
        {appendageColor[children]}
      </Box>
    </Tooltip>
  );
}
