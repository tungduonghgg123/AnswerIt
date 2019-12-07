import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import { Avatar, Divider, ListItem, IconButton, ListItemSecondaryAction, ListItemText, ListItemAvatar } from '@material-ui/core';
import images from '../assets/images'
import { diffTime, toTEA } from '../web3/common'
import { color } from '../styles'
import { connect } from 'react-redux';
import * as actions from '../redux/actions'
import {account2Index} from '../redux/reducers/accountReducer'
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
    const image = images[account2Index(question.owner)]
    if (isReward) {
        if (reward)
            return (
                <div key={i}>
                    <ListItem alignItems="flex-start" onClick={() => onClick(question, i)}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={image} />
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
                            <Avatar alt="Remy Sharp" src={image} />
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

const mapStateToProps = state => ({
    id: state.setAccountReducer.id,
  
  });
export default connect(mapStateToProps, actions)(Question)