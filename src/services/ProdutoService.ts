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

export async function listarProdutos(
  page: number = 0,
  size: number = 20,
  busca?: string
): Promise<RespostaPaginada<Produto>> {
  const parametros = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  if (busca?.trim()) {
    parametros.set('busca', busca.trim());
  }

  const resposta = await fetch(`${API_URL}?${parametros.toString()}`);

  if (!resposta.ok) {
    throw new Error(
      `Não foi possível carregar os produtos (HTTP ${resposta.status}).`
    );
  }

  const dados: RespostaPaginada<ProdutoApi> = await resposta.json();

  return {
    ...dados,
    content: dados.content.map(converterProduto),
  };
}
