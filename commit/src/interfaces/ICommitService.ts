/**
 * Interface que define o comportamento do serviço de commit.
 */
export interface ICommitService {
  /**
   * Realiza o commit de arquivos modificados.
   *
   * @param type - Tipo do commit (test, fix, style, chore, etc.).
   * @param jiraCard - O número do card do Jira associado à mudança.
   * @param message - A mensagem de commit.
   * @param files - Lista de arquivos a serem comitados.
   */
  commit(
    type: string,
    jiraCard: string,
    message: string,
    files: string[]
  ): Promise<void>;
}
