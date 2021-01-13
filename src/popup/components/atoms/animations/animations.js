export const animateHeight = (isOpen) => ({
  animate: isOpen ? 'open' : 'closed',
  transition: {
    ease: 'easeOut',
    duration: 0.8,
    type: 'spring',
  },
  initial: false,
  variants: {
    open: {
      height: `auto`,
      opacity: 1,
    },
    closed: { height: `0px`, opacity: 0 },
  },
});
