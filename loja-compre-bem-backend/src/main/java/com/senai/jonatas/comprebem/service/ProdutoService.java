package com.senai.jonatas.comprebem.service;

import com.senai.jonatas.comprebem.dto.ProdutoRequestDTO;
import com.senai.jonatas.comprebem.dto.ProdutoResponseDTO;
import com.senai.jonatas.comprebem.entity.Produto;
import com.senai.jonatas.comprebem.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public List<ProdutoResponseDTO> findAll() {
        return produtoRepository.findAll()
                .stream()
                .map(ProdutoResponseDTO::toDto)
                .toList();
    }

    public ProdutoResponseDTO findById(UUID id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Produto não encontrado. Verifique se ele ainda está cadastrado."));
        return ProdutoResponseDTO.toDto(produto);
    }

    public Page<ProdutoResponseDTO> findByFiltro(String filtro, Pageable pageable) {
        String termo = filtro == null ? "" : filtro.trim().toUpperCase(Locale.ROOT);
        return produtoRepository.findByFiltro(termo, pageable)
                .map(ProdutoResponseDTO::toDto);
    }

    public ProdutoResponseDTO save(ProdutoRequestDTO request) {
        Produto produto = Produto.toEntity(request);
        if (produto.getQuantidade() == null) {
            produto.setQuantidade(0);
        }
        return ProdutoResponseDTO.toDto(produtoRepository.save(produto));
    }

    public ProdutoResponseDTO update(UUID produtoId, ProdutoRequestDTO request) {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Não foi possível atualizar: produto não encontrado."));

        produto.setNome(request.nome().trim());
        produto.setDescricao(request.descricao().trim());
        produto.setPreco(request.preco());
        produto.setCategoria(request.categoria());
        produto.setImagem(request.imagem());
        produto.setQuantidade(request.quantidade());

        return ProdutoResponseDTO.toDto(produtoRepository.save(produto));
    }

    public void delete(UUID produtoId) {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Não foi possível excluir: produto não encontrado."));
        produtoRepository.delete(produto);
    }
}
