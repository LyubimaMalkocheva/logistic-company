package com.project.LogisticCompany.Package;

public enum Category {
    TO_ADDRESS(15),TO_OFFICE(10);
    private double categoryPrice;

    Category(double categoryPrice) {
        this.categoryPrice = categoryPrice;
    }

    public double getCategoryPrice() {
        return categoryPrice;
    }

    public void setCategoryPrice(double categoryPrice) {
        this.categoryPrice = categoryPrice;
    }
}
