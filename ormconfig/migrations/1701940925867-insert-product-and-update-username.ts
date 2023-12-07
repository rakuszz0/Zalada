import { MigrationInterface, QueryRunner } from "typeorm"

export class InsertProductAndUpdateUsername1701940925867 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE users DROP INDEX username")

        const values = [
            ["Meja Belajar", 500, "Meja untuk anak belajar dengan kualitas menggunakan kayu jati", 700000, 1],
            ["Kursi Goyang", 700, "Kursi goyang dengan kualitas menggunakan kayu jati", 400000, 1],
            ["Mug", 400, "Mug custom nama", 30000, 1],
            ["Komik Spy x Family", 200, "Komik anime", 75000, 1],
            ["Tas Laptop Lenovo 14 inch", 100, "Tas laptp anti air", 150000, 1],
            ["Pensil 2B", 1000, "Pensil 2B warna-warni", 2000, 1],
            ["Mouse Wireless", 600, "Mouse tanpa kabel", 40000, 1],
            ["Kabel Type-C", 400, "Kabel dengan panjang 1 meter", 30000, 1],
            ["Bedak", 300, "Bedak bubuk shade 01", 50000, 1],
            ["Piring", 2000, "Piring dengan bahan plastik premium", 10000, 1],
            ["Kompor", 500, "Kompor 2 tungku dengan api yang stabil", 245000, 1],
            ["Panci", 700, "Panci ukuran 28 cm dari stainless stiil", 25000, 1],
            ["Sutil", 1200, "Sutil kayu dari jati", 22000, 1],
            ["Kasur", 200, "Kasur form murah", 850000, 1],
            ["Lemari", 800, "Lemari 6 pintu karakter doraemon", 468000, 1],
   
        ];
          
        
        await queryRunner.query("INSERT INTO products (name, stock, description, price, store_id) VALUES ?", [values]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
