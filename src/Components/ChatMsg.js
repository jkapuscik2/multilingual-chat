import React from 'react'
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    langIcon: {
        borderRadius: "5px",
        width: "2em",
        marginRight: theme.spacing(4),
    },
    original: {
        display: 'block',
        fontSize: '80%'
    }
}));

const ChatMsg = ({msg, original, author, time, lang}) => {
    const classes = useStyles()

    return (
        <>
            <ListItem>
                <img alt={""} src={lang.icon} className={classes.langIcon}/>
                <ListItemText
                    primary={msg}
                    secondary={
                        <>
                            <Typography
                                component="span"
                                className={classes.original}
                            >
                                Original: "{original}"
                            </Typography>
                            <Typography
                                component="span"
                                className={classes.original}
                            >
                                {`${new Date(time).toLocaleTimeString()} by ${author}`}
                            </Typography>
                        </>
                    }
                />
            </ListItem>
            <Divider variant="fullWidth"/>
        </>
    )
}

ChatMsg.propTypes = {
    msg: PropTypes.string.isRequired,
    original: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    lang: PropTypes.shape({
        fullName: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired
    }).isRequired
}

export default ChatMsg