import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    form: {
        padding: theme.spacing(2),
    }
}));

const ChatForm = ({sentMsg}) => {
    const classes = useStyles();
    const [msg, setMsg] = useState("")

    const sendMsg = (e) => {
        e.preventDefault()

        sentMsg(msg)
        setMsg("")
    }

    const changeMsg = (elem) => {
        setMsg(elem.target.value)
    }

    return (
        <Grid item xs={12}>
            <form
                className={classes.form}
                onSubmit={sendMsg}
                autoComplete="off">

                <TextField
                    required={true}
                    id="outlined-full-width"
                    label="Write something and press enter"
                    placeholder="Hello everyone!"
                    fullWidth
                    onChange={changeMsg}
                    value={msg}
                    autoFocus={true}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        </Grid>
    )
}

ChatForm.propTypes = {
    sentMsg: PropTypes.func.isRequired
}

export default ChatForm