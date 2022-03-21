import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import {
  Center,
  Flex,
  Button,
  Heading,
  Text,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { addTodo } from '../redux/features/todoSlice';
import TodoItem from '../components/TodoItem';

const TodoList = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todos.value);
  const [input, setInput] = useState('');

  const addTodoEvent = (e) => {
    e.preventDefault();
    //If input field is invalid or empty, use a toast message
    if (!input) {
      return toast({
        title: 'Enter a valid input.',
        description: 'Please enter a valid input!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    //Else dispatch an add to do action
    dispatch(
      addTodo({
        description: input,
        id: Math.floor(Math.random() * 1000),
        isCompleted: false,
      })
    );
    //Reset the state and send a success message using toast
    setInput('');
    toast({
      title: 'Todo created.',
      description: "We've successfully created a new todo",
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };
  return (
    <Center as="main" minH="100vh" bg="#111">
      <Flex
        as="section"
        borderRadius="md"
        flexDir="column"
        gap="1rem"
        w={['80%', '25rem', '35rem']}
        maxH={['30rem', '35rem']}
        p={['1.5rem', '2rem']}
        bg="green.600"
        boxShadow="0rem .5rem 1.5rem rgba(255,255,255,.3)"
        color="white"
      >
        <Heading as="h1" fontSize={['1.5rem', '1.8rem', '2rem']}>
          Todo App
        </Heading>
        <Form onSubmit={addTodoEvent}>
          <Input
            outline="none"
            borderRightRadius={'none'}
            _focus={{ outline: 'none' }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            outline="none"
            borderLeft="none"
            bg="whiteAlpha.500"
            borderLeftRadius={'none'}
          >
            ✚
          </Button>
        </Form>
        {todoList.length > 0 ? (
          <VStack
            maxH={'30rem'}
            overflowY="scroll"
            alignItems={'stretch'}
            fontSize={['.8rem', '.9rem', '1rem']}
          >
            {todoList &&
              todoList.map((todo, index) => {
                return <TodoItem todo={todo} key={index} />;
              })}
          </VStack>
        ) : (
          <Text textAlign="center">Please add something to start...</Text>
        )}
      </Flex>
    </Center>
  );
};

const Form = styled.form`
  display: flex;
`;

export default TodoList;
