import ComponentVideoCategory from '@/components/(youtube)/videoCategory';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ComponentVideoCategory />
      {children}
    </>
  );
}
