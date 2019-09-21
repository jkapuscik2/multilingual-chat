import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider';
import {makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    langIcon: {
        borderRadius: "5px",
        width: "10%",
        marginRight: theme.spacing(4),
    },
}));

const UserListItem = ({name, lang}) => {
    const classes = useStyles()

    return (
        <>
            <ListItem>
                <img alt={''} src={lang.icon} className={classes.langIcon}/>
                <ListItemText
                    primary={`${name}`}
                    secondary={`Speaking ${lang.fullName}`}
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
        </>
    )
}

UserListItem.propTypes = {
    name: PropTypes.string.isRequired,
    lang: PropTypes.shape({
        fullName: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired
    }).isRequired
}

export default UserListItem
