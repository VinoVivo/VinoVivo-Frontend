import Body from '@/components/layouts/body/Body';
import RootLayout from './layout';
import Footer from '@/components/layouts/footer/Footer';
import Header from '@/components/layouts/header/Header';

export default function Home() {
  return (
    <RootLayout>
      <Header />
      <Body/>
      <Footer />
    </RootLayout>
  );
}
