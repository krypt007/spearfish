import './table.scss';

const Table = (props) => {
  const { Rows, headerTitles, classes } = props;
  return (
    <div className={`table-1 ${classes}`}>
      <table>
        <thead>
          <tr>
            {headerTitles.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {<Rows {...props} />}
        </tbody>
      </table>
    </div>
  )
}

export default Table
