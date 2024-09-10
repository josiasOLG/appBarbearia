import { CommitService } from "./services/CommitService";
import { categorizeFiles } from "./utils/FileCategorizer";
import { processCommits } from "./utils/ProcessCommits";
import { ErrorMessages } from "./constants/ErrorMessages";
import dotenv from "dotenv";

dotenv.config();

/**
 * Função principal que executa o fluxo de commits com base nos arquivos modificados e nas regras de commits.
 *
 * O processo segue as seguintes etapas:
 * 1. Verifica se os cards do Jira foram passados como argumento.
 * 2. Obtém o status do repositório Git para identificar os arquivos modificados.
 * 3. Classifica os arquivos modificados em categorias (test, fix, style, chore, etc.).
 * 4. Executa o processo de commit para cada categoria de arquivo utilizando os cards do Jira.
 *
 * @async
 * @function run
 * @returns {Promise<void>} - Não retorna valores, apenas executa o processo de commit.
 *
 * @example
 * // Executa o comando passando um ou mais cards do Jira
 * // Exemplo de uso: npm run commit JIRA-123
 *
 * // Se não houver cards ou arquivos modificados, mensagens de erro serão exibidas.
 */
const run = async (): Promise<void> => {
  try {
    const args = process.argv.slice(2);
    const jiraCardsInput = args[0];

    if (!jiraCardsInput) {
      console.error(ErrorMessages.NO_JIRA_CARD_OR_MESSAGE);
      console.log(ErrorMessages.USAGE_HINT);
      process.exit(1);
    }

    const jiraCards = jiraCardsInput
      .split(" ")
      .map((card) => card.toUpperCase());

    const git = new CommitService();

    // Tenta obter o status do Git
    const status = await git.getStatus();
    console.log("Status do Git completo:", status);

    // Captura os arquivos modificados
    const modifiedFiles = status.files.map((file) => file.path);
    console.log("Arquivos modificados:", modifiedFiles);

    if (modifiedFiles.length === 0) {
      console.log(ErrorMessages.NO_MODIFIED_FILES);
      return;
    }

    // Tenta categorizar os arquivos modificados
    const categorizedFiles = categorizeFiles(modifiedFiles);
    console.log("Arquivos categorizados:", categorizedFiles);

    // Tenta processar os commits para as categorias
    await processCommits(categorizedFiles, jiraCards, git);
  } catch (error) {
    console.error("Erro durante o processo de commit:", error);
  }
};

run();
