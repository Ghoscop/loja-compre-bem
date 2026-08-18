import { View, Text, Image, StyleSheet } from 'react-native';

import { Produto } from '../data/Produtos';

type Props = {
route: {
params: {
produto: Produto;
};
};
};

export default function DetalheProdutoScreen({ route }: Props) {
const { produto } = route.params;

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