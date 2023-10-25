import React from 'react'
import logobroken from "../project-assets/dm-logo-orig-white-txt-broken.png";
import Placeholder from './Placeholder';

const NotFound = () => {
  return (
    <div >
        <Placeholder src={<img src={logobroken} alt='page not found'/>} message={"Oh Oh! This page doesn't exists"}/>
    </div>
  )
}

export default NotFound