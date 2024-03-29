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
import Wrapper from '../components/Wrapper';
import { useNotification } from '../context/useNotification';
import { useRegisterUserMutation } from '../graphql/graphqlHooks';
import { withUrql } from '../hocs/withUrqlClient';

interface RegisterError {
  userName: string;
  email: string;
  password: string;
}

const Register = () => {
  const notCtx = useNotification();
  const [_, registerUser] = useRegisterUserMutation();

  const router = useRouter();

  return (
    <Wrapper variant="small">
      <>
        <Formik
          initialValues={{ userName: '', email: '', password: '' }}
          validate={(values) => {
            const errors = {} as RegisterError;

            if (values.userName.trim().length === 0) {
              errors.userName = 'username is required';
            } else if (values.userName.trim().length <= 2) {
              errors.userName = 'username should contain more than 2 characters';
            }

            if (!values.email) {
              errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }

            if (values.password.trim().length === 0) {
              errors.password = 'Password is required';
            } else if (values.password.trim().length < 5) {
              errors.password = 'Password should contain at least 5 characters';
            }

            return errors;
          }}
          onSubmit={async (values) => {
            const res = await registerUser({ user: values });

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
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="text"
                    name="email"
                    value={values.email}
                    placeholder="email"
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
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
                <Flex gap={'10px'}>
                  <Box>Already have an account?</Box>
                  <NextLink href="/login">
                    <Link color={'teal'}>login</Link>
                  </NextLink>
                </Flex>
              </Box>
            </Form>
          )}
        </Formik>
      </>
    </Wrapper>
  );
};

export default withUrql(Register);
