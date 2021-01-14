import React, { Component } from 'react';
import axios from 'axios';

import ZipCard from './ZipCard';

class SearchBar extends Component {

    //constructor
    constructor () {
        super();
        this.state = {
            data: [],
            zip: "",
            zipFound: false,
        };

        //bind methods to this
        this.changeZip = this.changeZip.bind(this);
        this.getZipInfo = this.getZipInfo.bind(this);
    }

    // Change state of the zip when the user enters a new zip
    changeZip(event) {
        this.setState({zip: event.target.value});
    }

    // Get data about a zip using axios
    getZipInfo() {
        axios.get(`http://ctp-zip-api.herokuapp.com/zip/${this.state.zip}`)
        .then(response => {
            console.log(response.data);
            this.setState({ data: response.data, zipFound: true });
        })
        .catch(err => {
            console.log('error');
            this.setState({ zipFound: false });
        });
    }
    
    render() {
        return (
            // display a header section with a title, search bar, and button
            <div className='container'>
                <div className='searchArea'>
                    <h3>Zip Code Search</h3>
                    <p>Zip code: </p>
                    <input 
                        className='searchBar' 
                        type='text' 
                        value={this.state.zip} 
                        placeHolder='Please enter a zip code'
                        onChange={this.changeZip}
                    ></input>
                    <button 
                        className='searchButton' 
                        onClick={this.getZipInfo}
                    >Search</button>
                </div>

                {/* If ZIP exists, display information about the cities with that zip */}
                {this.state.zipFound ? (
                    <div className='ValidZipSection'>
                        {this.state.data.map((place, index) => (
                            <ZipCard 
                                key={index}
                                locationText={place.LocationText}
                                stateName={place.State}
                                lat={place.Lat}
                                long={place.Long}
                                estimatedPopulation={place.EstimatedPopulation}
                                totalWages={place.TotalWages}
                            />
                        ))}
                    </div>
                ) : (
                    <div className='InvalidZipSection'>
                        <p>No results</p>
                    </div>
                    )
                }
            </div>
        );
    }
}


export default SearchBar;