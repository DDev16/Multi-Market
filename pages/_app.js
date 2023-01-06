import { createTheme, NextUIProvider } from "@nextui-org/react";
import "sf-font";
import Link from "next/link";
import { Button, Col, Row, Container } from "@nextui-org/react";
import Footer from "./footer";
import ConnectChain from "../engine/connectchain";
import { SSRProvider } from "react-bootstrap";



const theme = createTheme({
  type: "dark",
  theme: {
    fontFamily: "SF Pro Display",
    colors: {
      primaryLight: "$blue200",
      primaryLightHover: "$blue300",
      primaryLightActive: "$blue400",
      primaryLightContrast: "$blue600",
      primary: "$purple500",
      primaryBorder: "$blue500",
      primaryBorderHover: "$blue600",
      primarySolidHover: "$blue700",
      primarySolidContrast: "$white",
      primaryShadow: "$white500",
      transparent: "#00000000",

      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple300 90%)",
      link: "#5E1DAD",

      myColor: "#00000030",
    },
    space: {},
    fonts: {},
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <div style={{ background: "black" }}>
        <Container lg css={{ marginTop: "$5" }}>
          <Row css={{ justifyContent: "center", flexWrap: "wrap " }}>
            <Col css={{ marginTop: "$8", width: "auto" }}>
              <img style={{ width: "220px" }} src="n2DMarket.png" />
            </Col>
          </Row>
          <Row
            css={{
              justifyContent: "space-evenly",
              flexWrap: "wrap ",
              alignItems: "center",
              mb: "20px",
              "& > *": { width: "auto !important" },
            }}>
            <Col css={{ marginTop: "$8" }}>
              <Button
                size="sm"
                style={{
                  background: "#00000070",
                  boxShadow: "0px 0px 4px #ffffff",
                }}>
                <Link href="/">
                  <a
                    style={{
                      fontFamily: "SF Pro Display",
                      fontWeight: "500",
                      color: "white",
                      fontSize: "17px",
                    }}>
                    MarketPlace
                  </a>
                </Link>
              </Button>
            </Col>

            <Col css={{ marginTop: "$8" }}>
              <Button
                size="sm"
                style={{
                  background: "#00000070",
                  boxShadow: "0px 0px 4px #ffffff",
                }}>
                <Link href="/collection">
                  <a
                    style={{
                      fontFamily: "SF Pro Display",
                      fontWeight: "500",
                      color: "white",
                      fontSize: "17px",
                    }}>
                    Collection
                  </a>
                </Link>
              </Button>
            </Col>

            <Col css={{ marginTop: "$8" }}>
              <Button
                size="sm"
                style={{
                  background: "#00000070",
                  boxShadow: "0px 0px 4px #ffffff",
                }}>
                <Link href="/create">
                  <a
                    style={{
                      fontFamily: "SF Pro Display",
                      fontWeight: "500",
                      color: "white",
                      fontSize: "17px",
                    }}>
                    Create Portal
                  </a>
                </Link>
              </Button>
            </Col>
            <Col css={{ marginTop: "$8" }}>
              <Button
                size="sm"
                style={{
                  background: "#00000070",
                  boxShadow: "0px 0px 4px #ffffff",
                }}>
                <Link href="/portal">
                  <a
                    style={{
                      fontFamily: "SF Pro Display",
                      fontWeight: "500",
                      color: "white",
                      fontSize: "17px",
                    }}>
                    My NFT Portal
                  </a>
                </Link>
              </Button>
            </Col>
            <ConnectChain />
          </Row>
        </Container>
        <NextUIProvider theme={theme}>
          <Component {...pageProps} />
        </NextUIProvider>
        <Footer>
          <Footer />
        </Footer>
      </div>
    </SSRProvider>
  );
}

export default MyApp;
