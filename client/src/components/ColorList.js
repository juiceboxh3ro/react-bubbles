import React, { useState } from "react";
import { axiosWithAuth } from "../util/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToSave, setColorToSave] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        setEditing(false)
        updateColors()
      })
      .catch(err => console.error(err))
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        updateColors()
      })
      .catch(err => console.error(err))
  };

  const saveColor = e => {
    e.preventDefault()
    axiosWithAuth()
    .post(`/api/colors`, colorToSave)
    .then(res => {
      updateColors()
    })
    .catch(err => console.error(err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      {/* stretch - build another form here to add a color */}

      <form onSubmit={saveColor}>
          <legend>new color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToSave({ ...colorToSave, color: e.target.value })
              }
              value={colorToSave.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToSave({
                  ...colorToSave,
                  code: { hex: e.target.value }
                })
              }
              value={colorToSave.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
          </div>
        </form>

        <div className="spacer" />
    </div>
  );
};

export default ColorList;
