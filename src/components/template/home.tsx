import Header from '@/components/header';
import Body from '@/components/body';
import Footer from '@/components/footer';

export default function TemplateHome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Body>
        {children}
      </Body>
      <Footer />
    </>
  );
}
