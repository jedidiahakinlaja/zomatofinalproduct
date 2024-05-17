import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Header from "./header";
import Details from "./details";
import Homepage from "./home"
import Filter from "./filter";

// const BASE_URL = window.env.REACT_APP_BASE_URL;
// const BASE_URL ="https://zomatofinalproduct.onrender.com";

const Router = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = () => {
            axios({
                url: 'https://zomatofinalproduct.onrender.com/auth/login/success',
                method: 'GET',
                headers: { 'Content-Type': 'application/JSON'},
                withCredentials:true,
                optionSuccessStatus: 200,
                origin: 'https://zomatofinalproduct.onrender.com'

            })
            .then((response) => {
                if(response.status === 200) return response.json();
                throw new Error ("Authentication Failed");
            })
            .then((resObject) => {
                setUser(resObject.user);
            })
            .catch((err) => {
                console.log(err);
            })
        };
        getUser();
    }, []);

    return(
        <BrowserRouter>
            <Header user = {user} />
            <Routes>
                <Route path="/" element={<Homepage payStatus="none" />} />
                <Route path="/filter" element={<Filter />} />
                <Route path="/details" element={<Details />} />

                <Route path="/success" element={<Homepage payStatus="success" />} />
                <Route path="/cancel" element={<Homepage payStatus="fail" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
