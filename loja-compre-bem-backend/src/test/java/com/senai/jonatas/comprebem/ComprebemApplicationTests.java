package com.senai.jonatas.comprebem;

import com.senai.jonatas.comprebem.repository.ProdutoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class ComprebemApplicationTests {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Test
    void contextoCarrega() {
        assertTrue(produtoRepository.count() >= 60,
                "A API deve iniciar com pelo menos 60 produtos cadastrados.");
    }
}
