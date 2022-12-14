import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      {/* <pre>{JSON.stringify(cycles, null, 2)}</pre> */}
      <HistoryList>
        <table>
          <thead>
            <th>Tarefa</th>
            <th>Duração</th>
            <th>Início</th>
            <th>Status</th>
          </thead>
          <tbody>
            {/* <tr>
              <td>tarefa</td>
              <td>0 min</td>
              <td>há 2 meses</td>
              <td>
                <Status statusColor="yellow">concluida</Status>
              </td>
            </tr> */}
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                    {cycle.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
            {/* <tr>
              <td>tarefa</td>
              <td>0 min</td>
              <td>há 2 meses</td>
              <td>
                <Status statusColor="green">concluida</Status>
              </td>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>0 min</td>
              <td>há 2 meses</td>
              <td>
                <Status statusColor="green">concluida</Status>
              </td>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>0 min</td>
              <td>há 2 meses</td>
              <td>
                <Status statusColor="green">concluida</Status>
              </td>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>0 min</td>
              <td>há 2 meses</td>
              <td>
                <Status statusColor="green">concluida</Status>
              </td>
            </tr> */}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
