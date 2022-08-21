import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Wrapper from '../../components/Wrapper';
import { useNotification } from '../../context/useNotification';
import { useForgotPasswordMutation, useResetPasswordMutation } from '../../graphql/graphqlHooks';
import { withUrql } from '../../hocs/withUrqlClient';

interface Errors {
  userName: string;
  password: string;
}

const ForgotPassword = () => {
  const router = useRouter();

  const notCtx = useNotification();
  const [_, forgotPassword] = useForgotPasswordMutation();
  const [__, resetPassword] = useResetPasswordMutation();

  const hash = Array.isArray(router.query.hash) ? router.query.hash[0] : router.query.hash;

  return (
    <Wrapper variant="small">
      <>
        <Formik
          initialValues={{ userName: '', password: '' }}
          validate={(values) => {
            const errors = {} as Errors;

            if (hash) {
              if (values.password.trim().length === 0) {
                errors.password = 'Password is required';
              } else if (values.password.trim().length < 5) {
                errors.password = 'Password should contain at least 5 characters';
              }
            } else {
              if (values.userName.trim().length === 0) {
                errors.userName = 'username is required';
              } else if (values.userName.trim().length <= 2) {
                errors.userName = 'username should contain more than 2 characters';
              }
            }

            return errors;
          }}
          onSubmit={async (values) => {
            if (!hash) {
              const res = await forgotPassword({ userName: values.userName });
              console.log('check the res', res);
              if (res.data?.sent) {
                notCtx.setNotification({
                  message: 'Reset Password link has been shared to your mail',
                  autoClose: true,
                  status: 'success'
                });
                notCtx.show();
              } else if (res.error) {
                notCtx.setNotification({
                  message: res.error.message,
                  autoClose: true,
                  status: 'error'
                });
                notCtx.show();
              }
            } else {
              const res = await resetPassword({ token: hash, password: values.password });
              if (res.data?.created) {
                notCtx.setNotification({
                  message: 'Your password has been changed successfully',
                  autoClose: true,
                  status: 'success'
                });
                notCtx.show();
                router.push('/');
              } else if (res.error) {
                notCtx.setNotification({
                  message: res.error.message,
                  autoClose: true,
                  status: 'error'
                });
                notCtx.show();
              }
            }

            // const res = await login({ user: values });
            // console.log('check the response', res);
            // // const res = await registerUser({ user: values });
            // if (res.data?.user) {
            //   router.push('/');
            // } else if (res.error) {
            //   notCtx.setNotification({
            //     message: res.error.message,
            //     autoClose: true,
            //     status: 'error'
            //   });
            //   notCtx.show();
            // }
          }}
        >
          {({ values, errors, handleChange, isSubmitting, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Box display="flex" flexDir="column" gap="20px">
                {!!hash && (
                  <Box display={'flex'} gap="10px">
                    Do you know your password?
                    <NextLink href={'/login'}>
                      <Link color={'teal'}>login</Link>
                    </NextLink>
                  </Box>
                )}
                <FormControl
                  isInvalid={
                    (!!errors.userName || !!errors.password) &&
                    (touched.userName || touched.password)
                  }
                >
                  <FormLabel htmlFor={hash ? 'password' : 'userName'}>
                    {hash ? 'Password' : 'Username'}
                  </FormLabel>
                  <Input
                    id={hash ? 'password' : 'username'}
                    type={hash ? 'password' : 'text'}
                    name={hash ? 'password' : 'userName'}
                    value={hash ? values.password : values.userName}
                    placeholder={hash ? 'Enter password' : 'Enter username'}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{hash ? errors.password : errors.userName}</FormErrorMessage>
                </FormControl>

                <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                  {!!hash ? 'Reset Password' : 'Send link'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </>
    </Wrapper>
  );
};

export default withUrql(ForgotPassword);
