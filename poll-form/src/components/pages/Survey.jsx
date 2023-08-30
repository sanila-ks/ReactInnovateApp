import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, Grid, Radio, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { savePoll } from '../store/pollSlice';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Summary from './SummaryPage';
import axios from 'axios';

export default function Survey() {
    const dispatch = useDispatch();
    let PollResult = useSelector((state) => state.pollDataset)

    const [PollQuestions, setPollQuestions] = useState([])
    const [PollCompleted, setPollCompleted] = useState(false)
    const [activeId, setActiveId] = useState();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(0);

    useEffect(() => {
        let responseData = []
        let pollData = []
        axios.get("https://poll-http-default-rtdb.firebaseio.com/pollQuestions.json")
            .then(response => {
                if (response.status === 200 && response.statusText === "OK") {
                    responseData = response.data
                    for (const key in responseData) {
                        pollData.push({
                            id: key,
                            pollQuestion: responseData[key].pollQuestion
                        })
                    }
                    setPollQuestions(pollData)
                    setActiveId(pollData[0].id)
                }
            })
            .catch(error => console.error(error))
    }, [])

    const setOption = (question, option) => {
        setTimeout(() => {
            setIsAnimating(false);

            dispatch(savePoll({
                Id: question.id,
                Question: question.pollQuestion,
                Option: option
            }))

            if (currentIndex < PollQuestions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setActiveId(PollQuestions[currentIndex + 1].id)
            } else {
                setActiveId('-1')
                setCurrentIndex(0)
                setPollCompleted(true)
            }

        }, 500);
    }

    const updateIndex = (event) => {
        if (event.target.value === "-1") {
            setActiveId(event.target.value)
            setCurrentIndex(-1)
            setPollCompleted(true)
        } else {
            setTimeout(() => {
                setIsAnimating(false);

                let index = PollQuestions.findIndex(item => item.id === event.target.value)
                setCurrentIndex(index);
                setActiveId(event.target.value)

            }, 500);
        }
    };

    // const emojiStyle = (index) => ({
    //     filter: hoveredIndex === null || hoveredIndex === index ? 'none' : 'blur(5px)',
    //     transition: 'transition: transform 0.3s ease filter 0.3s', // Add a smooth transition for the hover effect
    //     transform: hoveredIndex === index ? 'translateY(-20px)' : 'none',
    //     cursor: 'pointer',
    //     fontSize: '70px',
    //     '@media (max-width: 600px)': {
    //         fontSize: '35px'
    //     },
    // });

    const labelStyles = (index) => ({
        fontSize: '12px',
        color: 'darkblue',
        display: hoveredIndex === index ? 'block' : 'none', // Show label when hovering
        position: 'absolute',
        bottom: '-20px', // Adjust the positioning of the label
        left: '50%', // Center the label horizontally
        transform: 'translateX(-50%)',
        padding: '2px',
        whiteSpace: 'nowrap', // Prevent label from wrapping
        overflow: 'hidden', // Hide overflowing content
        maxWidth: '100%', // Limit the width to parent's width
    });

    return (
        <Grid container spacing={0}
            sx={{ height: '100vh', }}
        >
            <Grid item
                xs={!PollCompleted ? 10 : 1}
                sm={!PollCompleted ? 6 : 1}
                sx={{
                    transition: 'all 0.3s',
                    transformOrigin: 'right',
                }}
                onMouseEnter={() => {
                    if (PollCompleted) {
                        setPollCompleted(false)
                        setHoveredIndex(null)
                        setCurrentIndex(0)
                        setActiveId(PollQuestions[0]?.id)
                    }
                }}
            >
                <Card sx={{
                    height: '100%',
                    backgroundColor: 'blue',
                    color: 'white',
                    borderRadius: 0,
                }} >
                    <AutoStoriesIcon sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        padding: '20px'
                    }}
                    />
                    {PollQuestions.length > 0 && <Grid container sx={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Grid item xs={1}>
                            <Stack>
                                {PollQuestions.map((item => {
                                    return <Radio
                                        checked={activeId == item.id}
                                        onChange={(args) => {
                                            setIsAnimating(true)
                                            updateIndex(args)
                                        }}
                                        value={item.id}
                                        name="radio-buttons"
                                    />
                                }))}
                                <Radio
                                    checked={activeId == "-1"}
                                    onChange={(args) => {
                                        setIsAnimating(true)
                                        updateIndex(args)
                                    }}
                                    value={"-1"}
                                    name="radio-buttons"
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={11}>
                            {!PollCompleted
                                ? <CardContent sx={{
                                    padding: '20px',
                                }}>
                                    <Typography sx={{
                                        fontWeight: 'bold',
                                        // transition: 'transform 1s ease',
                                        // transform: isAnimating === true ? 'translateY(-400px)' : 'none',
                                        animation: isAnimating === true ? 'fadeIn 0.5s ease-in-out' : 'none',
                                        '@keyframes fadeIn': {
                                            from: { opacity: 1, transform: 'translateY(0)' },
                                            to: { opacity: 0, transform: 'translateY(-400px)' },
                                        },
                                    }} variant='h3' >{PollQuestions[currentIndex]?.pollQuestion}</Typography>
                                </CardContent>
                                : <></>}
                        </Grid>
                    </Grid>}
                </Card>
            </Grid >

            <Grid item
                xs={!PollCompleted ? 2 : 11}
                sm={!PollCompleted ? 6 : 11}
                sx={{
                    transition: 'all 0.3s',
                    transformOrigin: 'right'
                }}>
                {!PollCompleted
                    ? <Stack
                        // direction="row"
                        alignItems="center"
                        justifyContent="center"
                        spacing={3}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100vh',
                            animation: isAnimating === true ? 'fadeIn 0.5s ease-in-out' : 'none',
                            '@keyframes fadeIn': {
                                from: { opacity: 1, transform: 'translateY(0)' },
                                to: { opacity: 0, transform: 'translateY(-400px)' },
                            },
                            '@media (max-width: 600px)': {
                                flexDirection: 'column'
                            },
                        }}
                    >
                        <Box
                            onMouseEnter={() => setHoveredIndex(1)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => {
                                setIsAnimating(true)
                                setOption(PollQuestions[currentIndex], "Good")
                            }}
                            // style={emojiStyle(1)}
                            sx={{
                                filter: hoveredIndex === null || hoveredIndex === 1 ? 'none' : 'blur(5px)',
                                transition: 'transition: transform 0.3s ease filter 0.3s', // Add a smooth transition for the hover effect
                                transform: hoveredIndex === 1 ? 'translateY(-20px)' : 'none',
                                cursor: 'pointer',
                                fontSize: '70px',
                                '@media (max-width: 600px)': {
                                    fontSize: '35px'
                                },
                            }}
                        >&#128077;
                            <div style={labelStyles(1)}>Good</div>
                        </Box>
                        <Box
                            onMouseEnter={() => setHoveredIndex(2)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => {
                                setIsAnimating(true)
                                setOption(PollQuestions[currentIndex], "Not sure")
                            }}
                            // style={emojiStyle(2)}
                            sx={{
                                filter: hoveredIndex === null || hoveredIndex === 2 ? 'none' : 'blur(5px)',
                                transition: 'transition: transform 0.3s ease filter 0.3s', // Add a smooth transition for the hover effect
                                transform: hoveredIndex === 2 ? 'translateY(-20px)' : 'none',
                                cursor: 'pointer',
                                fontSize: '70px',
                                '@media (max-width: 600px)': {
                                    fontSize: '35px'
                                },
                            }}
                        >&#129300;
                            <div style={labelStyles(2)}>Not sure</div>
                        </Box>
                        <Box
                            onMouseEnter={() => setHoveredIndex(3)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => {
                                setIsAnimating(true)
                                setOption(PollQuestions[currentIndex], "Bad")
                            }}
                            // style={emojiStyle(3)}
                            sx={{
                                filter: hoveredIndex === null || hoveredIndex === 3 ? 'none' : 'blur(5px)',
                                transition: 'transition: transform 0.3s ease filter 0.3s', // Add a smooth transition for the hover effect
                                transform: hoveredIndex === 3 ? 'translateY(-20px)' : 'none',
                                cursor: 'pointer',
                                fontSize: '70px',
                                '@media (max-width: 600px)': {
                                    fontSize: '35px'
                                },
                            }}
                        >&#128078;
                            <div style={labelStyles(3)}>Bad</div>
                        </Box>
                    </Stack>
                    : <Summary />}
            </Grid>
        </Grid >
    )
}

