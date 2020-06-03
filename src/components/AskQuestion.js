import React, { useState } from 'react';
import { color } from '../styles/index'
import { Button} from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../redux/actions'
import { FormDialog, AddQuestionForm, InformDialog,} from './'
import { toUNIXTimestamp, toUNIT, MODIFY_TIME } from '../web3/common'
import { addQuestion} from '../web3/index'

/**
 * MODIFY_TIME: in seconds
 */

function AskQuestion(props) {
    const [openForm, setOpenForm] = useState(false)
    const [openNotifyDialog, setOpenNotifyDialog ] = useState(false)
    const [notify, setNotify] = useState('')
    const [question, setQuestion] = useState({
        value: '',
        reward: '',
        expireTime: new Date(),
    })

    function closeForm() {
        setOpenForm(false)
        cleanForm()
    }
    function cleanForm() {
        setQuestion({
            value: '',
            reward: '',
            expireTime: new Date(),
        })
    }
    function onOpenForm() {
        setOpenForm(true)
        cleanForm()
    }
    function handleDateChange(date) {
        setQuestion({
            ...question,
            expireTime: date
        })
    }
    function handleQuestionContentChange(content) {
        setQuestion({
            ...question,
            value: content
        })
    }
    function handleQuestionRewardChange(reward) {
        setQuestion({
            ...question,
            reward
        })
    }
    function closeSubmitQuestionDialog() {
        setOpenNotifyDialog(false)
        setNotify('')
    }
    async function submitQuestion() {
        let question1 = question
        const reward = toUNIT(parseFloat(question.reward))
        question1 = {
            ...question,
            expireTime: toUNIXTimestamp(question.expireTime),
            deadline2Modify: toUNIXTimestamp(new Date()) + MODIFY_TIME,
            timestamp: toUNIXTimestamp(new Date()),
            reward: undefined
        }
        try {
            await addQuestion(question1, props.account, reward)
            setNotify('success')
            closeForm()
        } catch (error) {
            setNotify(error.message)
        }
        setOpenNotifyDialog(true)
    }
    return (
        <div style={{ alignSelf: 'center' }}>
            <Button style={styles.button} variant="outlined"
                onClick={() => onOpenForm()}
            >
                what is your question ?
            </Button>

            <FormDialog
                open={openForm}
                handleClose={() => closeForm()}
                handlePost={() => submitQuestion()}
            >
                <AddQuestionForm
                    data={question}
                    onDateChange={(date) => handleDateChange(date)}
                    onContentChange={(content) => handleQuestionContentChange(content)}
                    onRewardChange={(reward) => handleQuestionRewardChange(reward)}
                />
            </FormDialog>
            <InformDialog open={openNotifyDialog} onClose={() => closeSubmitQuestionDialog()}>
                {notify}
            </InformDialog>

        </div>
    )
}
const styles = {
    button: {
        background: color.secondary,
        marginTop: '10px'
    },
    test: {
        color: 'blue',
        color: 'red'
    },
    test2: {
    }

}
const mapStateToProps = state => ({
    account: state.setAccountReducer,
  });
  
  export default connect(mapStateToProps, actions)(AskQuestion)