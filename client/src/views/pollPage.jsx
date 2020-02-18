import React from 'react';
import {useParams} from 'react-router-dom'
import Poll from '../components/poll'

import "./pollPage.css"
//Reporting Statistics is Currently a WIP

//Remember to capitalize names
const PollPage= ()=>{
    let {pollId} = useParams();
    //Handling if user has submitted
    //Will be swapped to statistics reporting
    if (localStorage.getItem(pollId)==="true"){
        return (
            <div>
                <h1>You Have Already Submitted To This Poll</h1>
            </div>
        )
    }
    else{
        return(
            <div className="background">
                <div id="poll-container">
                    <Poll
                        id={pollId}
                    />
                </div>
            </div>
        )
    }
}

export default PollPage;