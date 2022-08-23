import { Formik, Field } from 'formik';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from '@chakra-ui/react';
import { SelectControl } from 'formik-chakra-ui';
import AlertMessage from '../functions/alert';

export default function Registration() {
  return (
    <ChakraProvider>
      <Flex
        bg="rgba(39, 42, 51, 0.95)"
        align="center"
        justify="center"
        h="100vh"
      >
        <Box bg="#23252d" p={6} rounded="md" w={64}>
          <Formik
            initialValues={{
              login: '',
              name: '',
              surname: '',
              major: '',
              password: '',
            }}
            onSubmit={async (values) => {
              try {
                const req = await fetch(
                  'https://alihan-myproject.azurewebsites.net/api/v1/app/register',
                  {
                    method: 'POST',
                    body: JSON.stringify(values, null, 2),
                    headers: {
                      'Content-Type': 'application/json',
                      Accept: 'application/json',
                      'Access-Control-Allow-Origin': '*',
                    },
                  }
                );
                const res = await req.json();

                if (res.statusCode === 'OK') {
                  window.location.pathname = '/login';
                }
                AlertMessage(res.message, 'success');
                // alert(res.message);
              } catch (error) {
                window.location.pathname = '/500';
                console.log(error);
              }
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl>
                    <FormLabel color="white" htmlFor="text">
                      Login
                    </FormLabel>
                    <Field
                      as={Input}
                      id="login"
                      name="login"
                      type="login"
                      bg="white"
                      // variant="filled"
                    />
                  </FormControl>
                  <FormControl isInvalid={!!errors.name && touched.name}>
                    <FormLabel color="white" htmlFor="name">
                      Name
                    </FormLabel>
                    <Field
                      as={Input}
                      id="name"
                      name="name"
                      type="text"
                      bg="white"
                      // variant="filled"
                      validate={(value) => {
                        let error;

                        if (value.length < 1) {
                          error = 'Must be filed';
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.surname && touched.surname}>
                    <FormLabel color="white" htmlFor="surname">
                      Surname
                    </FormLabel>
                    <Field
                      as={Input}
                      id="surname"
                      name="surname"
                      type="text"
                      bg="white"
                      // variant="filled"
                      validate={(value) => {
                        let error;

                        if (value.length < 1) {
                          error = 'Must be filed';
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.surname}</FormErrorMessage>
                  </FormControl>
                  <SelectControl
                    bg="white"
                    // color="white"

                    name="major"
                    selectProps={{ placeholder: 'Select major' }}
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="IOS">IOS</option>
                    <option value="Android">Android</option>
                    <option value="DevOps">DevOps</option>
                  </SelectControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel color="white" htmlFor="password">
                      Password
                    </FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      bg="white"
                      // variant="filled"
                      validate={(value) => {
                        let error;

                        if (value.length < 5) {
                          error = 'Password must contain at least 6 characters';
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Button type="submit" colorScheme="orange" width="full">
                    SIGN UP
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
