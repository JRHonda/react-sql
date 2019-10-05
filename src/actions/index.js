// Action creator

export const selectUser = user => {
    // Return an action
    return {
        type: 'USER_SELECTED',
        payload: user
    };
};

