# Movie Ticket Booking Application

### Mô tả
Ứng dụng đặt vé xem phim trực tuyến

### Demo
https://github.com/nguyenchicao0703/Movie-Ticket-Booking-Application/assets/109658324/263e5808-0e3d-4f9e-9b02-154fea3115b6

### Developer React-Native
**Tổng:** 3.

**Thành viên:** Cao, Dũng, Thuận.

## TODO List
### Chí Cao
| Task giao diện                                            | Cấp độ               | Trạng thái           |
|-----------------------------------------------------------|----------------------|----------------------|
| Màn hình Home                                             | Trung bình           | Hoàn thành           |
| Màn hình Select Showtime                                  | Khó                  | Hoàn thành           |
| Màn hình Seat                                             | Khó                  | Hoàn thành           |
| Màn hình Combo                                            | Khó                  | Hoàn thành           |
| Màn hình Movie                                            | Trung bình           | Hoàn thành           |
| Màn hình Ticket History                                   | Trung bình           | Hoàn thành           |

### Hoàng Dũng
| Task giao diện                                            | Cấp độ               | Trạng thái           |
|-----------------------------------------------------------|----------------------|----------------------|
| Màn hình Payment                                          | Khó                  | Hoàn thành           |
| Màn hình Discount                                         | Dễ                   | Hoàn thành           |
| Màn hình Bill                                             | Dễ                   | Hoàn thành           |

### Gia Thuận
| Task giao diện                                            | Cấp độ               | Trạng thái           |
|-----------------------------------------------------------|----------------------|----------------------|
| Màn hình Welcome                                          | Dễ                   | Hoàn thành           |
| Màn hình Login                                            | Dễ                   | Hoàn thành           |
| Màn hình Register                                         | Trung bình           | Hoàn thành           |
| Màn hình Cinema                                           | Dễ                   | Hoàn thành           |
| Màn hình Detail Movie                                     | khó                  | Hoàn thành           |
| Màn hình Update Profile                                   | Trung bình           | Hoàn thành           |

### Cấu trúc thư mục
- `src/`: Thư mục gốc của dự án.
  - `api/`: Chứa các tệp tin liên quan đến việc giao tiếp với API.
    - `axiosClient.js`: Tệp tin xử lý API.
  - `assets/`: Chứa các tài nguyên như hình ảnh, phong chữ, ....
    - `fonts/`: Chứa các phong chữ.
    - `images/`: Chứa các tài nguyên như hình ảnh.
      - `Homes/`: Chứa các tài nguyên liên quan đến trang chủ.
        - `image1.png`
        - `image2.png`
        - `image3.png`
      - `Movies/`: Chứa các tài nguyên liên quan đến phim.
        - `image1.png`
        - `image2.png`
        - `image3.png`
  - `screens/`: Chứa các thành phần màn hình.
    - `HomeScreen.js`
    - `LoginScreen.js`
    - `RegisterScreen.js`
    - `ProfileScreen.js`
    - `index.js`
  - `components/`: Chứa các thành phần nhỏ tái sử dụng.
    - `TextInput.js`
    - `Button.js`
    - `index.js`
  - `constants/`: Chứa các tệp tin chứa hằng số và giá trị cố định.
    - `Colors.js`
    - `Images.js`
    - `index.js`
  - `navigators/`: Chứa các tệp tin liên quan đến điều hướng.
    - `index.js`
  - `redux/`: Chứa các tệp tin liên quan đến quản lý trạng thái ứng dụng bằng Redux.
    - `store.js`
    - `userSlice.js`
  - `utils/`: Chứa các tệp tin tiện ích.
    - `Display.js`
    - `index.js`
                 
### Quy tắc đặt tên
- **Components:** quy tắc PascalCase. viết hoa chữ cái đầu. Ví dụ: Button, Header,....
- **Styles:** quy tắc camelCase: từ đầu tiên bắt đầu bằng chữ thường và các từ tiếp theo được viết hoa chữ cái đầu tiên. Ví dụ: titleHeader, textContent,....
- **Props:** quy tắc camelCase. Ví dụ: title, onPress, isLoading,....
- **States:** quy tắc camelCase. Ví dụ: isLoading, errorText, userData, ....
- **Event Handlers:** handle + tên sự kiện + Event. Ví dụ: handlePressEvent, handleInputChangeEvent,....
- **Variables và Functions:** quy tắc camelCase. Ví dụ: userName, fetchData, calculateTotal,....
- **Constants:** quy tắc SNAKE_CASE, mỗi từ được viết hoa và được ngăn cách bằng dấu gạch dưới "_". Ví dụ: API_KEY, MAX_ATTEMPTS, DEFAULT_TIMEOUT,....

### Quy tắc comment
Comment những phần mã nguồn quan trọng, logic phức tạp hoặc các giải thích cần thiết để các thành viên trong nhóm có thể hiểu rõ ngữ cảnh và mục đích của mã. Điều này bao gồm:
- Giải thích các thuật toán phức tạp.
- Mô tả cách hoạt động của một phần quan trọng trong mã.
- Giải thích các quyết định thiết kế và lựa chọn kỹ thuật.

## Lưu ý:
- Dự án sử dụng 100% tiếng anh.
