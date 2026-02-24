const tuDo = document.getElementById("tu-do-tu-dong");
const linkCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFCL1NiCeMNUGWbtkzgUgsQIdhjbASXoard37mTu0QQQFxUr1YjI7PSsMNdjDu2hRydSWbx-Ezaypa/pub?gid=0&single=true&output=csv";

async function layHangTuSheet() {
    try {
        const response = await fetch(linkCSV);
        const data = await response.text();
        const dong = data.split("\n").slice(2); // Bỏ 2 dòng tím tiêu đề

        let html = "<h2 style='text-align:center'>✨ HÀNG MỚI TRONG TỦ ĐỒ ✨</h2><div style='display:flex; flex-wrap:wrap; justify-content:center;'>";

        dong.forEach(row => {
            const cot = row.split(",");
            if (cot.length >= 5) {
                const ten = cot[0] ? cot[0].trim() : "";  // Cột A
                const anh = cot[1] ? cot[1].trim() : "";   // Cột B
                const gia = cot[2] ? cot[2].trim() : "";   // Cột C
                const link = cot[3] ? cot[3].trim() : "";  // Cột D
                const bat = cot[4] ? cot[4].trim() : "";   // Cột E (Số 1 là hiện)

                if (bat === "1" && ten !== "") {
                    html += `
                        <div style="border:1px solid #ddd; margin:10px; padding:10px; width:180px; border-radius:10px; text-align:center; box-shadow: 2px 2px 5px #eee;">
                            <img src="${anh}" style="width:100%; border-radius:5px;" onerror="this.src='https://via.placeholder.com/150?text=Anh-Cho-Duyet'">
                            <h4 style="font-size:14px; height:40px; overflow:hidden;">${ten}</h4>
                            <p style="color:red; font-weight:bold;">${gia}</p>
                            <a href="${link}" target="_blank" style="background:#fb5531; color:white; padding:5px 10px; text-decoration:none; border-radius:5px; font-size:12px;">Mua ngay</a>
                        </div>
                    `;
                }
            }
        });

        html += "</div><hr>";
        tuDo.innerHTML = html;

    } catch (loi) {
        console.log("Đang tải dữ liệu...");
    }
}

layHangTuSheet();
