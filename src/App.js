import React from 'react';
import { color } from './styles/index'
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Header, FormDialog, AddQuestionForm, NewFeed } from './components'
import { toUNIXTimestamp, toUNIT } from './web3/common'
import { addQuestion, getAllQuestion } from './web3/index'
/**
 * MODIFY_TIME: in seconds
 */
const MODIFY_TIME = 15 * 60

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openForm: false,
      rewardFeed: true,
      question: {
        value: '',
        reward: '',
        expireTime: new Date(),
      },
      questions: []
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
    const reward = toUNIT(parseFloat(question.reward))
    question = {
      ...question,
      expireTime: toUNIXTimestamp(question.expireTime),
      deadline2Modify: toUNIXTimestamp(question.expireTime) + MODIFY_TIME,
      timestamp: toUNIXTimestamp(new Date()),
      reward: undefined
    }
    addQuestion(question, undefined, reward)
  }
  renderForm() {
    return (
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
    )

  }
  
  componentDidMount() {
    getAllQuestion().then(questions => {
      this.setState({ questions })
    })
  }
  render() {
    //bug: getAllQuestion return not comprihensive
    const { container, button, feed } = styles
    return (
      <div style={container}>
        <Header />
        <Button style={button} variant="outlined" onClick={() => this.setState({ openForm: true, question: { ...this.state.question, expireTime: new Date() } })}>
          what is your question ?
        </Button>
        <div style={{ alignSelf: 'center' }}>
          <Button style={{ ...button, marginRight: '10px' }} onClick={() => this.setState({rewardFeed: true})}>Reward</Button>
          <Button style={button} onClick={() => this.setState({rewardFeed: false})} >Normal</Button>
        </div>
        {this.state.openForm ? this.renderForm() : null}
        <Container maxWidth="sm" style={feed}>
          <NewFeed isReward={this.state.rewardFeed} questions={this.state.questions}/>
        </Container>
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
    flexDirection: "column",
  },
  feed: {
    flex: 1,
    marginTop: '10px',
    border: 'solid',
    padding: 0
  }
}
export default App;