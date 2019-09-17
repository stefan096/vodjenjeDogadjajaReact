import React from 'react';
import * as Constants from '../../constants';
import { Link, withRouter } from 'react-router-dom';
import NavBar from '../navBar';
//import * as bs from 'reactstrap';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class EditGroup extends React.Component{

    emptyGroup = {
        name: '',
        address: '',
        city: '',
        stateOrProvince: '',
        country: '',
        postalCode: ''
      };


    constructor(props){
        super(props);
        this.state = {
            group: this.emptyGroup
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        if(this.props.match.params.id !== 'new' && this.props.match.params.id !== undefined){
            const response = await fetch(Constants.PUTANJA + '/api/group/' + this.props.match.params.id); 
            const body = await response.json();
            this.setState({
                group: body
            })
        }
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let group = {...this.state.group};
        group[name] = value;
        this.setState({
            group: group
        })
    }

    async handleSubmit(event){
        event.preventDefault();
        const {group} = this.state;
        let putanja = Constants.PUTANJA + '/api/group';
        if(group.id){
            putanja += '/' + group.id;
        }

        await fetch(putanja, {
            method: (group.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(group),
        });
        //ako se nije desio error
        if (!this.state.error){
            //redirekcija na prikaz svih grupa
            this.props.history.push('/groups');
        }
       
    }

    render(){
        const {group} = this.state;
        const title = <h2>{group.id ? 'Edit Group' : 'Add Group'}</h2>;

        return (
            <div>
                <NavBar></NavBar>
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" value={group.name || ''} 
                                onChange={this.handleChange} autoComplete="name" placeholder="name"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input type="text" name="address" id="address" value={group.address || ''} 
                                onChange={this.handleChange} placeholder="address" autoComplete="address"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input type="text" name="city" id="city" value={group.city || ''} 
                                onChange={this.handleChange} placeholder="city" autoComplete="city"/>
                        </FormGroup>
                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                            <Label for="stateOrProvince">State/Province</Label>
                            <Input type="text" name="stateOrProvince" id="stateOrProvince" value={group.stateOrProvince || ''}
                                    onChange={this.handleChange} placeholder="stateOrProvince" autoComplete="stateOrProvince"/>
                            </FormGroup>
                            <FormGroup className="col-md-5 mb-3">
                            <Label for="country">Country</Label>
                            <Input type="text" name="country" id="country" value={group.country || ''}
                                    onChange={this.handleChange} placeholder="country" autoComplete="country"/>
                            </FormGroup>
                            <FormGroup className="col-md-3 mb-3">
                            <Label for="country">Postal Code</Label>
                            <Input type="text" name="postalCode" id="postalCode" value={group.postalCode || ''}
                                    onChange={this.handleChange} placeholder="postalCode" autoComplete="postalCode"/>
                            </FormGroup>
                        </div>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/groups">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
    }

}

export default withRouter(EditGroup);