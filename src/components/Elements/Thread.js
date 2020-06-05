
import React, { useState } from 'react';
import { color } from '../../styles/index'
import { Button, Container, List, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'
import {
    Header, FormDialog, AddQuestionForm, AnswerForm,
    NewFeed, Answer, Question, InformDialog, AskQuestion,
} from './'
import { toUNIXTimestamp, MODIFY_TIME } from '../../web3/common'
import { addQuestion, addQuestionEvent, addAnswer, addAnswerEvent, getAllQuestion, getAnswers, sendReward, sendRewardEvent } from '../../web3/index'

function Thread(props) {
    const { open, handleClose, rewardFeed, question, account, answers } = props
    const [openDialog, setOpenDialog] = useState(false)
    const [dialogContent, setDialogContent] = useState('')
    const [answer, setAnswer] = useState({
        value: '',
        timestamp: '',
        deadline2Modify: ''
    })
    function handleAnswerContentChange(content) {
        setAnswer({
            ...answer,
            value: content
        }
        )
    }
    async function submitAnswer(toQuestionId) {
        let answer1 = answer
        answer1 = {
            ...answer,
            deadline2Modify: toUNIXTimestamp(new Date()) + MODIFY_TIME,
            timestamp: toUNIXTimestamp(new Date()),
        }
        try {
            await addAnswer(toQuestionId, answer1, account)
            cleanAnswerForm()
        } catch (error) {
            console.log(error.message)
            setDialogContent(error.message)
            setOpenDialog(true)
        }
    }
    function cleanAnswerForm() {
        setAnswer({
            value: '',
            timestamp: '',
            deadline2Modify: ''
        })
    }
    function closeGiveRewardDialog() {
        setOpenDialog(false)
        setDialogContent('')
    }
    async function giveReward(questionId, answerId) {
        if (!rewardFeed)
            return
        try {
            await sendReward(questionId, answerId, question.reward, account)
            setDialogContent('success')
        } catch (error) {
            setDialogContent(error.message)
        }
        setOpenDialog(true)
    }
    function renderAnswers() {
        return answers.map((answer, i) => {
            return (
                <div key={i}>
                    <Answer
                        answer={answer} i={i}
                        onClick={() => giveReward(answer.questionId.toString(), answer.id.toString())}
                    />
                </div>
            )
        })
    }
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
            <DialogContent>
                <Question isReward={rewardFeed} question={question} i={question.index} onClick={() => { }} />
            </DialogContent>
            <DialogContent>
                Answers
                <AnswerForm
                    value={answer.value}
                    onContentChange={(content) => handleAnswerContentChange(content.target.value)}
                />
                <Button style={styles.button} onClick={() => submitAnswer(question.index.toString())} >Post</Button>
                <List>
                    {renderAnswers()}
                </List>
            </DialogContent>
            <InformDialog open={openDialog} onClose={() => closeGiveRewardDialog()}>
                {dialogContent}
            </InformDialog>
        </Dialog>
    );
}
const styles = {
    button: {
        background: color.secondary,
        marginTop: '10px'
    },

}
const mapStateToProps = state => ({
    account: state.setAccountReducer,
});

export default connect(mapStateToProps, actions)(Thread)