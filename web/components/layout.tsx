import React from 'react';
import { VariantType } from '../utils/types';
import Navbar from './Navbar';
import Wrapper from './Wrapper';

const Layout = ({ variant, children }: { variant: VariantType; children: JSX.Element }) => {
  return (
    <>
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
