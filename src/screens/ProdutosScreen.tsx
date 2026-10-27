import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';

import { Produto } from '../data/Produtos';
import { listarProdutos } from '../services/ProdutoService';
import { useLoja } from '../context/LojaContext';

const curtirOn = require('../resources/btn-curtir-on.png');
const curtirOff = require('../resources/btn-curtir-off.png');
const carrinhoImg = require('../resources/btn-carrinho.png');

function ProdutoItem({
  produto,
  navigation,
}: {
  produto: Produto;
  navigation: any;
}) {
  const {
    alternarFavorito,
    estaFavoritado,
    adicionarCarrinho,
    estaNoCarrinho,
  } = useLoja();

  const favorito = estaFavoritado(produto);
  const noCarrinho = estaNoCarrinho(produto);

  return (
    <View style={styles.card}>

      <Image
        source={{ uri: produto.imagem }}
        style={styles.imagem}
      />

      <View style={styles.conteudo}>

        <Text style={styles.nome} numberOfLines={2}>
          {produto.nome}
        </Text>

        <Text style={styles.descricao} numberOfLines={2}>
          {produto.descricao}
        </Text>

        <View style={styles.rodape}>

          <Text style={styles.preco}>
            R$ {produto.preco.toFixed(2).replace('.', ',')}
          </Text>

          <View style={styles.botoes}>

            <TouchableOpacity
              style={styles.botaoIcone}
              onPress={() => alternarFavorito(produto)}
            >
              <Image
                source={favorito ? curtirOn : curtirOff}
                style={styles.icone}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.botaoIcone,
                noCarrinho && styles.botaoCarrinhoAtivo,
              ]}
              onPress={() => adicionarCarrinho(produto)}
            >
              <Image
                source={carrinhoImg}
                style={styles.icone}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoDetalhes}
              onPress={() => {
                navigation.navigate('Detalhes', {
                  produto,
                });
              }}
            >
              <Text style={styles.botaoTexto}>
                Ver detalhes
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>
    </View>
  );
}

export default function ProdutosScreen({
  navigation,
}: any) {
  const { favoritos, carrinho } = useLoja();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;

    async function carregarProdutos() {
      setCarregando(true);
      setErro('');

      try {
        const resposta = await listarProdutos(pagina, 20);

        if (ativo) {
          setProdutos(resposta.content);
          setTotalPaginas(resposta.totalPages);
          setTotalProdutos(resposta.totalElements);
        }
      } catch (error) {
        if (ativo) {
          setProdutos([]);
          setErro(
            error instanceof Error
              ? error.message
              : 'Não foi possível carregar os produtos.'
          );
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarProdutos();

    return () => {
      ativo = false;
    };
  }, [pagina, tentativa]);

  function tentarNovamente() {
    setTentativa((valor) => valor + 1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View style={styles.topo}>
          <View>
            <Text style={styles.titulo}>
              Loja Compre Bem
            </Text>

            <Text style={styles.subtitulo}>
              Tudo para sua casa e escritório
            </Text>
          </View>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuBotao}
            onPress={() => navigation.navigate('Favoritos')}
          >
            <Image source={curtirOn} style={styles.menuIcone} />
            <Text style={styles.menuTexto}>
              Favoritos ({favoritos.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBotao}
            onPress={() => navigation.navigate('Carrinho')}
          >
            <Image source={carrinhoImg} style={styles.menuIcone} />
            <Text style={styles.menuTexto}>
              Carrinho ({carrinho.length})
            </Text>
          </TouchableOpacity>
        </View>

        {!carregando && !erro && (
          <Text style={styles.contagem}>
            {totalProdutos} produtos disponíveis
          </Text>
        )}
      </View>

      {carregando ? (
        <View style={styles.estado}>
          <ActivityIndicator size="large" color="#1B3A5C" />
          <Text style={styles.estadoTexto}>Carregando produtos...</Text>
        </View>
      ) : erro ? (
        <View style={styles.estado}>
          <Text style={styles.erroTitulo}>Não foi possível carregar</Text>
          <Text style={styles.estadoTexto}>{erro}</Text>
          <TouchableOpacity
            style={styles.tentarNovamente}
            onPress={tentarNovamente}
          >
            <Text style={styles.botaoTexto}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={produtos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProdutoItem produto={item} navigation={navigation} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.lista}
            ListEmptyComponent={
              <Text style={styles.estadoTexto}>
                Nenhum produto encontrado.
              </Text>
            }
          />

          {totalPaginas > 1 && (
            <View style={styles.paginacao}>
              <TouchableOpacity
                style={[
                  styles.botaoPagina,
                  pagina === 0 && styles.botaoPaginaDesabilitado,
                ]}
                disabled={pagina === 0}
                onPress={() => setPagina((atual) => Math.max(0, atual - 1))}
              >
                <Text style={styles.textoPagina}>Anterior</Text>
              </TouchableOpacity>

              <Text style={styles.indicadorPagina}>
                Página {pagina + 1} de {totalPaginas}
              </Text>

              <TouchableOpacity
                style={[
                  styles.botaoPagina,
                  pagina >= totalPaginas - 1 &&
                    styles.botaoPaginaDesabilitado,
                ]}
                disabled={pagina >= totalPaginas - 1}
                onPress={() =>
                  setPagina((atual) =>
                    Math.min(totalPaginas - 1, atual + 1)
                  )
                }
              >
                <Text style={styles.textoPagina}>Próxima</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  cabecalho: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },

  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titulo: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1B3A5C',
  },

  subtitulo: {
    fontSize: 15,
    color: '#667085',
    marginTop: 5,
  },

  menu: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 10,
  },

  menuBotao: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    paddingVertical: 10,
  },

  menuIcone: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 7,
  },

  menuTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1B3A5C',
  },

  lista: {
    padding: 20,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 18,
    overflow: 'hidden',

    shadowColor: '#1B3A5C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.10,
    shadowRadius: 10,

    elevation: 5,
  },

  imagem: {
    width: '100%',
    height: 190,
    resizeMode: 'cover',
    backgroundColor: '#EEF1F4',
  },

  conteudo: {
    padding: 16,
  },

  nome: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1B3A5C',
  },

  descricao: {
    fontSize: 14,
    color: '#667085',
    lineHeight: 20,
    marginTop: 7,
  },

  rodape: {
    marginTop: 16,
  },

  preco: {
    fontSize: 21,
    fontWeight: '800',
    color: '#2E7D32',
    marginBottom: 12,
  },

  botoes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  botaoIcone: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoCarrinhoAtivo: {
    backgroundColor: '#E8F5E9',
  },

  icone: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },

  botaoDetalhes: {
    flex: 1,
    backgroundColor: '#1B3A5C',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },


  contagem: {
    marginTop: 12,
    color: '#667085',
    fontSize: 13,
  },

  estado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },

  estadoTexto: {
    color: '#667085',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },

  erroTitulo: {
    color: '#B42318',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },

  tentarNovamente: {
    marginTop: 18,
    backgroundColor: '#1B3A5C',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },

  paginacao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EAECF0',
  },

  botaoPagina: {
    backgroundColor: '#1B3A5C',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  botaoPaginaDesabilitado: {
    backgroundColor: '#98A2B3',
  },

  textoPagina: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },

  indicadorPagina: {
    color: '#344054',
    fontSize: 13,
    fontWeight: '700',
  },

});