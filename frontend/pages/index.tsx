/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import Box from "@mui/material/Box";
import HeroSection from "../components/HeroSection";
import Container from "@mui/material/Container";
import AboutUs from "../components/AboutUs";
import MoreInfo from "../components/MoreInfo";
import ThreeReasons from "../components/ThreeReasons";
import BigMintPageButton from "../components/BigMintPageButton";
import Carousel from "../components/Carousel";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>Playful Ponies NFTs</title>
        <meta
          name="description"
          content="Mint your one of a kind Playful Ponies"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSection />
      <Container maxWidth="lg">
        <MoreInfo />
        <ThreeReasons />
        <Box display="flex" justifyContent="center" marginBottom="6rem">
          <BigMintPageButton />
        </Box>
      </Container>
      <Box padding=".1rem 0 .1rem 0" sx={{ backgroundColor: "#222da0" }}>
        <Carousel />
      </Box>
      <Container maxWidth="lg">
        <AboutUs />
        <FAQ />
        <Box display="flex" justifyContent="center" marginBottom="6rem">
          <BigMintPageButton />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;
