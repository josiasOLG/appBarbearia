import { CommitService } from "../services/CommitService";
import { getJiraCardForIndex } from "./JiraCardHandler";
import { filterExistingFiles } from "./FileFilter";
import { CommitMessages } from "../constants/CommitMessages";
import { ErrorMessages } from "../constants/ErrorMessages";
import { CommitTypes } from "../constants/CommitTypes";

/**
 * Processa os commits para cada categoria de arquivo modificada.
 * @param categorizedFiles - Arquivos categorizados por tipo de commit
 * @param jiraCards - Lista de cards do Jira
 * @param git - Instância do serviço de commits
 */
export const processCommits = async (
  categorizedFiles: ReturnType<
    typeof import("./FileCategorizer").categorizeFiles
  >,
  jiraCards: string[],
  git: CommitService
) => {
  try {
    const commitOrder = Object.keys(CommitTypes); // Obtém as chaves dos tipos de commit
    let hasCommitted = false;

    // Verificar cada tipo de commit
    for (const [index, type] of commitOrder.entries()) {
      try {
        // Normalizar o tipo para minúsculas ao acessar categorizedFiles
        const normalizedType = type.toLowerCase();
        const files =
          categorizedFiles[normalizedType as keyof typeof categorizedFiles];

        if (files && files.length > 0) {
          const existingFiles = filterExistingFiles(files);
          if (existingFiles.length > 0) {
            const jiraCard = getJiraCardForIndex(jiraCards, index);
            const message =
              CommitMessages[type as keyof typeof CommitMessages](jiraCard);

            // Note que agora passamos a mensagem já formatada sem adicionar o tipo novamente
            await git.commit(type, jiraCard, message, existingFiles);
            hasCommitted = true;
          } else {
            console.log(
              ErrorMessages[`NO_FILES_${type.toUpperCase()}`] ||
                ErrorMessages.NO_FILES_GENERAL
            );
          }
        } else {
          console.log(`Nenhum arquivo encontrado para a categoria ${type}.`);
        }
      } catch (error) {
        console.error(
          `Erro ao processar o commit para a categoria ${type}:`,
          error
        );
      }
    }

    if (!hasCommitted) {
      console.log(ErrorMessages.NO_CHANGES_FOUND);
    }
  } catch (error) {
    console.error("Erro geral ao processar os commits:", error);
  }
};
