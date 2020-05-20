import React from "react";

import FetchCodingIntro from "../Fetch/FetchCodingIntro.js";
import FetchCoding from "../Fetch/FetchCoding.js";
import Fetch2dDesign from "../Fetch/Fetch2dDesign";
import Fetch3dDesign from "../Fetch/Fetch3dDesign.js";
import FetchAnimation from "../Fetch/FetchAnimation.js";

class GatherPages extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <FetchCodingIntro/>
                <FetchCoding/>
                <Fetch2dDesign/>
                <Fetch3dDesign/>
                <FetchAnimation/>
            </div>
        )
    }
}

export default GatherPages;