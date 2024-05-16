import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import Header from "./header";
import Details from "./details";
import Homepage from "./home"
import Filter from "./filter";

const BASE_URL = window.env.REACT_APP_BASE_URL;

const Router = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = () => {
            fetch(`${BASE_URL}/auth/login/success`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/JSON",
                    "Content-Type": "application/JSON",
                    "Access-Control-Allow-Credentials": true
                }
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
