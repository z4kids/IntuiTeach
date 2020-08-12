import React from 'react';
import { Button } from 'react-bootstrap';
import homeside from '../images/home-side.svg';
import r_side_home from '../images/rside_home.svg';
import home_rotate from '../images/home_rotate.svg';
import student_stats from '../images/student_stats.svg';
import get_started from '../images/get_started.svg';
import developer from '../images/developer.svg';
import trophy from '../images/trophy.svg';
import { NavLink } from 'react-router-dom';
const Home = () => (
    <div className="home">
        <header className="home-header"></header>
        <img src={homeside} className='side-home' />
        <img src={r_side_home} className='rside-home' />
        <h1 className='home-org-header'>IntuiTeach</h1>
        <div className='container-img-txt home-feedback-layout'>
            <img src={home_rotate} alt='Rotation Icon' />
            <div>
                <h2 className='home-container-h2'>Live feedback for live teaching</h2>
                <p className='home-container-p'>Plugin that allows teachers to quiz their students in real time</p>
                <div className='home-feedback-button-container'>
                    <NavLink className="padding-right" to='/students'><Button className='main-button' variant='primary' size='lg'>Students</Button></NavLink>
                    <NavLink to='/educators'><Button className='main-button' variant='primary' size='lg'>Educators</Button></NavLink>
                </div>
            </div>
        </div>

        <div className='container-img-txt home-statistics-layout'>
            <div>
                <h2 className='home-container-h2'>Understanding Students Through Statistics</h2>
                <p className='home-container-p'>Allows educators to gauge participation
        and identify student success through a dashboard</p>
            </div>
            <img src={student_stats} alt='Student Pie Chart' />
        </div>

        <div className='container-img-txt home-encouraging-layout'>
            <div>
                <h2 className='home-container-h2'>Encouraging Student Engagement</h2>
                <h2 className='home-container-p'>Point-based reward system ensures students participate
        in the classroom</h2>
            </div>
            <img src={trophy} alt='' />
        </div>

        <div className='container-img-txt home-streamlining-layout'>
            <img src={get_started} alt='' />
            <div>
                <h2 className='home-container-h2'>Streamlining Virtual Learning</h2>
                <h2 className='home-container-p'>Facilitates student-teacher and peer-to-peer communication,
        making virtual classrooms more enjoyable for students</h2>
                <NavLink to="/educators"><Button className='main-button' variant='primary' size='lg'>Get Started</Button></NavLink>
            </div>
        </div>

        <div className='container-img-txt home-developer-layout'>
            <div>
                <h2 className='home-container-h2'>Developer-Friendly API</h2>
                <h2 className='home-container-p'>Our flexible API allows IntuiTeach to easily be integrated to
        different platforms</h2>
                <Button className='main-button' variant='primary' size='lg'>Documentation</Button>
            </div>
            <img src={developer} alt='' />
        </div>
    </div>

);

export default Home