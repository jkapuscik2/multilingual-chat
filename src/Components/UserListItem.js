import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    langIcon: {
        borderRadius: "5px",
        width: "10%",
        marginRight: theme.spacing(4),
    },
}));

const UserListItem = ({idx, name, lang}) => {
    const classes = useStyles()

    return (
        <>
            <ListItem>
                <img src={lang.icon} className={classes.langIcon}/>
                <ListItemText
                    primary={`${name}`}
                    secondary={`Speaking ${lang.fullName}`}
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
        </>
    )
}

export default UserListItem
