import {
  Card,
  Row,
  Button,
  Text,
  Container,
  Grid,
  Input,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import {
  goerpc,
  goeresell,
  goenftcol,
  bsctrpc,
  bsctresell,
  bsctnftcol,
  mmrpc,
  mmresell,
  mmnftcol,
  hhnftcol,
  hhrpc,
  hhresell,
  flrrpc,
  flrresell,
  flrnftcol,
} from "../engine/configuration";
import { bnbrpc, bnbresell, bnbnftcol } from "../engine/configuration";
import { polyrpc, polyresell, polynftcol } from "../engine/configuration";
import { simpleCrypto } from "../engine/configuration";
import NFTCollection from "../engine/NFTCollection.json";
import Resell from "../engine/Resell.json";
import axios from "axios";
import LoadingPopup from "../components/LoadingPopup";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";

const CustomCard = ({
  nft,
  visible,
  setVisible,
  key,
  contractConfig,
  refresh,
}) => {
  const [activeChain, setActiveChain] = useState(null);
  const [connectedWallet, setConnectedWallet] = useState(null);

  const detectChain = async () => {
    const provider = await detectEthereumProvider();

    const chainId = await provider.request({ method: "eth_chainId" });

    setActiveChain(chainId);
  };

  useEffect(() => {
    console.log("activeChain", activeChain);
  }, [activeChain]);

  useEffect(() => {
    console.log("connectedWallet", connectedWallet);
  }, [connectedWallet]);

  useEffect(() => {
    detectChain();
  }, [connectedWallet]);

  useEffect(() => {
    if (!activeChain) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((data) => {
          console.log("data", data[0]);
          setConnectedWallet(data[0]);
        });
    }
    window.ethereum.on("accountsChanged", function (accounts) {
      // Time to reload your interface with accounts[0]!
      console.log("account ==============>", accounts);
      setConnectedWallet(accounts[0]);
    });
  }, []);

  // var owner = user;
  const { nftRpc, nftCol, nftResell } = contractConfig;
  console.log("nft", nft);
  const [resalePrice, updateresalePrice] = useState({ price: "" });

  const router = useRouter();

  async function executeRelist() {
    const { price } = resalePrice;
    if (!price) return;
    try {
      relistNFT();
    } catch (error) {
      console.log("Transaction Failed", error);
    }
  }
  async function relistNFT() {
    setVisible(true);
    // var resell = nftresell;
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const price = ethers.utils.parseUnits(resalePrice.price, "ether");
    const contractnft = new ethers.Contract(nftCol, NFTCollection, signer);
    await contractnft
      .setApprovalForAll(nftResell, true, { gasPrice: "50000000000" })
      .then(async (res) => {
        console.log("res", res);
        const filter = {
          address: nftCol,
          topics: [
            "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31",
          ],
        };
        provider.on(filter, async (data) => {
          console.log("data", data);
          let contract = new ethers.Contract(nftResell, Resell, signer);
          let listingFee = await contract.getListingFee();
          listingFee = listingFee.toString();
          let transaction = await contract
            .listSale(nft.tokenId, price, {
              value: listingFee,
              gasPrice: "50000000000",
            })
            .catch((err) => {
              console.log("err", err);
              setVisible(false);
            });
          if (!transaction) {
            return;
          }
          await transaction.wait();
          router.push("/");
        });
      })
      .catch(() => {
        setVisible(false);
      });
  }

  async function buylistNft() {
    setVisible(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftResell, Resell, signer);
    const transaction = await contract
      .buyNft(nft.tokenId, {
        value: nft.cost,
        gasPrice: "50000000000",
      })
      .catch((error) => {
        if (error.data?.message.includes("insufficient funds")) {
          window.alert(error.data.message);
        }
        setVisible(false);
      });
    if (!transaction) {
      return;
    }
    await transaction.wait();
    refresh();
    setVisible(false);
    // router.push("/portal");
  }

  async function cancelList(itemId) {
    setVisible(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(nftResell, Resell, signer);
    // const gasPrice = signer.getGasPrice();
    let transaction = await contract
      .cancelSale(itemId, {
        gasPrice: "50000000000",
      })
      .catch((err) => {
        setVisible(false);
        console.log("err", err.message);
      });
    if (!transaction) {
      return;
    }
    await transaction.wait();
    console.log("CANCELLED");
    refresh();
    setVisible(false);
  }

  return (
    <Card
      css={{
        marginRight: "15px",
        boxShadow: "1px 1px 10px #ffffff",
        marginBottom: "15px",
        height: "100%",
      }}
      variant="bordered"
    >
      {/* <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontFamily: "SF Pro Display",
          fontWeight: "200",
          fontSize: "20px",
          marginLeft: "3px",
        }}
      >
        {nft.name} Token-{nft.tokenId}
      </Text> */}
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          css={{
            maxWidth: "100%",
            // maxHeight: "150px",
            borderRadius: "6%",
          }}
          src={nft.img}
        />
      </Card.Body>
      <Card.Footer css={{ justifyItems: "flex-start" }}>
        <Row
          key={key}
          css={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            // "@media screen and (min-width:1000px)": {

            // },
          }}
          wrap="wrap"
          // justify="space-between"
          // align="center"
        >
          <Text
            css={{
              color: "#fff",
              fontSize: "18px",
              textTransform: "capitalize",
              mb: "0",
            }}
            h4
          >
            {nft.name} Token-{nft.tokenId}
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
          {/* {nft.cost == 0 ? (
            connectedWallet &&
            nft.wallet.toLowerCase() === connectedWallet.toLowerCase() && (
              <>
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
                  onPress={executeRelist}
                  css={{ fontSize: "16px", minWidth: "100%" }}
                  disabled={
                    resalePrice.price.length && resalePrice.price > 0
                      ? false
                      : true
                  }
                >
                  Relist for Sale
                </Button>
              </>
            )
          ) :  */}
          {connectedWallet &&
          nft.wallet.toLowerCase() === connectedWallet.toLowerCase() ? (
            <>
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
                {nft.val}{" "}
                <img
                  src="n2dr-logo.png"
                  style={{
                    width: "60px",
                    height: "25px",
                    marginTop: "4px",
                  }}
                />
              </Text>
              <Button
                color="gradient"
                css={{ fontSize: "16px", minWidth: "100%" }}
                onPress={() => cancelList(nft.tokenId)}
              >
                cancel
              </Button>
            </>
          ) : (
            <>
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
                {nft.val}{" "}
                <img
                  src="n2dr-logo.png"
                  style={{
                    width: "60px",
                    height: "25px",
                    marginTop: "4px",
                  }}
                />
              </Text>
              <Button
                color="gradient"
                css={{ fontSize: "16px", minWidth: "100%" }}
                onPress={buylistNft}
              >
                Buy
              </Button>
            </>
          )}
        </Row>
      </Card.Footer>
    </Card>
  );
};

