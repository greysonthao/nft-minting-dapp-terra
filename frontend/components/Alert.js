/* import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack"; */
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function DescriptionAlerts(props) {
  /* const [alert, setAlert] = React.useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  }; */

  return (
    <Box>
      <Snackbar
        open={props.alert.open}
        autoHideDuration={6000}
        onClose={props.handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Box>
          <MuiAlert
            onClose={props.handleCloseAlert}
            elevation={10}
            variant="filled"
            severity={props.alert.type}
            sx={{
              width: "100%",
            }}
          >
            <AlertTitle>{props.alert.type.toUpperCase()}</AlertTitle>
            <Box>
              <Box component="span" marginRight="auto">
                {props.alert.message}
              </Box>
              {props.txResult && (
                <Box display="flex" justifyContent="right">
                  {props.availableForMint === 0 ? (
                    ""
                  ) : (
                    <Button
                      sx={{ margin: ".5rem" }}
                      target="_blank"
                      href={`https://terrasco.pe/testnet/tx/${props.txResult.txhash}`}
                      variant="contained"
                      color={
                        props.txError?.includes("failed") ? "error" : "success"
                      }
                    >
                      Transaction Details
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          </MuiAlert>
        </Box>
      </Snackbar>
    </Box>
  );
}
/* return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning alert — <strong>check it out!</strong>
      </Alert>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert — <strong>check it out!</strong>
      </Alert>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert>
    </Stack>
  );
} */
