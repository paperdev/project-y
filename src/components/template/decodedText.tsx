import he from 'he';

export default function DecodedText({
  text,
  className
}: {
  text: string,
  className?: string
}) {
  return (
    <>
      <div className={`${className}`}>
        {he.decode(text)}
      </div>
    </>
  );
}

