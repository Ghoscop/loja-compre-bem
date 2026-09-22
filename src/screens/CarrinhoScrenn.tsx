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

const carrinhoImg = require('../resources/btn-carrinho.png');

export default function CarrinhoScreen() {
  const {
    carrinho,
    removerCarrinho,
    totalCarrinho,
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

          <Text style={styles.preco}>
            R$ {item.preco.toFixed(2).replace('.', ',')}
          </Text>

          <TouchableOpacity
            style={styles.remover}
            onPress={() => removerCarrinho(item)}
          >
            <Text style={styles.removerTexto}>
              Remover do carrinho
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }

  return (
    <View style={styles.container}>

      {carrinho.length === 0 ? (
        <View style={styles.vazio}>

          <Image
            source={carrinhoImg}
            style={styles.iconeVazio}
          />

          <Text style={styles.vazioTitulo}>
            Carrinho vazio
          </Text>

          <Text style={styles.vazioTexto}>
            Adicione produtos ao carrinho para continuar.
          </Text>

        </View>
      ) : (
        <>
          <FlatList
            data={carrinho}
            keyExtractor={(item) => item.id}
            renderItem={renderProduto}
            contentContainerStyle={styles.lista}
          />

          <View style={styles.resumo}>

            <View style={styles.linha}>

              <Text style={styles.totalTexto}>
                Total
              </Text>

              <Text style={styles.total}>
                R$ {totalCarrinho.toFixed(2).replace('.', ',')}
              </Text>

            </View>

            <TouchableOpacity
              style={styles.finalizar}
              onPress={() => {}}
            >
              <Text style={styles.finalizarTexto}>
                Finalizar compra
              </Text>
            </TouchableOpacity>

          </View>
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

  lista: {
    padding: 20,
    paddingBottom: 150,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 3,
  },

  imagem: {
    width: 120,
    height: 130,
    resizeMode: 'cover',
  },

  conteudo: {
    flex: 1,
    padding: 14,
  },

  nome: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1B3A5C',
  },

  preco: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2E7D32',
    marginTop: 8,
  },

  remover: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#FFF0F0',
  },

  removerTexto: {
    color: '#C62828',
    fontSize: 12,
    fontWeight: '700',
  },

  resumo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },

  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalTexto: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B3A5C',
  },

  total: {
    fontSize: 25,
    fontWeight: '800',
    color: '#2E7D32',
  },

  finalizar: {
    marginTop: 14,
    backgroundColor: '#1B3A5C',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  finalizarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  iconeVazio: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 15,
  },

  vazioTitulo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1B3A5C',
  },

  vazioTexto: {
    fontSize: 15,
    color: '#667085',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },

});