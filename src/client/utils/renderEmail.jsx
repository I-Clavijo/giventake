import { render } from '@react-email/render';
import React from 'react';
import GiventakeWelcome from '../emails/GiventakeWelcome.jsx';

const RenderEmail = (name) => {
  console.log("Rendering email...");
  const html = render(<GiventakeWelcome name={name}/>);
  console.log("Rendering for: ", name);  
  return html;
};

export default RenderEmail;