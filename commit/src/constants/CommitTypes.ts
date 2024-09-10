/**
 * @file CommitTypes.ts
 *
 * @description
 * Este arquivo define os tipos de commits usados para categorizar mudanças no repositório.
 * Baseado no padrão "Conventional Commits", que é amplamente adotado em projetos de software
 * para garantir clareza e consistência nas mensagens de commit.
 *
 * Conventional Commits é um sistema de mensagens de commit semântico que utiliza convenções
 * padronizadas para diferentes tipos de mudanças no código. Isso facilita o rastreamento
 * de histórico, automação de versionamento e geração de changelogs.
 *
 * O objeto `CommitTypes` define diferentes categorias de mudanças, como correções de bugs (`fix`),
 * novas funcionalidades (`feat`), alterações de estilo (`style`), entre outras. Cada chave
 * do objeto corresponde a um tipo de mudança, e o valor é a string que será usada nas mensagens
 * de commit para essa categoria.
 *
 * A definição de `CommitTypeKeys` cria um tipo TypeScript que pode ser usado em outras partes
 * do código para garantir que apenas os valores válidos de `CommitTypes` sejam utilizados
 * como tipos de commit.
 *
 * @example
 * - Para uma correção de bug:
 * ```typescript
 * const type = CommitTypes.FIX;
 * ```
 * - Para uma nova funcionalidade:
 * ```typescript
 * const type = CommitTypes.FEAT;
 * ```
 *
 * Usando `CommitTypeKeys`:
 * ```typescript
 * function createCommit(type: CommitTypeKeys, message: string) {
 *   // Função que cria um commit com base no tipo e na mensagem
 * }
 *
 * createCommit(CommitTypes.FIX, "Corrigido erro na autenticação");
 * ```
 *
 * @see
 * - [Conventional Commits](https://www.conventionalcommits.org/)
 */

/**
 * Tipos de commits usados para categorizar as mudanças no repositório.
 * Baseado no Conventional Commits.
 */
export const CommitTypes = {
  TEST: "test",
  FIX: "fix",
  STYLE: "style",
  CHORE: "chore",
  FEAT: "feat",
  REFACTOR: "refactor",
  DOCS: "docs",
  PERF: "perf",
  BUILD: "build",
  CI: "ci",
  HOTFIX: "hotfix",
  REVERT: "revert",
} as const;

/**
 * @typedef {keyof typeof CommitTypes} CommitTypeKeys
 * @description
 * Tipo que representa as chaves do objeto `CommitTypes`. Este tipo é útil para garantir
 * que apenas valores válidos (como `fix`, `feat`, `test`, etc.) sejam passados para funções
 * ou estruturas de dados que utilizam tipos de commits.
 *
 * @example
 * - Usando `CommitTypeKeys`:
 * ```typescript
 * const type: CommitTypeKeys = CommitTypes.FEAT;
 * ```
 */
export type CommitTypeKeys = keyof typeof CommitTypes;
