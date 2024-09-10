import path from "path";

interface FileCategories {
  test: string[];
  fix: string[];
  style: string[];
  chore: string[];
  feat: string[];
  refactor: string[];
  docs: string[];
  perf: string[];
}

// Mapeamento de extensões e padrões para categorias
const fileTypeMap: Record<string, keyof FileCategories> = {
  ".test.js": "test",
  ".spec.js": "test",
  ".css": "style",
  ".scss": "style",
  ".less": "style",
  ".ts": "fix",
  ".html": "fix",
  ".md": "docs",
};

// Mapeamento de padrões no nome do arquivo
const fileNameMap: Record<string, keyof FileCategories> = {
  test: "test",
  fix: "fix",
  bug: "fix",
  style: "style",
  feat: "feat",
  refactor: "refactor",
  docs: "docs",
  perf: "perf",
};

/**
 * Função que categoriza os arquivos modificados por tipo de commit.
 *
 * @param files - Lista de arquivos modificados.
 * @returns Um objeto categorizando os arquivos em: test, fix, style, feat, refactor, etc.
 */
export const categorizeFiles = (files: string[]): FileCategories => {
  const categories: FileCategories = {
    test: [],
    fix: [],
    style: [],
    chore: [],
    feat: [],
    refactor: [],
    docs: [],
    perf: [],
  };

  files.forEach((file) => {
    const ext = path.extname(file);
    const fileName = path.basename(file).toLowerCase();

    // Verifica se a extensão tem uma categoria correspondente
    if (fileTypeMap[ext]) {
      categories[fileTypeMap[ext]].push(file);
    } else {
      // Verifica se o nome do arquivo contém padrões que correspondem a uma categoria
      const matchedCategory = Object.keys(fileNameMap).find((pattern) =>
        fileName.includes(pattern)
      );

      if (matchedCategory) {
        categories[fileNameMap[matchedCategory]].push(file);
      } else {
        // Se nenhuma regra for aplicada, categorizamos como 'chore'
        categories.chore.push(file);
      }
    }
  });

  return categories;
};
