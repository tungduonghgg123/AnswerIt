import React, { useState } from 'react';
import DoneIcon from '@material-ui/icons/Done';
import { Avatar, ListItem, ListItemSecondaryAction, ListItemText, ListItemAvatar } from '@material-ui/core';
// import images from '../../assets/images'
import { diffTime } from '../../helper/common'
import { color } from '../../styles'
import UserInfo from './UserInfo'


const styles = {
    tickIcon: {
        color: color.secondary
    }
}
function Answer(props) {
    const { answer, onClick } = props
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
                    // src={image} 
                    />
                </ListItemAvatar>
                <ListItemText
                    onClick={() => onClick()}
                    primary={
                        <React.Fragment>
                            {value}
                        </React.Fragment>
                    }
                    secondary={`${displayname ? displayname : 'null'} -- ${diffTime(timestamp)}`}

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