import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { node } from 'prop-types';

export const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

Layout.propTypes = { children: node };
