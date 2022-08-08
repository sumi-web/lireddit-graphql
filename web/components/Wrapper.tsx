import { Box } from '@chakra-ui/react';
import React from 'react';

interface Props {
  variant?: 'small' | 'regular';
  children: JSX.Element;
}

const Wrapper = ({ children, variant = 'regular' }: Props) => {
  return (
    <Box mt={8} mx="auto" maxWidth={variant === 'regular' ? '800px' : '400px'} w="100%">
      {children}
    </Box>
  );
};

export default Wrapper;
