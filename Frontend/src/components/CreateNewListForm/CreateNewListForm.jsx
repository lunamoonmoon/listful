import React, { useState } from 'react';

const CreateNewListForm = ({ onSubmit, onCancel }) => {
  const [listName, setListName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Only submit if the list name is not empty
    if (listName.trim()) {
      onSubmit(listName);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New List Name:
        <input type="text" value={listName} onChange={(event) => setListName(event.target.value)} />
      </label>
      <button type="submit">Create List</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default CreateNewListForm;
