/**
 * Função que retorna o card do Jira correspondente ao índice.
 * Se não houver card suficiente, o último será reutilizado.
 *
 * @param jiraCards - Lista de cards do Jira fornecidos.
 * @param index - O índice do grupo de arquivos.
 * @returns O card do Jira correspondente ao índice ou o último card.
 */
export const getJiraCardForIndex = (
  jiraCards: string[],
  index: number
): string => {
  return jiraCards[index] || jiraCards[jiraCards.length - 1];
};
