import React, { createContext, useContext, useState } from 'react';

import { Produto } from '../data/Produtos';

type LojaContextType = {
  favoritos: Produto[];
  carrinho: Produto[];

  adicionarFavorito: (produto: Produto) => void;
  removerFavorito: (produto: Produto) => void;
  alternarFavorito: (produto: Produto) => void;

  adicionarCarrinho: (produto: Produto) => void;
  removerCarrinho: (produto: Produto) => void;

  estaFavoritado: (produto: Produto) => boolean;
  estaNoCarrinho: (produto: Produto) => boolean;

  totalCarrinho: number;
};

const LojaContext = createContext<LojaContextType>(
  {} as LojaContextType
);

export function LojaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  function adicionarFavorito(produto: Produto) {
    setFavoritos((lista) => {
      if (lista.some((item) => item.id === produto.id)) {
        return lista;
      }

      return [...lista, produto];
    });
  }

  function removerFavorito(produto: Produto) {
    setFavoritos((lista) =>
      lista.filter((item) => item.id !== produto.id)
    );
  }

  function alternarFavorito(produto: Produto) {
    setFavoritos((lista) => {
      const existe = lista.some(
        (item) => item.id === produto.id
      );

      if (existe) {
        return lista.filter(
          (item) => item.id !== produto.id
        );
      }

      return [...lista, produto];
    });
  }

  function adicionarCarrinho(produto: Produto) {
    setCarrinho((lista) => {
      if (lista.some((item) => item.id === produto.id)) {
        return lista;
      }

      return [...lista, produto];
    });
  }

  function removerCarrinho(produto: Produto) {
    setCarrinho((lista) =>
      lista.filter((item) => item.id !== produto.id)
    );
  }

  function estaFavoritado(produto: Produto) {
    return favoritos.some(
      (item) => item.id === produto.id
    );
  }

  function estaNoCarrinho(produto: Produto) {
    return carrinho.some(
      (item) => item.id === produto.id
    );
  }

  const totalCarrinho = carrinho.reduce(
    (total, produto) => total + produto.preco,
    0
  );

  return (
    <LojaContext.Provider
      value={{
        favoritos,
        carrinho,

        adicionarFavorito,
        removerFavorito,
        alternarFavorito,

        adicionarCarrinho,
        removerCarrinho,

        estaFavoritado,
        estaNoCarrinho,

        totalCarrinho,
      }}
    >
      {children}
    </LojaContext.Provider>
  );
}

export function useLoja() {
  return useContext(LojaContext);
}