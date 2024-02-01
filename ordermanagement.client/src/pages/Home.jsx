// import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Home.css";
import ProductList from "./components/ProductList";

export default function Home() {
    return (
        <>
            <Navbar />
            <ProductList />
        </>
    );
}
