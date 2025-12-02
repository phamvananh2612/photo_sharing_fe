import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderCustom from "../HeaderCustom";

const { Header, Footer, Content } = Layout;

const LayoutDefault = () => {
  return (
    <Layout className="min-h-screen bg-[#0b0214] text-white w-full">
      {/* header */}
      <Header className="w-full bg-[#0b0214] flex items-center shadow-md fixed z-10">
        <div className="w-full max-w-9xl mx-auto">
          <HeaderCustom />
        </div>
      </Header>

      {/* content */}
      <Content className="w-full flex items-center justify-center mt-16">
        <div className="w-full min-h-[80vh] mx-auto">
          <Outlet />
        </div>
      </Content>

      {/* footer */}
      <Footer className="text-center text-xs text-gray-400 py-4 bg-[#0b071c]">
        @2025 by Phạm Văn Anh
      </Footer>
    </Layout>
  );
};

export default LayoutDefault;
