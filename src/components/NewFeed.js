import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import batman from "../assets/images/batman.jpg"
import logan from "../assets/images/logan.png"
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));
function renderReward(isReward, question) {
    const { reward, expireTime, value } = question
    if (isReward) {
        console.log('ahihi')
        if (reward) {
            return (
                <ListItemText
                    primary={`Reward: ${reward} -- Deadline: ${expireTime}`}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                style={{ display: 'inline' }}
                                color="textPrimary"
                            >
                                Ali Connors
                                </Typography>
                            {value}
                        </React.Fragment>
                    }
                />
            )
        }
        return null
    } else {
        if (reward) {
            return null
        }
        return (
            <ListItemText
                primary={`Deadline: ${expireTime}`}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            style={{ display: 'inline' }}
                            color="textPrimary"
                        >
                            Ali Connors
                            </Typography>
                        {value}
                    </React.Fragment>
                }
            />
        )
    }
}
function renderFeed(isReward, questions) {
    let feed = questions.map((q, i) => {
        if (!q)
            return null
        const { reward, expireTime, value } = q
        if (isReward) {
            if (reward)
                return (
                    <ListItem key={i} alignItems="flex-start" onClick={() => console.log('ahihi')}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={logan} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={reward ? `Reward: ${reward} -- Deadline: ${expireTime}` : `Deadline: ${expireTime}`}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        style={{ display: 'inline' }}
                                        color="textPrimary"
                                    >
                                        Ali Connors
                                        </Typography>
                                    {value}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                )
            return null 
        }
        else {
            if (!reward)
                return (
                    <ListItem key={i} alignItems="flex-start" onClick={() => console.log('ahihi')}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={logan} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={`Deadline: ${expireTime}`}
                            secondary={
                                <React.Fragment>
                                    
                                    {value}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                )
            return null
        }



    })
    return feed.reverse()
}
function NewFeed(props) {
    const classes = useStyles();
    const { isReward, questions } = props
    return (
        <List className={classes.root}>
            {renderFeed(isReward, questions)}
            <Divider variant="inset" component="li" />
        </List>
    );
}
export { NewFeed }