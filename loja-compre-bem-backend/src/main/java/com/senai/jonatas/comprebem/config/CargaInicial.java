package com.senai.jonatas.comprebem.config;

import com.senai.jonatas.comprebem.entity.Produto;
import com.senai.jonatas.comprebem.repository.ProdutoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class CargaInicial {

    private static final String[] NOMES = {
            "Cadeira", "Mesa", "Sofá", "Armário", "Estante",
            "Escrivaninha", "Monitor", "Teclado", "Mouse", "Fone de ouvido",
            "Camiseta", "Calça", "Tênis", "Mochila", "Garrafa térmica"
    };

    private static final String[] CATEGORIAS = {
            "Móveis", "Eletrônicos", "Informática", "Roupas", "Acessórios"
    };

    @Bean
    CommandLineRunner popularProdutos(ProdutoRepository produtoRepository) {
        return args -> {
            if (produtoRepository.count() > 0) {
                return;
            }

            List<Produto> produtos = new ArrayList<>();
            for (int i = 1; i <= 60; i++) {
                String nome = NOMES[(i - 1) % NOMES.length] + " " + i;
                String categoria = CATEGORIAS[(i - 1) % CATEGORIAS.length];

                Produto produto = new Produto(
                        nome,
                        BigDecimal.valueOf(i * 10L),
                        categoria,
                        "Descrição do produto " + i + ". Produto disponível para compra na Loja Compre Bem.",
                        "https://placehold.co/600x400?text=Produto+" + i,
                        100
                );

                produtos.add(produto);
            }

            produtoRepository.saveAll(produtos);
        };
    }
}
