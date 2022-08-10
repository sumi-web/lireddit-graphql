import { useDisclosure } from '@chakra-ui/react';
import { createContext, useContext, useState } from 'react';
import Notification from '../components/Alert';

export type Status = 'success' | 'warning' | 'error' | 'info';

export interface INotification {
  message: string;
  autoClose?: boolean;
  status?: Status;
}

interface NotificationContextType {
  notification: INotification;
  setNotification(notification: INotification): void;
  show(): void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState({
    message: '',
    autoClose: true,
    status: 'success' as Status
  });

  const { isOpen, onToggle } = useDisclosure();

  const show = () => {
    if (isOpen) return;
    onToggle();
  };

  const handleNotificationChange = (newNot: INotification) => {
    setNotification({
      ...notification,
      ...{ ...newNot, status: !!newNot.status ? newNot.status : 'success' }
    });
  };

  return (
    <NotificationContext.Provider
      value={{ notification, setNotification: handleNotificationChange, show }}
    >
      <>
        <Notification isOpen={isOpen} onToggle={onToggle} />
        {children}
      </>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext) as NotificationContextType;
};

export default NotificationProvider;
