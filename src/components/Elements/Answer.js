import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import { Avatar, Divider, ListItem, IconButton, ListItemSecondaryAction, ListItemText, ListItemAvatar } from '@material-ui/core';
import images from '../../assets/images'
import { diffTime, toTEA } from '../../web3/common'
import { color } from '../../styles'


const styles = {
    tickIcon: {
        color: color.secondary
    }
}
function Answer(props) {
    const { answer, i, onClick } = props
    const { value, timestamp, isBestAnswer } = answer
    // const image = images[account2Index(answer.owner)]

    return (
        <div>
            <ListItem alignItems="flex-start" onClick={() => onClick()}>
                <ListItemAvatar>
                    <Avatar 
                    alt="Remy Sharp" 
                    // src={image} 
                    />
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
export {  Answer }