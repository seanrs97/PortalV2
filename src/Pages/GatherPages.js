import React from "react";

import FetchCodingIntro from "../Fetch/FetchCodingIntro.js";
import FetchCoding from "../Fetch/FetchCoding.js";

class GatherPages extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <FetchCodingIntro/>
                <FetchCoding/>
            </div>
        )
    }
}

export default GatherPages;