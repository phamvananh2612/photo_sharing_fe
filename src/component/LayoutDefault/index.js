import { Layout, Menu } from "antd";
import { Outlet } from "react-router";
import HeaderCustomer from "../HeaderCustom";
import "./style.css";
const { Header, Footer, Sider, Content } = Layout;
const LayoutDefault = () => {
  return (
    <>
      <Layout className="layout">
        <Header className="header">
          <HeaderCustomer />
        </Header>
        <Layout className="layout-box">
          <Content className="content-box">
            <Outlet />
          </Content>
        </Layout>
        <Footer className="footer">@2025 by Phạm Văn Anh</Footer>
      </Layout>
    </>
  );
};
export default LayoutDefault;
