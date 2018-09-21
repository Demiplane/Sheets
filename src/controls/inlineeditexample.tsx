import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <FocusTesty />
      </div>
    );
  }
}

class FocusTesty extends Component {
  constructor(props) {
    super(props);

    this.state = {focus: false, val:'initial'};

    this.textInput = React.createRef();

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onFocus(evt) {
    console.log('focus');
    this.setState({focus: true});
  }

  onChange(evt) {
    this.setState({val: evt.target.value});
  }

  onBlur(evt) {
    this.setState({focus: false});
  }

  handleFocus(event) {
    event.target.select();
  }

  componentDidUpdate () {
    if (this.state.focus) {
      
    var elem = this.textInput.current;

    if (elem) {
      elem.focus();
    }
    }
  }

  onKeyUp(e) {
    if (e.key === 'Enter') {
    this.setState({focus:false});
    }
  }

  render() {

    var dom = (
      this.state.focus ?
      <input ref={this.textInput} onBlur={this.onBlur} value={this.state.val} onChange={this.onChange} onKeyUp={this.onKeyUp} onFocus={this.handleFocus} /> :
      <p onClick={this.onFocus}>{this.state.val}</p>
    );


    return dom;
  }
}



export default App;
