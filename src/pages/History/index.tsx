import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <th>Tarefa</th>
            <th>Duração</th>
            <th>Início</th>
            <th>Status</th>
          </thead>
          <tbody>
            <tr>
              <td>tarefa</td>
              <td>0 min</td>
              <td>há 2 meses</td>
              <td>
                <Status statusColor="yellow">concluida</Status>
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
            </tr>
            <tr>
              <td>tarefa</td>
              <td>0 min</td>
              <td>há 2 meses</td>
              <td>
                <Status statusColor="green">concluida</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
