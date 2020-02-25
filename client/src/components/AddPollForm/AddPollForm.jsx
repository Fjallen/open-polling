import React from 'react';

import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class AddPollForm extends React.Component{
    constructor(){
        super();
        this.state ={
            title:"",
            selections:[{
                selectString:""        
            }]
        }
    }
    handleTitleChange = (evt)=>{
        this.setState({title:evt.target.value});
    }
    handleSelectionChange = (idx)=>(evt)=>{
        //Building updated Selection List
        const newSelections = this.state.selections.map((selection,id)=>{
            if (idx !== id) return selection;
            return {...selection,selectString:evt.target.value};
        })
        this.setState({selections:newSelections},()=>{
            if (this.state.selections.length - 1 === idx){
                if(this.state.selections.length - 1===idx){
                    this.handleAddSelection();
                }
            }
        })
    }
    handleAddSelection = () => {
        this.setState({
            selections: this.state.selections.concat([{ selectString: "" }])
        });
    };
    handleSubmit = evt => {
        console.log(this.state)
    };

    handleRemoveSelection = idx => () => {
        this.setState({
            selections: this.state.selections.filter((s, sidx) => idx !== sidx)
        });
    };
    render(){
        return (
            <Card style={{width:'40rem'}}>
                <Card.Header as="h3">Create a Poll</Card.Header>
                <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                <Form.Control 
                    type="title" 
                    placeholder="Enter the poll title" 
                    onChange={this.handleTitleChange}
                />
                {this.state.selections.map((selection,idx)=>(
                    <div key={idx}>
                        <Form.Control
                            type="text"
                            placeholder={`Selection #${idx+1}`}
                            value={selection.selectString}
                            onChange={this.handleSelectionChange(idx)}
                        />
                    </div>
                ))}
                <Button onClick={this.handleSubmit}>Create Poll</Button>
                </Form>
                </Card.Body>
            </Card>
        )
    }

}

export default AddPollForm;
