import React from 'react';
import StarIcon from '../../public/icons/StarIcon';


function RatingStar({ value = 0 }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="rating flex space-x-1 justify-center">
      {stars.map((starValue) => (
        <div key={starValue}>
          <input
            type="radio"
            name="rating"
            id={`star${starValue}`}
            value={starValue}
            className="sr-only "
            checked={value === starValue}
            readOnly
          />
          <label htmlFor={`star${starValue}`}>
            <StarIcon text={ starValue <= value ? 'text-[gold]' : 'text-[gray]' } />
          </label>
        </div>
      ))}
    </div>
  );
}

export default RatingStar;
              
