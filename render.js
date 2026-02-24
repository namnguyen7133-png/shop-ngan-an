const box = document.getElementById("list");
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFCL1NiCeMNUGWbtkzgUgsQIdhjbASXoard37mTu0QQQFxUr1YjI7PSsMNdjDu2hRydSWbx-Ezaypa/pub?gid=0&single=true&output=csv";

async function loadProducts() {
    try {
        const response = await fetch(sheetUrl);
        const data = await response.text();
        const rows = data.split("\n").slice(2); // Bỏ 2 dòng đầu (tiêu đề và hướng dẫn)

        box.innerHTML = ""; // Xóa dòng chữ đang tải

        rows.forEach(row => {
            const cols = row.split(",");
            if (cols.length >= 5) {
                const name = cols[0].trim();  // Cột A: Tên món
                const img = cols[1].trim();   // Cột B: Ảnh
                const price = cols[2].trim(); // Cột C: Giá
                const link = cols[3].trim();  // Cột D: Link Shopee
                const status = cols[4].trim(); // Cột E: Bật (1 = hiện, 0 = ẩn)

                // Chỉ hiện sản phẩm nếu cột E ghi là 1
                if (status === "1") {
                    box.innerHTML += `
                        <div class="item">
                            <img src="${img}" alt="${name}" onerror="this.src='https://via.placeholder.com/150'">
                            <h3>${name}</h3>
                            <p>${price}</p>
                            <a class="btn" href="${link}" target="_blank">Mua ngay</a>
                        </div>
                    `;
                }
            }
        });

        if (box.innerHTML === "") {
            box.innerHTML = "<p>Hiện tại tủ đồ đang trống (Hãy bật '1' ở cột E trên Sheet)</p>";
        }

    } catch (error) {
        box.innerHTML = "<p>❌ Lỗi kết nối dữ liệu: " + error + "</p>";
    }
}

loadProducts();
