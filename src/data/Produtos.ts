export type Produto = {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
  categoria?: string;
};

export type ProdutoApi = {
  produtoId: string;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string | null;
  categoria: string;
};

export type RespostaPaginada<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first?: boolean;
  last?: boolean;
};

export function converterProduto(produto: ProdutoApi): Produto {
  return {
    id: produto.produtoId,
    nome: produto.nome,
    preco: Number(produto.preco),
    descricao: produto.descricao,
    imagem: produto.imagem ?? '',
    categoria: produto.categoria,
  };
}
