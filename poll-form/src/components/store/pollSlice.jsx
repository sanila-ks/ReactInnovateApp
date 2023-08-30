import { createSlice } from '@reduxjs/toolkit';

const initialPollState = {
    pollDataset: [],
};

const pollSlice = createSlice({
    name: 'poll',
    initialState: initialPollState,
    reducers: {
        savePoll(state, action) {
            const isExist = state.pollDataset.find(item => item.Id === action.payload.Id);
            console.log("isExist", isExist);
            if (isExist) {
                Object.assign(isExist, action.payload);
            } else {
                state.pollDataset = [...state.pollDataset, action.payload];
            }
        },
        resetPoll: (state) => {
            state.pollDataset = []
            console.log("inside reset")
            console.log(state.pollDataset)
        },
        savePollResult(state, action) {
            console.log("inside savePollResult", action)
            // state.pollDataset = action.payload
        },
        savePollResultSuccess(state, action) {
            console.log("inside savePollResultSuccess", action)
            if (action.type === "poll/savePollResultSuccess") {
                console.log("putinfo", action.payload)
            }
        }
    },
});

export const {
    savePoll,
    resetPoll,
    savePollResult,
    savePollResultSuccess } = pollSlice.actions;

export default pollSlice.reducer;