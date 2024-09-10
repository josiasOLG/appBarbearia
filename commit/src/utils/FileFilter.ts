import fs from "fs";

/**
 * Função para verificar se os arquivos realmente existem antes de tentar adicionar ao commit.
 * @param files - Lista de arquivos
 * @returns Apenas os arquivos existentes
 */
export const filterExistingFiles = (files: string[]): string[] => {
  return files.filter((file) => fs.existsSync(file));
};
