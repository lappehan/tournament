import ReactLoading from "react-loading";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

export default function ShowFacts(props) {
  const user = props.user;
  const [facts, setFacts] = useState();

  //   const facts = getFacts(user);
  const re = useCallback(async () => {
    const token = sessionStorage.getItem("token");
    const name = user.split(" ");
    const req = await fetch(
      `https://alihan-myproject.azurewebsites.net/api/v1/app/user/info?surname=${name[1]}&name=${name[0]}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const res = await req.json();
    setFacts(res.facts);
  }, [user]);

  useEffect(() => {
    try {
      re();
    } catch (err) {
      console.log(err);
    }
  }, [re]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (facts) {
    return (
      <ChakraProvider>
        <button onClick={onOpen}>{user}</button>

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Facts about {user}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {facts.map((elem, index) => {
                return (
                  <div className="facts" key={`${elem}=${index}`}>
                    {index + 1}. {elem}
                  </div>
                );
              })}
            </ModalBody>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    );
  } else {
    return <ReactLoading color={"orange"} className="center" />;
  }
}
