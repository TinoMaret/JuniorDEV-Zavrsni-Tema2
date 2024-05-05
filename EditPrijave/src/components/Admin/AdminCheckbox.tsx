import React from 'react';
import { AdminContext } from './AdminContext.tsx';

const Checkbox: React.FC = () => {
  const { checked, handleCheckboxChange } = AdminContext();

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        Check me
      </label>
      <p>Checked: {checked.toString()}</p>
    </div>
  );
};

export default Checkbox;
