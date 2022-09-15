import React, { FC } from 'react';
import { CategoryList } from '../../components';
import { Install } from '../Install/Install';

export const MainPage: FC = () => {
  return (
    <div className="d-flex">
      <CategoryList />
      <Install />
    </div>
  );
};
