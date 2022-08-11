import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import Wrapper from '../components/Wrapper';
import { useNotification } from '../context/useNotification';
import { useLoginUserMutation } from '../graphql/graphqlHooks';

interface LoginError {
  userName: string;
  password: string;
}

const Login = () => {
  const notCtx = useNotification();
  console.log('check the notCtx', notCtx);
  const [_, login] = useLoginUserMutation();

  const router = useRouter();

  return (
    <Wrapper variant="small">
      <>
        <Formik
          initialValues={{ userName: '', password: '' }}
          validate={(values) => {
            const errors = {} as LoginError;

            if (values.userName.trim().length === 0) {
              errors.userName = 'username is required';
            } else if (values.userName.trim().length <= 2) {
              errors.userName = 'username should contain more than 2 characters';
            }

            if (values.password.trim().length === 0) {
              errors.password = 'Password is required';
            } else if (values.password.trim().length < 5) {
              errors.password = 'Password should contain at least 5 characters';
            }

            return errors;
          }}
          onSubmit={async (values) => {
            const res = await login({ user: values });
            console.log('check the response', res);

            // const res = await registerUser({ user: values });
            if (res.data?.user) {
              router.push('/');
            } else if (res.error) {
              notCtx.setNotification({
                message: res.error.message,
                autoClose: true,
                status: 'error'
              });
              notCtx.show();
            }
          }}
        >
          {({ values, errors, handleChange, isSubmitting, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Box display="flex" flexDir="column" gap="20px">
                <FormControl isInvalid={!!errors.userName && touched.userName}>
                  <FormLabel htmlFor="userName">Username</FormLabel>
                  <Input
                    id="username"
                    type="text"
                    name="userName"
                    value={values.userName}
                    placeholder="username"
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.userName}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={values.password}
                    placeholder="password"
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                  Register
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </>
    </Wrapper>
  );
};

export default Login;
