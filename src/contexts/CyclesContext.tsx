import { createContext, ReactNode, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
interface CreateCycleData {
  task: string
  minutesAmount: number
}
interface CyclesContentType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrenteCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interrutCycle: () => void
}
interface CycleContextProviderProps {
  children: ReactNode
}
export const CyclesContext = createContext({} as CyclesContentType)

export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  function markCurrenteCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }
  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...cycles, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }
  function interrutCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }
  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrenteCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interrutCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
