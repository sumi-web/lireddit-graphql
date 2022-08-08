import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useMutation } from 'urql';
import Wrapper from '../components/Wrapper';
import { RegisterUser } from '../graphql/mutations/registerUser';

const Register = () => {
  const [result, registerUser] = useMutation(RegisterUser);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ userName: '', email: '', password: '' }}
        onSubmit={(values) => {
          return registerUser({ user: values });
        }}
      >
        {({ values, errors, handleChange, isSubmitting }) => (
          <Form>
            <Box display="flex" flexDir="column" gap="20px">
              <FormControl>
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
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="text"
                  name="email"
                  value={values.email}
                  placeholder="email"
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.userName}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="password"
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.userName}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
