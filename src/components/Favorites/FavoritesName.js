import React, { useState, useEffect, useContext } from 'react';
import { saveWorkout } from '../../api/Workouts';
import { UserContext } from '../UserContext';

import './FavoritesName.css'

function FavoritesName(props) {
  const [name, setName] = useState(props.name);
  const [edited, setEdited] = useState(false);
  const [editing, setEditing] = useState(false);
  const context = useContext(UserContext);

  useEffect(() => {
    if (edited) {
      if (context.saveMode) {
        context.workouts.setName(props.id, name);

        saveWorkout(context.user.id, context.workouts.get())
          .then(() => {
            setEdited(false);
            setEditing(false);
            props.handleEditingText(false);
            context.updateMode(false, false, false);
          });

      } else if (context.cancelMode) {
        setName(props.name);
        setEdited(false);
        setEditing(false);
      }
    }
  });

  function handleOnChange(e) {
    setName(e.target.value);
    setEdited(true);
  };

  function handleOnClick() {
    setEditing(true);
    props.handleEditingText(true);
    context.updateMode(true, false, false);
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
