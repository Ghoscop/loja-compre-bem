import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Produto } from '../data/Produtos';
import { useLoja } from '../context/LojaContext';

const curtirOn = require('../resources/btn-curtir-on.png');
const curtirOff = require('../resources/btn-curtir-off.png');
const carrinhoImg = require('../resources/btn-carrinho.png');

type Props = {
  route: {
    params: {
      produto: Produto;
    };
  };
};

export default function DetalheProdutoScreen({
  route,
}: Props) {
  const { produto } = route.params;

  const {
    alternarFavorito,
    estaFavoritado,
    adicionarCarrinho,
    estaNoCarrinho,
  } = useLoja();

  const favorito = estaFavoritado(produto);
  const noCarrinho = estaNoCarrinho(produto);

  return (
    <View style={styles.container}>

      <Image
        source={{ uri: produto.imagem }}
        style={styles.imagem}
      />

      <View style={styles.conteudo}>

        <Text style={styles.nome}>
          {produto.nome}
        </Text>

        <Text style={styles.preco}>
          R$ {produto.preco.toFixed(2).replace('.', ',')}
        </Text>

        <View style={styles.acoes}>

          <TouchableOpacity
            style={[
              styles.botaoFavorito,
              favorito && styles.botaoFavoritoAtivo,
            ]}
            onPress={() => alternarFavorito(produto)}
          >
            <Image
              source={favorito ? curtirOn : curtirOff}
              style={styles.icone}
            />

            <Text style={styles.textoAcao}>
              {favorito
                ? 'Favoritado'
                : 'Adicionar aos favoritos'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.botaoCarrinho,
              noCarrinho && styles.botaoCarrinhoAtivo,
            ]}
            onPress={() => adicionarCarrinho(produto)}
          >
            <Image
              source={carrinhoImg}
              style={styles.icone}
            />

            <Text style={styles.textoCarrinho}>
              {noCarrinho
                ? 'No carrinho'
                : 'Adicionar ao carrinho'}
            </Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.tituloDescricao}>
          Descrição
        </Text>

        <Text style={styles.descricao}>
          {produto.descricao}
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  imagem: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },

  conteudo: {
    backgroundColor: '#FFFFFF',
    marginTop: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 24,
    flex: 1,
  },

  nome: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1B3A5C',
  },

  preco: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2E7D32',
    marginTop: 10,
  },

  acoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },

  botaoFavorito: {
    flex: 1,
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#F5F7FA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  botaoFavoritoAtivo: {
    backgroundColor: '#FFF0F3',
  },

  botaoCarrinho: {
    flex: 1,
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#1B3A5C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  botaoCarrinhoAtivo: {
    backgroundColor: '#2E7D32',
  },

  icone: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 7,
  },

  textoAcao: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1B3A5C',
  },

  textoCarrinho: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  tituloDescricao: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B3A5C',
    marginTop: 25,
    marginBottom: 8,
  },

  descricao: {
    fontSize: 16,
    lineHeight: 24,
    color: '#667085',
  },

});