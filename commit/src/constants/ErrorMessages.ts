/**
 * @file ErrorMessages.ts
 *
 * Este arquivo contém uma constante `ErrorMessages` que armazena todas as mensagens de erro relacionadas ao processo de commit.
 * As mensagens são categorizadas por tipo de commit (como estilo, correção, teste, etc.) e incluem uma mensagem genérica para casos não cobertos.
 *
 * A ideia é centralizar todas as mensagens de erro em um único arquivo, facilitando a manutenção e a legibilidade do código.
 * Cada chave no objeto `ErrorMessages` representa um tipo de erro ou estado, e o valor associado a cada chave é a mensagem de erro a ser exibida.
 *
 * As mensagens foram organizadas com base nos tipos de commit padronizados pelo Conventional Commits e outras operações gerais do sistema de versionamento.
 */

export const ErrorMessages: Record<string, string> = {
  NO_JIRA_CARD_OR_MESSAGE:
    "Erro: Certifique-se de fornecer o(s) card(s) do Jira e a mensagem.",
  NO_MODIFIED_FILES: "Nenhum arquivo modificado encontrado.",
  USAGE_HINT: "Uso: npm run commit <jiraCards>",

  // Mensagens de erro por tipo de commit
  NO_FILES_STYLE: "Nenhum arquivo de estilo existente encontrado para commit.",
  NO_FILES_FIX: "Nenhum arquivo de correção existente encontrado para commit.",
  NO_FILES_TEST: "Nenhum arquivo de teste existente encontrado para commit.",
  NO_FILES_CHORE:
    "Nenhum arquivo de manutenção (chore) existente encontrado para commit.",
  NO_FILES_FEAT:
    "Nenhum arquivo de nova funcionalidade encontrado para commit.",
  NO_FILES_REFACTOR:
    "Nenhum arquivo de reestruturação de código encontrado para commit.",
  NO_FILES_DOCS: "Nenhum arquivo de documentação encontrado para commit.",
  NO_FILES_PERF:
    "Nenhum arquivo de melhoria de desempenho encontrado para commit.",
  NO_FILES_BUILD: "Nenhum arquivo de ajustes de build encontrado para commit.",
  NO_FILES_CI: "Nenhum arquivo de CI encontrado para commit.",
  NO_FILES_HOTFIX: "Nenhum arquivo de hotfix encontrado para commit.",
  NO_FILES_REVERT:
    "Nenhum arquivo de reversão de commit encontrado para commit.",

  // Mensagem genérica
  NO_FILES_GENERAL: "Nenhum arquivo existente encontrado para commit.",
  NO_CHANGES_FOUND: "Nenhuma mudança foi encontrada para commit.",
};
