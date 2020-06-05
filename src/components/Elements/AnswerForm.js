import React from 'react'
import TextField from '@material-ui/core/TextField';

export default function AnswerForm(props) {
    const {value, onContentChange} = props
    return (
        <div>
            <form noValidate autoComplete="off">
                <TextField
                    id="standard-full-width"
                    variant="outlined"
                    fullWidth
                    value={value}
                    onChange={onContentChange}
                />
            </form>
        </div>
    )
}
export { AnswerForm }