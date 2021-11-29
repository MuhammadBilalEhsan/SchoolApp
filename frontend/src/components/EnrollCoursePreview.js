import React, { useEffect } from 'react'
import Header from './Header'
import { Box } from "@mui/material"
import { useParams } from 'react-router-dom'
import axios from 'axios'

const EnrollCoursePreview = ({ curUser }) => {
    const params = useParams()
    useEffect(async () => {
        const res = await axios.post(`/course/specific`, { id: params.id })
        console.log(res)
    }, [])
    return (
        <>
            <Header />
            <Box className={`_main`}>

            </Box>

        </>
    )
}

export default EnrollCoursePreview