import * as actionTypes from '../action';

const initialState = {
    stateSort: JSON.parse(localStorage.getItem('isSort')) || { isOrder: true, isCategory: false, isAlpha: false}
}

const statesortReducer = (state = initialState , action) => {
    switch(action.type){
        case actionTypes.CHANGE_STATE_SORT: 
        return {
            ...state,
            stateSort: action.stateSort
        }
        default: return state;
    }
}

export default statesortReducer;