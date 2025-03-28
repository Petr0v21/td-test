import React from 'react';
import './index.css';

export type TableRowProps = Record<string, React.ReactNode>;

export type TableProps = {
  heading: string[];
  rows: TableRowProps[];
};

const Table: React.FC<TableProps> = ({ heading, rows }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {heading.map((head, headID) => (
              <th key={headID}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <TableRow
              row={row}
              key={'row' + index}
              rowId={'row' + index + 'column'}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

export const TableRow: React.FC<{
  row: TableRowProps;
  rowId: string;
}> = ({ row, rowId }) => {
  return (
    <tr className="table-row">
      {Object.values(row).map((val, index) => (
        <td key={rowId + index}>
          <p>{val}</p>
        </td>
      ))}
    </tr>
  );
};
