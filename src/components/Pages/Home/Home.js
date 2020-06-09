import React from 'react';
import { color } from '../../../styles/index'
import { Button, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions'
import { NewFeed, Thread, AskQuestion,} from '../../Elements'
import { Header } from '../../Layouts'
import {  addQuestionEvent, addAnswerEvent, getAllQuestion, getAnswers } from '../../../web3/index'
import LandingPage from '../../Layouts/LandingPage'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openThread: false,
      rewardFeed: true,
      clickedQuestion: {},
      questions: [],
      answers: []
    }

  }
  fetchAnswers(questionId) {
    getAnswers(questionId).then((answers) => {
      this.setState({
        answers: answers
      })
    })
  }

  closeThread() {
    this.setState({
      openThread: false,
      answer: {
        value: '',
        timestamp: '',
        deadline2Modify: ''
      }
    })
  }
  renderThread() {
    return (
      <Thread 
        open={true} 
        handleClose={() => this.closeThread()} 
        rewardFeed={this.state.rewardFeed}
        question={this.state.clickedQuestion}
        answers={this.state.answers}
      >
      </Thread>

    )
  }
  async fetchQuestions() {
    const questions = await getAllQuestion()
    this.setState({ questions})
    if(this.state.clickedQuestion && this.state.clickedQuestion.index) {
      const index = this.state.clickedQuestion.index
      this.setState({
        clickedQuestion: {
          ...questions[index],
          index
        }
      })
    }
  }
  componentDidMount() {
    this.fetchQuestions()
    addQuestionEvent(() => {
      this.fetchQuestions()
    })
    addAnswerEvent(() => this.fetchAnswers(this.state.clickedQuestion.index.toString()))
    // sendRewardEvent(() => {
    //   this.fetchQuestions()
    //   this.fetchAnswers(this.state.clickedQuestion.index.toString())
    // })
  }
  /**
   * purpose: call the nested functions in <Header/>
   */
  sendRewardEventHandler() {
    this.fetchQuestions()
    this.fetchAnswers(this.state.clickedQuestion.index.toString())
  }
  async onQuestionClick(question, index) {
    this.setState({
      openThread: true,
      clickedQuestion: {
        ...question,
        index
      }
    })
    this.fetchAnswers(index.toString())
  }
  render() {
    const { container, button, feed } = styles
    const isRegistered = !!this.props.address
    console.log(isRegistered)
    return isRegistered ? (
      <div style={container}>
        <Header sendRewardEventHandler={() => this.sendRewardEventHandler()}/>
        <AskQuestion/>
        <div style={{ alignSelf: 'center' }}>
          <Button style={{ ...button, marginRight: '10px' }} onClick={() => this.setState({ rewardFeed: true })}>Reward</Button>
          <Button style={button} onClick={() => this.setState({ rewardFeed: false })} >Normal</Button>
        </div>

        <Container maxWidth="sm" style={feed}>
          <NewFeed isReward={this.state.rewardFeed} questions={this.state.questions} onQuestionClick={(q, i) => this.onQuestionClick(q, i)} />
        </Container>
        {this.state.openThread ? this.renderThread() : null}
      </div>
    ) :  (<LandingPage/>);
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
    flex: 1,
    display: 'flex',
    flexDirection: "column",
    minHeight: "100vh"
  },
  feed: {
    flex: 1,
    marginTop: '10px',
    border: 'solid',
    borderColor: color.primary,
    padding: 0
  }
}
const mapStateToProps = state => ({
  account: state.setAccountReducer,
  address: state.account.address,
});

export default connect(mapStateToProps, actions)(Home)