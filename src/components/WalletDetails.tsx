import { useEffect, useState } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

type Props = {};

const WalletDetails = (props: Props) => {
  const injectedConnector = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 56, 97] });
  const { chainId, account, activate, active, library, deactivate, error } =
    useWeb3React<Web3Provider>();
  const [balance, setBalance] = useState<any>("");

  useEffect(() => {
    const fetchBalance = async () => {
      if (!account) {
        return "";
      }
      const result = await library?.getBalance(account);
      result && setBalance(Number(result) / 1e18);
    };
    // listen for changes on an Ethereum address
    console.log(`listening for blocks...`);
    library?.on("block", () => {
      console.log("update balance...");
      fetchBalance();
    });
    // remove listener when the component is unmounted
    return () => {
      library?.removeAllListeners("block");
    };
    // trigger the effect only on component mount
  }, [account, library]);

  console.log({ active, chainId, error });

  return (
    <Card variant="outlined">
      <CardContent>
        <Box p={3}>
          <Box className="heading">
            <Typography variant="h3">Wallet Details</Typography>
          </Box>
          {active ? (
            <Box>
              <Box display={"flex"} alignItems={"center"} my={2}>
                <Typography mr={2}>Chain Id</Typography>
                <Typography>{chainId}</Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"} my={2}>
                <Typography mr={2}>Account</Typography>
                <Typography>{account}</Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"} my={2}>
                <Typography mr={2}>Balance</Typography>
                <Typography>{balance}</Typography>
              </Box>
              <Button
                variant="outlined"
                type="button"
                onClick={() => {
                  deactivate();
                }}
              >
                Disconnect
              </Button>
            </Box>
          ) : (
            <>
              <Typography my={2} sx={{ color: "red" }}>
                Wallet not connected. Please click the Connect button below
              </Typography>
              <Button
                variant="contained"
                type="button"
                onClick={() => {
                  activate(injectedConnector);
                }}
              >
                Connect
              </Button>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WalletDetails;
