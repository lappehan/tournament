import { FormControl, SelectControl } from 'formik-chakra-ui';
import {
  Button,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  // FormControl,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { ChakraProvider, Textarea } from '@chakra-ui/react';
import { Formik, Field } from 'formik';

import React from 'react';
import AlertMessage from '../functions/alert';

async function setWinner(tournamentId, stage, login) {
  const token = sessionStorage.getItem('token');
  try {
    const [name, surname] = login.split(' ');
    const values = {
      tournamentId: tournamentId,
      stage: stage.toString(),
      name: name,
      surname: surname,
    };
    const reqWinner = await fetch(
      'https://alihan-myproject.azurewebsites.net/api/v1/app/tournament/result-winner',
      {
        method: 'POST',
        body: JSON.stringify(values, null, 2),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await reqWinner.json();

    if (res.statusCode === 406) {
      return [false, res.message];
    }
    return [true, res.message];
  } catch (err) {
    console.log(err);
    return [false, 'error'];
  }
}

async function setFacts(user, fact, done) {
  const token = sessionStorage.getItem('token');
  const [name, surname] = user.split(' ');
  const values = {
    surname: surname,
    name: name,
    fact: fact,
    done: done,
  };
  try {
    const req = await fetch(
      'https://alihan-myproject.azurewebsites.net/api/v1/app/tournament/info',
      {
        method: 'POST',
        body: JSON.stringify(values, null, 2),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await req.json();
    if (res.statusCode === 406) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
  }
}

export default function WinLose(user) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!user.haveWinner) {
    return (
      <ChakraProvider>
        <button className="checker" onClick={onOpen}>
          ✔
        </button>

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Round Results</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{
                  login: '',
                  done: '',
                  fact: '',
                  winner: '',
                  tournamentId: '',
                }}
                onSubmit={async (values) => {
                  // setWinner(user.tournamentId, user.stage, values.winner);
                  // setFacts(user.userOpponent, values.fact, values.done);
                  if (values.fact !== '' && values.done !== '') {
                    // AlertMessage('All fields must be filled', 'error');

                    const [winner, winnerMessage] = await setWinner(
                      user.tournamentId,
                      user.stage,
                      values.winner
                    );

                    if (winner) {
                      const facts = await setFacts(
                        user.userOpponent,
                        values.fact,
                        values.done
                      );
                      if (facts) {
                        AlertMessage('Added', 'success');
                      }
                    } else {
                      AlertMessage(winnerMessage, 'error');
                    }
                    onClose();
                  }
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                      <FormControl isInvalid={!!errors.fact && touched.fact}>
                        <FormLabel htmlFor="fact">
                          Tell something interesting about you opponent
                        </FormLabel>
                        <Field
                          as={Textarea}
                          id="fact"
                          name="fact"
                          type="text"
                          variant="filled"
                          validate={(value) => {
                            if (value.length >= 1) {
                              document
                                .querySelector('.factError')
                                .setAttribute('hidden', 'true');
                            } else {
                              document
                                .querySelector('.factError')
                                .removeAttribute('hidden');
                            }
                          }}
                        />
                        <div className="factError">Must be filled!</div>
                      </FormControl>

                      <FormControl isInvalid={!!errors.done && touched.done}>
                        <FormLabel htmlFor="done">
                          What your opponent learned today ?
                        </FormLabel>
                        <Field
                          as={Textarea}
                          id="done"
                          name="done"
                          type="text"
                          variant="filled"
                          validate={(value) => {
                            if (value.length >= 1) {
                              document
                                .querySelector('.doneError')
                                .setAttribute('hidden', 'true');
                            } else {
                              document
                                .querySelector('.doneError')
                                .removeAttribute('hidden');
                            }
                          }}
                        />
                        <div className="doneError">Must be filled!</div>
                      </FormControl>

                      <SelectControl
                        name="winner"
                        selectProps={{ placeholder: 'Select Winner' }}
                        isRequired
                      >
                        <option value={`${user.user}`}>{user.user}</option>
                        <option value={`${user.userOpponent}`}>
                          {user.userOpponent}
                        </option>
                      </SelectControl>

                      <Button type="submit" colorScheme="orange" width="full">
                        Submit
                      </Button>
                    </VStack>
                  </form>
                )}
              </Formik>
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider>
      <button className="checker" onClick={onOpen}>
        ✔
      </button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Round Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                login: '',
                done: '',
                fact: '',
                winner: '',
                tournamentId: '',
              }}
              onSubmit={async (values) => {
                const facts = await setFacts(
                  user.userOpponent,
                  values.fact,
                  values.done
                );
                if (facts) {
                  AlertMessage('Info added', 'success');
                } else {
                  AlertMessage('Something went wrong!(', 'error');
                }
                onClose();
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl isInvalid={!!errors.name && touched.name}>
                      <FormLabel htmlFor="fact">
                        Tell something interesting about you opponent
                      </FormLabel>
                      <Field
                        as={Textarea}
                        id="fact"
                        name="fact"
                        type="text"
                        variant="filled"
                      />
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.description && touched.description}
                    >
                      <FormLabel htmlFor="done">
                        What your opponent learned today ?
                      </FormLabel>
                      <Field
                        as={Textarea}
                        id="done"
                        name="done"
                        type="text"
                        variant="filled"
                      />
                    </FormControl>

                    <SelectControl
                      name="winner"
                      selectProps={{ placeholder: `Winner is ${user.winner}` }}
                    ></SelectControl>

                    <Button
                      type="submit"
                      colorScheme="orange"
                      width="full"
                      onClose={onClose}
                    >
                      Submit
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
