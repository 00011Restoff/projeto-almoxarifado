package com.almoxarifado.almoxarifado_backend.controller;

import com.almoxarifado.almoxarifado_backend.dto.ProductImportResult;
import com.almoxarifado.almoxarifado_backend.service.ProductImportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/products/import")
@RequiredArgsConstructor
public class ProductImportController {

    private final ProductImportService productImportService;

    @PostMapping
    public ResponseEntity<ProductImportResult> importProducts(@RequestParam("file") MultipartFile file) {
        ProductImportResult result = productImportService.importProducts(file);
        return ResponseEntity.ok(result);
    }
}
