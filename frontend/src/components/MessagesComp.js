import React, { useState } from 'react'
import Header from './Header'
import { Box, Typography } from "@mui/material"
import SendingMessageInputComp from './SendingMessageInputComp'
import MessageBox from './MessageBox'
import moment from 'moment'
import axios from 'axios'

const MessagesComp = ({ curUser, setAuth }) => {
    const [message, setMessage] = useState("")
    const [recieverID, setRecieverID] = useState("")
    const [recieverName, setRecieverName] = useState("")
    const setIDfun = (id, name) => {
        if (recieverID) {
            setRecieverID("")
            setRecieverName("")
        } else {
            setRecieverID(id)
            setRecieverName(name)
        }
    }
    const { _id, fname, lname } = curUser || {}
    const sendMsgFunc = async () => {
        try {
            const newMessage = message.trim()

            if (newMessage) {
                const name = `${fname} ${lname}`
                let time = moment().format('hh:mm:ss A')
                const messageObj = {
                    senderID: _id, name, time, message: newMessage, recieverID
                }
                await axios.post("user/sendmsg", messageObj)
                setMessage("")
                setRecieverID("")
            } else {
                alert("write something")
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Box className={`msgs`}>
            <Header curUser={curUser} setAuth={setAuth} />
            <Box mx="auto" px={2} maxHeight="85vh" sx={{ overflowY: "auto" }} maxWidth="900px" display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
                <Box mt={5} display="flex" borderBottom="1px solid #00800085" justifyContent="space-between" pb={1} px={2} width="100%" >
                    <Typography variant="h4" color="green">
                        All Messages
                    </Typography>
                    <Typography variant="body1" mt={2} color="green">
                        {curUser?.messages.length > 0 ? curUser?.messages.length : "0"} Messages
                    </Typography>
                </Box>

                {curUser?.messages?.length > 0 ?
                    curUser?.messages.map((msg, index) => {
                        return (
                            <Box width="100%" key={index} onClick={() => setIDfun(msg.senderID, msg.name)}>
                                <MessageBox
                                    color={curUser?._id === msg?.id ? "#ba000d" : "green"}
                                    timeColor={curUser?._id === msg?.id ? "#ba000db8" : "#2e7d32de"}
                                    curUser={curUser}
                                    nameFirestLetter={msg.name[0]}
                                    name={curUser?._id === msg?.id ? "Me" : msg.name}
                                    time={msg.time}
                                    message={msg.message}
                                />
                            </Box>
                        )
                    }) : <Box pt={9} borderTop="1px solid green" width="100%"
                        textAlign="center"
                    >
                        <Typography variant="h6" color="green">
                            Currently You Have No Messages
                        </Typography>
                    </Box>
                }
                {
                    recieverID ? <SendingMessageInputComp
                        name="message"
                        autoFocus={true}
                        value={message}
                        setValue={setMessage}
                        type="text"
                        placeholder={`Write Message for ${recieverName}`}
                        color="success"
                        submitFunc={sendMsgFunc}
                        userName={curUser?.fname[0]}
                    /> : ""
                }

            </Box>
        </Box>
    )
}

export default MessagesComp
