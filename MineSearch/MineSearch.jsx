import React, { useReducer, createContext } from 'react';
import Table from './Table';

export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
});

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
};

const reducer = (state, action) => {
    switch(action.type) {

        default :
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <TableContext.Provider { {tableData: state.tableData, dispatch} }>
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    )
}

export default MineSearch;