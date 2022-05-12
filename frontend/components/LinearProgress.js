import React from "react";
import Stack from "@mui/material/Stack";
import FormLabel from "@mui/material/FormLabel";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearDeterminate({ tokenProgress }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setProgress(tokenProgress);
  }, [tokenProgress]);

  return (
    <>
      <Stack sx={{ width: "100%" }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: "10px",
            borderRadius: "10px",
            backgroundColor: "#C5C5C5",
            "& .MuiLinearProgress-barColorPrimary": {
              backgroundImage: `linear-gradient(90deg, rgba(74,211,255,1) 30% 
                ${progress > 0 ? `,rgba(255,171,0,1) 90%` : ""} 
                ${progress > 90 ? `,rgba(255,0,0,1) 100%` : ""})`,
            },
          }}
        />
      </Stack>
    </>
  );
}
