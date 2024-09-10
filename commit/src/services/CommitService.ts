import simpleGit, {SimpleGit, StatusResult} from 'simple-git';
import {ICommitService} from '../interfaces/ICommitService';

export class CommitService implements ICommitService {
  private git: SimpleGit;

  constructor() {
    this.git = simpleGit();
  }

  async getStatus(): Promise<StatusResult> {
    return await this.git.status();
  }

  async commit(
    type: string,
    jiraCard: string,
    message: string,
    files: string[],
  ): Promise<void> {
    try {
      console.log(`Adicionando os arquivos ao staging para ${type}:`, files);

      // Adiciona apenas os arquivos específicos para este commit
      await this.git.add(files);

      // Realiza o commit imediatamente após adicionar os arquivos
      await this.git.commit(message);
      console.log(`Commit ${type} realizado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao realizar o commit ${type}:`, error);
    }
  }
}
