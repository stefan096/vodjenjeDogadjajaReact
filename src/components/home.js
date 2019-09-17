import * as Constants from '../constants'
import React from 'react';
import NavBar from './navBar';

export default class Home extends React.Component{

    constructor(){
        super();
        this.state = {
            isLoading: true, //da li nije stigao da prikaze pa da prikazem drugaciju poruku
            groups: [], //upamti dovucene podatke
        }
    }

    async componentDidMount(){ //komponenta je kreiranja i insertovana u dom stablo
        const response = await fetch(Constants.PUTANJA + '/api/groups'); 
        const body = await response.json();
        this.setState(
            {
                groups: body,
                isLoading: false, //uspesno je loadovan
            }
        )
    }

    render(){
        const {groups, isLoading} = this.state;

        if(isLoading){
            return <p>Loading ...</p>;
        }

        return (
            <div>
                <NavBar></NavBar>
                <h2>Prikaz GRUPA</h2>
                {groups.map( group => 
                    <div key={group.id}>
                        <label>Naziv: {group.name}</label>
                        <br></br>
                        <label>Adresa: {group.address}-{group.city}-{group.stateOrProvince}-{group.country}
                        -{group.postalCode}</label>
                        <br></br>
                        <label>--------------------------------------------------</label>
                    </div>
                )}
            </div>
        );
    }
}
