import * as React from 'react';
import { 
    Box, Stack, Button,
    Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, FormControl,
    FormControlLabel, InputLabel, MenuItem,
    Select, Switch, OutlinedInput
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { alertCounterToggle } from '../../../shares/shareSlice';
import { Grid } from '@mui/material';
import { ValidationMessage } from '../../../shares/ValidationMessage';

export default function AlertCounter({submitOrder, submitOrder2}) {

    const [endtime, setEndTime] = React.useState()
    const { showAlertCounter } = useSelector(state => state.share)
    const dispatch = useDispatch();
  
    const alertToggleClick = () => {
      dispatch(alertCounterToggle())
    }

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMaxWidthChange = (event) => {
        setMaxWidth(event.target.value);
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={"md"}
                open={showAlertCounter}
                onClose={alertToggleClick}
            >
                <DialogTitle>Select To Start</DialogTitle>
                <DialogContent>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >
                        <Grid 
                            container 
                            direction="row"
                            alignItems="center"
                        >
                            <Grid 
                                item
                                sx={{
                                    marginX: 7
                                }}
                            >
                                <Button variant="contained" onClick={()=>submitOrder()}>
                                    To Start Normal
                                </Button>
                            </Grid>
                            <Grid 
                                item
                                sx={{
                                    marginX: 7,
                                    mt: 2,
                                    mb: 2
                                }}
                            >
                                                                
                            <Stack spacing={1}>
                                <InputLabel >
                                    Hours (required)
                                </InputLabel>
                                <OutlinedInput
                                    type="text"
                                    onChange={(e) => {
                                        setEndTime(e.target.value)
                                    }}
                                    name="hour"
                                    placeholder="Enter Time (hh:mm)"
                                />
                                <ValidationMessage field={"hour"} />
                            </Stack>                        

                                <Button sx={{ mt: 1 }} variant="contained" onClick={()=>submitOrder2(endtime)}>
                                    Start With Hours
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={alertToggleClick}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}