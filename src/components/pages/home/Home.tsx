import React from 'react';
import MainSection from './MainSection';
import { getBookmarks } from '@/src/services/BookmarkServices';

const HomePage = async() => {
    return (
        <div>
           <MainSection></MainSection>
        </div>
    );
};

export default HomePage;