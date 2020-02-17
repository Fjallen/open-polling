import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const QUERY_POLL = gql`
{
  poll(id:180471){
    title
    selections{
      selectNum
      selectString
    }
  }
}`;

//First letter has to be capital
export default function LoadPoll(){
    const {loading, error, data} = useQuery(QUERY_POLL);
    if (loading)return <p>LOADING</p>;
    if (error) return <p>ERROR</p>;
    return (
    <div>{data.poll.title}</div>
    );
  }