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
];
export default getMegNo;
