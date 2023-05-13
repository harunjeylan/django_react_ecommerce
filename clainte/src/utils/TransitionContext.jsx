import { createContext, useTransition } from 'react'

export const TransitionContext = createContext()

const TransitionProvider = ({ children }) => {
  const [isPending, startTransition] = useTransition()

  const values = {
    isPending,
    startTransition,
  }
  return (
    <TransitionContext.Provider value={values}>
      {children}
    </TransitionContext.Provider>
  )
}

export default TransitionProvider
