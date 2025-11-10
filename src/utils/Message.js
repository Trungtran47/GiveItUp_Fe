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
];
export default getMegNo;
