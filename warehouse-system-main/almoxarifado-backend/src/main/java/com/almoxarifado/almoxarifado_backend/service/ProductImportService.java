package com.almoxarifado.almoxarifado_backend.service;

import com.almoxarifado.almoxarifado_backend.dto.ProductImportResult;
import com.almoxarifado.almoxarifado_backend.model.Produto;
import com.almoxarifado.almoxarifado_backend.repository.ProdutoRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductImportService {

    private final ProdutoRepository produtoRepository;

    public ProductImportService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public ProductImportResult importProducts(MultipartFile file) {
        List<String> errors = new ArrayList<>();
        int importedCount = 0;

        try (InputStream is = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(is)) {

            Sheet sheet = workbook.getSheetAt(0);

            for (int i = 1; i <= sheet.getLastRowNum(); i++) { // pular cabeçalho
                Row row = sheet.getRow(i);
                if (row == null) continue;

                try {
                    Produto produto = new Produto();
                    // Mapeamento simples de colunas do Excel para campos do modelo `Produto`.
                    produto.setNome(getCellValue(row.getCell(1)));
                    try {
                        produto.setQuantidade(Integer.parseInt(getCellValue(row.getCell(3))));
                    } catch (NumberFormatException ex) {
                        produto.setQuantidade(0);
                    }
                    produto.setCategoria(getCellValue(row.getCell(2)));
                    produto.setPrateleira(getCellValue(row.getCell(4)));
                    try {
                        produto.setEstoqueMinimo(Integer.parseInt(getCellValue(row.getCell(5))));
                    } catch (NumberFormatException ex) {
                        produto.setEstoqueMinimo(0);
                    }
                    produto.setOrigem(getCellValue(row.getCell(7)));
                    produto.setDescricao(getCellValue(row.getCell(8)));

                    produtoRepository.save(produto);
                    importedCount++;
                } catch (Exception e) {
                    errors.add("Linha " + (i + 1) + ": " + e.getMessage());
                }
            }

        } catch (Exception e) {
            errors.add("Erro ao processar o arquivo: " + e.getMessage());
        }

        return new ProductImportResult(importedCount, errors);
    }

    private String getCellValue(Cell cell) {
        if (cell == null) return "";
        switch (cell.getCellType()) {
            case STRING: return cell.getStringCellValue();
            case NUMERIC: return String.valueOf((int)cell.getNumericCellValue());
            case BOOLEAN: return String.valueOf(cell.getBooleanCellValue());
            default: return "";
        }
    }
}
