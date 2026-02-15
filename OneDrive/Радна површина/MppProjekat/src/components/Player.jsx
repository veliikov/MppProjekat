import React, { useState } from "react";

const Player = ({ playerName, symbol }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(playerName);

  function handleEditing() {
    setIsEditing((prev) => !prev);
  }

  function handleChangeName(event) {
    setName(event.target.value);
  }

  let nameComponent = <span className="player-name">{name}</span>;
  if (isEditing) {
    nameComponent = (
      <input type="text" required value={name} onChange={handleChangeName} />
    );
  }

  return (
    <li>
      <span className="player">
        {nameComponent}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
