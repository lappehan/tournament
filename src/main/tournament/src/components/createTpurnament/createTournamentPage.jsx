import { ChakraProvider, Textarea } from '@chakra-ui/react';
import { Formik, Field } from 'formik';
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
import doWeHaveToken from '../functions/checkIfAutorized';
import Header from '../pageElements/header';
import AlertMessage from '../functions/alert';
import Footer from '../pageElements/footer';

export default function CreateTournamentPage() {
  if (doWeHaveToken()) {
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
                name: '',
                description: '',
                type: '',
              }}
              onSubmit={async (values) => {
                try {
                  const token = sessionStorage.getItem('token');

                  const req = await fetch(
                    'https://alihan-myproject.azurewebsites.net/api/v1/app/tournament/create',
                    {
                      method: 'POST',
                      body: JSON.stringify(values, null, 2),
                      headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  if (req.ok) {
                    AlertMessage('Tournament added', 'success');
                    window.location.pathname = '/';
                  } else {
                    AlertMessage('Something went wrong!', 'error');
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl isInvalid={!!errors.name && touched.name}>
                      <FormLabel color="white" htmlFor="name">
                        Name
                      </FormLabel>
                      <Field
                        as={Input}
                        id="name"
                        bg="white"
                        name="name"
                        type="text"
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
                    <FormControl
                      isInvalid={!!errors.description && touched.description}
                    >
                      <FormLabel color="white" htmlFor="description">
                        Description
                      </FormLabel>
                      <Field
                        as={Textarea}
                        id="description"
                        name="description"
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
                      <FormErrorMessage>{errors.description}</FormErrorMessage>
                    </FormControl>

                    <SelectControl
                      bg="white"
                      name="type"
                      selectProps={{ placeholder: 'Select Game' }}
                      isRequired
                    >
                      <option value="MortalKombat">Mortal Kombat</option>
                      <option value="Fifa">Fifa</option>
                      <option value="UFC">UFC</option>
                      <option value="Tennis">Tennis</option>
                    </SelectControl>

                    <Button type="submit" colorScheme="orange" width="full">
                      Create Tournament
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
      <div className="NotAutorized">You Not Authorized</div>
      <Footer />
    </ChakraProvider>
  );
}
