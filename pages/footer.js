/* eslint-disable @next/next/no-img-element */
import "sf-font";
import { Text, Row, Spacer, Container, Col, Grid } from "@nextui-org/react";
import Link from "next/link";

export default function Footer() {
  const footer1 = [
    {
      id: 1,
      img: "discord.png",
      url: "https://discord.com/",
    },
    {
      id: 2,
      img: "youtube.png",
      url: "https://www.youtube.com/",
    },
    {
      id: 3,
      img: "twitter.png",
      url: "https://twitter.com/",
    },
  ];

  const footer2 = [
    {
      id: 1,
      img: "bsc.png",
    },
    {
      id: 2,
      img: "polygonwhite.png",
    },
    {
      id: 3,
      img: "ethereumlogo.png",
    },
    {
      id: 4,
      img: "flarelogo.png",
    },
    {
      id: 5,
      img: "songbirdlogo.png",
    },
  ];

  return (
    <div>
      <Spacer></Spacer>
      <Container css={{ borderTop: "1px solid #B22222" }}>
        <Container gap={3}>
          <Grid.Container gap={2} justify="center">
            <Grid xs={12}>
              <Col>
                <Link href={"/"}>
                  <Text
                    h2
                    css={{
                      textAlign: "center",
                      color: "#fff",
                      fontSmooth: "always",
                      textShadow: "-0px 0px 3px #ffffff",
                      fontFamily: "SF Pro Display",
                      fontWeight: "700",
                    }}>
                    Monsters NFT Inc: Connect Everything
                  </Text>
                </Link>
                <Text
                  css={{
                    textAlign: "center",
                    color: "#fff",
                    fontSmooth: "always",
                    fontFamily: "SF Pro Display",
                  }}>
                  The blockchain agnostic marketplace. The token with endless
                  posibilities. NFTs are more than just art. Its meant to change
                  the way humans establish ownership of an asset beyond paper.
                </Text>
              </Col>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={2} justify="center">
            <Grid md={4}>
              <Col>
                <Text css={{ marginTop: "3px", textAlign: "center" }} h4>
                  Follow Us!
                </Text>
                <Text span css={{ textAlign: "center", display: "block" }}>
                  {footer1.map((item, idx) => {
                    return (
                      <a href={item.url} key={item.id}>
                        <img
                          src={item.img}
                          style={{ marginRight: "1px" }}
                          width="150px"
                          height="50px"></img>
                      </a>
                    );
                  })}
                </Text>
              </Col>
            </Grid>
            <Grid md={4}>
              <Col>
                <Text css={{ marginTop: "3px", textAlign: "center" }} h4>
                  Integrations
                </Text>
                <Text span css={{ textAlign: "center", display: "block" }}>
                  {footer2.map((item, idx) => {
                    return (
                      <img
                        src={item.img}
                        style={{ marginRight: "5px" }}
                        width="50px"
                        height="50px"
                        key={item.id}></img>
                    );
                  })}
                </Text>
              </Col>
            </Grid>
            <Grid md={4}>
              <Col style={{ marginLeft: "5px" }}>
                <Text span css={{ textAlign: "center" }}>
                  <a href="">
                    <img
                      src="discordlogo.png"
                      style={{
                        width: "200px",
                      }}
                    />
                  </a>
                </Text>
              </Col>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={2} justify="center">
            <Grid xs={12}>
              <Col>
                <Text p css={{ textAlign: "center" }}>
                  ©2022 Monsters NFT Inc. - All Rights Reserved.
                </Text>
              </Col>
            </Grid>
          </Grid.Container>
        </Container>
      </Container>
    </div>
  );
}
