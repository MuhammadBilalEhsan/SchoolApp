import React, { useState } from 'react'
import Header from './Header'
import { Box, Typography, Tabs, Tab, } from "@mui/material"
import CourseAcc from './CourseAcc'

const CDStudent = ({ curUser, courses }) => {
    const [value, setValue] = useState(0);

    const handleTabs = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Box className="_main" >
                <Header />
                <Box width="100%">
                    <Box maxWidth="1100px" width="95%" marginX="auto" mt={2}>
                        <Typography variant="h4">
                            {`${curUser.fname} ${curUser.lname}(${curUser.roll})`}
                        </Typography>
                        <Box
                            sx={{
                                marginTop: "15px",
                                width: "100%",
                                color: "green",
                                // bgcolor: "background.paper",
                            }}
                        >
                            <Tabs
                                value={value}
                                onChange={handleTabs}
                                textColor="inherit"
                                TabIndicatorProps={{
                                    sx: {
                                        backgroundColor: "green",
                                    },
                                }}
                                centered
                            >
                                <Tab label="Available Courses" />
                                <Tab label="My Courses" />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                {/* <Box width="100%" display="flex" justifyContent="space-around"> */}
                                <Box width="100%" >
                                    {
                                        courses.map((curElem, ind) => {
                                            // return <CourseCard key={ind} curElem={curElem} />
                                            return <CourseAcc key={ind} curElem={curElem} curUser={curUser} />
                                        })
                                    }
                                </Box>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Box>Tab Two</Box>

                            </TabPanel>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
function TabPanel(props) {
    const { children, value, index } = props;
    return (
        <Box width="100%" sx={{ marginX: "auto", padding: "5px" }}>
            {value == index && <> {children} </>}
        </Box>
    );
}
export default CDStudent
