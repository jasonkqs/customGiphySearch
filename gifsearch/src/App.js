import React from 'react';
import './App.css';
import axios from 'axios';
const API_KEY = '7ApuiRFtug1IIWK7dhr268tXtT09U6x2';
const API_URL = 'http://api.giphy.com/v1/gifs/search';


class App extends React.Component {
  constructor() {
    super();
    this.state = { input: '', results: [], limit: [] };
  }
  getInfo = () => {
    axios.get(`${API_URL}?api_key=${API_KEY}&q=${this.state.input}&limit=${this.state.limit}`)
      .then(res => {
        // console.log(res.data.data);
        this.setState({ results: res.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleChange = (e) => {
    this.setState({ 
      input: e.target.value 
    });
  }
  handlelimit= (e) => {
    this.setState({ 
      limit: e.target.value 
    });
  }
  handleClick = () => {
    if(this.state.input && this.state.input.length > 0) {
      this.getInfo();
    }
  }
  handleMouseEnter = (e) => {
    this.state.results.forEach((item)=>{
      if(item.id === e.target.id) {
        e.target.src = item.images.fixed_height.url;
      }
    });
  }
  handleMouseLeave = (e) => {
    this.state.results.forEach((item)=>{
      if(item.id === e.target.id) {
        e.target.src = item.images.fixed_height_still.url;
      }
    });
  }
  render() {
    return (
      <div className="App">
        <div className="container-search">
          <input className="input-field" type="text" placeholder="input keywords" value={this.state.input} onChange={this.handleChange}/>
          <br/>
          <b># of gifs: </b>
          <select className="select-box" type="number" onChange={this.handlelimit}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
          <button className="button" type="button" onClick={this.handleClick}>search</button>
        </div>
        <div className="container-display">
          {this.state.results.map((item, index) => {
            return (
              <span key={index} >
                <img width="250" height="250" id={item.id} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} src={item.images.fixed_height_still.url} alt="animated"/>
                &nbsp;
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;