import React from 'react';
import { color } from './styles/index'
import './App.css';
import { Header, FormDialog, AddQuestionForm } from './components'
import { Button } from '@material-ui/core';
import { toUNIXTimestamp, toUNIT } from './web3/common'
import {addQuestion} from './web3/index'
/**
 * MODIFY_TIME: in seconds
 */
const MODIFY_TIME = 15 * 60

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openForm: false,
      question: {
        value: '',
        reward: '',
        expireTime: new Date(),
      }
    }
  }
  handleDateChange(date) {
    this.setState({
      question: {
        ...this.state.question,
        expireTime: date
      }
    })
  }
  handleQuestionContentChange(content) {
    this.setState({
      question: {
        ...this.state.question,
        value: content
      }
    })
  }
  handleQuestionRewardChange(reward) {
    this.setState({
      question: {
        ...this.state.question,
        reward: reward
      }
    })
  }
  submitQuestion() {
    // convert date to UNIX format
    // add deadline2modify
    let question = this.state.question
    const reward = toUNIT(parseInt(question.reward))
    question = {
      ...question,
      expireTime: toUNIXTimestamp(question.expireTime),
      deadline2Modify: toUNIXTimestamp(question.expireTime) + MODIFY_TIME,
      timestamp: toUNIXTimestamp(new Date()),
      reward: undefined
    }
    addQuestion(question, undefined, reward)
  }
  render() {
    const { container, button } = styles
    return (
      <div style={container}>
        <Header />
        <Button style={button} variant="outlined" onClick={() => this.setState({ openForm: true, question: {...this.state.question, expireTime: new Date()} })}>
          what is your question ?
        </Button>
        <FormDialog 
        open={this.state.openForm} 
        handleClose={() => this.setState({ openForm: false })}
        handlePost={() => this.submitQuestion()}
        >
          <AddQuestionForm
            data={this.state.question}
            onDateChange={(date) => this.handleDateChange(date)}
            onContentChange={(content) => this.handleQuestionContentChange(content)}
            onRewardChange={(reward) => this.handleQuestionRewardChange(reward)}
          />
        </FormDialog>
      </div>
    );
  }
}
const styles = {
  button: {
    background: color.secondary,
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