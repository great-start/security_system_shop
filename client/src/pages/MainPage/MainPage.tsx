import React, { FC } from 'react';
import { CategoryList, Install } from '../../components';

export const MainPage: FC = () => {
  return (
    <div className="d-flex">
      <CategoryList />
      <Install />
    </div>
  );
};
