import {
  appStore,
  facebook,
  googlePlay,
  instagram,
  twitter,
} from "../assets/icons";

const Footer = () => {
  return (
    <>
      <div className="mt-40 flex flex-col gap-5 px-8">
        <div className="flex justify-between items-start flex-col md:flex-row gap-7">
          <div className="flex justify-start items-start">
            <h1 className="text-[#605DEC] font-bold text-2xl">Trimpa</h1>
          </div>
          <ul className="flex flex-col items-start justify-start gap-3">
            <h2 className="text-[#6E7491] font-bold text-lg">Về chúng tôi</h2>
            <li className="footerLi">Giới thiệu Trimpa</li>
            <li className="footerLi">Cách hoạt động</li>
            <li className="footerLi">Cơ hội nghề nghiệp</li>
            <li className="footerLi">Blog</li>
            <li className="footerLi">Báo chí</li>
            <li className="footerLi">Diễn đàn</li>
          </ul>
          <ul className="flex flex-col items-start justify-start gap-3 ">
            <h2 className="text-[#6E7491] font-bold text-lg">
              Hợp tác cùng chúng tôi
            </h2>
            <li className="footerLi">Chương trình đối tác</li>
            <li className="footerLi">Chương trình liên kết</li>
            <li className="footerLi">Đối tác kết nối</li>
            <li className="footerLi">Ưu đãi & sự kiện</li>
            <li className="footerLi">Tích hợp API</li>
            <li className="footerLi">Cộng đồng</li>
            <li className="footerLi">Chương trình khách hàng thân thiết</li>
          </ul>
          <ul className="flex flex-col items-start justify-start gap-3">
            <h2 className="text-[#6E7491] font-bold text-lg">Hỗ trợ</h2>
            <li className="footerLi">Trung tâm trợ giúp</li>
            <li className="footerLi">Liên hệ chúng tôi</li>
            <li className="footerLi">Chính sách bảo mật</li>
            <li className="footerLi">Điều khoản dịch vụ</li>
            <li className="footerLi">Tin cậy & an toàn</li>
            <li className="footerLi">Hỗ trợ tiếp cận</li>
          </ul>
          <ul className="flex flex-col items-start justify-start  gap-3">
            <h2 className="text-[#6E7491] font-bold text-lg">Tải ứng dụng</h2>
            <li className="footerLi">Trimpa cho Android</li>
            <li className="footerLi">Trimpa cho iOS</li>
            <li className="footerLi">Phiên bản di động</li>
            <img src={appStore} alt="appStore" className="" />
            <img src={googlePlay} alt="googlePlay" />
          </ul>
        </div>
        <div className="border-t-2 border-[#CBD4E6] py-8 flex justify-between items-center">
          <div className="flex items-center justify-center gap-3">
            <img
              src={twitter}
              alt="twitter"
              className="cursor-pointer object-cover w-5 h-5 sm:w-7 sm:h-7"
            />
            <img
              src={instagram}
              alt="instagram"
              className="cursor-pointer object-cover w-5 h-5 sm:w-7 sm:h-7"
            />
            <img
              src={facebook}
              alt="facebook"
              className="cursor-pointer object-cover w-5 h-5 sm:w-7 sm:h-7"
            />
          </div>
          <p className="text-[#7C8DB0] text-sm sm:text-base">
            &copy; 2025 Trimpa. Bản quyền đã được bảo hộ.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
