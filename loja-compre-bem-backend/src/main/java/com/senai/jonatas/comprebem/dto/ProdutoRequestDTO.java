package com.senai.jonatas.comprebem.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ProdutoRequestDTO(
        @NotBlank(message = "Informe o nome do produto.")
        @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres.")
        String nome,

        @NotBlank(message = "Informe a descrição do produto.")
        @Size(max = 500, message = "A descrição deve ter no máximo 500 caracteres.")
        String descricao,

        @NotNull(message = "Informe o preço do produto.")
        @DecimalMin(value = "0.01", message = "O preço deve ser maior que zero.")
        BigDecimal preco,

        @Size(max = 255, message = "A categoria deve ter no máximo 255 caracteres.")
        String categoria,

        @Size(max = 255, message = "A URL da imagem deve ter no máximo 255 caracteres.")
        String imagem,

        @NotNull(message = "Informe a quantidade em estoque.")
        @Min(value = 0, message = "A quantidade não pode ser negativa.")
        Integer quantidade
) {
}
