const box = document.getElementById("list");

if (typeof PRODUCTS === "undefined" || PRODUCTS.length === 0) {
  box.innerHTML = "<p>❌ Không có dữ liệu sản phẩm</p>";
} else {
  PRODUCTS.forEach(p => {
    box.innerHTML += `
      <div class="item">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price}</p>
        <a class="btn" href="${p.link}" target="_blank">Mua ngay</a>
      </div>
    `;
  });
}
