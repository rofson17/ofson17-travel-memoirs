import React from 'react';
import { Container } from "@material-ui/core"
import { Routes, Route, Navigate } from 'react-router-dom';


import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Auth from './Components/Auth';
import PostDetails from './Components/PostDetails';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));


    return (
        <Container maxWidth='xl'>
            <Navbar />
            <Routes>
                {/* <Route path='/' element={<Navigate to={'/posts'} />} /> */}
                <Route path='/posts' element={<Home />} />
                <Route path='/posts/search' element={<Home />} />
                <Route path='/posts/:id' element={<PostDetails />} />

                <Route path='/auth' element={(!user) ? <Auth /> : <Navigate to='/posts' />} />
                <Route path="*" element={<Navigate to={'/posts'} />} />
            </Routes>

        </Container >
    )
}

export default App;