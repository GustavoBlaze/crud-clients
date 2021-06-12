import React, {
  useEffect,
  useState,
  useRef,
  InputHTMLAttributes,
  FormHTMLAttributes,
} from "react";

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

interface Client {
  id: string;
  name: string;
  email: string;
  cellphone: string;
}

export default function Home() {
  const [clients, setClients] = useState<Client[]>([] as Client[]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [selectClientId, setSelectedClientId] = useState("");

  const formRef = useRef(null);

  async function getClients() {
    const { clients: data } = await fetch("/api/clients").then((r) => r.json());
    setClients(data);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    const data = {
      name,
      email,
      cellphone,
    };

    if (selectClientId) {
      await fetch(`/api/clients/${selectClientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: uuid(), ...data }),
      });
    }

    setSelectedClientId("");
    setName("");
    setEmail("");
    setCellphone("");

    getClients();
  }

  async function handleDeleteClient(id: string) {
    await fetch(`/api/clients/${id}`, {
      method: "DELETE",
    });

    getClients();
  }

  async function handleEditClient(id: string) {
    const client = clients.find((client: Client) => client.id === id);

    setSelectedClientId(client?.id || "");
    setName(client?.name || "");
    setEmail(client?.email || "");
    setCellphone(client?.cellphone || "");
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <Flex
      direction="column"
      height="100vh"
      alignItems="center"
      margin="0 auto"
      width="100%"
      maxWidth="800px"
      p={4}
    >
      <Stack
        as="form"
        flexDirection="column"
        onSubmit={handleSubmit}
        width="100%"
        maxWidth="400px"
        spacing={4}
        mb={4}
        ref={formRef}
      >
        <FormControl isRequired>
          <FormLabel fontWeight="bold">Nome</FormLabel>
          <Input
            type="text"
            name="name"
            required
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          ></Input>
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontWeight="bold">Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          ></Input>
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontWeight="bold">Celular</FormLabel>
          <Input
            type="text"
            name="cellphone"
            value={cellphone}
            onChange={({ target: { value } }) => setCellphone(value)}
          ></Input>
        </FormControl>

        <Button type="submit" colorScheme="teal" size="lg">
          Enviar
        </Button>
      </Stack>

      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Celular</Th>
            <Th colSpan={2}>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clients.map(({ id, name, email, cellphone }) => (
            <Tr key={id}>
              <Td>{name}</Td>
              <Td>{email}</Td>
              <Td>{cellphone}</Td>
              <Td>
                <Flex>
                  <Button
                    colorScheme="orange"
                    mr={2}
                    onClick={() => handleEditClient(id)}
                  >
                    Editar
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteClient(id)}
                  >
                    Excluir
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}
