import React from 'react';
import { color } from './styles/index'
import './App.css';
import {Header, AddQuestionForm} from './components'
import { Button } from '@material-ui/core';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      clicked: false
    }
  }
  render() {
    const {  container, button } = styles
    return (
      <div style={container}>
        <Header />
        <Button style={button} onClick={() => this.setState({clicked: true})}>
          what is your question ?
        </Button>
<AddQuestionForm/>
      </div>
    );
  }
}
const styles = {
  button: {
    background: 'white',
    alignSelf: 'center',
    marginTop: '10px' 
  },
  container: {
    background: color.primary,  
    height: '100vh',
    display: 'flex',
    flexDirection: "column"
  }
}
export default App;