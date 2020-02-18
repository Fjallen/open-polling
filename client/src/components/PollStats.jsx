import React,{useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Chart from 'react-google-charts';


//This Component is currently a WIP
function QUERY_POLL_RESULTS(pollId){
    return gql`
    {
      poll(id:${pollId}){
        title
        responses{
            selection
        }
      }
    }`
  }
  //Need to Aggregate Results, Transfering Load to Server May be better
function aggregate(arr) {
    var a = [], b = [], prev;
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return b;
}
const PollStats = (props)=>{
    const {loading, error, data} = useQuery(QUERY_POLL_RESULTS(props.id));
    //Build Resulting Chart
    if (loading)return <p>LOADING</p>;
    if (error) return <p>ERROR</p>;
    function countSelection(){

    }
    return (
        <Card style={{width:'40rem'}}>
          <Card.Header as="h4">Results for {data.poll.title}</Card.Header>
          <Card.Body>
          </Card.Body>
        </Card>
    )
}

export default PollStats;