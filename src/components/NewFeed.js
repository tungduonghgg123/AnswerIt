import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import images from '../assets/images'
import { diffTime, toTEA } from '../web3/common'
const NUM_IMAGES = images.length - 1
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));
function renderFeed(isReward, questions) {
    let feed = questions.map((q, i) => {
        if (!q)
            return null
        const { reward, expireTime, value } = q
        if (isReward) {
            if (reward)
                return (
                    <div key={i}>
                        <ListItem  alignItems="flex-start" onClick={() => console.log('ahihi')}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={images[i % NUM_IMAGES]} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`Reward: ${toTEA(reward)} Tea -- Deadline: ${diffTime(expireTime)}`}
                                secondary={
                                    <React.Fragment>
                                        {value}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>

                )
            return null
        }
        else {
            if (!reward)
                return (
                    <div key={i}>
                        <ListItem key={i} alignItems="flex-start" onClick={() => console.log('ahihi')}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={images[i % NUM_IMAGES]} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`Deadline: ${diffTime(expireTime)}`}
                                secondary={
                                    <React.Fragment>
                                        {value}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
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
        </List>
    );
}
export { NewFeed }