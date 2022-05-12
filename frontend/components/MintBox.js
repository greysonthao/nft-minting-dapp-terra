import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MintButton from "./MintButton";
import ppGif from "../images/gif-pp.gif";
import rainbowPP from "../images/rainbow-pp.png";
import * as query from "../src/contract/query";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import nftJsonData from "../nftJsonData";
import * as execute from "../src/contract/execute";
import CircularProgress from "../components/CircularProgress";
import Alert from "../components/Alert";
import LinearProgress from "../components/LinearProgress";

export default function MintBox() {
  const [amount, setAmount] = React.useState(1);
  const [contractAddr, setContractAddr] = React.useState("");
  const [contractInfo, setContractInfo] = React.useState(null);
  const [tokensMinted, setTokensMinted] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  const [walletAddr, setWalletAddr] = React.useState("");
  const [currentNftData, setCurrentNftData] = React.useState({});
  const [realNftJsonData, setRealNftJsonData] = React.useState(nftJsonData);
  const [txResult, setTxResult] = React.useState(null);
  const [txError, setTxError] = React.useState(null);
  const [showProgressCircle, setShowProgressCircle] = React.useState(false);
  const [alert, setAlert] = React.useState({
    open: false,
    message: "",
    type: "success",
  });
  const [tokenProgress, setTokenProgress] = React.useState(0);
  const [availableForMint, setAvailableForMint] = React.useState(null);

  const connectedWallet = useConnectedWallet();

  const fetchConfig = async () => {
    if (connectedWallet && connectedWallet.network.name === "testnet") {
      const configInfo = await query.getConfig(connectedWallet);
      setContractInfo(configInfo);
    }
  };

  const fetchNumTokens = async () => {
    if (connectedWallet && connectedWallet.network.name === "testnet") {
      const mintedTokens = await query.getNumTokens(connectedWallet);
      setTokensMinted(mintedTokens.count);
    }
  };

  React.useEffect(() => {
    const fetchContractAddress = async () => {
      if (connectedWallet && connectedWallet.network.name === "testnet") {
        setContractAddr(await query.getContractAddress(connectedWallet));
      }
    };

    const fetchWalletAddress = async () => {
      if (connectedWallet && connectedWallet.network.name === "testnet") {
        setWalletAddr(connectedWallet.terraAddress);
      }
    };

    fetchContractAddress();
    fetchNumTokens();
    fetchConfig();
    fetchWalletAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedWallet]);

  React.useEffect(() => {
    const fetchTokensMintedToSetIndex = () => {
      if (tokensMinted === 0) {
        setIndex(0);
      } else {
        setIndex(tokensMinted);
      }
    };

    fetchTokensMintedToSetIndex();
  }, [tokensMinted]);

  React.useEffect(() => {
    const fetchAndSetCurrentNftData = () => {
      let currentNft = { ...realNftJsonData.data[index] };

      currentNft.owner = walletAddr;

      setCurrentNftData(currentNft);
    };

    fetchAndSetCurrentNftData();
  }, [index, realNftJsonData.data, walletAddr]);

  const updateTokenProgress = () => {
    const progress = (tokensMinted / contractInfo?.token_supply) * 100;

    setTokenProgress(progress);
  };

  React.useEffect(() => {
    const updateAvailableToMint = () => {
      const available = contractInfo?.token_supply - tokensMinted;
      setAvailableForMint(available);
    };
    updateTokenProgress();
    updateAvailableToMint();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokensMinted, contractInfo]);

  React.useEffect(() => {
    if (!connectedWallet) {
      setContractAddr("");
      setContractInfo(null);
      setTokensMinted(null);
      setTokenProgress(0);
    }
  }, [connectedWallet]);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (alert.type === "error") {
      setAlert({
        open: false,
        message: "",
        type: "error",
      });
    } else if (alert.type === "success") {
      setAlert({
        open: false,
        message: "",
        type: "success",
      });
    }
  };

  const submitMint = async () => {
    setShowProgressCircle(true);

    if (availableForMint === 0) {
      setAlert({
        open: true,
        message: "No more tokens are available to be minted.",
        type: "error",
      });
      return setShowProgressCircle(false);
    }

    if (connectedWallet && connectedWallet.network.name === "testnet") {
      setTxError(null);
      setTxResult(null);
      // This will return the transaction object on confirmation

      try {
        const tx = await execute.executeMint(
          connectedWallet,
          currentNftData.owner,
          currentNftData.token_id,
          /* "2", */
          currentNftData.token_uri
        );
        setTxResult(tx);

        // Once the transaction is confirmed, we let the user know

        if (tx.raw_log.includes("failed")) {
          setTxError(tx.raw_log);
          setAlert({
            open: true,
            message: tx.raw_log,
            type: "error",
          });
        } else {
          setAlert({
            open: true,
            message: "Your NFT has been minted!",
            type: "success",
          });
          fetchConfig();
          fetchNumTokens();
          setTokenProgress();
        }
        setShowProgressCircle(false);
      } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        setShowProgressCircle(false);
      }
    } else {
      setAlert({
        open: true,
        message: "Connect your wallet before minting.",
        type: "error",
      });
      setShowProgressCircle(false);
    }
  };

  /* const addOneToAmount = () => {
    if (amount === 3) {
      return console.log("You can't mint more than " + amount);
    }
    setAmount((prevAmount) => prevAmount + 1);
  };

  const subtractOneFromAmount = () => {
    if (amount === 1) {
      return console.log("You can't mint less than " + amount);
    }

    setAmount((prevAmount) => prevAmount - 1);
  }; */

  /* console.log("current NFT data: ", currentNftData);
  console.log("current NFT owner: ", currentNftData.owner);
  console.log("current NFT token ID: ", currentNftData.token_id);
  console.log("current NFT token uri: ", currentNftData.token_uri); */

  return (
    <Box>
      <Grid container>
        <Grid item xs={0} sm={2}></Grid>
        <Grid item xs={12} sm={8}>
          <Box margin="1rem 0 0 0">
            <Paper elevation={20} sx={{ borderRadius: "18px" }}>
              <Typography
                variant="h3"
                component="h2"
                fontWeight="bold"
                textAlign="center"
                padding="1rem 0 .5rem 0"
                fontFamily="'Chewy', cursive"
              >
                Playful Ponies
              </Typography>
              <Typography textAlign="center" fontWeight="bold">
                Public Mint
              </Typography>
              <Box margin="0 5rem 0 5rem">
                <LinearProgress tokenProgress={tokenProgress} />
              </Box>
              <Typography textAlign="center" padding="0 0 .5rem 0">
                {contractInfo ? (
                  <Box component="span">
                    Available for mint:{" "}
                    <Typography component="span" fontWeight="bold">
                      {contractInfo?.token_supply - tokensMinted}
                    </Typography>
                    &nbsp;&nbsp;&nbsp;Total supply:{" "}
                    <Typography component="span" fontWeight="bold">
                      {contractInfo?.token_supply}
                    </Typography>
                  </Box>
                ) : (
                  ""
                )}
              </Typography>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    margin=".5rem 0 0 0"
                  >
                    {showProgressCircle ? (
                      <CircularProgress />
                    ) : (
                      <Image
                        src={rainbowPP}
                        alt="playful pony"
                        width="275px"
                        height="275px"
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box marginTop="1rem">
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        /* variant="contained" */
                        variant="disabled"
                        sx={{ backgroundColor: "#90caf9" }}
                        /* onClick={() => subtractOneFromAmount()} */
                      >
                        <Typography fontWeight="bold">—</Typography>
                      </Button>
                      <Typography variant="h5" margin="0 1.5rem 0 1.5rem">
                        {amount}
                      </Typography>
                      <Button
                        variant="disabled" /* onClick={() => addOneToAmount()} */
                        sx={{ backgroundColor: "#90caf9" }}
                      >
                        <Typography fontWeight="bold">+</Typography>
                      </Button>
                    </Box>
                    <Typography
                      textAlign="center"
                      margin="1rem 0 0 0"
                      fontSize="1rem"
                      variant="subtitle2"
                    >
                      Max mint amount: 1
                    </Typography>
                    <Box margin="2rem 3rem 1.5rem 3rem">
                      <Divider />
                      <Box display="flex" justifyContent="space-between">
                        <Typography
                          textAlign="left"
                          margin=".75rem 0 .75rem .5rem"
                          component="span"
                        >
                          Cost:
                        </Typography>
                        <Typography
                          textAlign="center"
                          margin=".75rem .5rem .75rem 0"
                          component="span"
                          fontWeight="bold"
                        >
                          {amount * 0.25} LUNA
                          <Box component="span" sx={{ fontSize: ".8rem" }}>
                            &nbsp;+ fees
                          </Box>
                        </Typography>
                      </Box>
                      <Divider />
                    </Box>
                    <Box display="flex" justifyContent="center">
                      <MintButton
                        currentNftData={currentNftData}
                        submitMint={submitMint}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Box padding="0 0 1rem 0">
                <Box margin="2rem 3rem 1rem 3rem">
                  <Divider />
                </Box>
                {contractAddr && (
                  <a
                    href={`https://terrasco.pe/testnet/address/${contractAddr}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Typography
                      fontWeight="bold"
                      textAlign="center"
                      fontSize=".85rem"
                    >
                      Verified Contract Address
                    </Typography>
                  </a>
                )}
                {/* <Typography textAlign="center" fontSize=".75rem">
                  {contractAddr}
                </Typography> */}
              </Box>
            </Paper>
          </Box>
          <Alert
            txResult={txResult}
            txError={txError}
            alert={alert}
            handleCloseAlert={handleCloseAlert}
            availableForMint={availableForMint}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
