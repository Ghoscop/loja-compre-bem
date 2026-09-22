import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useLoja } from '../context/LojaContext';
import { Produto } from '../data/Produtos';

const curtirOn = require('../resources/btn-curtir-on.png');
const carrinhoImg = require('../resources/btn-carrinho.png');

export default function FavoritosScreen({
  navigation,
}: any) {
  const {
    favoritos,
    alternarFavorito,
    adicionarCarrinho,
  } = useLoja();

  function renderProduto({
    item,
  }: {
    item: Produto;
  }) {
    return (
      <View style={styles.card}>

        <Image
          source={{ uri: item.imagem }}
          style={styles.imagem}
        />

        <View style={styles.conteudo}>

          <Text style={styles.nome}>
            {item.nome}
          </Text>

          <Text style={styles.descricao} numberOfLines={2}>
            {item.descricao}
          </Text>

          <Text style={styles.preco}>
            R$ {item.preco.toFixed(2).replace('.', ',')}
          </Text>

          <View style={styles.botoes}>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => alternarFavorito(item)}
            >
              <Image
                source={curtirOn}
                style={styles.icone}
              />

              <Text style={styles.textoBotao}>
                Remover
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCarrinho}
              onPress={() => adicionarCarrinho(item)}
            >
              <Image
                source={carrinhoImg}
                style={styles.icone}
              />

              <Text style={styles.textoCarrinho}>
                Adicionar
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {favoritos.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioTitulo}>
            Nenhum favorito
          </Text>

          <Text style={styles.vazioTexto}>
            Você ainda não adicionou nenhum produto aos favoritos.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id}
          renderItem={renderProduto}
          contentContainerStyle={styles.lista}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  lista: {
    padding: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 18,
    overflow: 'hidden',
    elevation: 4,
  },

  imagem: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },

  conteudo: {
    padding: 16,
  },

  nome: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1B3A5C',
  },

  descricao: {
    fontSize: 14,
    color: '#667085',
    marginTop: 6,
    lineHeight: 20,
  },

  preco: {
    fontSize: 21,
    fontWeight: '800',
    color: '#2E7D32',
    marginTop: 12,
  },

  botoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },

  botao: {
    flex: 1,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoCarrinho: {
    flex: 1,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#1B3A5C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icone: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
    marginRight: 6,
  },

  textoBotao: {
    color: '#1B3A5C',
    fontWeight: '700',
    fontSize: 13,
  },

  textoCarrinho: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },

  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  vazioTitulo: {
    fontSize: 23,
    fontWeight: '800',
    color: '#1B3A5C',
  },

  vazioTexto: {
    textAlign: 'center',
    fontSize: 15,
    color: '#667085',
    marginTop: 10,
    lineHeight: 22,
  },

});