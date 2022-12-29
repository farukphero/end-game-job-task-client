import React from 'react';
import AddPost from '../AddPost/AddPost';
import TopPost from '../TopPost/TopPost';

const Home = () => {
    return (
        <div className='w-9/12 mx-auto mt-10 mb-24 lg:my-12'>
            <AddPost></AddPost>
            <TopPost></TopPost>
        </div>
    );
};

export default Home;