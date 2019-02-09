import React, { Component } from 'react';
import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
  SingleDataList,
  SingleDropdownList 
} from '@appbaseio/reactivesearch';
import './App.css';

class App extends Component {
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

  render() {
    return (
      <div>
        <h1 style={{textAlign: "center", marginTop: "1em", color: "white"}}>comicfi</h1>
        <ReactiveBase app="xkcd,smbc,cah,qc" url="http://35.207.29.23:9200/">
          <div className="search-wrapper">
              <DataSearch className="search-box"
                componentId="searchbox"
                dataField={["comic", "transcript", "title"]}
                placeholder="Search for comics"
                autosuggest={false}
                fuzziness={1}
              />
          </div>
          <div className="results-wrapper">
            <div className="results-list">
              <ReactiveList
                componentId="list"
                dataField="transcript.keyword"
                react={{and: ["searchbox", "comicFilters"]}}
                stream={true}
                renderData={this._renderResults}
                showResultStats={false}
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
