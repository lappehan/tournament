import { SelectControl } from "formik-chakra-ui";
import {
  Button,
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
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Formik } from "formik";

import React from "react";
import AlertMessage from "../functions/alert";

async function newWinner(values) {
  try {
    const token = sessionStorage.getItem("token");
    const req = await fetch(
      `https://alihan-myproject.azurewebsites.net/api/v1/app/admin/change_result?winnerName=${values.winnerName}&winnerSurname=${values.winnerSurname}&match_id=${values.match_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (req.ok) {
      AlertMessage("Winner changed!", "success");
    }
  } catch (err) {
    AlertMessage(err, "error");
  }
}

export default function ChangeWinner(props) {
  //   const facts = getFacts(user);
  //   const re = useCallback(async () => {

  //   }, []);

  //   useEffect(() => {
  //     try {
  //       re();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }, [re]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAdmin =
    sessionStorage.getItem("role") === "ROLE_ADMIN" ? true : false;
  if (isAdmin) {
    return (
      <ChakraProvider>
        <button className="changer" onClick={onOpen}>
          ✍
        </button>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Change Winner</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{
                  match_id: props.match_id,
                  winnerName: "",
                  winnerSurname: "",
                }}
                onSubmit={async (values) => {
                  const [winnerName, winnerSurname] = values.winner.split(" ");
                  const newValues = {
                    winnerName: winnerName,
                    winnerSurname: winnerSurname,
                    match_id: values.match_id,
                  };

                  newWinner(newValues);

                  onClose();
                }}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                      <SelectControl
                        name="winner"
                        selectProps={{ placeholder: "Select new winner" }}
                        isRequired
                      >
                        <option value={props.user}>{props.user}</option>
                        <option value={props.userOpponent}>
                          {props.userOpponent}
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
  return <></>;
}
