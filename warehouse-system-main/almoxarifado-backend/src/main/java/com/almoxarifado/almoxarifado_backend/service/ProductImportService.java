package com.almoxarifado.almoxarifado_backend.service;

import com.almoxarifado.almoxarifado_backend.dto.ProductImportResult;
import com.almoxarifado.almoxarifado_backend.model.Product;
import com.almoxarifado.almoxarifado_backend.repository.ProductRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductImportService {

    private final ProductRepository productRepository;

    public ProductImportService(ProductRepository productRepository) {
        this.productRepository = productRepository;
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
                    Product product = new Product();
                    product.setSku(getCellValue(row.getCell(0)));
                    product.setName(getCellValue(row.getCell(1)));
                    product.setCategory(getCellValue(row.getCell(2)));
                    product.setQuantity(Integer.parseInt(getCellValue(row.getCell(3))));
                    product.setUnit(getCellValue(row.getCell(4)));
                    product.setMinimumStock(Integer.parseInt(getCellValue(row.getCell(5))));
                    product.setLocation(getCellValue(row.getCell(6)));
                    product.setOrigin(getCellValue(row.getCell(7)));
                    product.setObservation(getCellValue(row.getCell(8)));

                    productRepository.save(product);
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
