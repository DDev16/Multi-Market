import React, { useState } from "react";
import {
  Card,
  Button,
  Input,
  Col,
  Row,
  Spacer,
  Container,
  Text,
  Grid,
} from "@nextui-org/react";
import Web3 from "web3";

const ListCard = ({ nft, executeRelist }) => {
  const [resalePrice, updateresalePrice] = useState({ price: "" });

  const relistHandler = () => {
    executeRelist(resalePrice);
  };

  return (
    <Card
      isHoverable
      css={{
        mw: "200px",
        marginRight: "$1",
        maxWidht: "400px",
      }}
      variant="bordered"
    >
      <Card.Image src={nft.img.length > 70 ? nft.img : image.src} />
      <Card.Body>
        <h3
          style={{
            color: "#9D00FF",
            fontFamily: "SF Pro Display",
          }}
        >
          Owned by You
        </h3>
        <Text h5>
          {nft.name} Token-{nft.tokenId}
        </Text>
        <Text>{nft.desc}</Text>
        <Input
          size="sm"
          type="number"
          css={{
            marginTop: "$2",
            maxWidth: "120px",
            marginBottom: "$2",
            border: "$blue500",
          }}
          style={{
            color: "white",
            fontFamily: "SF Pro Display",
            fontWeight: "bolder",
            fontSize: "15px",
          }}
          placeholder="Set your price"
          onChange={(e) =>
            updateresalePrice({
              ...resalePrice,
              price: e.target.value,
            })
          }
          label="set price"
        />
        <Button
          size="sm"
          color="gradient"
          onPress={relistHandler}
          style={{ fontSize: "20px" }}
          disabled={
            resalePrice.price.length && resalePrice.price > 0 ? false : true
          }
        >
          Relist for Sale
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ListCard;
