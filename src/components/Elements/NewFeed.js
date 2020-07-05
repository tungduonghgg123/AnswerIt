import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { Question } from './'
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));
function renderFeed(isRewardFeed, questions, onQuestionClick) {
    let feed = questions.map((q, i) => {
        if (!q)
            return null
        if((isRewardFeed && q.reward)||(!isRewardFeed && !q.reward))
            return (
                <Question key={i} i={i} question={q} onClick={onQuestionClick} />
            )
        return null
    })
    return feed.reverse()
}
function NewFeed(props) {
    const classes = useStyles();
    const { isRewardFeed, questions, onQuestionClick } = props
    return (
        <List className={classes.root}>
            {renderFeed(isRewardFeed, questions, onQuestionClick)}
        </List>
    );
}
export { NewFeed }