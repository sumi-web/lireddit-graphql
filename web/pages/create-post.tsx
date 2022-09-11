import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Textarea,
  Flex
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { useNotification } from '../context/useNotification';
import { useCreatePostMutation } from '../graphql/graphqlHooks';
import { withUrql } from '../hocs/withUrqlClient';

interface PostError {
  title: string;
  text: string;
}

const CreatePost = () => {
  const notCtx = useNotification();
  const router = useRouter();

  const [_, createPost] = useCreatePostMutation();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        validate={(values) => {
          const errors = {} as PostError;

          if (values.title.trim().length === 0) {
            errors.title = 'title is required';
          } else if (values.title.trim().length <= 2) {
            errors.title = 'title should contain more than 2 characters';
          }

          if (values.text.trim().length === 0) {
            errors.text = 'text is required';
          } else if (values.text.trim().length < 5) {
            errors.text = 'text should contain at least 5 characters';
          }

          return errors;
        }}
        onSubmit={async (values) => {
          const { data, error } = await createPost({
            post: { text: values.text, title: values.title }
          });

          if (data?.created) {
            notCtx.setNotification({
              message: 'Post has been created successfully',
              autoClose: true,
              status: 'success'
            });
            notCtx.show();
            router.push('/');
          }

          if (error) {
            notCtx.setNotification({
              message: error.message,
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
              <FormControl isInvalid={!!errors.title && touched.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  value={values.title}
                  placeholder="title"
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>
              <Box>
                <>
                  <FormLabel htmlFor="text">Body</FormLabel>
                  <Textarea
                    isInvalid={!!errors.text && touched.text}
                    id="text"
                    name="text"
                    value={values.text}
                    placeholder="Text..."
                    onChange={handleChange}
                  />
                  {!!errors.text && touched.text && (
                    <Flex color={'red'} fontSize="14px" marginTop={'5px'}>
                      {errors.text}
                    </Flex>
                  )}
                </>
              </Box>
              <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                Create Post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrql(CreatePost);
