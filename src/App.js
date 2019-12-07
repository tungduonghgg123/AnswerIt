import React from 'react';
import { color } from './styles/index'
import { Button, Container, List, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from './redux/actions'
import {
  Header, FormDialog, AddQuestionForm, AnswerForm,
  NewFeed, Thread, Answer, Question, InformDialog, AskQuestion,
} from './components'
import { toUNIXTimestamp, toUNIT } from './web3/common'
import { addQuestion, addQuestionEvent, addAnswer, addAnswerEvent, getAllQuestion, getAnswers, sendReward, sendRewardEvent } from './web3/index'

/**
 * MODIFY_TIME: in seconds
 */
const MODIFY_TIME = 15 * 60

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openForm: false,
      openGiveRewardDialog: false,
      giveRewardDialogContent: '',
      openThread: false,
      rewardFeed: true,
      answer: {
        value: '',
        timestamp: '',
        deadline2Modify: ''
      },
      clickedQuestion: {},
      answers: [],
      questions: []
    }
  }

  handleAnswerContentChange(content) {
    this.setState({
      answer: {
        ...this.state.answer,
        value: content
      }
    })
  }
  submitAnswer(toQuestionId) {
    let answer = this.state.answer
    answer = {
      ...answer,
      deadline2Modify: toUNIXTimestamp(new Date()) + MODIFY_TIME,
      timestamp: toUNIXTimestamp(new Date()),
    }
    addAnswer(toQuestionId, answer, this.props.account)
    this.cleanAnswerForm()
  }
  cleanAnswerForm() {
    this.setState({
      answer: {
        value: '',
        timestamp: '',
        deadline2Modify: ''
      }
    })
  }
  fetchAnswers(questionId) {
    getAnswers(questionId).then((answers) => {
      this.setState({
        answers: answers
      })
    })
  }
  async giveReward(questionId, answerId) {
    if (!this.state.rewardFeed)
      return
    try {
      await sendReward(questionId, answerId, this.state.clickedQuestion.reward, this.props.account)
      this.setState({
        giveRewardDialogContent: 'success'
      })
    } catch (error) {
      this.setState({
        giveRewardDialogContent: error.message
      })
    }
    this.setState({
      openGiveRewardDialog: true
    })
  }
  closeGiveRewardDialog() {
    this.setState({
      openGiveRewardDialog: false,
      giveRewardDialogContent: ''
    })
  }
  closeSubmitQuestionDialog() {
    this.setState({
      openSubmitQuestionDialog: false,
      submitQuestionDialogContent: ''
    })
  }
  renderAnswers() {
    return this.state.answers.map((answer, i) => {
      return (
        <div key={i}>
          <Answer answer={answer} i={i} onClick={() => this.giveReward(answer.questionId.toString(), answer.id.toString())} />
          <InformDialog open={this.state.openGiveRewardDialog} onClose={() => this.closeGiveRewardDialog()}>
            {this.state.giveRewardDialogContent}
          </InformDialog>
        </div>
      )
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
      <Thread open={true} handleClose={() => this.closeThread()} >
        <Question isReward={this.state.rewardFeed} question={this.state.clickedQuestion} i={this.state.clickedQuestion.index} onClick={() => { }} />
        <AnswerForm
          value={this.state.answer.value}
          onContentChange={(content) => this.handleAnswerContentChange(content.target.value)}
        />
        <Button style={styles.button} onClick={() => this.submitAnswer(this.state.clickedQuestion.index.toString())} >Post</Button>
        <List>
          {this.renderAnswers()}
        </List>
      </Thread>

    )
  }
  async fetchQuestions() {
    const questions = await getAllQuestion()
    this.setState({ questions })
  }
  componentDidMount() {
    this.fetchQuestions()
    addQuestionEvent(() => {
      this.fetchQuestions()
    })
    addAnswerEvent(() => this.fetchAnswers(this.state.clickedQuestion.index.toString()))
    sendRewardEvent(() => {
      this.fetchQuestions()
      this.fetchAnswers(this.state.clickedQuestion.index.toString())
    })
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
    return (
      <div style={container}>
        <Header/>
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
    flex: 1,
    display: 'flex',
    flexDirection: "column",
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
});

export default connect(mapStateToProps, actions)(App)