import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import Resell from "../engine/Resell.json";
import NFTCollection from "../engine/NFTCollection.json";
import NFT from "../engine/NFT.json";
import Market from "../engine/Market.json";
import {
  polyTest,
  ethTest,
  bscTest,
  flrChain,
  polyChain,
  ethChain,
  bscChain,
} from "../engine/chainchange";
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
import axios from "axios";
import "sf-font";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import {
  mmnft,
  mmresell,
  mmnftcol,
  mmrpc,
  mmmarket,
} from "../engine/configuration";
import {
  goenft,
  goeresell,
  goenftcol,
  goerpc,
  goemarket,
} from "../engine/configuration";
import {
  hhnft,
  hhresell,
  hhnftcol,
  hhrpc,
  hhmarket,
} from "../engine/configuration";
import {
  bsctnft,
  bsctresell,
  bsctnftcol,
  bsctrpc,
  bsctmarket,
} from "../engine/configuration";
import {
  bnbnft,
  bnbresell,
  bnbnftcol,
  bnbrpc,
  bnbmarket,
} from "../engine/configuration";
import {
  polynft,
  polyresell,
  polynftcol,
  polyrpc,
  polymarket,
} from "../engine/configuration";
import {
  flrnft,
  flrresell,
  flrnftcol,
  flrrpc,
  flrmarket,
} from "../engine/configuration";
import image from "../images/image.jpg";
import LoadingPopup from "../components/LoadingPopup";
import ListCard from "../components/ListCard";

