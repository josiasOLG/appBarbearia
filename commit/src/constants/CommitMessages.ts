/**
 * @typedef {Object} CommitMessages
 *
 * Esta constante contém funções que geram mensagens de commit seguindo as melhores práticas do Conventional Commits.
 * As mensagens são formatadas de acordo com o tipo de alteração realizada no código e associadas ao card do Jira passado como argumento.
 *
 * Cada função dentro desta constante recebe o número do card do Jira como parâmetro e retorna uma string formatada no estilo `<tipo>(<jiraCard>): <descrição>`.
 *
 * Os tipos de commit incluídos seguem o padrão do Conventional Commits:
 *
 * - `style`: Para alterações relacionadas a formatação de código, sem mudanças de lógica.
 * - `fix`: Para correções de bugs.
 * - `test`: Para adição ou modificação de testes.
 * - `chore`: Para tarefas de manutenção que não afetam o código de produção.
 * - `feat`: Para novas funcionalidades.
 * - `refactor`: Para reestruturação de código sem mudanças de funcionalidade.
 * - `docs`: Para alterações na documentação.
 * - `perf`: Para otimizações de performance.
 * - `build`: Para mudanças no sistema de build ou dependências externas.
 * - `ci`: Para alterações relacionadas à Integração Contínua (CI).
 * - `hotfix`: Para correções críticas em produção.
 * - `revert`: Para reverter commits anteriores.
 *
 * @example
 * const message = CommitMessages.FIX('JIRA-123');
 * // Retorna: 'fix(JIRA-123): Correções aplicadas'
 *
 * @param {string} jiraCard - O número do card do Jira associado à alteração.
 * @returns {string} A mensagem de commit formatada.
 */
export const CommitMessages = {
  STYLE: (jiraCard: string) => `style(${jiraCard}): Atualizações de estilo`,
  FIX: (jiraCard: string) => `fix(${jiraCard}): Correções aplicadas`,
  TEST: (jiraCard: string) => `test(${jiraCard}): Adição de novos testes`,
  CHORE: (jiraCard: string) => `chore(${jiraCard}): Tarefas de manutenção`,
  FEAT: (jiraCard: string) =>
    `feat(${jiraCard}): Nova funcionalidade implementada`,
  REFACTOR: (jiraCard: string) =>
    `refactor(${jiraCard}): Reestruturação de código`,
  DOCS: (jiraCard: string) => `docs(${jiraCard}): Atualizações de documentação`,
  PERF: (jiraCard: string) => `perf(${jiraCard}): Melhorias de desempenho`,
  BUILD: (jiraCard: string) =>
    `build(${jiraCard}): Ajustes no sistema de build`,
  CI: (jiraCard: string) =>
    `ci(${jiraCard}): Alterações na integração contínua`,
  HOTFIX: (jiraCard: string) =>
    `hotfix(${jiraCard}): Correção crítica em produção`,
  REVERT: (jiraCard: string) => `revert(${jiraCard}): Reverter alterações`,
};
