import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Hidden from '@material-ui/core/Hidden'
import UserListItem from "./UserListItem";
import ChatForm from "./ChatForm";
import ChatMsg from "./ChatMsg";
import ChatGreeter from "./ChatGreeter";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    paper: {
        padding: theme.spacing(4),
        margin: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '80%',
        overflowY: 'scroll'
    },
    bottom: {
        left: 0,
        bottom: 0,
        height: 'auto',
        width: '100%',
        padding: '0 0 0 0',
        flex: 1
    },
    bottomPaper: {
        width: '100%',
        bottom: 0,
        height: '100%',
    },
    top: {
        flex: 1
    },
    middle: {
        flex: 10,
        flexWrap: "nowrap",
        overflowY: 'scroll',
    }
}));

const Chat = ({name, lang, users, sentMsg, messages}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container className={classes.top}>
                <ChatGreeter name={name}/>
            </Grid>
            <Grid container className={classes.middle}>
                <Hidden only={'xs'}>
                    <Grid item sm={3}>
                        <Paper className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Users
                            </Typography>
                            <List>
                                {users.map((user, idx) => {
                                    return <UserListItem key={user.id} idx={idx + 1}
                                                         name={user.name}
                                                         lang={user.lang}/>
                                })}
                            </List>
                        </Paper>
                    </Grid>
                </Hidden>

                <Grid item xs={12} md={8}>
                    <Paper className={classes.paper}>
                        <List>
                            {messages.map((msg) => {
                                return (
                                    <ChatMsg
                                        key={`${msg.time}-${msg.author}`}
                                        msg={msg}
                                        time={msg.time}
                                        author={msg.author}
                                        lang={msg.lang}
                                    />
                                )
                            })}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container className={classes.bottom}>
                <Paper className={classes.bottomPaper}>
                    <ChatForm sentMsg={sentMsg}/>
                </Paper>
            </Grid>
        </div>
    )
}

export default Chat;