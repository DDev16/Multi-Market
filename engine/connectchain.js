/* eslint-disable @next/next/no-img-element */
import {
  bscChain,
  polyChain,
  ethChain,
  hardChain,
  bscTest,
  ethTest,
  polyTest,
  flrChain,
} from "../engine/chainchange";
import "sf-font";
import { Col, Dropdown } from "@nextui-org/react";
import React from "react";
import { useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

export default function ConnectChain() {
  const [selected, setSelected] = React.useState(new Set(["Set Network"]));
  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replace("_", " "),
    [selected]
  );

  // const selectedValue = "Mumbai";

  // const detectChain = async () => {
  //   const provider = await detectEthereumProvider();

  //   const chainId = await provider.request({ method: "eth_chainId" });

  //   return chainId;
  // };

  // useEffect(() => {
  //   var goe = "0x5";
  //   var mm = "0x13881";
  //   var bsct = "0x61";
  //   const chain = detectChain().then((res) => {
  //     console.log("res", res);
  //   });
  //   // setSelected("Mumbai");
  // }, []);

  const blockImage = React.useMemo(() => {
    var eth = "Ethereum";
    var bsc = "Binance Smart Chain";
    var pol = "Polygon";
    var mum = "Mumbai";
    var bsct = "Bsctest";
    var goe = "Goerli";
    var flr = "Flare";
    var hard = "Hardhat";
    var init = "Set Network";
    if (selectedValue == eth) {
      return (
        <div style={{ display: "flex", marginTop: "4%" }}>
          <img
            src="ethereumlogo.png"
            width={"30px"}
            height={"30px"}
            style={{ marginTop: "4%" }}
            alt="ethereum"
          />
          <h5>Ethereum Network</h5>
        </div>
      );
    } else if (selectedValue == bsc) {
      return (
        <div style={{ display: "flex", marginTop: "4%" }}>
          <img
            src="./bsc.png"
            width={"25px"}
            height={"25px"}
            style={{ marginTop: "5%" }}
            alt="ethereum"
          />
          <h5>Binance Network</h5>
        </div>
      );
    } else if (selectedValue == pol) {
      return (
        <div style={{ display: "flex", marginTop: "4%" }}>
          <img
            src="./polygonwhite.png"
            width={"25px"}
            height={"25px"}
            style={{ marginTop: "5%" }}
            alt="ethereum"
          />
          <h5>Polygon Network</h5>
        </div>
      );
    } else if (selectedValue == mum) {
      return <h5>Mumbai Testnet</h5>;
    } else if (selectedValue == bsct) {
      return <h5>BSC Testnet</h5>;
    } else if (selectedValue == goe) {
      return <h5>Goerli Testnet</h5>;
    } else if (selectedValue == flr) {
      return (
        <div style={{ display: "flex", marginTop: "4%" }}>
          <img
            src="./flarelogo.png"
            width={"25px"}
            height={"25px"}
            style={{ marginTop: "5%" }}
            alt="flarelogo"
          />
          <h5>Flare Network</h5>
        </div>
      );
    } else if (selectedValue == hard) {
      return (
        <div style={{ display: "flex", marginTop: "4%" }}>
          <img
            src="./songbirdlogo.png"
            width={"25px"}
            height={"25px"}
            style={{ marginTop: "5%" }}
            alt="songbirdlogo"
          />
          <h5>Songbird Network</h5>
        </div>
      );
    } else if (selectedValue == init) {
      return (
        <div className="mt-8" style={{ paddingTop: "10px" }}>
          <h5>Select Network</h5>
        </div>
      );
    }
  });

  async function enableChain() {
    var bsc = "Binance Smart Chain";
    var poly = "Polygon";
    var eth = "Ethereum";
    var mum = "Mumbai";
    var bsct = "Bsctest";
    var goe = "Goerli";
    var flr = "Flare";
    var hard = "Hardhat";
    if (bsc == selectedValue) {
      bscChain();
    } else if (poly == selectedValue) {
      polyChain();
    } else if (eth == selectedValue) {
      ethChain();
    } else if (hard == selectedValue) {
      hardChain();
    } else if (bsct == selectedValue) {
      bscTest();
    } else if (goe == selectedValue) {
      ethTest();
    } else if (mum == selectedValue) {
      polyTest();
    } else if (flr == selectedValue) {
      flrChain();
    }
  }
  useEffect(() => {
    enableChain();
  }, [selected]);

  return (
    <Col css={{ marginTop: "$6" }}>
      <Dropdown>
        <Dropdown.Button
          aria-label="Connect Wallet"
          flat
          style={{
            background: "#00000070",
            boxShadow: "0px 0px 4px #ffffff",
            fontFamily: "SF Pro Display",
            fontWeight: "600",
            color: "white",
            fontSize: "16px",
          }}
          css={{ tt: "capitalize" }}>
          {blockImage}
        </Dropdown.Button>
        <Dropdown.Menu
          css={{
            backgroundColor: "#ffffff30",
          }}
          aria-label="Single selection actions"
          color="secondary"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={setSelected}
          textValue={selected}>
          <Dropdown.Item textValue="Ethereum" key="Ethereum">
            <div style={{ display: "flex", marginTop: "4%" }}>
              <img
                src="ethereumlogo.png"
                width={"25px"}
                height={"25px"}
                style={{ marginRight: "2%" }}
                alt="ethereum"
              />
              <h5>Ethereum Network</h5>
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            textValue="Binance Smart Chain"
            key="Binance Smart Chain">
            <div style={{ display: "flex", marginTop: "4%" }}>
              <img
                src="bsc.png"
                width={"25px"}
                height={"25px"}
                alt="bsc"
                style={{ marginRight: "2%" }}
              />
              <h5>Binance Network</h5>
            </div>
          </Dropdown.Item>
          <Dropdown.Item textValue="Polygon" key="Polygon">
            <div style={{ display: "flex", marginTop: "4%" }}>
              <img
                src="polygonwhite.png"
                width={"25px"}
                height={"25px"}
                alt="polygonwhite"
                style={{ marginRight: "2%" }}
              />
              <h5>Polygon Network</h5>
            </div>
          </Dropdown.Item>
          <Dropdown.Item textValue="Hardhat" key="Hardhat">
            <div style={{ display: "flex", marginTop: "4%" }}>
              <img
                src="songbirdlogo.png"
                width={"25px"}
                height={"25px"}
                alt="songbirdlogo"
                style={{ marginRight: "2%" }}
              />
              <h5>Songbird Network</h5>
            </div>
          </Dropdown.Item>
          <Dropdown.Item textValue="Flare" key="Flare">
            <div style={{ display: "flex", marginTop: "4%" }}>
              <img
                src="flarelogo.png"
                width={"25px"}
                height={"25px"}
                alt="flarelogo"
                style={{ marginRight: "2%" }}
              />
              <h5>Flare Network</h5>
            </div>
          </Dropdown.Item>
          <Dropdown.Item textValue="Goerli" key="Goerli">
            <h5>Goerli </h5>
          </Dropdown.Item>
          <Dropdown.Item textValue="Bsctest" key="Bsctest">
            <h5> TestNet</h5>
          </Dropdown.Item>
          <Dropdown.Item textValue="Mumbai" key="Mumbai">
            <h5> Mumbai TestNet</h5>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
}
