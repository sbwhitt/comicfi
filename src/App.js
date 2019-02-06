import React, { Component } from 'react';
import { ReactiveBase, DataSearch, ReactiveList, SingleDataList } from '@appbaseio/reactivesearch';
import './App.css';

class App extends Component {
  _renderResults(res) {
    return(
      <div style={{alignItems: "center"}}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "1em", marginBottom: "1em"}}>
          <a href={res.url} target="_blank">link</a>
          <p>{res.comic}</p>
          <p>{res.title}</p>
        </div>
        <img src={res.orig_img}/>
      </div>
    );
  };

  render() {
    return (
      <ReactiveBase app="xkcd,smbc,cah,qc" url="http://35.207.29.23:9200/">
        <h1 style={{textAlign: "center", marginTop: "2em"}}>fakecomicfi</h1>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "6em"}}>
          <div style={{width: "75%"}}>
            <DataSearch
              componentId="searchbox"
              dataField={["comic", "transcript"]}
              placeholder="Search for comics"
              autosuggest={false}
            />
            <SingleDataList style={{marginLeft: "40%"}}
              componentId="filters"
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
          <div style={{width: "50%"}}>
            <ReactiveList
              componentId="list"
              dataField="transcript.keyword"
              react={{and: ["searchbox", "filters"]}}
              stream={true}
              renderData={this._renderResults}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }
}

export default App;
