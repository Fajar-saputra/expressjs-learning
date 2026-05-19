global.appError = class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
};

jest.mock("../services/product.service");
jest.mock("../utils/successResponse", () => ({
    successResponse: jest.fn((res, data, message, statusCode = 200) => {
        return res.status(statusCode).json({
            status: "success",
            message,
            data,
        });
    }),
}));

const { createProduct, productById, prodcutAll } = require("../controller/product.controller");
const productService = require("../services/product.service");
const { successResponse } = require("../utils/successResponse");

describe("Product Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Harus sukses (201) jika data lengkap dan ada gambar", async () => {
        const req = {
            body: {
                name: "Sepatu Keren",
                category: "Fashion",
                description: "Sepatu olahraga yang nyaman",
                price: 150000,
            },
            file: {
                filename: "contoh-sepatu.png",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        const createdProduct = {
            id: "1",
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            image: "/uploads/contoh-sepatu.png",
        };

        productService.createProduct.mockResolvedValue(createdProduct);

        await createProduct(req, res, next);

        expect(productService.createProduct).toHaveBeenCalledWith({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            image: "/uploads/contoh-sepatu.png",
        });
        expect(successResponse).toHaveBeenCalledWith(res, createdProduct, "Berhasil create product baru", 201);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            message: "Berhasil create product baru",
            data: createdProduct,
        });
        expect(next).not.toHaveBeenCalled();
    });

    it("Harus gagal (400) jika user lupa mengunggah gambar", async () => {
        const req = {
            body: {
                name: "Sepatu Tanpa Gambar",
                category: "Fashion",
                description: "Tanpa gambar",
                price: 99000,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        await createProduct(req, res, next);

        expect(next).toHaveBeenCalled();
        const error = next.mock.calls[0][0];
        expect(error).toBeInstanceOf(global.appError);
        expect(error.message).toContain("Gambar produk belum dipilih");
        expect(error.statusCode).toBe(400);
    });

    it("productById harus mengembalikan data produk dengan id", async () => {
        const req = {
            params: {
                productId: "1",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        const foundProduct = {
            id: "1",
            name: "Sepatu Keren",
        };

        productService.getById.mockResolvedValue(foundProduct);

        await productById(req, res, next);

        expect(productService.getById).toHaveBeenCalledWith("1");
        expect(successResponse).toHaveBeenCalledWith(res, foundProduct, `Berhasil user ID ${foundProduct.id}`);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            message: `Berhasil user ID ${foundProduct.id}`,
            data: foundProduct,
        });
        expect(next).not.toHaveBeenCalled();
    });

    it("prodcutAll harus mengembalikan semua produk", async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        const allProducts = [{ id: "1" }, { id: "2" }];

        productService.getByAll.mockResolvedValue(allProducts);

        await prodcutAll(req, res, next);

        expect(productService.getByAll).toHaveBeenCalled();
        expect(successResponse).toHaveBeenCalledWith(res, allProducts, "Berhasil ambil semua user");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            message: "Berhasil ambil semua user",
            data: allProducts,
        });
        expect(next).not.toHaveBeenCalled();
    });
});
