import React from 'react';
import Tr from './Tr';

const Table = ( {onClick, tableData} ) => {
    return (
        <table >
            {Array(tableData.length).fill().map( (tr, i) => (<Tr roeIndex={i} rowData={tableData[i]} />))}
        </table>
    )
};

export default Table;