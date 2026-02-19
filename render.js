const box = document.getElementById("list");

if (!ON) {
  box.innerHTML = "<p>⛔ Trang đang tắt</p>";
} else {
  PRODUCTS.forEach(p => {
    box.innerHTML += `
      <div class="item">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>${p.price}</p>
        <a class="btn" href="${p.link}" target="_blank">Mua ngay</a>
      </div>
    `;
  });
}
