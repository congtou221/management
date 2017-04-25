function userReducer (state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action);

    switch (action.type) {
    case 'SET_NAME':
        return {
            state: state,
            name: action.name
        };
    default:
        return state;
    }
};

module.exports = userReducer;