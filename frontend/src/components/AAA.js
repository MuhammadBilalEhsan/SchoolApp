<Button
    onClick={(e) => {
        handleMenuOpen(e);
        // setCourseOutlineArr([]);
    }}
    color={editCourse ? "warning" : "success"}
    endIcon={<MdKeyboardArrowDown />}
>
    {/* {durationArr[selectDurInd] || "Duration"} */}
    {
        editCourse ? durationArr[course?.duration - 1] : durationArr[selectDurInd] || "Duration"
    }
</Button>
{
    weekNotSelected ?
        (<p style={{ color: "red", marginLeft: "5px" }}>
            Please Select Duration of Your Course
        </p>) : (<></>)
}
<Menu
    open={Boolean(menuOpen)}
    anchorEl={menuOpen}
    onClose={handleMenuClose}
>
    {durationArr.map((item, index) => (
        <MenuItem
            key={index}
            onClick={() => handleSelect(index)}
            name="duration"
        >
            {item}
        </MenuItem>
    ))}
</Menu>
{
    selectDurInd ? (
        <CourseOutlineComp
            course={course}
            selectDurInd={selectDurInd}
            courseOutlineArr={courseOutlineArr}
            setCourseOutlineArr={setCourseOutlineArr}
            coOutErr={coOutErr}
            editCourse={editCourse}
            course={course}
        />
    ) : (
        <></>
    )
}
















<FormControl component="fieldset" >
    <FormLabel component="legend">Course Duration</FormLabel>
    <RadioGroup
        aria-label="duration"
        defaultValue="weeks2"
        name="radio-buttons-group"
    >
        <FormControlLabel value="week1" control={<Radio />} label="1 week" />
        <FormControlLabel value="week2" control={<Radio />} label="2 weeks" />
        <FormControlLabel value="week3" control={<Radio />} label="3 weeks" />
        <FormControlLabel value="week4" control={<Radio />} label="4 weeks" />
    </RadioGroup>
</FormControl>