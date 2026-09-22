import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProdutosScreen from './src/screens/ProdutosScreen';
import DetalheProdutoScreen from './src/screens/DetalheProdutoScreen';
import FavoritosScreen from './src/screens/FavoritosScrenn';
import CarrinhoScreen from './src/screens/CarrinhoScrenn';

import { LojaProvider } from './src/context/LojaContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LojaProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="Produtos"
            component={ProdutosScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Detalhes"
            component={DetalheProdutoScreen}
            options={{
              title: 'Detalhes do Produto',
            }}
          />

          <Stack.Screen
            name="Favoritos"
            component={FavoritosScreen}
            options={{
              title: 'Meus Favoritos',
            }}
          />

          <Stack.Screen
            name="Carrinho"
            component={CarrinhoScreen}
            options={{
              title: 'Meu Carrinho',
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </LojaProvider>
  );
}
