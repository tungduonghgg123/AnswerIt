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
function Question(props) {
    const { isReward, question, i, onClick } = props
    const { reward, expireTime, value } = question
    if (isReward) {
        if (reward)
            return (
                <div key={i}>
                    <ListItem alignItems="flex-start" onClick={() => onClick(question, i)}>
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
                    <ListItem key={i} alignItems="flex-start" onClick={() => onClick(question, i)}>
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
}
function Answer(props) {
    const { answer, i } = props
    const { value } = answer
    return (
        <div>
            <ListItem alignItems="flex-start" onClick={() => console.log('ahihi')}>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={images[i % NUM_IMAGES]} />
                </ListItemAvatar>
                <ListItemText
                    // primary={`Reward: ${toTEA(reward)} Tea -- Deadline: ${diffTime(expireTime)}`}
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
}
export { Question, Answer }