import { render } from '@react-email/render';
import React from 'react';
import GiventakeWelcome from '../../emails/GiventakeWelcome.jsx';

const RenderEmail = () => {
  const html = render(<GiventakeWelcome userName="Ivan"/>);
  return html;
};

export default RenderEmail;