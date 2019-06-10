import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';

import './FavoritesName.css'

function FavoritesName(props) {
  const [name, setName] = useState(props.name);
  const [edited, setEdited] = useState(false);
  const [editing, setEditing] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    if (edited) {
      if (user.saveMode) {
        console.log('Saving....');
        setEdited(false);
        setEditing(false);

      } else if (user.cancelMode) {
        setName(props.name);
        setEdited(false);
        setEditing(false);
      }
    }
  });

  const handleOnChange = (e) => {
    setName(e.target.value);
    setEdited(true);
  };

  function handleOnClick() {
    setEditing(true);
    props.handleEditingText(true);
    user.updateMode(true, false, false);
  }

  function handleOnBlur() {
    if (!edited) {
      setEditing(false);
    }
  }

  return (
    <div className={`FavoritesName ${editing ? 'editing' : ''}`}>
      <input
        type='text'
        onChange={handleOnChange}
        onClick={handleOnClick}
        onFocus={handleOnClick}
        onBlur={handleOnBlur}
        value={name}
        readOnly={false}
      />
    </div>
  );
}

export default FavoritesName;
