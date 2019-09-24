import io from 'socket.io-client'
import {CONNECTED, GOT_MSG, UPDATED_USERS} from "./events"

const socket = io(process.env.REACT_APP_SOCKET_URL)

export const setUpSocket = dispach => {

    socket.on(CONNECTED, () => {
        console.log('Connected to websocket')
    });

    socket.on(UPDATED_USERS, (users) => {
        dispach({
            type: UPDATED_USERS,
            payload: {
                users: users
            }
        });
    });

    socket.on(GOT_MSG, (msg) => {
        dispach({
            type: GOT_MSG,
            payload: {
                msg: msg
            }
        });
    })
}

export const sendMsg = (event, data) => {
    console.log(`Sending to: ${event} data ${data}`)
    socket.emit(event, data)
}
