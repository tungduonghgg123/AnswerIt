import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import { Avatar, Divider, ListItem, IconButton, ListItemSecondaryAction, ListItemText, ListItemAvatar } from '@material-ui/core';
import images from '../assets/images'
import { diffTime, toTEA } from '../web3/common'
import { color } from '../styles'
const NUM_IMAGES = images.length - 1
const styles = {
    tickIcon: {
        color: color.secondary
    }
}
function Question(props) {
    const { isReward, question, i, onClick } = props
    const { reward, expireTime, value, resolved } = question
    const { tickIcon } = styles
    if (isReward) {
        if (reward)
            return (
                <div key={i}>
                    <ListItem alignItems="flex-start" onClick={() => onClick(question, i)}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={images[i % NUM_IMAGES]} />
                        </ListItemAvatar>
                        <ListItemText
                            secondary={`Reward: ${toTEA(reward)} Tea -- Deadline: ${diffTime(expireTime)}`}
                            primary={
                                <React.Fragment>
                                    {value}
                                </React.Fragment>
                            }
                        />
                        {
                            resolved ?
                                <ListItemSecondaryAction>
                                    <DoneIcon style={tickIcon} />
                                </ListItemSecondaryAction>
                                :
                                null
                        }


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
                            secondary={`Deadline: ${diffTime(expireTime)}`}
                            primary={
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
    const { answer, i, onClick } = props
    const { value, timestamp, isBestAnswer } = answer
    return (
        <div>
            <ListItem alignItems="flex-start" onClick={() => onClick()}>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={images[i % NUM_IMAGES]} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <React.Fragment>
                            {value}
                        </React.Fragment>
                    }
                    secondary={` ${diffTime(timestamp)}`}

                />
                {
                    isBestAnswer ?
                        <ListItemSecondaryAction>
                            <DoneIcon style={styles.tickIcon} />
                        </ListItemSecondaryAction>
                        :
                        null
                }
            </ListItem>
            <Divider variant="inset" component="li" />
        </div>
    )
}
export { Question, Answer }