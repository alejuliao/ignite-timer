import { createContext, ReactNode, useReducer, useState } from 'react'

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
interface CyclesState {
  cycle: Cycle[]
  activeCycleId: string | null
}
export const CyclesContext = createContext({} as CyclesContentType)

export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          }
        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }
              } else {
                return cycle
              }
            }),
            activeCycleId: null,
          }
        case 'MARK_CURRENT_CYCLE_AS_FINISHED':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
            activeCycleId: null,
          }
        default:
          return state
      }
      // if (action.type === 'ADD_NEW_CYCLE') {
      //   return {
      //     ...state,
      //     cycles: [...state.cycles, action.payload.newCycle],
      //     activeCycleId: action.payload.newCycle.id,
      //   }
      // }
      // if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
      //   return {
      //     ...state,
      //     cycles: state.cycles.map((cycle) => {
      //       if (cycle.id === state.activeCycleId) {
      //         return { ...cycle, interruptedDate: new Date() }
      //       } else {
      //         return cycle
      //       }
      //     }),
      //     activeCycleId: null,
      //   }
      // }
      // if (action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED') {
      //   return {
      //     ...state,
      //     cycles: state.cycles.map((cycle) => {
      //       if (cycle.id === state.activeCycleId) {
      //         return { ...cycle, finishedDate: new Date() }
      //       } else {
      //         return cycle
      //       }
      //     }),
      //     activeCycleId: null,
      //   }
      // }
      // return state
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const { cycles, activeCycleId } = cyclesState
  // const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  function markCurrenteCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })
  }
  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: { newCycle },
    })
    // setCycles((state) => [...cycles, newCycle])
    // setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }
  function interrutCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })
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
