import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { savePollResult } from "../store/pollSlice";
import { AddAction } from "../store/pollAction";

export default function Summary(props) {

    const dispatch = useDispatch();
    const Poll_Result = useSelector((state) => state.pollDataset);

    const submitHandler = (args) => {
        dispatch(AddAction(JSON.stringify(args)))
        // dispatch(savePollResult(JSON.stringify(args)))
    }

    return (
        <Box paddingLeft={'20px'} >
            <Typography variant="h2" sx={{
                fontWeight: 'bold',
                marginTop: '20px',
                marginLeft: '40px',
                width: '50%',
                '@media (max-width: 600px)': {
                    fontSize: '40px'
                },
            }}>An overview of your answers</Typography>
            <ul>
                {Poll_Result.map(item => {
                    return (<>
                        <li key={item.Id} style={{ "listStyleType": "none" }}>
                            <Grid container>
                                <Grid item xs={8}>
                                    <Typography variant="h5" sx={{
                                        fontWeight: 'bold',
                                        '@media (max-width: 600px)': {
                                            fontSize: '20px'
                                        },
                                    }} gutterBottom>{item.Question}</Typography>
                                    <Typography variant="body2" sx={{ color: 'grey', }} gutterBottom>{item.Question}</Typography>
                                </Grid>
                                <Grid item xs={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    {item.Option === "Good"
                                        ? <span style={{ 'font-size': '30px' }}>&#128077;</span>
                                        : item.Option === "Not sure"
                                            ? <span style={{ 'font-size': '30px' }}>&#129300;</span>
                                            : <span style={{ 'font-size': '30px' }}>&#128078;</span>
                                    }
                                </Grid>
                            </Grid>
                        </li>
                        <hr /></>)
                })}
            </ul>
            <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: '20px', marginLeft: '40px' }}
                disabled={Poll_Result.length > 0 ? false : true}
                onClick={() => submitHandler(Poll_Result)}
            >Submit</Button>
        </Box>
    )
}