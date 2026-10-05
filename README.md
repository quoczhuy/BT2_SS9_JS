# 2. Khắc phục Lỗi Xử lý Thuộc tính Động & Quản lý Đối tượng Hồ sơ Phòng Khách sạn

## Phân tích lỗi (Error Analysis)
Đoạn mã hiện tại gặp 3 lỗi logic và kỹ thuật nghiêm trọng:
1. **Lỗi lấy giá phòng (Truy xuất qua biến động):**
   - **Lệnh sai:** `const basePrice = bookingReservation.priceKey;`
   - **Nguyên nhân:** Dot Notation (`.priceKey`) chỉ tìm chính xác thuộc tính có tên là `"priceKey"`, thay vì nội suy giá trị `"roomPrice"` chứa trong biến. Dẫn đến `basePrice` bị `undefined`, kéo theo `totalAmount` bị `NaN`.
   - **Cách sửa:** Sử dụng Bracket Notation: `bookingReservation[priceKey]`.

2. **Lỗi xóa thuộc tính:**
   - **Lệnh sai:** `bookingReservation.discountCode = undefined;`
   - **Nguyên nhân:** Gán giá trị `undefined` không thực sự loại bỏ thuộc tính ra khỏi đối tượng, key `"discountCode"` vẫn tồn tại và tốn bộ nhớ, đồng thời vòng lặp `for...in` vẫn sẽ lặp qua nó.
   - **Cách sửa:** Sử dụng toán tử `delete` để xóa hoàn toàn: `delete bookingReservation.discountCode;`.

3. **Lỗi in chi tiết phiếu đặt phòng (Trong vòng lặp for...in):**
   - **Lệnh sai:** `console.log(key + ": " + bookingReservation.key);`
   - **Nguyên nhân:** Biến `key` trong vòng lặp chứa dạng chuỗi của tên thuộc tính (ví dụ `"bookingId"`, `"guestName"`), nếu dùng `.key`, JS lại đi tìm thuộc tính tên là `"key"`. Kết quả là mọi giá trị in ra đều là `undefined`.
   - **Cách sửa:** Sử dụng Bracket Notation: `bookingReservation[key]`.

## Bảng Test Cases

| Trường hợp kiểm thử | Dữ liệu đầu vào | Kết quả sai thực tế (Lỗi) | Kết quả đúng mong đợi |
| :--- | :--- | :--- | :--- |
| **TC01:** Mã Voucher không hợp lệ & Nhận phòng sớm | `isVoucherValid = false`<br>`priceKey = "roomPrice"`<br>`checkInHour = 9` | `totalAmount: NaN`<br>Vòng lặp in ra mọi giá trị là `undefined`<br>In ra: `discountCode: undefined` | `totalAmount: 1950000`<br>Vòng lặp in đúng giá trị từng thuộc tính.<br>Thuộc tính `discountCode` biến mất hoàn toàn. |
| **TC02:** Mã Voucher hợp lệ & Nhận phòng đúng giờ | `isVoucherValid = true`<br>`priceKey = "roomPrice"`<br>`checkInHour = 14` | `totalAmount: NaN`<br>Vòng lặp in ra mọi giá trị là `undefined` | `totalAmount: 1500000`<br>Vòng lặp in đúng giá trị.<br>In ra: `discountCode: SUMMER10` |