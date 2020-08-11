import React from 'react';
import { Button } from 'react-bootstrap';
import homeside from '../images/home-side.svg';
import r_side_home from '../images/rside_home.svg';
import home_rotate from '../images/home_rotate.svg';
import student_stats from '../images/student_stats.svg';
import get_started from '../images/get_started.svg';

const Home = () => (
    <div className="home">
        <header className="home-header"></header>
        <img src={homeside} className='side-home' />
        <img src={r_side_home} className='rside-home' />
        <h1 className='home-org-header'>IntuiTeach</h1>
        <div className='container-img-txt home-feedback-layout'>
            <img src={home_rotate} alt='Rotation Icon' />
            <div>
                <h2 className='home-feedback-h2'>Live feedback for live teaching</h2>
                <p className='home-statistics-p'>Plugin that allows teachers to quiz their students in real time</p>
                <div className='home-feedback-button-container'>
                    <Button className='main-button' variant='primary' size='lg'>Students</Button>
                    <Button className='main-button' variant='primary' size='lg'>Educators</Button>
                </div>
            </div>
        </div>

        <div className='container-img-txt home-statistics-layout'>
            <div>
                <h2 className='home-statistics-h2'>Understanding Students Through Statistics</h2>
                <p className='home-statistics-p'>Allows educators to gauge participation
        and identify student success through a dashboard</p>
            </div>
            <img src={student_stats} alt='Student Pie Chart' />
        </div>

        <div className='container-img-txt home-get-started-layout'>
            <div>
                <h2 className='home-get-started-h2'>A better way to understand students</h2>
                <h2 className='home-get-started-h2'>A better way to help students</h2>
            </div>
            <img src={get_started} alt='' />
        </div>
        <Button variant='primary' size='lg' id='get-started-button'>Get Started</Button>
    </div>

);

export default Home