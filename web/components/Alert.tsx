import { Button, Alert, Slide, Box, AlertIcon } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Status, useNotification } from '../context/useNotification';

interface Props {
  isOpen: boolean;
  onToggle(): void;
}

const Notification = ({ isOpen, onToggle }: Props) => {
  const notCtx = useNotification();

  useEffect(() => {
    let timeId = 0;

    if (isOpen) {
      timeId = window.setTimeout(onToggle, 3000);
    }
    return () => {
      clearTimeout(timeId);
    };
  }, [isOpen]);

  return (
    <>
      <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
        <Box>
          <Alert
            display="flex"
            justifyContent="center"
            alignItems="center"
            status={notCtx.notification.status || 'success'}
          >
            <AlertIcon />
            {notCtx.notification.message.replace('[GraphQL] ', '')}
          </Alert>
        </Box>
      </Slide>
    </>
  );
};

export default Notification;
