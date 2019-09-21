import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));

export default function LoginForm({setName}) {
    const classes = useStyles();

    const sendForm = (e) => {
        e.preventDefault();
        const name = e.target.name.value;

        setName(name);
    }

    return (
        <Container component="main"
                   maxWidth="xs"
                   className={classes.container}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Pick a name
                </Typography>
                <form className={classes.form} onSubmit={sendForm} method='post'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus={true}
                                id="name"
                                label="Name"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}