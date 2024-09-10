import simpleGit, { SimpleGit, StatusResult } from "simple-git";
import { ICommitService } from "../interfaces/ICommitService";

/**
 * Serviço responsável por realizar os commits no Git.
 * Implementa a interface ICommitService.
 */
export class CommitService implements ICommitService {
  private git: SimpleGit;

  constructor() {
    this.git = simpleGit();
  }

  /**
   * Método público para obter o status do repositório Git.
   *
   * @returns Status do repositório.
   */
  async getStatus(): Promise<StatusResult> {
    return await this.git.status();
  }

  /**
   * Realiza o commit de arquivos modificados.
   *
   * @param type - Tipo do commit (test, fix, style, chore, etc.).
   * @param jiraCard - O número do card do Jira associado à mudança.
   * @param message - A mensagem de commit, já formatada.
   * @param files - Lista de arquivos a serem comitados.
   */
  async commit(
    type: string,
    jiraCard: string,
    message: string,
    files: string[]
  ): Promise<void> {
    const commitMessage = message; // Agora a mensagem já está formatada corretamente

    try {
      console.log(`Adicionando os arquivos ao staging:`, files);

      // Adicionar os arquivos sem forçar
      await this.git.add(files);

      const stagedStatus = await this.git.status();
      console.log("Arquivos que estão no staging:", stagedStatus.staged);

      if (stagedStatus.staged.length > 0) {
        await this.git.commit(commitMessage); // Commit com a mensagem correta
        console.log(`Commit ${type} realizado com sucesso!`);
      } else {
        console.error("Nenhum arquivo foi adicionado ao staging para commit.");
      }
    } catch (error) {
      console.error(`Erro ao realizar o commit ${type}:`, error);
    }
  }
}
