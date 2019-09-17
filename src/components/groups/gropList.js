import React from 'react';
import * as Constants from '../../constants';
import NavBar from '../navBar';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class GroupList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            groups: [],
        }
        this.remove = this.remove.bind(this); //kazu da baci error posto nije inicijalizovana na pocetku
        //pa je onda bolje uraditi ovaj binding na taj nacin se inicilazijuje inace nista pametno
    }

    //nacin 1
    async componentDidMount(){ //kao ngOnInit
        const response = await fetch(Constants.PUTANJA + '/api/groups');
        const data = await response.json();
        this.setState(
            {
                isLoading: false,
                groups: data,
                selectedRow: -1
            }
        )
    }

    //nacin 2
    // componentDidMount(){
    //     fetch(Constants.PUTANJA + '/api/groups')
    //     .then(response => response.json())
    //     .then(data => this.setState(
    //         {
    //             isLoading: false,
    //             groups: data
    //         }
    //     ))
    //     .then(
    //         this.dovuciPodatke()
    //     );
    // }

    dovuciPodatke(){
        fetch(Constants.PUTANJA + '/api/groups')
        .then(response => response.json())
        .then(data => this.setState(
            {
                isLoading: false,
                groups: data
            }
        ))
    }

    async remove(id){
        await fetch(Constants.PUTANJA + `/api/group/${id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        })
            .then( () => {
                //NACIN 1, sam filtriraj
                let remainingGroups = [...this.state.groups].filter(i => i.id !== id);
                this.setState({
                    groups: remainingGroups,
                })
                //NACIN 2
                //this.dovuciPodatke();
            });
    }

    handleClick(id){
        //alert('kliknuto na ' + id);
        this.setState({
            selectedRow: id
        })
        //let tr = document.getElementById(id);
        //tr.className = "tableSelected";

    }

    //<tr key={i} onClick={this.changeColor(i)} className={this.state.selectedRow === i ? "tableSelected" : "" }>

    render(){
        const {groups, isLoading} = this.state;

        if(isLoading){
            return <p>Loading ...</p>;
        }

        const groupList = groups.map(group => {
            const address = `${group.address || ''}-${group.city || ''}-${group.stateOrProvince || ''} `;
            return <tr id={group.id} key={group.id} onClick={() => this.handleClick(group.id)} 
            className={this.state.selectedRow === group.id ? "tableSelected" : "" } >
                <td style={{whiteSpace: 'nowrap'}}>{group.name}</td>
                <td>{address}</td>
                <td> {group.events.map(event => {
                    return <div key={event.id}>
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(event.date))}: {event.title}
                    </div>
                })}
                </td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/groups/" + group.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
        <div>
            <NavBar></NavBar>
            <Container fluid>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/groups/new">Add Group</Button>
                </div>
                <h2>Groups view</h2>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="20%">Location</th>
                            <th>Events</th>
                            <th width="20%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupList}
                    </tbody>
                </Table>
            </Container>
        </div>
        );
    }
}