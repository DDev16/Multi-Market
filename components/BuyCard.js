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

const BuyCard = ({
  nft,
  activeChain,
  networkSwitch,
  chain,
  connectedWallet,
  chainId,
  buyFunction,
  cancelFunction,
}) => {
  const handleNetworkSwitch = () => {
    networkSwitch();
  };

  const handleConfetti = () => {
    confetti();
  };

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
            {nft.description}
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
            {nft.price}
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
            connectedWallet.toLowerCase() == nft.seller.toLowerCase() ? (
              <Button
                color="gradient"
                css={{ fontSize: "16px", minWidth: "100%" }}
                onClick={() => cancelFunction(nft.itemId)}
              >
                Cancel List
              </Button>
            ) : (
              <Button
                color="gradient"
                css={{ fontSize: "16px", minWidth: "100%" }}
                onClick={() => handleConfetti(buyFunction(nft))}
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

export default BuyCard;
