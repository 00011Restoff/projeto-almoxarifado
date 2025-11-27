package com.almoxarifado.almoxarifado_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ProductImportResult {
    private int importedCount;
    private List<String> errors;
}
