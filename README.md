# Movie Ticket Booking Application

### Developer React-Native
**Tổng:** 3.
**Thành viên:** Cao, Dũng, Thuận.

### Cấu trúc thư mục
src/
  ├── api/
  │         └── index.js
  ├── assets/
  │     ├── Homes/
  │     │     ├── image1.png
  │     │     ├── image3.png
  │     │     └── image2.png
  │     └── Movies/
  │             ├── image1.png
  │             ├── image3.png
  │             └── image2.png
  ├── screens/
  │         ├── HomeScreen.js
  │         ├── LoginScreen.js
  │         ├── RegisterScreen.js
  │         ├── ProfileScreen.js
  │         └── index.js
  ├── components/
  │         ├── TextInput.js
  │         ├── Button.js
  │         └── index.js
  ├── constants/
  │         ├── Colors.js
  │         ├── Images.js
  │         ├── Fonts.js
  │         └── index.js
  ├── navigators/
  │         └── index.js
  ├── redux/
  │         ├── store.js
  │         └── userSlice.js
  └──  utils/
              ├── Display.js
              └── index.js
                 
### Dưới đây là giải thích ý nghĩa của từng thư mục trong cấu trúc thư mục được cung cấp:
- **src/:** Thư mục gốc (root) của dự án.
- **api/:** Chứa các tệp tin liên quan đến việc giao tiếp với API, bao gồm các tệp tin xử lý yêu cầu và phản hồi từ API.
- **assets/:** Chứa các tài nguyên như hình ảnh, video, font chữ, vv. Đây là nơi lưu trữ các tài nguyên tĩnh được sử dụng trong dự án.
- **screens/:** Chứa các thành phần màn hình (screens) của ứng dụng. Đây là nơi xác định và triển khai các màn hình giao diện người dùng.
- **components/:** Chứa các thành phần (components) nhỏ tái sử dụng trong ứng dụng. Đây là nơi lưu trữ các thành phần UI có thể được sử dụng lại nhiều lần trong toàn bộ ứng dụng.
- **constants/:** Chứa các tệp tin chứa các hằng số và giá trị cố định được sử dụng trong ứng dụng.
- **navigators/:** Chứa các tệp tin liên quan đến điều hướng trong ứng dụng.
- **redux/:** Chứa các tệp tin liên quan đến quản lý trạng thái ứng dụng bằng Redux, bao gồm các reducers, actions, selectors, vv.
- **utils/:** Chứa các tệp tin chứa các hàm tiện ích, chức năng phụ trợ được sử dụng trong ứng dụng.
                 
### Quy ước đặt tên
- **Components:** quy tắc PascalCase. viết hoa chữ cái đầu. Ví dụ: Button, Header,....
- **Styles:** quy tắc camelCase: từ đầu tiên bắt đầu bằng chữ thường và các từ tiếp theo được viết hoa chữ cái đầu tiên. Ví dụ: titleHeader, textContent,....
- **Props:** quy tắc camelCase. Ví dụ: title, onPress, isLoading,....
- **States:** quy tắc camelCase. Ví dụ: isLoading, errorText, userData, ....
- **Event Handlers:** handle + tên sự kiện + Event. Ví dụ: handlePressEvent, handleInputChangeEvent,....
- **Variables và Functions:** quy tắc camelCase. Ví dụ: userName, fetchData, calculateTotal,....
- **Constants:** quy tắc SNAKE_CASE, mỗi từ được viết hoa và được ngăn cách bằng dấu gạch dưới "_". Ví dụ: API_KEY, MAX_ATTEMPTS, DEFAULT_TIMEOUT,....

### Quy tắc comment
**Comment những phần mã nguồn quan trọng, logic phức tạp hoặc các giải thích cần thiết để các thành viên trong nhóm có thể hiểu rõ ngữ cảnh và mục đích của mã. Điều này bao gồm:**
- Giải thích các thuật toán phức tạp.
- Mô tả cách hoạt động của một phần quan trọng trong mã.
- Giải thích các quyết định thiết kế và lựa chọn kỹ thuật.

## Lưu ý:
- Dự án sử dụng 100% tiếng anh.
