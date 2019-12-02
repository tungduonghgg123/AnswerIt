import React from 'react'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker
} from '@material-ui/pickers';

export default function AddQuestionForm() {
    const { question } = styles
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const handleDateChange = date => {
        setSelectedDate(date);
        console.log(selectedDate)
    }
    return (
        // get data after user input
        <div>
            <form noValidate autoComplete="off">
                <TextField
                    id="standard-full-width"
                    label="Question"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows="5"
                />
                
                <MuiPickersUtilsProvider utils={DateFnsUtils} style={{justifyContent: 'space-around'}}>
                <Grid container justify="space-between">
                <TextField
                    label="Reward"
                    id="standard-start-adornment"
                    variant="outlined"
                    // fullWidth
                    onChange={(text) => console.log(text.target.value)}
                    margin="normal"

                    InputProps={{
                        endAdornment: <InputAdornment position="end">TEA</InputAdornment>,
                    }}
                />
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={selectedDate}
                        onChange={handleDateChange}
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

const styles = {
    question: {
        marginRight: '20px'
    }
}
export { AddQuestionForm }