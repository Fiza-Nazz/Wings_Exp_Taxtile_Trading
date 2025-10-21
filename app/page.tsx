import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Mission from "./components/Mission";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Services />
      <Mission />
      <Contact />
      <Footer />
    </div>
  );
}