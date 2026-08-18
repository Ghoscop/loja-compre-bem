import { View, Text } from 'react-native';

type Produto = {
nome: string;
preco: string;
descricao: string;
};

const produtoMock: Produto = {
nome: 'Cadeira Confort Plus',
preco: 'R$ 349,90',
descricao: 'Cadeira confortável para escritório.',
};

function DetalheProduto({ produto }: { produto: Produto }) {
return (
<View>
<Text>{produto.nome}</Text>
<Text>{produto.preco}</Text>
<Text>{produto.descricao}</Text>
</View>
);
}

export default function TelaDetalheProduto() {
return <DetalheProduto produto={produtoMock} />;
}