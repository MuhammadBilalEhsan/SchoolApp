import React from "react";
import "../css/Spinner.css";
import Loader from "react-loader-spinner";

const Spinner = () => {
    return (
        <div id="main_spinner_div">
            <div id="sub_spinner_div">
                <Loader type="Puff" color="green" height={"80%"} width={"80%"} />
            </div>
        </div>
    );
};

export default Spinner;