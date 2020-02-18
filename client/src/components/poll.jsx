import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Selection from "./selection";

//Function for Querying A Poll and getting required data
function QUERY_POLL(pollId){
  return gql`
  {
    poll(id:${pollId}){
      title
      selections{
        selectNum
        selectString
      }
    }
  }`
}

//First letter has to be capital
const Poll=(props)=>{
    //Testing out Hooks, I don't think its ready 
    const [selectId,setId] = useState(0);
    const [errorMsg, setError]= useState(null);
    //Handle Change
    function changeHandler(id){
      setId(id);
    };
    //Generic Post Request
    async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return await response.json(); // parses JSON response into native JavaScript objects
    }
    
    //Handle submit
    async function submitResponse(event){
      //Submit result to server
      //Check if something is selected
      if (selectId !== 0){
        //Send POST request rather than GQL mutation due to IP being overriden
        //Can migrate to Axios later, this is just to show I know fetch
        postData(`http://localhost:3002/poll/${props.id}`, {'selection':selectId})
        .then((data) => {
          console.log(data);
        });
      }
      else{
        //Show a message saying poll not selected
        setError("Nothing is selected")
      }
      event.preventDefault()
    }
    //Renders list of selections
    function SelectionList(props){
      const selections = props.selections
      const selectionItems = selections.map((selection)=>{
        return(
          <Selection
            key={selection.selectNum}
            selectedId={selectId}
            rowData={selection}
            onSelect={changeHandler}
          />
        )});
      return selectionItems
    }
    const {loading, error, data} = useQuery(QUERY_POLL(props.id));
    if (loading)return <p>LOADING</p>;
    if (error) return <p>ERROR</p>;
    return (
      <div>
        <Card style={{width:'30rem'}}>
          <Card.Header as="h4">{data.poll.title}</Card.Header>
          <Card.Body>
          <Card.Subtitle>Choose one answer:</Card.Subtitle>
          <table>
          <tbody>
          <SelectionList
              selections={data.poll.selections}
            />
          </tbody>
          </table>
            <Button onClick={submitResponse}>Vote</Button>
            {errorMsg &&
            <Alert variant='warning'>{errorMsg}</Alert>
            }
          </Card.Body>
        </Card>
      </div>
    );
  }
export default Poll;