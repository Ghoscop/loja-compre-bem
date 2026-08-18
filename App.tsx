import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProdutosScreen from './src/screens/ProdutosScreen';
import DetalheProdutoScreen from './src/screens/DetalheProdutoScreen';

const Stack = createNativeStackNavigator();

const DetalheProdutoScreenWrapper = (props: any) => (
  <DetalheProdutoScreen {...props} />
);

export default function App() {
return (
<NavigationContainer>

  <Stack.Navigator>


    <Stack.Screen
      name="Produtos"
      component={ProdutosScreen}
      options={{
        title: 'Loja Compre Bem',
      }}
    />


    <Stack.Screen
      name="Detalhes"
      component={DetalheProdutoScreen}
      options={{
        title: 'Detalhes do Produto',
      }}
    />


  </Stack.Navigator>


</NavigationContainer>

);
}