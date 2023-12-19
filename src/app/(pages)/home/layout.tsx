import ComponentVideoCategory from '@/components/(youtube)/videoCategory';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ComponentVideoCategory />
      <div className='h-screen mx-auto'>
        {children}
      </div>
    </>
  );
}
