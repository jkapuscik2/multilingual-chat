import React, {useReducer, useEffect} from 'react';
import './App.css';
import {setUpSocket, sendMsg} from './sockets'
import {CHOSEN_LANG, LOGGED_IN, UPDATED_USERS, SENT_MSG, GOT_MSG} from "./events"
import LoginForm from "./Components/LoginForm";
import LangForm from "./Components/LangsForm"
import Chat from "./Components/Chat"

const initialState = {
    name: "",
    lang: {},
    users: [],
    messages: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case LOGGED_IN:
            return {...state, name: action.payload.name};
        case CHOSEN_LANG:
            return {...state, lang: action.payload.lang};
        case UPDATED_USERS:
            return {...state, users: action.payload.users};
        case GOT_MSG:
            return {...state, messages: [action.payload.msg].concat(state.messages)};
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
};

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const setName = (name) => {
        sendMsg(LOGGED_IN, name)
        dispatch({
            type: LOGGED_IN,
            payload: {
                name: name
            }
        })
    }
    const setLang = (lang) => {
        sendMsg(CHOSEN_LANG, lang)
        dispatch({
            type: CHOSEN_LANG,
            payload: {
                lang: lang
            }
        })
    }
    const sentMsg = (msg) => {
        sendMsg(SENT_MSG, msg)
    }

    useEffect(() => {
        setUpSocket(dispatch);
    }, [])

    return (
        <>
            {!state.name
                ? <LoginForm setName={setName}/>
                : !Object.keys(state.lang).length
                    ? <LangForm setLang={setLang}/>
                    : <Chat name={state.name}
                            lang={state.lang}
                            users={state.users}
                            sentMsg={sentMsg}
                            messages={state.messages}/>
            }
        </>
    );
}

export default App;
