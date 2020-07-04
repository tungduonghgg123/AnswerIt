import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import { Avatar, Divider, ListItem, ListItemSecondaryAction, ListItemText, ListItemAvatar, Typography } from '@material-ui/core';
import { diffTime, toTEA } from '../../helper/common'
import { color } from '../../styles'
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'
const styles = {
    tickIcon: {
        color: color.secondary
    }
}
function Question(props) {
    const { isReward, question, i, onClick } = props
    const { reward, expireTime, value, resolved } = question
    const displayname = question['display-name']
    const { tickIcon } = styles
  
    if (isReward) {
        if (reward)
            return (
                <div key={i}>
                    <ListItem alignItems="flex-start" onClick={() => onClick(question, i)}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" />
                        </ListItemAvatar>
                        <ListItemText
                            secondary={`${displayname? displayname: 'null'} ${ reward? `-- Reward: ${toTEA(reward)} Tea` : ''}  -- Deadline: ${diffTime(expireTime)}`}
                            primary={
                                <React.Fragment>
                                    <Typography
                                        // component="span"
                                        // variant="body2"
                                        // className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {value}
                                    </Typography>
                                        
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
                            <Avatar alt="Remy Sharp" />
                        </ListItemAvatar>
                        <ListItemText
                            secondary={`${displayname? displayname: 'null'} ${ reward? `-- Reward: ${toTEA(reward)} Tea` : ''}  -- Deadline: ${diffTime(expireTime)}`}
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
});
export default connect(mapStateToProps, actions)(Question)