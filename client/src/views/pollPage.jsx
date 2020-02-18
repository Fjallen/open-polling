import React from 'react';
import {useParams} from 'react-router-dom'
import Poll from '../components/poll'
//Remember to capitalize names
const PollPage= ()=>{
    let {pollId} = useParams();
    return(
            <div>
                <Poll
                    id={pollId}
                />
            </div>
        )
}

export default PollPage;