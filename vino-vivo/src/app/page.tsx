'use client'
import Body from '@/components/layouts/body/Body';
import ContextProvider from '@/context/page';

export default function Home() {
  return (
    <>
    <ContextProvider>
      <Body/>
      </ContextProvider>
    </>
  );
}