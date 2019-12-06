import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {Question} from './CustomListItem'
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));
function renderFeed(isReward, questions, onQuestionClick) {
    let feed = questions.map((q, i) => {
        if (!q)
            return null
        return <Question isReward={isReward} key={i} i={i} question={q} onClick={onQuestionClick} />
    })
    return feed.reverse()
}
function NewFeed(props) {
    const classes = useStyles();
    const { isReward, questions, onQuestionClick } = props
    return (
        <List className={classes.root}>
            {renderFeed(isReward, questions, onQuestionClick)}
        </List>
    );
}
export { NewFeed }