export default function Sell() {
  const [user, getUser] = useState([]);
  const [chain, getChainName] = useState([]);
  const [rpc, getRpc] = useState([]);
  const [nftcol, getNftCol] = useState([]);
  const [nftcustom, getNftCustom] = useState([]);
  const [market, getMarket] = useState([]);
  const [nftresell, getNftResell] = useState([]);
  const [created, getCreated] = useState([]);
  const [resalePrice, updateresalePrice] = useState({ price: "" });
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getChain();
    setRpc();
  }, [setNfts, getUser, getCreated]);
  const router = useRouter();

  async function setRpc() {
    var hh = "0x13";
    var goe = "0x5";
    var mm = "0x13881";
    var bsct = "0x61";
    var bnb = "0x38";
    var poly = "0x89";
    var flr = "0xe";
    const connected = await detectEthereumProvider();
    if (connected.chainId == goe) {
      var mainnet = goerpc;
    } else if (connected.chainId == mm) {
      var mainnet = mmrpc;
    } else if (connected.chainId == bsct) {
      var mainnet = bsctrpc;
    } else if (connected.chainId == hh) {
      var mainnet = hhrpc;
    } else if (connected.chainId == bnb) {
      var mainnet = bnbrpc;
    } else if (connected.chainId == poly) {
      var mainnet = polyrpc;
    } else if (connected.chainId == flr) {
      var mainnet = flrrpc;
    }
    getRpc(mainnet);
    console.log(mainnet);
    setNftCol();
  }

  async function setNftCol() {
    var hh = "0x13";
    var goe = "0x5";
    var mm = "0x13881";
    var bsct = "0x61";
    var bnb = "0x38";
    var poly = "0x89";
    var flr = "0xe";
    const connected = await detectEthereumProvider();
    if (connected.chainId == goe) {
      var nftcol = goenftcol;
    } else if (connected.chainId == mm) {
      var nftcol = mmnftcol;
    } else if (connected.chainId == bsct) {
      var nftcol = bsctnftcol;
    } else if (connected.chainId == hh) {
      var nftcol = hhnftcol;
    } else if (connected.chainId == bnb) {
      var nftcol = bnbnftcol;
    } else if (connected.chainId == poly) {
      var nftcol = polynftcol;
    } else if (connected.chainId == flr) {
      var nftcol = flrnftcol;
    }
    getNftCol(nftcol);
    console.log(nftcol);
    setNftCustom();
  }

  async function setNftCustom() {
    var hh = "0x13";
    var goe = "0x5";
    var mm = "0x13881";
    var bsct = "0x61";
    var bnb = "0x38";
    var poly = "0x89";
    var flr = "0xe";
    const connected = await detectEthereumProvider();
    if (connected.chainId == goe) {
      var nft = goenft;
    } else if (connected.chainId == mm) {
      var nft = mmnft;
    } else if (connected.chainId == bsct) {
      var nft = bsctnft;
    } else if (connected.chainId == hh) {
      var nft = hhnft;
    } else if (connected.chainId == bnb) {
      var nft = bnbnft;
    } else if (connected.chainId == poly) {
      var nft = polynft;
    } else if (connected.chainId == flr) {
      var nft = flrnft;
    }
    getNftCustom(nft);
    console.log(nft);
    setMarket();
  }

  async function setMarket() {
    var hh = "0x13";
    var goe = "0x5";
    var mm = "0x13881";
    var bsct = "0x61";
    var bnb = "0x38";
    var poly = "0x89";
    var flr = "0xe";
    const connected = await detectEthereumProvider();
    if (connected.chainId == goe) {
      var nft = goemarket;
    } else if (connected.chainId == mm) {
      var nft = mmmarket;
    } else if (connected.chainId == bsct) {
      var nft = bsctmarket;
    } else if (connected.chainId == hh) {
      var nft = hhmarket;
    } else if (connected.chainId == bnb) {
      var nft = bnbmarket;
    } else if (connected.chainId == poly) {
      var nft = polymarket;
    } else if (connected.chainId == flr) {
      var nft = flrmarket;
    }
    getMarket(nft);
    console.log(nft);
    setNftResell();
  }

  async function setNftResell() {
    var hh = "0x13";
    var goe = "0x5";
    var mm = "0x13881";
    var bsct = "0x61";
    var bnb = "0x38";
    var poly = "0x89";
    var flr = "0xe";
    const connected = await detectEthereumProvider();
    if (connected.chainId == hh) {
      var nftresell = hhresell;
    } else if (connected.chainId == goe) {
      var nftresell = goeresell;
    } else if (connected.chainId == mm) {
      var nftresell = mmresell;
    } else if (connected.chainId == bsct) {
      var nftresell = bsctresell;
    } else if (connected.chainId == bnb) {
      var nftresell = bnbresell;
    } else if (connected.chainId == poly) {
      var nftresell = polyresell;
    } else if (connected.chainId == flr) {
      var nftresell = flrresell;
    }
    getNftResell(nftresell);
    console.log(nftresell);
  }

  async function getChain() {
    var hh = "0x13";
    var goe = "0x5";
    var mm = "0x13881";
    var bsct = "0x61";
    var bnb = "0x38";
    var poly = "0x89";
    var flr = "0xe";
    const connected = await detectEthereumProvider();
    if (connected.chainId == hh) {
      var chainname = "Songbird";
    } else if (connected.chainId == goe) {
      var chainname = "Goerli Testnet";
    } else if (connected.chainId == mm) {
      var chainname = "Mumbai Testnet";
    } else if (connected.chainId == bsct) {
      var chainname = "BSC Testnet";
    } else if (connected.chainId == bnb) {
      var chainname = "Binance";
    } else if (connected.chainId == poly) {
      var chainname = "Polygon";
    } else if (connected.chainId == flr) {
      var chainname = "Flare";
    }
    getChainName(chainname);
    console.log(chainname);
  }

  async function connectUser() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    // console.log(signer);
    if (window.ethereum) {
      var web3 = new Web3(window.ethereum);
      await window.ethereum.send("eth_requestAccounts");
      var accounts = await web3.eth.getAccounts();
      var account = accounts[0];
    }
    getUser(account);
  }

  async function getWalletNFTs() {
    var address = nftcol;
    var network = rpc;
    const provider = new ethers.providers.JsonRpcProvider(network);
    const contract = new ethers.Contract(address, NFTCollection, provider);
    const itemArray = [];
    await contract.totalSupply().then((result) => {
      for (let i = 0; i < result; i++) {
        var token = i + 1;
        const owner = contract.ownerOf(token).catch(function (error) {
          console.log("tokens filtered");
        });
        const rawUri = contract.tokenURI(token);
        const Uri = Promise.resolve(rawUri);
        const getUri = Uri.then((value) => {
          if (value) {
            var cleanUri = value.replace("ipfs://", "https://ipfs.io/ipfs/");
            let metadata = axios.get(cleanUri).catch(function (error) {
              console.log(error.toJSON());
            });
            return metadata;
          }
        });
        getUri.then((value) => {
          // console.log("abcd", value)
          if (value) {
            let rawImg = value.data.image;
            var name = value.data.name;
            var desc = value.data.description;
            let image = rawImg.replace("ipfs://", "https://ipfs.io/ipfs/");
            Promise.resolve(owner).then((value) => {
              // console.log("value123", value);
              let ownerW = value;
              let meta = {
                name: name,
                img: image,
                tokenId: token,
                wallet: ownerW,
                desc,
              };
              // console.log(meta);
              itemArray.push(meta);
            });
          }
        });
      }
    });
    await new Promise((r) => setTimeout(r, 2000));
    setNfts(itemArray);
    setLoadingState("loaded");
  }

  async function getCreatedNFTs() {
    var address = nftcustom;
    var network = rpc;
    const provider = new ethers.providers.JsonRpcProvider(network);
    const contract = new ethers.Contract(address, NFT, provider);
    const itemArray = [];
    contract._tokenIds().then((result) => {
      console.log("result2", result.toNumber());
      for (let i = 0; i < result; i++) {
        var token = i + 1;
        const owner = contract.ownerOf(token).catch(function (error) {
          console.log("tokens filtered");
        });
        const rawUri = contract.tokenURI(token).catch(function (error) {
          console.log("tokens filtered");
        });
        const Uri = Promise.resolve(rawUri);
        const getUri = Uri.then((value) => {
          console.log("value2", value.length);
          var cleanUri = value.includes("ipfs.infura.io")
            ? value.replace("ipfs.infura.io", "infura-ipfs.io")
            : value;
          // console.log("cleanUri2", cleanUri.length);
          let metadata =
            cleanUri.length > 70 &&
            axios.get(cleanUri).catch(function (error) {
              console.log(error.toJSON());
            });
          return metadata;
        });
        getUri.then((value) => {
          // console.log("value1", value);
          if (value) {
            let rawImg = value.data.image;
            var name = value.data.name;
            var desc = value.data.description;
            let image = rawImg.replace("ipfs://", "https://ipfs.io/ipfs/");
            Promise.resolve(owner).then((value) => {
              let ownerW = value;
              let meta = {
                name: name,
                img: image,
                tokenId: token,
                wallet: ownerW,
                desc,
              };
              console.log(meta);
              itemArray.push(meta);
            });
          }
        });
      }
    });
    await new Promise((r) => setTimeout(r, 2000));
    getCreated(itemArray);
    setLoadingState("loaded");
  }

  async function refreshNFTs() {
    connectUser();
    setRpc();
    getCreatedNFTs();
    getWalletNFTs();
    getChain();
  }

  async function connectWallet() {
    connectUser();
    setRpc();
    getChain();
  }

  // useEffect(() => {
  //   console.log("created", created);
  // }, [created]);

  // useEffect(() => {
  //   console.log("nfts", nfts);
  // }, [nfts]);

  // useEffect(() => {
  //   console.log("user", user);
  // }, [user]);

  // if (loadingState === "loaded" && !created.length)
  //   return (
  //     <Container sm>
  //       <Row>
  //         <Col>
  //           <Text h3>No NFT's Found, Connect Wallet</Text>
  //           <Button
  //             size="sm"
  //             color="gradient"
  //             onPress={refreshNFTs}
  //             style={{ fontSize: "20px" }}
  //           >
  //             Refresh
  //           </Button>
  //         </Col>
  //       </Row>
  //       <Spacer></Spacer>
  //     </Container>
  //   );
  return (
    <div>
      <Container md>
        <Row>
          <Col
            css={{
              size: "$50",
              paddingTop: "$4",
              "@media screen and (max-width:770px)": { width: "100%" },
            }}
          >
            <Card
              css={{
                p: "$9",
                backgroundColor: "$blue200",
              }}
            >
              <Row css={{ flexWrap: "wrap" }}>
                <Text h4 css={{ marginRight: "$3" }}>
                  Switch Blockchain
                </Text>
                <Button
                  size="sm"
                  onPress={polyChain}
                  css={{ marginRight: "$2" }}
                >
                  <img src="polygonwhite.png" width={"100px"} />
                </Button>
                <Button
                  size="sm"
                  onPress={bscChain}
                  css={{ marginRight: "$2" }}
                >
                  <img src="bsc.png" width={"100px"} />
                </Button>
                <Button size="sm" onPress={ethChain}>
                  <img src="ethereumlogo.png" width={"100px"} />
                </Button>
              </Row>
              <Card css={{ p: "$4", marginTop: "$3" }}>
                <Text h3>
                  Wallet
                  <Text css={{ overflowWrap: "break-word", color: "#39FF14" }}>
                    {user}
                  </Text>
                </Text>
                <Text h6>Selected Chain: {chain}</Text>
                <Row>
                  {!user && (
                    <Button
                      size="sm"
                      color="gradient"
                      onPress={connectWallet}
                      style={{ fontSize: "20px", marginRight: "4px" }}
                    >
                      Connect
                    </Button>
                  )}
                  <Button
                    size="sm"
                    color="gradient"
                    onPress={refreshNFTs}
                    style={{ fontSize: "20px" }}
                  >
                    Refresh
                  </Button>
                </Row>
              </Card>
            </Card>
          </Col>
        </Row>
        <Row>
          <Grid.Container gap={3}>
            {nfts.map((nft, i) => {
              // console.log("nft=====", nft);
              var owner = user;
              if (owner.indexOf(nft.wallet) !== -1) {
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
                  var resell = nftresell;
                  const web3Modal = new Web3Modal();
                  const connection = await web3Modal.connect();
                  const provider = new ethers.providers.Web3Provider(
                    connection
                  );
                  const signer = provider.getSigner();
                  const price = ethers.utils.parseUnits(
                    resalePrice.price,
                    "ether"
                  );
                  const contractnft = new ethers.Contract(
                    nftcol,
                    NFTCollection,
                    signer
                  );
                  await contractnft
                    .setApprovalForAll(resell, true)
                    .catch((err) => {
                      console.log("err", err);
                      setVisible(false);
                    });
                  let contract = new ethers.Contract(resell, Resell, signer);
                  let listingFee = await contract.getListingFee();
                  listingFee = listingFee.toString();
                  let transaction = await contract
                    .listSale(nft.tokenId, price, {
                      value: listingFee,
                    })
                    .catch(() => {
                      setVisible(false);
                    });
                  if (!transaction) {
                    return;
                  }
                  await transaction.wait();
                  router.push("/");
                }
                return (
                  <Grid key={i}>
                    <a>
                      <Card
                        isHoverable
                        css={{ mw: "200px", marginRight: "$1" }}
                        variant="bordered"
                      >
                        <Card.Image src={nft.img} />
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
                            onPress={executeRelist}
                            style={{ fontSize: "20px" }}
                            disabled={
                              resalePrice.price.length && resalePrice.price > 0
                                ? false
                                : true
                            }
                          >
                            Relist for Sale
                          </Button>
                        </Card.Body>
                      </Card>
                    </a>
                  </Grid>
                );
              }
            })}
          </Grid.Container>
        </Row>
      </Container>
      <Spacer></Spacer>
      <Container md>
        <Text h4>Personal NFTs</Text>
        <Row>
          <Grid.Container justify="flex-start" gap={3}>
            {created.map((nft, i) => {
              var owner = user;
              if (owner.indexOf(nft.wallet) !== -1) {
                async function executeRelist(listPrice) {
                  const { price } = listPrice;
                  if (!price) return;
                  try {
                    relistNFT(listPrice);
                  } catch (error) {
                    console.log("Transaction Failed", error);
                  }
                }
                async function relistNFT(listPrice) {
                  setVisible(true);
                  var address = market;
                  const web3Modal = new Web3Modal();
                  const connection = await web3Modal.connect();
                  const provider = new ethers.providers.Web3Provider(
                    connection
                  );
                  const signer = provider.getSigner();
                  const price = ethers.utils.parseUnits(
                    listPrice.price,
                    "ether"
                  );
                  const contractnft = new ethers.Contract(
                    nftcustom,
                    NFT,
                    signer
                  );

                  if (chain == "Binance") {
                    await contractnft
                      .setApprovalForAll(address, true, {
                      })
                      .then(async (res) => {
                        console.log("res1", res);
                        const filter = {
                          address: nftcustom,
                          topics: [
                            "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31",
                          ],
                        };
                        provider.on(filter, async (data) => {
                          console.log("data", data);
                          const contract = new ethers.Contract(
                            address,
                            Market,
                            signer
                          );
                          let listingFee = await contract.getListingFee();
                          listingFee = listingFee.toString();
                          let transaction = await contract
                            .createVaultItem(nftcustom, nft.tokenId, price, {
                              value: listingFee,
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
                      .catch((err) => {
                        console.log("err", err);
                        setVisible(false);
                      });
                  } else {
                    await contractnft
                      .setApprovalForAll(address, true, {
                        gasPrice: "50000000000",
                      })
                      .then(async (res) => {
                        console.log("res", res);
                        const filter = {
                          address: nftcustom,
                          topics: [
                            "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31",
                          ],
                        };
                        provider.on(filter, async (data) => {
                          console.log("data", data);
                          const contract = new ethers.Contract(
                            address,
                            Market,
                            signer
                          );
                          let listingFee = await contract.getListingFee();
                          listingFee = listingFee.toString();
                          let transaction = await contract
                            .createVaultItem(nftcustom, nft.tokenId, price, {
                              value: listingFee,
                              gasPrice: "50000000000",
                            })
                            .catch((err) => {
                              console.log("err", err);
                              if (
                                err.data?.message.includes("insufficient funds")
                              ) {
                                window.alert(err.data.message);
                              }
                              setVisible(false);
                            });
                          if (!transaction) {
                            return;
                          }
                          await transaction.wait();
                          router.push("/");
                        });
                      })
                      .catch((err) => {
                        console.log("err", err);
                        if (err.data?.message.includes("insufficient funds")) {
                          window.alert(err.data.message);
                        }
                        setVisible(false);
                      });
                  }
                }
                return (
                  <Grid key={i}>
                    <a>
                      <ListCard nft={nft} executeRelist={executeRelist} />
                    </a>
                  </Grid>
                );
              }
            })}
          </Grid.Container>
        </Row>
      </Container>
      <LoadingPopup visible={visible} setVisible={setVisible} />
    </div>
  );
}
