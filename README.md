# Movie Ticket Booking Application

### Developer React-Native
**Tổng:** 3.

**Thành viên:** Cao, Dũng, Thuận.

## TODO List
### Chí Cao
| Task                                                      | Cấp độ               | Trạng thái           |
|-----------------------------------------------------------|----------------------|----------------------|
| Màn hình Home                                             | Trung bình           | Đang làm việc        |
| Màn hình Select Showtime                                  | Khó                  | Đang làm việc        |
| Màn hình Seat                                             | Khó                  | Đang làm việc        |
| Màn hình Movie                                            | Trung bình           | Đang làm việc        |
| Màn hình Ticket History                                   | Trung bình           | Đang làm việc        |

### Hoàng Dũng
| Task                                                      | Cấp độ               | Trạng thái           |
|-----------------------------------------------------------|----------------------|----------------------|
| Màn hình Combo                                            | Khó                  | Đang làm việc        |
| Màn hình Payment                                          | Khó                  | Đang làm việc        |
| Màn hình Discount                                         | Dễ                   | Đang làm việc        |
| Màn hình Bill                                             | Dễ                   | Đang làm việc        |
| Màn hình Profile                                          | Dễ                   | Đang làm việc        |
| Màn hình Update Profile                                   | Trung bình           | Đang làm việc        |

### Gia Thuận
| Task                                                      | Cấp độ               | Trạng thái           |
|-----------------------------------------------------------|----------------------|----------------------|
| Màn hình Welcome                                          | Dễ                   | Đang làm việc        |
| Màn hình Login                                            | Trung bình           | Đang làm việc        |
| Màn hình Register                                         | Trung bình           | Đang làm việc        |
| Màn hình Auth OTP                                         | Trung bình           | Đang làm việc        |
| Màn hình Cinema                                           | Dễ                   | Đang làm việc        |
| Màn hình Detail Movie                                     | khó                  | Đang làm việc        |

### Cấu trúc thư mục
- `src/`: Thư mục gốc của dự án.
  - `api/`: Chứa các tệp tin liên quan đến việc giao tiếp với API.
    - `index.js`: Tệp tin xử lý API.
  - `assets/`: Chứa các tài nguyên như hình ảnh.
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
    - `Fonts.js`
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
