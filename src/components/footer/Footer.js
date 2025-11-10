export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 pt-12 pb-8 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold text-sm mb-3">Quyên tặng</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Thể Loại
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Gây quỹ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Cách để bắt đầu với GiveItUp
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Các hạng mục gây quỹ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Gây quỹ từ thiện
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Đăng ký làm tổ chức từ thiện
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Về chúng tôi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  GiveItUp hoạt động thế nào?
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Đảm bảo quỹ góp
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Giá cả
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Trung tâm hỗ trợ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Giới thiệu</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Giới thiệu về GiveItUp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-10 border-t pt-6">
          <div className="text-sm text-gray-500">
            <div className="mb-2">© {new Date().getFullYear()} - GiveItUp</div>
            <div>Địa chỉ: 470 Trần Đại Nghĩa, Hòa Quý, TP Đà Nẵng</div>
            <div>Số điện thoại: 0869670997</div>
            <div>Email: Trungdt.21it@vku.udn.vn</div>
            <div className="mt-2">Thời gian hỗ trợ: 9:00 - 22:30</div>
          </div>

          <div className="mt-6 lg:mt-0 flex items-center space-x-6">
            <div className="flex space-x-4 items-center">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-500 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2V12h2.2V9.8c0-2.2 1.3-3.4 3.2-3.4.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 2.9h-1.9v7A10 10 0 0022 12z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-gray-500 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.5 6.2s-.2-1.7-.8-2.4c-.8-.9-1.7-.9-2.1-1C16.5 2 12 2 12 2s-4.5 0-8.6.8c-.4.1-1.3.1-2.1 1C.8 4.5.5 6.2.5 6.2S0 8.2 0 10.2v3.6c0 2 .5 4 1 4 1 .9 2.3 1 2.9 1.1 2.1.2 8.6.8 8.6.8s4.5-.1 8.6-.8c.6-.1 1.9-.2 2.9-1.1.5-.9 1-2 1-4v-3.6c0-2-.5-4-1-4zM9.8 15.6V8.4l6.2 3.6-6.2 3.6z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="X"
                className="text-gray-500 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23 3L13 13l10 10-2 2L9 15 1 23 0 21l8-8L-2 3l2-2 10 10L23 1z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-500 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm6.8-3.3a1.2 1.2 0 11-1.2-1.2 1.2 1.2 0 011.2 1.2z" />
                </svg>
              </a>
            </div>

            <div className="text-gray-400 text-sm">Tech by Tran Dinh Trung</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
