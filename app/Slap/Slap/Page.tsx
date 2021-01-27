import * as React from 'react';
import { useParams } from 'react-router-dom';
import center from '../../assets/center.png';
import left from '../../assets/left.png';
import right from '../../assets/right.png';
import { Slap } from './Slap';

export const SlapPage = () => {
  const { id } = useParams<{ id: string }>();
  return <div>
    {id}
    <Slap right={right} left={left} center={center} />
  </div>;
}
