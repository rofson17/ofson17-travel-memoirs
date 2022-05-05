import React from 'react';
import { Container } from "@material-ui/core"
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Auth from './Components/Auth';


const App = () => {



    return (
        <BrowserRouter>
            <Container maxWidth='lg'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/auth' element={<Auth />} />
                </Routes>

            </Container >
        </BrowserRouter>
    )
}

export default App;