import { Icon } from '@iconify/react';
import './entry_row.scss';

const EntryRow = ({ rowData, rowDataAdditionalData }) => {
  const toggleOpenRow = (e) => {
    const el = e.currentTarget;
    el.classList.toggle('closed');
  }

  return (
    <div className="row closed" onClick={toggleOpenRow}>
      <div className="upper flex-row space-between align-center">
        {rowData}
        <div className='flex-column-center align-center mr-10 fs-1-1 opened-indicator'>
          <Icon icon='bi:chevron-right' />
        </div>
      </div>
      <div className="lower flex-row space-between align-center">
        {rowDataAdditionalData}
      </div>
    </div>
  );
};

export default EntryRow;
