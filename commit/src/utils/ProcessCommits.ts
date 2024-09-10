import {CommitService} from '../services/CommitService';
import {getJiraCardForIndex} from './JiraCardHandler';
import {filterExistingFiles} from './FileFilter';
import {CommitMessages} from '../constants/CommitMessages';
import {ErrorMessages} from '../constants/ErrorMessages';
import {CommitTypes} from '../constants/CommitTypes';

export const processCommits = async (
  categorizedFiles: ReturnType<
    typeof import('./FileCategorizer').categorizeFiles
  >,
  jiraCards: string[],
  git: CommitService,
) => {
  try {
    const commitOrder = Object.keys(CommitTypes);
    let hasCommitted = false;

    for (const [index, type] of commitOrder.entries()) {
      const normalizedType = type.toLowerCase();
      const files =
        categorizedFiles[normalizedType as keyof typeof categorizedFiles];

      if (files && files.length > 0) {
        const existingFiles = filterExistingFiles(files);
        if (existingFiles.length > 0) {
          const jiraCard = getJiraCardForIndex(jiraCards, index);
          const message =
            CommitMessages[type as keyof typeof CommitMessages](jiraCard);

          // Cria um commit separado para cada tipo de alteração
          await git.commit(type, jiraCard, message, existingFiles);
          console.log(
            `Commit ${type} realizado com sucesso para ${existingFiles.length} arquivo(s)!`,
          );
          hasCommitted = true;
        } else {
          console.log(
            ErrorMessages[`NO_FILES_${type.toUpperCase()}`] ||
              ErrorMessages.NO_FILES_GENERAL,
          );
        }
      }
    }

    if (!hasCommitted) {
      console.log(ErrorMessages.NO_CHANGES_FOUND);
    }
  } catch (error) {
    console.error('Erro geral ao processar os commits:', error);
  }
};
