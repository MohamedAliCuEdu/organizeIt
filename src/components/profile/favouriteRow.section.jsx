import React, { useState } from "react";
import useProfileContext from "../../hooks/useProfileContext";
import classNames from "classnames";

function favouriteRowSection({
  children,
  sectionName,
  title,
  name,
  placeholder,
  metaColor,
}) {
  const { userFavourites, addFavouriteItemApi, removeFavouriteItemApi } =
    useProfileContext();
  // 1. states"
  const [newItem, setNewItem] = useState(""); // new favourite item:
  const [selectedItem, setSelectedItem] = useState(""); // selected item to remove

  // handle new item change:
  const handleNewItem = (value) => {
    setNewItem(value);
  };
  // handle selecting item to remove:
  const handleSelectedItem = (value) => {
    if (selectedItem === value) {
      setSelectedItem("");
    } else {
      setSelectedItem(value);
    }
  };
  const handleRemoveItem = () => {
    // check if item has been selected:
    if (selectedItem) {
      removeFavouriteItemApi(name, selectedItem);
      setSelectedItem("");
    }
  };
  const handleSubmit = (e) => {
    addFavouriteItemApi(e, name, newItem);
    setNewItem("");
  };

  return (
    <section className={`${sectionName} fav-section`}>
      <h3 className="fav-list-title">{title}:</h3>
      <div className="content">
        <div className="list-inputs">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="input-div">
              <input
                className="input-lg-field"
                type="text"
                name={name}
                value={newItem}
                onChange={(e) => handleNewItem(e.target.value)}
                minLength="1"
                maxLength="30"
                placeholder={placeholder}
                required
                disabled={userFavourites[name]?.length >= 5}
              />
            </div>
            <input
              className="dark-btn md-btn"
              type="submit"
              value="add"
              disabled={userFavourites[name]?.length >= 5}
            />
          </form>
          {selectedItem && (
            <button
              className="delete-item-btn md-btn red-btn"
              onClick={handleRemoveItem}
            >
              delete item
            </button>
          )}
        </div>
        <ul className={`items-list ${metaColor}`}>
          {userFavourites?.[name]?.length > 0 ? (
            userFavourites[name].map((item, idx) => (
              <div
                className={classNames("select-item-div", {
                  selected: selectedItem === item,
                })}
                key={idx}
                data-count={idx + 1}
              >
                <input
                  type="radio"
                  id={item}
                  name={name}
                  value={item}
                  onClick={() => handleSelectedItem(item)}
                />
                <label htmlFor={item}>{item}</label>
              </div>
            ))
          ) : (
            <h4 className="empty-fav-list">list is empty!</h4>
          )}
        </ul>
      </div>
      <div className="section-icon">{children}</div>
    </section>
  );
}

export default favouriteRowSection;
