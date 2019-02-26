import React, { Component } from 'react';
import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
  SingleDropdownList 
} from '@appbaseio/reactivesearch';
import './App.css';
import { Config } from './config.js';

const LogoMain = (props) => {
  return (
    <div className="title-wrapper" style={props.visible ? {display: "block"} : {display: "none"}}>
      <h1 className="title">comicfi</h1>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTyping: false
    }
  }

  _renderResults(res) {
    return(
      <div className="result">
        <div className="result-content">
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <p>{res.comic}</p>
            <p>{res.title}</p>
          </div>
          <a href={res.url} target="_blank"><img src={res.orig_img}/></a>
        </div>
      </div>
    );
  };

  _renderNoResults(res) {
    return (
      <div className="result">
          <div className="result-content">
            <p>No results found</p>
          </div>
        </div>
    );
  } 

  _onChange(e) {
    e.target.parentNode.parentNode.parentNode.classList.add("top");
    e.target.parentNode.parentNode.classList.add("top");
    e.target.classList.add("top");
    this.setState({isTyping: true});
    //else this.setState({isTyping: true});
    //e.target.parentNode.classList.add("top");
  }

  _resetSearch(e) {
    if (e.target.value === "") {
      this.setState({isTyping: false});
      e.target.parentNode.parentNode.parentNode.classList.remove("top");
      e.target.parentNode.parentNode.classList.remove("top");
      e.target.classList.remove("top");
    }
  }

  render() {
    return (
      <div>
        <div className="top-bar" style={this.state.isTyping ? {display: "block"} : {display: "none"}}>
        </div>
        <LogoMain visible={!this.state.isTyping}/>
        <ReactiveBase app={Config.es.indexes} url={Config.es.es_url}>
          <div className="search-wrapper">
            <DataSearch className="search-box"
              componentId="searchbox"
              dataField={["comic", "transcript", "title"]}
              placeholder="Search for a web comic..."
              autosuggest={false}
              fuzziness={1}
              onKeyPress={(e) => {this._onChange(e)}}
              onKeyDown={(e) => {this._resetSearch(e)}}
              autoFocus={true}
            />
          </div>
          <div className="results-wrapper" style={this.state.isTyping ? {diplay: "block"} : {display: "none"}}>
            <div className="results-list">
              <ReactiveList
                componentId="results"
                dataField="transcript.keyword"
                react={{and: ["searchbox", "comicFilters"]}}
                stream={false}
                renderData={this._renderResults}
                showResultStats={false}
                renderNoResults={this._renderNoResults}
              />
            </div>
            <div className="sidebar-container">
              <div className="sidebar-content">
                <SingleDropdownList className="dropdown"
                  placeholder="Select comic..."
                  componentId="comicFilters"
                  dataField="comic.keyword"
                  data={[
                    {label: "Cyanide and Happiness", value: "Cyanide and Happiness"},
                    {label: "Questionable Content", value: "Questionable Content"},
                    {label: "smbc", value: "smbc"},
                    {label: "xkcd", value: "xkcd"}
                  ]}
                  react={{and: ["searchbox"]}}
                  showSearch={false}
                />
              </div>
            </div>
          </div>
        </ReactiveBase>
      </div>
    );
  }
}

export default App;
