
import Body from './components/layouts/body/Body';
import Footer from './components/layouts/footer/Footer';
import Header from './components/layouts/header/Header';
import CardDetail from './components/productDetail/CardDetail';
import RootLayout from './layout';
export default function Home() {
  return (
    <RootLayout>
      <Header />
      <Body />
      <CardDetail/>
      <Footer />
    </RootLayout>
  );
}
