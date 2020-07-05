import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { Question } from './'
import {compareTimestamp} from '../../helper/common'
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));
function sortQuestions(questions) {
    // move resolved questions to bottom positions
    function compareQuestions(q1, q2) {
        if (q1.resolved === undefined && q2.resolved === undefined)
            return compareTimestamp(q1.timestamp, q2.timestamp)
        if (q1.resolved && q2.resolved)
            return compareTimestamp(q1.timestamp, q2.timestamp)
        if (q1.resolved && !q2.resolved)
            return 1
        if (!q1.resolved && q2.resolved)
            return -1
    }
    return questions.sort((a, b) => compareQuestions(a, b))
}
function filterQuestions(questions, isRewardFeed) {
    const isOnRewardFilter = (q) => {
        return isRewardFeed && q.reward
    }
    const isOnNornalFilter = (q) => {
        return !isRewardFeed && !q.reward
    }
    const removeNullValuesFilter = (el) => {
        return el != null;
    }
    return questions.map((q) => {
        if (isOnNornalFilter(q) || isOnRewardFilter(q)) {
            return q
        }
        return null
    }).filter(removeNullValuesFilter);
}
function renderFeed(questions, onQuestionClick) {
    let feed = questions.map((q, i) => {
        if (!q)
            return null
        return (
            <Question key={i} i={i} question={q} onClick={onQuestionClick} />
        )
    })
    return feed
}
function NewFeed(props) {
    const classes = useStyles();
    const { isRewardFeed, questions, onQuestionClick } = props
    if (questions.length === 0)
        return <div />
    const filteredQuestions = filterQuestions(questions, isRewardFeed)
    const sortedQuestions = sortQuestions(filteredQuestions)
    return (
        <List className={classes.root}>
            {renderFeed(sortedQuestions, onQuestionClick)}
        </List>
    );
}
export { NewFeed }