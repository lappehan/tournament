import { ChakraProvider } from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import doWeHaveToken from '../functions/checkIfAutorized';
import Header from '../pageElements/header';
import AlertMessage from '../functions/alert';
import Footer from '../pageElements/footer';

export default function DeletetUser() {
  const isAdmin =
    sessionStorage.getItem('role') === 'ROLE_ADMIN' ? true : false;
  if (doWeHaveToken() && isAdmin) {
    return (
      <ChakraProvider>
        <Header />

        <Flex
          bg="rgba(39, 42, 51, 0.95);"
          align="center"
          justify="center"
          h="80vh"
        >
          <Box bg="#23252d" p={10} rounded="md" w={'80%'}>
            <Formik
              initialValues={{
                username: '',
                surname: '',
              }}
              onSubmit={async (values) => {
                try {
                  const token = sessionStorage.getItem('token');
                  const req = await fetch(
                    `https://alihan-myproject.azurewebsites.net/api/v1/app/admin/delete-user?username=${values.username}&surname=${values.surname}`,
                    {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  if (req.ok) {
                    AlertMessage('User deleted', 'success');
                  }
                } catch (error) {
                  AlertMessage(error, 'error');
                }
              }}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl>
                      <FormLabel color="white" htmlFor="username">
                        Name
                      </FormLabel>
                      <Field
                        as={Input}
                        id="username"
                        bg="white"
                        name="username"
                        type="text"
                        // variant="filled"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel color="white" htmlFor="description">
                        Surname
                      </FormLabel>
                      <Field
                        as={Input}
                        id="surname"
                        name="surname"
                        type="text"
                        bg="white"
                        // variant="filled"
                      />
                    </FormControl>

                    <Button type="submit" colorScheme="orange" width="full">
                      Delete user
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </Box>
        </Flex>
        <Footer />
      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider>
      <Header />
      <div className="NotAutorized">You Not Admin</div>
      <Footer />
    </ChakraProvider>
  );
}
