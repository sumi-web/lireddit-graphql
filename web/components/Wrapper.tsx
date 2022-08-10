import { Box } from '@chakra-ui/react';
import React from 'react';

interface Props {
  variant?: 'small' | 'regular';
  children: JSX.Element;
}

const Wrapper = ({ children, variant = 'regular' }: Props) => {
  return (
    <Box
      mx="auto"
      maxWidth={variant === 'regular' ? '800px' : '400px'}
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
