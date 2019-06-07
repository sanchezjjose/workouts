import React, { useState, useEffect } from 'react';

function FavoritesName(props) {
  const [name, setName] = useState(props.name);

  useEffect(() => {
    console.log('useEffect called...');
  });

  return (
    <div className={`workout-label`} onClick={() => setName('test')}>{name}</div>
  );
}

export default FavoritesName;
