import React from 'react'
import {TextField, InputAdornment, Grid} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker
} from '@material-ui/pickers';

export default function AddQuestionForm(props) {
    // const [selectedDate, setSelectedDate] = React.useState(new Date());
    // const handleDateChange = date => {
    //     console.log(date)
    //     setSelectedDate(date)
    // }
    const {data, onDateChange, onContentChange, onRewardChange} = props
    const {expireTime, value, reward} = data
    return (
        <div>
            <form noValidate autoComplete="off">
                <TextField
                    id="standard-full-width"
                    label="Question"
                    variant="outlined"
                    fullWidth
                    value={value}
                    multiline
                    rows="5"
                    onChange={(content) => onContentChange(content.target.value)}
                />
                <TextField
                    label="Reward"
                    id="standard-start-adornment"
                    variant="outlined"
                    fullWidth
                    value={reward}
                    onChange={(reward) => onRewardChange(reward.target.value)}
                    margin="normal"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">TEA</InputAdornment>,
                    }}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ justifyContent: 'space-around' }}>
                    <Grid container justify="space-between">

                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker"
                            value={expireTime}
                            onChange={onDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={expireTime}
                            onChange={onDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </form>


        </div>
    )
}
export { AddQuestionForm }