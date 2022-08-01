import React from 'react';
import { CategoryList, Install } from '../../components';

export const MainPage = () => {
    return (
        <div className="d-flex">
            <CategoryList />
            <Install />
        </div>
    );
};
