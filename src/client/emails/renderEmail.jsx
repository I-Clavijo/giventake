import { render } from '@react-email/render';
import React from 'react';
import GiventakeWelcome from './GiventakeWelcome.jsx';

const RenderEmail = () => {
  const html = render(<GiventakeWelcome />);
  return html;
};

export default RenderEmail;