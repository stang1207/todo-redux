import Head from 'next/head';
import TodoList from '../src/components/TodoList';

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta
          name="description"
          content="This is a simple todo app that is built solely for learning redux"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TodoList />
    </>
  );
}
