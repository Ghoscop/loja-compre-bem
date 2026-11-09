import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Produto, ProdutoRequest } from '../data/Produtos';
import { atualizarProduto, cadastrarProduto } from '../services/ProdutoService';

type Props = {
  route: { params?: { produto?: Produto } };
  navigation: { goBack: () => void; setOptions: (options: { title: string }) => void };
};

export default function FormularioProdutoScreen({ route, navigation }: Props) {
  const produto = route.params?.produto;
  const editando = Boolean(produto?.id);
  const [nome, setNome] = useState(produto?.nome ?? '');
  const [preco, setPreco] = useState(produto ? String(produto.preco).replace('.', ',') : '');
  const [descricao, setDescricao] = useState(produto?.descricao ?? '');
  const [imagem, setImagem] = useState(produto?.imagem ?? '');
  const [categoria, setCategoria] = useState(produto?.categoria ?? '');
  const [quantidade, setQuantidade] = useState(String(produto?.quantidade ?? 0));
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: editando ? 'Editar produto' : 'Cadastrar produto' });
  }, [editando, navigation]);

  async function salvar() {
    const precoNumerico = Number(preco.trim().replace(',', '.'));
    const quantidadeNumerica = quantidade.trim() ? Number(quantidade) : undefined;

    if (!nome.trim() || !preco.trim() || !descricao.trim()) {
      setErro('Preencha nome, preço e descrição.');
      return;
    }
    if (!Number.isFinite(precoNumerico) || precoNumerico <= 0) {
      setErro('Informe um preço válido maior que zero.');
      return;
    }
    if (quantidadeNumerica !== undefined && (!Number.isInteger(quantidadeNumerica) || quantidadeNumerica < 0)) {
      setErro('Informe uma quantidade inteira igual ou maior que zero.');
      return;
    }

    const dados: ProdutoRequest = {
      nome: nome.trim(),
      preco: precoNumerico,
      descricao: descricao.trim(),
      imagem: imagem.trim(),
      categoria: categoria.trim(),
      quantidade: quantidadeNumerica ?? 0,
    };

    setSalvando(true);
    setErro('');
    try {
      if (editando && produto) {
        await atualizarProduto(produto.id, dados);
        Alert.alert('Produto atualizado', 'As alterações foram salvas na API.', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        await cadastrarProduto(dados);
        Alert.alert('Produto cadastrado', 'O produto foi salvo na API.', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Não foi possível salvar o produto.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>{editando ? 'Atualize as informações' : 'Novo produto'}</Text>
        <Text style={styles.subtitulo}>Preencha os dados do produto para enviar ao catálogo.</Text>

        <Text style={styles.label}>Nome *</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex.: Cadeira de escritório" maxLength={100} />

        <Text style={styles.label}>Preço (R$) *</Text>
        <TextInput style={styles.input} value={preco} onChangeText={setPreco} placeholder="0,00" keyboardType="decimal-pad" />

        <Text style={styles.label}>Descrição *</Text>
        <TextInput style={[styles.input, styles.textArea]} value={descricao} onChangeText={setDescricao} placeholder="Descreva o produto" multiline numberOfLines={4} maxLength={500} textAlignVertical="top" />

        <Text style={styles.label}>Categoria</Text>
        <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} placeholder="Ex.: Móveis" maxLength={255} />

        <Text style={styles.label}>Quantidade em estoque</Text>
        <TextInput style={styles.input} value={quantidade} onChangeText={setQuantidade} placeholder="0" keyboardType="number-pad" />

        <Text style={styles.label}>URL da imagem</Text>
        <TextInput style={styles.input} value={imagem} onChangeText={setImagem} placeholder="https://..." autoCapitalize="none" keyboardType="url" maxLength={255} />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TouchableOpacity style={[styles.botao, salvando && styles.botaoDesabilitado]} onPress={salvar} disabled={salvando}>
          {salvando ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.textoBotao}>{editando ? 'Salvar alterações' : 'Cadastrar produto'}</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  conteudo: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 25, fontWeight: '800', color: '#1B3A5C' },
  subtitulo: { color: '#667085', fontSize: 14, marginTop: 6, marginBottom: 22 },
  label: { color: '#1B3A5C', fontWeight: '700', marginBottom: 7, marginTop: 14 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#D9E1EA', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, color: '#1B3A5C', fontSize: 15 },
  textArea: { minHeight: 105 },
  erro: { color: '#C62828', marginTop: 16, lineHeight: 20 },
  botao: { marginTop: 24, backgroundColor: '#1B3A5C', minHeight: 52, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  botaoDesabilitado: { opacity: 0.65 },
  textoBotao: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
});
