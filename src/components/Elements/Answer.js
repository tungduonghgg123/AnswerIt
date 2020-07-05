import React, { useState } from 'react';
import DoneIcon from '@material-ui/icons/Done';
import { Avatar, ListItem, ListItemSecondaryAction, ListItemText, ListItemAvatar, IconButton } from '@material-ui/core';
import { diffTime } from '../../helper/common'
import UserInfo from './UserInfo'
import { MyLink } from './Button'
function Answer(props) {
    const { answer, giveReward, showAcceptButton } = props
    const { value, timestamp, isBestAnswer } = answer
    const { username, firstname, lastname, owner } = answer
    const displayname = answer['display-name']
    const [showDialog, setShowDialog] = useState(false)

    return (
        <div>
            <ListItem alignItems="flex-start" >
                <ListItemAvatar onClick={() => setShowDialog(true)}>
                    <Avatar
                        alt="Remy Sharp"
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <React.Fragment>
                            {value}
                        </React.Fragment>
                    }
                    secondary={`${displayname ? displayname : 'null'} -- ${diffTime(timestamp)}`}

                />
                {
                    showAcceptButton ?
                        <ListItemSecondaryAction>
                            <MyLink onClick={() => giveReward()}>
                                Accept
                            </MyLink>
                        </ListItemSecondaryAction>
                        :
                        null
                }

                {
                    isBestAnswer ?
                        <ListItemSecondaryAction>
                            <DoneIcon color="primary" />
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
export { Answer }