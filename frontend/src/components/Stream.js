import React, { useState } from 'react'
import { Box } from '@mui/material'
import SendingMessageInputComp from "./SendingMessageInputComp"
import streamImg from "../images/stream.jpg"
import MessageBox from "./MessageBox"
import moment from 'moment'
import axios from 'axios'
import Spinner from './Spinner'


const Stream = ({ curUser, currentCourse }) => {
    const [message, setMessage] = useState("")
    const [errorMsg, setErrorMsg] = useState("")


    const { _id, fname, lname } = curUser || {}
    const submitFunc = async (e) => {
        try {
            const newMessage = message.trim()

            if (newMessage) {
                const name = `${fname} ${lname}`
                let time = moment().format('hh:mm A')
                const messageObj = {
                    id: _id, name, time, message: newMessage, courseID: currentCourse?._id
                }
                await axios.post("course/sendmessage", messageObj)
                setMessage("")
            } else {
                setErrorMsg("Please write something")
                console.log("currentCourse", currentCourse)
            }

        } catch (error) {
            console.log(error)
        }
    }
    if (!currentCourse) { return <Spinner /> }

    return (
        <>
            <Box maxWidth="1100px" display="flex" flexDirection="column" justifyContent="center" sx={{ marginX: "auto" }}>
                <Box sx={{ width: "100%", height: "240px", borderRadius: "10px", marginTop: 3 }}>
                    <img src={streamImg} width="100%" height="100%" style={{ borderRadius: "10px" }} alt="BackGround Image" />
                </Box>
                {
                    currentCourse?.chat?.map((currentMessage, index) => {
                        return (
                            <MessageBox
                                color={curUser?._id === currentMessage?.id ? "green" : "#ba000d"}
                                timeColor={curUser?._id === currentMessage?.id ? "#2e7d32de" : "#ba000db8"}
                                curUser={curUser}
                                key={index}
                                nameFirestLetter={currentMessage.name[0]}
                                name={curUser?._id === currentMessage?.id ? "Me" : currentMessage.name}
                                time={currentMessage.time}
                                message={currentMessage.message}
                            />
                        )
                    })
                }

                <SendingMessageInputComp
                    name="message"
                    autoFocus={true}
                    value={message}
                    setValue={setMessage}
                    placeholder="Add comment to All Students"
                    color="success"
                    submitFunc={submitFunc}
                    userName={curUser?.fname[0]}
                />
            </Box >
        </>
    )
}

export default Stream
