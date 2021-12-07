import React from 'react'
import { Alert, Snackbar } from '@mui/material'

const MuiSnacks = ({ openSnack, severity, text, setOpenSnack }) => {

    // const handleClick = () => {
    //     setOpen(true);
    // };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        // setOpen(false);
    };
    return (
        <Snackbar open={openSnack} autoHideDuration={2500} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity || 'success'} sx={{ width: '100%' }}>
                {text}
            </Alert>
        </Snackbar>
    )
}

export default MuiSnacks
