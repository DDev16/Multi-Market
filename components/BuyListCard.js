import React from "react";
import {
  Grid,
  Card,
  Text,
  Button,
  Row,
  Spacer,
  Container,
  Loading,
} from "@nextui-org/react";
import confetti from "canvas-confetti";
import Resell from "../engine/Resell.json";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const BuyListCard = ({
  nft,
  activeChain,
  networkSwitch,
  chain,
  connectedWallet,
  chainId,
  buyFunction,
  resellContract,
  setVisible,
  refresh,
}) => {
  const handleNetworkSwitch = () => {
    networkSwitch();
  };

  const handleConfetti = () => {
    confetti();
  };

  const loaderModalOpen = () => {
    setVisible(true);
  };

  const loaderModalClose = () => {
    setVisible(false);
  };

  const resfreshListing = () => {
    refresh();
  };

  async function cancelListResell(tokenId) {
    loaderModalOpen();
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(resellContract, Resell, signer);
    // const gasPrice = signer.getGasPrice();
    let transaction = await contract
      .cancelSale(tokenId, {
        gasPrice: "50000000000",
      })
      .catch((err) => {
        loaderModalClose();
        console.log("err", err.message);
      });
    if (!transaction) {
      return;
    }
    await transaction.wait();
    console.log("CANCELLED");
    resfreshListing();
    loaderModalClose();
  }

  return (
    <Card
      css={{
        marginRight: "3px",
        boxShadow: "1px 1px 10px #ffffff",
        marginBottom: "15px",
      }}
      variant="bordered"
    >
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          css={{
            maxWidth: "100%",
            // maxHeight: "150px",
            borderRadius: "6%",
          }}
          src={nft.image}
        />
      </Card.Body>
      <Card.Footer css={{ justifyItems: "flex-start" }}>
        <Row
          css={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
          wrap="wrap"
        >
          <Text
            css={{
              fontSize: "18px",
              textTransform: "capitalize",
              mb: "0",
            }}
            h4
          >
            {nft.name}
          </Text>
          <Text
            css={{
              fontSize: "16px",
              textTransform: "capitalize",
              color: "#cecece",
              fontWeight: "100",
              letterSpacing: "0px",
              whiteSpace: "nowrap",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            p
          >
            {nft.desc}
          </Text>
          <Text
            css={{
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
              mb: "10px",
            }}
          >
            {nft.val}
            <img
              src="n2dr-logo.png"
              style={{
                width: "60px",
                height: "25px",
                marginTop: "4px",
              }}
            />
          </Text>
          {activeChain == chainId && connectedWallet ? (
            connectedWallet.toLowerCase() == nft.wallet.toLowerCase() ? (
              <Button
                color="gradient"
                css={{ fontSize: "16px", minWidth: "100%" }}
                onClick={() => cancelListResell(nft.tokenId)}
              >
                Cancel List
              </Button>
            ) : (
              <Button
                color="gradient"
                css={{ fontSize: "16px", minWidth: "100%" }}
                onClick={() => handleConfetti(buyFunction())}
              >
                Buy
              </Button>
            )
          ) : (
            <Button
              color="gradient"
              css={{ fontSize: "16px", minWidth: "100%" }}
              onClick={handleNetworkSwitch}
            >
              Switch to {chain}
            </Button>
          )}
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default BuyListCard;
