import * as React from 'react';
import { useCallback, useEffect, useState } from "react";

export const Slap = ({
  left, right, center, hideCounter = false
}) => {
  const [currentImage, setCurrentImage] = useState(center);
  const [mouseEnterPos, setMouseEnterPos] = useState(0);
  const [slapCount, setSlapCount] = useState(0);

  const onMouseEnter = useCallback(
    (e) => {
      setMouseEnterPos(e.pageX)
    },
    [setMouseEnterPos],
  )

  const slap = useCallback(
    (e) => {
      e.pageX < mouseEnterPos ? setCurrentImage(left) : setCurrentImage(right);
      setSlapCount((s) => s + 1);
    },
    [mouseEnterPos, setCurrentImage],
  )


  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentImage(center);
    }, 400)
    return () => {
      clearTimeout(timeout);
    }
  }, [slapCount]);

  return (
    <div>
      <img src={currentImage} className="mx-auto" onMouseEnter={onMouseEnter} onMouseLeave={slap} />
      {!hideCounter && <div>{slapCount}</div>}
    </div>
  )
}