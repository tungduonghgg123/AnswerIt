import React, { useState } from 'react';
import DoneIcon from '@material-ui/icons/Done';
import { Avatar, ListItem, IconButton, ListItemSecondaryAction, ListItemText, ListItemAvatar, Typography } from '@material-ui/core';
import { diffTime, toTEA } from '../../helper/common'
import { color } from '../../styles'
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'
import UserInfo from './UserInfo'
const styles = {
    tickIcon: {
        color: color.secondary
    }
}
function Question(props) {
    const { question, onClick } = props
    const { reward, expireTime, value, resolved, answers, id } = question
    const { username, firstname, lastname, owner } = question
    const displayname = question['display-name']
    const { tickIcon } = styles
    const [showDialog, setShowDialog] = useState(false)
    return (
        <div key={id}>
            <ListItem alignItems="flex-start" ContainerComponent="div">
                <ListItemAvatar onClick={() => setShowDialog(true)}>
                    <Avatar alt="Remy Sharp" />
                </ListItemAvatar>
                <ListItemText
                    onClick={() => onClick(question, id)}
                    secondary={`${displayname ? displayname : 'null'} ${reward ? `-- Reward: ${toTEA(reward)} Tea` : ''}  -- Deadline: ${diffTime(expireTime)} -- ${answers === 0 || answers === 1 ? `${answers} answer` : `${answers} answers`}`}
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
            <UserInfo
                username={username}
                firstname={firstname}
                lastname={lastname}
                address={owner}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
            />
        </div>
    )
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, actions)(Question)