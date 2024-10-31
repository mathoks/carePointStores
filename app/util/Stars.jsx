
import React, { memo, useMemo } from 'react';
import StarIcon from '../../public/icons/StarIcon';
import HalfStar from '../../public/icons/HalfStar';


const Stars = memo(function Starss({ rating, size, size1 = '' }) {
  const stars = useMemo(() => {
    const starsArray = new Array(5);

    for (let i = 0; i < 5; i++) {
      const filledStars = Math.floor(rating);
      const halfStar = rating - filledStars >= 0.5;

      if (i < filledStars) {
        starsArray[i] = <li key={i}><StarIcon fontSize='inherit' text={ 'text-[gold]'} fillcol={'gold'} /></li>;
      } else if (i === filledStars && halfStar) {
        starsArray[i] = <li key={i}><HalfStar fontSize='inherit'  text={ 'text-[gold]'} /></li>;
      } else {
        starsArray[i] = <li key={i}><StarIcon fontSize='inherit' text={ 'text-[gold]'} fillcol={"none"} /></li>;
      }
    }

    return starsArray;
  }, [rating]);

  return (
    <div className={`flex space-x-2 text-[14px] items-center ${size1}`}>
      <p className={size}>{Number(rating).toFixed(1)}</p>
      <ul className='flex space-x-0'>
        {stars}
      </ul>
    </div>
  );
}, (prev, next) => prev.rating === next.rating);

export default Stars;