const Collection = () => {
  const [activeChain, setActiveChain] = useState(null);
  const [nftArray, setNftArray] = useState();
  const [contractConfig, setContractConfig] = useState({
    nftRpc: null,
    nftCol: null,
    nftResell: null,
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.ethereum.on("chainChanged", (chainId) => {
      console.log("chainChanged", chainId);
      setActiveChain(chainId);
    });
  }, []);

  const detectChain = async () => {
    const provider = await detectEthereumProvider();

    const chainId = await provider.request({ method: "eth_chainId" });

    setActiveChain(chainId);
  };

  const setContract = () => {
    var goe = "0xE"; // Flare conversion
    var mm = "0x13881";
    var bsct = "0x61";
    var hh = "0x13"; //songbird conversion
    var bnb = "0x38";
    var poly = "0x89";
    var flr = "0xe";
    if (activeChain == goe) {
      var nftcol = goenftcol;
      var nftrpc = goerpc;
      var nftresell = goeresell;
    } else if (activeChain == mm) {
      var nftcol = mmnftcol;
      var nftrpc = mmrpc;
      var nftresell = mmresell;
    } else if (activeChain == bsct) {
      var nftcol = bsctnftcol;
      var nftrpc = bsctrpc;
      var nftresell = bsctresell;
    } else if (activeChain == hh) {
      var nftcol = hhnftcol;
      var nftrpc = hhrpc;
      var nftresell = hhresell;
    } else if (activeChain == bnb) {
      var nftcol = bnbnftcol;
      var nftrpc = bnbrpc;
      var nftresell = bnbresell;
    } else if (activeChain == poly) {
      var nftcol = polynftcol;
      var nftrpc = polyrpc;
      var nftresell = polyresell;
    } else if (activeChain == flr) {
      var nftcol = flrnftcol;
      var nftrpc = flrrpc;
      var nftresell = flrresell;
    }
    setContractConfig({
      nftCol: nftcol,
      nftRpc: nftrpc,
      nftResell: nftresell,
    });
  };

  async function loadNftResell() {
    const provider = new ethers.providers.JsonRpcProvider(
      contractConfig.nftRpc
    );
    const contract = new ethers.Contract(
      contractConfig.nftCol,
      NFTCollection,
      provider
    );
    const market = new ethers.Contract(
      contractConfig.nftResell,
      Resell,
      provider
    );
    const itemArray = [];
    await contract.totalSupply().then((result) => {
      for (let i = 0; i < result; i++) {
        var token = i + 1;
        // const owner = contract.ownerOf(token).catch(function (error) {
        //   console.log("tokens filtered");
        // });
        const rawUri = contract.tokenURI(token).catch(function (error) {
          console.log("tokens filtered");
        });
        const listing = market.nftListings().catch(function (error) {
          console.log("tokens filtered");
        });
        const Uri = Promise.resolve(rawUri);
        const getUri = Uri.then((value) => {
          if (value) {
            var cleanUri = value.replace("ipfs://", "https://ipfs.io/ipfs/");
            let metadata = axios.get(cleanUri).catch(function (error) {
              // console.log(error.toJSON());
            });
            return metadata;
          }
        });
        getUri.then((value) => {
          if (value) {
            let rawImg = value.data.image;
            var name = value.data.name;
            var desc = value.data.description;
            let image = rawImg.replace("ipfs://", "https://ipfs.io/ipfs/");
            const price = market.getPrice(token);
            Promise.resolve(price).then((_hex) => {
              var salePrice = Number(_hex);
              var txPrice = salePrice.toString();
              Promise.resolve(listing).then((value) => {
                

                // let ownerW = value;
                let seller;
                let holder;
                value.map((item) => {
                  if (item.tokenId.toNumber() == token) {
                    // if (item.price.toNumber() !== 0) {
                    seller = item.seller;
                    holder = item.holder;

                    let outPrice = ethers.utils.formatUnits(
                      salePrice.toString(),
                      "ether"
                    );
                    let meta = {
                      name: name,
                      img: image,
                      cost: txPrice,
                      val: outPrice,
                      tokenId: token,
                      wallet: seller,
                      holder: holder,
                      desc,
                    };
                    // console.log(meta);
                    itemArray.push(meta);
                    // }
                  }
                });
              });
            });
          }
        });
      }
    });
    await new Promise((r) => setTimeout(r, 3000));
    setNftArray(itemArray);
  }

  useEffect(() => {
    detectChain();
    setContract();
  }, [activeChain]);

  useEffect(() => {
    const { nftCol, nftRpc, nftResell } = contractConfig;
    if (nftCol && nftRpc && nftResell) {
      loadNftResell();
    }
  }, [contractConfig]);

  const refresh = () => {
    const { nftCol, nftRpc, nftResell } = contractConfig;
    if (nftCol && nftRpc && nftResell) {
      loadNftResell();
    }
    setContract();
  };

  useEffect(() => {
    console.log("contractConfig", contractConfig);
  }, [contractConfig]);

  useEffect(() => {
    console.log("nftArray", nftArray);
  }, [nftArray]);

  useEffect(() => {
    refresh();
  }, []);

  const nftList = nftArray?.map((nft, i) => {
    return (
      <Grid className="SSSS" xs={12} sm={4} md={3} key={i}>
        <CustomCard
          nft={nft}
          visible={visible}
          setVisible={setVisible}
          contractConfig={contractConfig}
          refresh={refresh}
        />
      </Grid>
    );
  });

  return (
    <>
      <Container sm css={{ mt: "50px", mb: "50px" }}>
        <Grid.Container gap={1} justify="flex-start">
          {nftList}
        </Grid.Container>
        <LoadingPopup visible={visible} setVisible={setVisible} />
      </Container>{" "}
    </>
  );
};

export default Collection;
