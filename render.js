const box = document.getElementById("list");
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFCL1NiCeMNUGWbtkzgUgsQIdhjbASXoard37mTu0QQQFxUr1YjI7PSsMNdjDu2hRydSWbx-Ezaypa/pub?gid=0&single=true&output=csv";

async function loadProducts() {
    try {
        const response = await fetch(sheetUrl);
        const data = await response.text();
        // Máy tự tách các dòng trong Sheet
        const rows = data.split("\n").slice(2); 

        // Tạo một khu vực riêng để hàng từ Sheet đổ vào
        let autoHtml = "<h2>📦 Hàng mới cập nhật (Tự động)</h2><div style='display: flex; flex-wrap: wrap;'>";

        rows.forEach(row => {
            const cols = row.split(",");
            if (cols.length >= 5) {
                const name = cols[0] ? cols[0].trim() : "";  
                const img = cols[1] ? cols[1].trim() : "";   
                const price = cols[2] ? cols[2].trim() : ""; 
                const link = cols[3] ? cols[3].trim() : "";  
                const status = cols[4] ? cols[4].trim() : ""; 

                // Chỉ hiện nếu cột E bạn đánh số 1
                if (status === "1" && name !== "") {
                    autoHtml += `
                        <div class="item" style="border: 2px solid #ff9900; margin: 10px; padding: 10px; width: 200px;">
                            <img src="${img}" alt="${name}" style="width:100%" onerror="this.src='https://via.placeholder.com/150'">
                            <h3>${name}</h3>
                            <p><b>${price}</b></p>
                            <a class="btn" href="${link}" target="_blank">Mua ngay</a>
                        </div>
                    `;
                }
            }
        });

        autoHtml += "</div><hr><h2>✍️ Khu vực dán tay của bạn</h2>";
        
        // Chèn toàn bộ hàng từ Sheet lên TRÊN cùng của danh sách hiện có
        box.insertAdjacentHTML('afterbegin', autoHtml);

    } catch (error) {
        console.log("Đang đợi dữ liệu từ Sheet...");
    }
}

loadProducts();
