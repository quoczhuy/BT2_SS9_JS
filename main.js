const bookingReservation = {
  bookingId: "BK-2024-8891",
  guestName: "Trần Minh Quang",
  roomType: "Deluxe Ocean View",
  roomPrice: 1500000,
  checkInHour: 9,
  discountCode: "SUMMER10",
};

const isVoucherValid = false;

const priceKey = "roomPrice";
// 1. SỬA LỖI: Dùng Bracket Notation để lấy giá trị qua biến động
const basePrice = bookingReservation[priceKey];

let earlySurcharge = 0;
if (bookingReservation.checkInHour < 12) {
  earlySurcharge = basePrice * 0.3;
  bookingReservation.earlySurcharge = earlySurcharge;
}

const totalAmount = basePrice + earlySurcharge;
bookingReservation.totalAmount = totalAmount;

// 2. SỬA LỖI: Dùng toán tử delete để xóa hoàn toàn key khỏi object
if (!isVoucherValid) {
  delete bookingReservation.discountCode;
}

console.log("--- CHI TIẾT PHIẾU ĐẶT PHÒNG ---");
// 3. SỬA LỖI: Dùng Bracket Notation để truy cập giá trị động trong vòng lặp for...in
for (const key in bookingReservation) {
  console.log(key + ": " + bookingReservation[key]);
}

console.log("--------------------------------");
// Kiểm tra lại bằng toán tử 'in'
console.log(
  "discountCode còn tồn tại không?:",
  "discountCode" in bookingReservation,
); // Phải trả về false
