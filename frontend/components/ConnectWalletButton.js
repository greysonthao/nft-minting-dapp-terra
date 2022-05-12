/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  useWallet,
  WalletStatus,
  useLCDClient,
  useConnectedWallet,
} from "@terra-money/wallet-provider";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 375,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

export default function ConnectWallet() {
  const {
    status,
    wallets,
    availableInstallations,
    availableConnections,
    connect,
    disconnect,
  } = useWallet();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fullAddr, setFullAddr] = React.useState(null);
  const [shortAddr, setShortAddr] = React.useState(null);
  const lcd = useLCDClient();
  const connectedWallet = useConnectedWallet();

  const [bank, setBank] = React.useState([]);

  React.useEffect(() => {
    if (connectedWallet) {
      handleClose();
      let bankArray = [];
      lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
        coins.map((coin) => {
          let coinValue = ("" + coin.amount.d[0] + coin.amount.d[1]) / 1000000;
          let coinName = coin.denom.slice(1).toUpperCase();
          let coinDetails = {
            coinName,
            coinValue,
          };
          bankArray.push(coinDetails);
        });

        setBank(bankArray);
      });
    } else if (!connectedWallet) {
      setBank(null);
      handleClose();
    }
  }, [connectedWallet, lcd]);

  React.useEffect(() => {
    if (wallets[0]) {
      setShortAddr(
        wallets[0].terraAddress.slice(0, 5) +
          "..." +
          wallets[0].terraAddress.slice(37, 44)
      );
      setFullAddr(wallets[0].terraAddress);
    }
  }, [wallets]);

  const firstTwoConnections = availableConnections.slice(0, 2);

  const linkTo = (link) => {
    window.open(link, "_blank");
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[400]),
    backgroundColor: "#222da0",
    "&:hover": {
      backgroundColor: purple[600],
    },
  }));

  const bankTable = bank?.map((coinDeets) => (
    <Box key={coinDeets.coinName}>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ color: "#" }}>{coinDeets.coinName}</Typography>
        <Typography>{coinDeets.coinValue}</Typography>
      </Box>
      <Divider />
    </Box>
  ));

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <ColorButton
          sx={{ borderRadius: "20px", margin: "1rem 0 0 0" }}
          variant="contained"
          onClick={handleOpen}
        >
          {status === WalletStatus.WALLET_NOT_CONNECTED && (
            <Box component="span" display="flex" alignItems="center">
              <img
                src="https://assets.terra.money/icon/svg/Terra.svg"
                alt="terra logo"
                width="20px"
              />
              <Typography
                variant="body1"
                component="span"
                marginLeft=".5rem"
                textTransform="none"
              >
                Connect Wallet
              </Typography>
            </Box>
          )}
          {status === WalletStatus.WALLET_CONNECTED && (
            <Box component="span" display="flex" alignItems="center">
              <img
                src="https://assets.terra.money/icon/svg/Terra.svg"
                alt="terra logo"
                width="20px"
              />
              <Typography
                variant="body1"
                component="span"
                textTransform="lowercase"
                marginLeft=".5rem"
              >
                {shortAddr}
              </Typography>
            </Box>
          )}
        </ColorButton>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        /* aria-describedby="modal-modal-description" */
      >
        <Box sx={style}>
          {status === WalletStatus.WALLET_NOT_CONNECTED ? (
            <>
              <Box display="flex" justifyContent="space-between">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Connect to wallet
                </Typography>
                <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
              </Box>
              {firstTwoConnections.map(
                ({ type, name, icon, identifier = "" }) => (
                  <ColorButton
                    sx={{ margin: ".5rem 0" }}
                    variant="contained"
                    key={"connection-" + type + identifier}
                    onClick={() => connect(type, identifier)}
                    fullWidth={true}
                  >
                    <Box padding=".25rem" display="flex" alignItems="center">
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{ marginRight: "2rem" }}
                      >
                        {name}
                      </Typography>
                      <img
                        src={icon}
                        alt={name}
                        style={{ width: "1.5em", height: "1.5em" }}
                      />
                    </Box>
                  </ColorButton>
                )
              )}
              {availableInstallations.map((connectType) => (
                <ColorButton
                  sx={{ margin: ".5rem 0" }}
                  variant="contained"
                  key={"install-" + connectType.name}
                  onClick={() => linkTo(connectType.url)}
                  fullWidth={true}
                >
                  <Box padding=".25rem" display="flex" alignItems="center">
                    <Typography
                      variant="body1"
                      component="span"
                      sx={{ marginRight: "2rem" }}
                    >
                      Install {connectType.name}{" "}
                    </Typography>
                    <img
                      src={connectType.icon}
                      alt={connectType.name}
                      style={{ width: "1.5em", height: "1.5em" }}
                    />
                  </Box>
                </ColorButton>
              ))}
            </>
          ) : (
            <>
              <Box display="flex" justifyContent="space-between">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  My wallet
                </Typography>
                <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
              </Box>
              <Box margin="1rem 0 1rem 0">
                <Box margin="0 0 1rem 0">
                  <Divider />
                  {bankTable}
                </Box>
                <Typography
                  variant="body2"
                  component="span"
                  textTransform="uppercase"
                >
                  My Address:
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  textTransform="lowercase"
                  color="GrayText"
                >
                  {" "}
                  {fullAddr}
                </Typography>
              </Box>
              <ColorButton
                fullWidth={true}
                variant="contained"
                onClick={() => disconnect()}
                sx={{ borderRadius: "20px" }}
              >
                Disconnect
              </ColorButton>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
