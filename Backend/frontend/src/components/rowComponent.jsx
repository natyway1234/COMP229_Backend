// Individual row component for displaying items with image and text
import React from 'react';

const RowComponent = ({ item }) => {
  return (
    <div className="row">
      {/* Display item image */}
      <img src={item.imagePath} alt="Row content" />
      {/* Display item title and description */}
      <div className="text-content">
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </div>
  );
};

export default RowComponent;
