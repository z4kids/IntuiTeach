import React from 'react'
import r_side from '../images/rside.svg';
import statistics from '../images/statistics.svg';
import purple_side from '../images/purple-side.svg';
import {  Button } from 'react-bootstrap';

const Educators = () => (
    <div className="educators">
        <header className='header'></header>
        <img src={purple_side} className='side-educators' />
        <img src={r_side} className='rside' />
        <h1 className='page-header'>Educators</h1>
        <div className='container-img-txt eduactors-contents-layout'>
            <img src={statistics} alt='Statistics Icon' />
            <div>
                <h2 className='educator-h2'>Integration with Zoom that allows for
                better understanding of students
        </h2>
                <p className='educator-p'>Login with Zoom and download the plugin to start integrating statistics into your student's learning</p>
                <Button className='main-button educator-login' educator-login variant='primary' size='lg'>Login</Button>
            </div>
        </div>
    </div>

)

export default Educators