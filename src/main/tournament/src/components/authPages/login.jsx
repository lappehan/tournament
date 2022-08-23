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
import AlertMessage from '../functions/alert';

export default function Login() {
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
            bg="#23252d"
            initialValues={{
              login: '',
              password: '',
            }}
            onSubmit={async (values) => {
              try {
                const req = await fetch(
                  'https://alihan-myproject.azurewebsites.net/api/v1/app/auth',
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
                const reqJ = await req.json();

                if (reqJ.roles) {
                  sessionStorage.setItem('role', reqJ.roles[0]);
                }

                if (reqJ.token) {
                  sessionStorage.setItem('token', `${reqJ.token}`);
                  const userReq = await fetch(
                    'https://alihan-myproject.azurewebsites.net/api/v1/app/user',
                    {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${reqJ.token}`,
                      },
                    }
                  );

                  const userRes = await userReq.json();
                  sessionStorage.setItem(
                    'user',
                    `${userRes.firstName} ${userRes.lastName}`
                  );
                  sessionStorage.setItem('login', `${userRes.login}`);
                  window.location.pathname = '/';
                } else {
                  AlertMessage(reqJ.message, 'error');
                }
                //
              } catch (error) {
                window.location.pathname = '/500';
                console.log(error);
              }
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  {/* <FormControl isInvalid={!!errors.name && touched.name}> */}
                  <FormControl>
                    <FormLabel color="white" htmlFor="text">
                      Login
                    </FormLabel>
                    <Field
                      as={Input}
                      bg="white"
                      id="login"
                      name="login"
                      type="login"
                      // variant="filled"
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel color="white" htmlFor="password">
                      Password
                    </FormLabel>
                    <Field
                      as={Input}
                      bg="white"
                      id="password"
                      name="password"
                      type="password"
                      // variant="filled"
                      validate={(value) => {
                        let error;

                        if (value.length < 3) {
                          error = 'Password must contain at least 3 characters';
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Button type="submit" colorScheme="orange" width="full">
                    Login
                  </Button>
                  <a href="/registration">
                    <Button colorScheme="blue" width="full">
                      Sign up
                    </Button>
                  </a>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
