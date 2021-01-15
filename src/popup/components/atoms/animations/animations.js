export const animateHeight = (isOpen) => ({
  animate: isOpen ? 'open' : 'closed',
  transition: {
    ease: 'easeOut',
    duration: 0.5,
  },
  initial: false,
  variants: {
    open: {
      height: `auto`,
      opacity: 1,
      clipPath: 'inset(calc(var(--em) * -1))',
    },
    closed: {
      height: `0px`,
      opacity: 0,
      clipPath: 'inset(calc(var(--em) * -1))',
    },
  },
});
