
import React, { useState } from 'react';
import { color } from '../../styles/index'
import { List, Dialog, DialogContent } from '@material-ui/core';
import { MyButton } from './Button'
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'
import { AnswerForm, Answer, Question, InformDialog } from './'
import { toUNIXTimestamp, MODIFY_TIME } from '../../helper/common'
import { addAnswer, sendReward } from '../../web3/API'
import {compareTimestamp} from '../../helper/common'

function Thread(props) {
    const { open, handleClose, rewardFeed, question, answers } = props
    console.log(question)
    const { address, tokenAddress, tokenKey, setNeedAuth } = props
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
            if (!tokenAddress && !tokenKey) {
                // it would be best to direct to the login page
                console.log('token expired!')
                setNeedAuth(true)
                return;
            }
            await addAnswer(toQuestionId, answer1, address, tokenAddress)
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
            if (!tokenAddress && !tokenKey) {
                // it would be best to direct to the login page
                console.log('token expired!')
                setNeedAuth(true)
                return;
            }
            await sendReward(questionId, answerId, question.reward, address, tokenAddress)
            setDialogContent('success')
        } catch (error) {
            setDialogContent(error.message)
        }
        setOpenDialog(true)
    }
    function sortAnswers(answers) {
        function compareAnswers(a1, a2) {
            if (a1.isBestAnswer)
                return -1
            else if (a2.isBestAnswer)
                return 1
            else {
                return compareTimestamp(a1.timestamp, a2.timestamp)
            }
        }
        return answers.sort((a, b) => compareAnswers(a, b))
    }
    function renderAnswers() {
        if (answers.length === 0)
            return <div />
        const sortedAnswers = sortAnswers(answers)
        return sortedAnswers.map((answer, i) => {
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
                <Question question={question} onClick={() => { }} />
            </DialogContent>
            <DialogContent>
                Answers
                <AnswerForm
                    value={answer.value}
                    onContentChange={(content) => handleAnswerContentChange(content.target.value)}
                />
                <MyButton style={styles.button} onClick={() => submitAnswer(question.id.toString())} >Post</MyButton>
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
    address: state.account.address,
    tokenAddress: state.account.tokenAddress,
    tokenKey: state.account.tokenKey,
});

export default connect(mapStateToProps, actions)(Thread)