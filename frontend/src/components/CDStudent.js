import React, { useState } from 'react'
import Header from './Header'
import { Box, Typography, Tabs, Tab, } from "@mui/material"
import CourseAcc from './CourseAcc'
// import { useSelector } from "react-redux"
import StudentTab2 from './StudentTab2'

const CDStudent = ({ curUser, courses }) => {
    // const studentCourse = useSelector(state => state.usersReducer.studentCourse)
    const [value, setValue] = useState(0);
    const [coursesType, setCoursesType] = useState("All Courses");


    const handleTabs = (event, newValue) => {
        // event.stopPropagation()
        setValue(newValue);
    };
    return (
        <>
            <Box className="_main" >
                <Header curUser={curUser} />
                <Box width="100%">
                    <Box mx="auto" mt={2} maxWidth="800px" display="flex" flexDirection="column" justifyContent="center" >
                        <Box
                            sx={{
                                marginTop: "15px",
                                width: "100%",
                                color: "green",
                            }}
                        >
                            <Tabs
                                value={value}
                                onChange={handleTabs}
                                textColor="inherit"
                                scrollButtons='auto'
                                variant="scrollable"
                                TabIndicatorProps={{
                                    sx: {
                                        backgroundColor: "green",
                                        height: "5px",
                                    },
                                }}
                                sx={{ marginBottom: 5 }}
                            >
                                <Tab label="All Courses" onClick={() => setCoursesType("All Courses")} />
                                <Tab label="Enrolled" onClick={() => setCoursesType("Enrolled Courses")} />
                            </Tabs>

                            <Box display="flex" justifyContent="space-between" pb={1} px={2} borderBottom="1.5px solid #009c0052" width="100%" >
                                <Typography variant="h4" color="green">
                                    {coursesType}
                                </Typography>
                            </Box>
                            <TabPanel value={value} index={0}>
                                {/* <Box width="100%" display="flex" justifyContent="space-around"> */}
                                <Box width="100%" mt={2.2}>
                                    {
                                        courses?.map((curElem, ind) => {
                                            return <CourseAcc key={ind} curElem={curElem} curUser={curUser} />
                                        })
                                    }
                                </Box>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Box width="100%">
                                    {
                                        curUser?.courses.map((curCor, ind) =>
                                            <StudentTab2
                                                curCor={curCor}
                                                key={ind}
                                                ind={ind}
                                            />
                                        )
                                    }
                                </Box>
                            </TabPanel>
                        </Box>
                    </Box>
                </Box>
            </Box >
        </>
    )
}
function TabPanel(props) {
    const { children, value, index } = props;
    return (
        <Box width="100%" sx={{ marginX: "auto", padding: "5px" }}>
            {value === index && <> {children} </>}
        </Box>
    );
}
export default CDStudent
