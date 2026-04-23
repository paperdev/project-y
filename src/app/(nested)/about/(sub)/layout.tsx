import TemplatePage from '@/components/template/_page';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TemplatePage>
      {children}
    </TemplatePage>
  );
}
