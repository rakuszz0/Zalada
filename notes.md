todo: (Finish)
- untuk customer gausah pake rules
- tambah staff customer roles
- tambah staff customer rules 


todo develop-amqp: (Finish)
- buat singlequeue service buat send mail
- ganti yang masih pake normal send mail (lemot coy)

todo develop-ws:
1. buat online user list dengan ketentuan (done):
    - Hitung per account, kalo udah ada accountnya gak usah ditambah jumlah onlinenya tapi ditambah informasi user itu sendiri
    - Sementara di simpan di local variable dulu

    Pertanyaan: 
    1. Apakah servicenya mau digabung atau dipisah jadi service lain?
        gabung dulu, nanti kalo udah jago baru mulai dipisah karean kalo dipisah lebih ribet, di service lain jadi server di service ini jadi client.
        Pokoknya ribet lah buat sekarang.

ide:
1. buat 2 factor verification.
    - buat token buat verfication
    - verifikasi token dan kasih paramater kalo 2fa udah aktif
    - mungkin butuh table untuk user settings
2. multiaccount (kayak github)
    - bisa disimpan data untuk data login kalo mau dijadiin list (gausah masukin auth lagi nanti
