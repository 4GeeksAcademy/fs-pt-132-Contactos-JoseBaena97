import React from "react";
import { Contact } from "./Contacts";


export const Home = () => {
    return (
        <div className="text-center mt-5">
            <h1>Bienvenido a tu Agenda</h1>
            <div className="container">
                <Contact />
            </div>
        </div>
    );
};