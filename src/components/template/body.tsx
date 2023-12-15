export default function Body({
  children,
  className
}: {
  children: React.ReactNode,
  className?: string
}) {
  return (
    <>
      <div id='scrollableElementDiv' className={`${className}`}>
        {children}
      </div>
    </>
  );
}

