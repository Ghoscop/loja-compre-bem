
import { Platform } from 'react-native';
import {
  Produto,
  ProdutoApi,
  RespostaPaginada,
  converterProduto,
} from '../data/Produtos';

const API_HOST =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8080'
    : 'http://localhost:8080';

const API_URL = `${API_HOST}/api/v1/produtos`;

export type ProdutoRequest = {
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
  quantidade: number;
};

async function verificarResposta<T>(resposta: Response): Promise<T> {
  if (!resposta.ok) {
    const mensagem = await resposta.text();
    throw new Error(mensagem || `Erro HTTP ${resposta.status}`);
  }

  if (resposta.status === 204) {
    return undefined as T;
  }

  const texto = await resposta.text();
  return texto ? JSON.parse(texto) as T : undefined as T;
}

export async function listarProdutos(
  page: number = 0,
  size: number = 20,
  busca: string = ''
): Promise<RespostaPaginada<Produto>> {
  const parametros = new URLSearchParams({
    filtro: busca.trim(),
    page: String(page),
    size: String(size),
  });

  const resposta = await fetch(`${API_URL}/filtro?${parametros}`);

  const dados = await verificarResposta<RespostaPaginada<ProdutoApi>>(resposta);

  return {
    ...dados,
    content: dados.content.map(converterProduto),
  };
}

export async function buscarProduto(id: string): Promise<Produto> {
  const resposta = await fetch(`${API_URL}/${id}`);
  const dados = await verificarResposta<ProdutoApi>(resposta);

  return converterProduto(dados);
}

export async function cadastrarProduto(
  produto: ProdutoRequest
): Promise<Produto> {
  const resposta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(produto),
  });

  const dados = await verificarResposta<ProdutoApi>(resposta);

  return converterProduto(dados);
}

export async function atualizarProduto(
  id: string,
  produto: ProdutoRequest
): Promise<Produto> {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(produto),
  });

  const dados = await verificarResposta<ProdutoApi>(resposta);

  return converterProduto(dados);
}

export async function excluirProduto(id: string): Promise<void> {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  await verificarResposta<void>(resposta);
}
