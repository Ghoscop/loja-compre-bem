import { useState } from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

import { produtos, Produto } from '../data/Produtos';

function ProdutoItem({
  produto,
  navigation,
}: {
  produto: Produto;
  navigation: any;
}) {
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

          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              navigation.navigate('Detalhes', {
                produto: produto,
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
  );
}

export default function ProdutosScreen({ navigation }: any) {

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [erro, setErro] = useState('');

  function cadastrarProduto() {

    // Validação do nome
    if (nome.trim() === '') {
      setErro('O nome não pode ficar vazio.');
      return;
    }

    // Validação do preço
    const precoNumerico = Number(
      preco.trim().replace(',', '.')
    );

    if (
      preco.trim() === '' ||
      isNaN(precoNumerico) ||
      precoNumerico <= 0
    ) {
      setErro('O preço precisa ser um número maior que zero.');
      return;
    }

    // VALIDAÇÃO DO NOVO CAMPO
    if (categoria.trim().length < 3) {
      setErro(
        'A categoria deve ter pelo menos 3 caracteres.'
      );
      return;
    }

    // Cadastro realizado
    produtos.push({
      id: Date.now().toString(),
      nome: nome.trim(),
      preco: precoNumerico,
      categoria: categoria.trim(),
      descricao: 'Produto cadastrado pela loja.',
      imagem:
        'https://via.placeholder.com/400x300.png?text=Produto',
    });

    // Limpa os campos somente depois do sucesso
    setNome('');
    setPreco('');
    setCategoria('');
    setErro('');
  }

  return (
    <View style={styles.container}>

      <View style={styles.cabecalho}>

        <Text style={styles.titulo}>
          Loja Compre Bem
        </Text>

        <Text style={styles.subtitulo}>
          Tudo para sua casa e escritório
        </Text>

      </View>

      {/* FORMULÁRIO DE CADASTRO */}

      <View style={styles.formulario}>

        <Text style={styles.formularioTitulo}>
          Cadastrar produto
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Preço (ex.: 89,90)"
          value={preco}
          onChangeText={setPreco}
          keyboardType="decimal-pad"
        />

        {/* NOVO CAMPO */}

        <TextInput
          style={styles.input}
          placeholder="Categoria (ex.: Escritório)"
          value={categoria}
          onChangeText={setCategoria}
        />

        {erro !== '' && (
          <Text style={styles.erro}>
            {erro}
          </Text>
        )}

        <TouchableOpacity
          style={styles.botaoCadastro}
          onPress={cadastrarProduto}
        >
          <Text style={styles.botaoTexto}>
            Cadastrar produto
          </Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProdutoItem
            produto={item}
            navigation={navigation}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
      />

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
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
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

  formulario: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 16,
    borderRadius: 15,
  },

  formularioTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1B3A5C',
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },

  erro: {
    color: '#C62828',
    fontSize: 14,
    marginBottom: 8,
  },

  botaoCadastro: {
    backgroundColor: '#1B3A5C',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  preco: {
    fontSize: 21,
    fontWeight: '800',
    color: '#2E7D32',
  },

  botao: {
    backgroundColor: '#1B3A5C',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

});
