import React from 'react'
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from "@material-ui/core";

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

const ChatMsg = ({msg, author, time, lang}) => {
    const classes = useStyles()

    return (
        <>
            <ListItem>
                <img src={lang.icon} className={classes.langIcon}/>
                <ListItemText
                    primary={msg.msg}
                    secondary={
                        <>
                            <Typography
                                component="span"
                                className={classes.original}
                            >
                                Original: "{msg.original}"
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

export default ChatMsg