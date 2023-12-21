import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  initialState: {
    opacity: 0,
    x: '100vw'
  },
  animateState: {
    opacity: 1,
    x: 0
  },
  exitState: {
    opacity: 0,
    x: '-100vw'
  }
}

export function TransitionPage({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode={'wait'}>
      <motion.div
        key={'routerMotion'}
        initial='initialState'
        animate='animateState'
        exit='exitState'
        transition={{
          type: 'tween',
          duration: 0.5
        }}
        variants={variants}
        className=''
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
