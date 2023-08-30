export const AddAction = (pollResult) => {
    console.log("inside AddAction")
    return {
        type: 'PUT_POLL_RESULT',
        payload: pollResult
    }
}