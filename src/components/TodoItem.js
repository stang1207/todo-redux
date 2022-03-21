import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import {
  IconButton,
  Flex,
  Input,
  Text,
  HStack,
  useToast,
} from '@chakra-ui/react';
import {
  AiOutlineClose,
  AiOutlineCheck,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineLike,
} from 'react-icons/ai';
import {
  deleteTodo,
  editTodo,
  completeTodo,
} from '../redux/features/todoSlice';

const Todo = ({ todo }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState(todo.description);
  const editSumbitEvent = (e) => {
    e.preventDefault();
    if (!editInput) {
      return toast({
        title: 'Enter a valid input.',
        description: 'Please enter a valid input!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    dispatch(editTodo({ id: todo.id, description: editInput }));
    setIsEditing(!isEditing);
    toast({
      title: 'Todo edited.',
      description: "We've successfully updated your todo",
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const onEditTodo = () => {
    setIsEditing(!isEditing);
  };
  const onToggleCompleted = (id) => {
    dispatch(completeTodo({ id }));
  };
  const onDeleteItem = (id) => {
    dispatch(deleteTodo({ id }));
    toast({
      title: 'Todo deleted.',
      description: "We've successfully delated a todo",
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  };

  console.log(isEditing);

  return (
    <Flex
      bg={todo.isCompleted ? 'blackAlpha.400' : 'blackAlpha.300'}
      alignItems="center"
      justifyContent={'space-between'}
      p=".5rem 1rem"
      borderRadius={'md'}
    >
      {isEditing ? (
        <Form onSubmit={(e) => e.preventDefault()}>
          <Input
            padding=".5rem"
            fontSize="inherit"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
        </Form>
      ) : (
        <Text
          flex={1}
          textDecor={todo.isCompleted ? 'line-through' : 'none'}
          maxW={'20rem'}
        >
          {todo.description}
        </Text>
      )}

      <HStack spacing=".5rem" ml="1rem">
        <IconButton
          aria-label={isEditing ? 'confirm edit' : 'Start editing todo'}
          icon={isEditing ? <AiOutlineLike /> : <AiOutlineEdit />}
          bg="whiteAlpha.200"
          _hover={{ bg: 'whiteAlpha.500' }}
          color="blue.200"
          onClick={isEditing ? editSumbitEvent : onEditTodo}
          size="sm"
        />
        <IconButton
          aria-label="Mark todo is finished"
          icon={
            todo.isCompleted ? (
              <AiOutlineClose color="red" />
            ) : (
              <AiOutlineCheck />
            )
          }
          bg="whiteAlpha.200"
          _hover={{ bg: 'whiteAlpha.500' }}
          color="green.200"
          onClick={() => onToggleCompleted(todo.id)}
          size="sm"
        />
        <IconButton
          aria-label="Delete todo"
          icon={<AiOutlineDelete />}
          bg="whiteAlpha.200"
          _hover={{ bg: 'whiteAlpha.500' }}
          color="purple.300"
          onClick={() => onDeleteItem(todo.id)}
          size="sm"
        />
      </HStack>
    </Flex>
  );
};

export default Todo;

const Form = styled.form`
  flex: 1;
  display: flex;
  gap: 1rem;
  align-items: center;
`;
