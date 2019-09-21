import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Denmark from "../Assets/dk.svg"
import Netherlands from "../Assets/nl.svg"
import England from "../Assets/gb.svg"
import Germany from "../Assets/de.svg"
import Norway from "../Assets/no.svg"
import Sweden from "../Assets/se.svg"
import France from "../Assets/fr.svg"
import Italy from "../Assets/it.svg"
import Portugal from "../Assets/pt.svg"
import Czech from "../Assets/cz.svg"
import Poland from "../Assets/pl.svg"
import Russian from "../Assets/ru.svg"

const supportedLangs = [
    {
        fullName: "Danish",
        icon: Denmark,
        key: "dk"
    },
    {
        fullName: "Dutch",
        icon: Netherlands,
        key: "nl"
    },
    {
        fullName: "English",
        icon: England,
        key: "en"
    },
    {
        fullName: "German",
        icon: Germany,
        key: "de"
    },
    {
        fullName: "Norwegian",
        icon: Norway,
        key: "no"
    },
    {
        fullName: "Swedish",
        icon: Sweden,
        key: "se"
    },
    {
        fullName: "French",
        icon: France,
        key: "fr"
    },
    {
        fullName: "Italian",
        icon: Italy,
        key: "it"
    },
    {
        fullName: "Portuguese",
        icon: Portugal,
        key: "pt"
    },
    {
        fullName: "Czech",
        icon: Czech,
        key: "cz"
    },
    {
        fullName: "Polish",
        icon: Poland,
        key: "pl"
    },
    {
        fullName: "Russian",
        icon: Russian,
        key: "ru"
    },
];

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    img: {
        width: "15%",
        padding: "5%",
        borderRadius: "25px",
        cursor: 'pointer'
    }
}));

export default function LangForm({setLang}) {
    const classes = useStyles();

    const pickLang = (e) => {
        e.preventDefault();

        setLang({
            key: e.target.getAttribute('data-key'),
            fullName: e.target.getAttribute('title'),
            icon: e.target.getAttribute('src')
        });
    };

    return (
        <Container component="main"
                   maxWidth="xs"
                   className={classes.container}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Pick a language
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        {supportedLangs.map((lang) => {
                            return (
                                <img
                                    className={classes.img}
                                    src={lang.icon}
                                    alt={lang.fullName}
                                    title={lang.fullName}
                                    key={lang.key}
                                    data-key={lang.key}
                                    onClick={pickLang}
                                />
                            )
                        })}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}