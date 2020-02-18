import React from 'react';
import {useParams} from 'react-router-dom'
import Poll from '../components/poll'
import "./pollPage.css"
//Remember to capitalize names
const PollPage= ()=>{
    let {pollId} = useParams();
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

export default PollPage;