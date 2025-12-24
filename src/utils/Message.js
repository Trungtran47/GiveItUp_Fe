const getMegNo = (code) => {
  return message.find((v) => v.Id == code)?.Content || "Hệ thống lỗi";
};
let message = [
  {
    Id: "9999",
    Type: 1,
    Title: "Error",
    Content: "Hệ thống lỗi?",
  },
  {
    Id: "1001",
    Type: 1,
    Title: "Error",
    Content: "Hệ thống lỗi?",
  },
  {
    Id: "1002",
    Type: 1,
    Title: "warning",
    Content: "Tên đăng nhập đã tồn tại.",
  },
  {
    Id: "1002",
    Type: 1,
    Title: "warning",
    Content: "Tên đăng nhập đã tồn tại.",
  },
  {
    Id: "1008",
    Type: 1,
    Title: "warning",
    Content: "Tuổi phải lớn hơn 10.",
  },
  {
    Id: "1023",
    Type: 1,
    Title: "warning",
    Content: "Email đã được sử dụng.",
  },
  {
    Id: "1024",
    Type: 1,
    Title: "warning",
    Content: "Số điện thoại đã được sử dụng.",
  },
  {
    Id: "1025",
    Type: 1,
    Title: "warning",
    Content: "Số điện thoại không hợp lệ.",
  },
];
export default getMegNo;
