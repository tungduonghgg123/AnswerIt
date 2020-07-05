import React from 'react';
import { color } from '../../../styles/index'
import { Button, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions'
import { NewFeed, Thread, AskQuestion,} from '../../Elements'
import { Header } from '../../Layouts'
import {  addQuestionEvent, addAnswerEvent, getAllQuestion, getAnswers, sendRewardEvent } from '../../../web3/API'
import LandingPage from '../../Layouts/LandingPage'
import _ from 'lodash'
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
    if(this.state.clickedQuestion) {
      this.setState({
        clickedQuestion: {
          ...questions[this.state.clickedQuestion.id],
        }
      })
    }
  }
  componentDidMount() {
    this.fetchQuestions()
    addQuestionEvent(() => {
      this.fetchQuestions()
    })
    addAnswerEvent(() => {
      if(_.isEmpty(this.state.clickedQuestion)) {
        return
      } else {
        this.fetchAnswers(this.state.clickedQuestion.id.toString()) 
        this.fetchQuestions()

      }
    }
    )
    sendRewardEvent(() => {
      this.fetchQuestions()
      this.fetchAnswers(this.state.clickedQuestion.id.toString())
    })
  }
  /**
   * purpose: call the nested functions in <Header/>
   */
  sendRewardEventHandler() {
    this.fetchQuestions()
    this.fetchAnswers(this.state.clickedQuestion.id.toString())
  }
  async onQuestionClick(question) {
    this.setState({
      openThread: true,
      clickedQuestion: question
    })
    this.fetchAnswers(question.id.toString())
  }
  render() {
    const { container, button, feed } = styles
    const isRegistered = !!this.props.address
    return isRegistered ? (
      <div style={container}>
        <Header sendRewardEventHandler={() => this.sendRewardEventHandler()}/>
        <AskQuestion/>
        <div style={{ alignSelf: 'center' }}>
          <Button style={{ ...button, marginRight: '10px' }} onClick={() => this.setState({ rewardFeed: true })}>Reward</Button>
          <Button style={button} onClick={() => this.setState({ rewardFeed: false })} >Normal</Button>
        </div>

        <Container maxWidth="sm" style={feed}>
          <NewFeed isRewardFeed={this.state.rewardFeed} questions={this.state.questions} onQuestionClick={(q) => this.onQuestionClick(q)} />
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
  address: state.account.address,
});

export default connect(mapStateToProps, actions)(Home)