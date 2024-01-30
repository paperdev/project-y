import { useRouter } from 'next/navigation';
import { SwipeableProps, useSwipeable } from 'react-swipeable';

export default function Swiper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const swipeableConfig: SwipeableProps = {
    // delta: 50,
    preventScrollOnSwipe: false,
  }

  const swipeableHandlers = useSwipeable({
    onSwipedRight: (eventData) => {
      if (eventData.initial[0] <= 200) {
        router.back();
      }
    },

    ...swipeableConfig
  });

  return (
    <>
      <div {...swipeableHandlers}>
        {children}
      </div>
    </>
  );
}
