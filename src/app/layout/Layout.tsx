import { Outlet } from "react-router-dom"
import Header from "../../components/general/Header"
import Footer from "../../components/general/Footer"
const Layout = () => {
  return (
    <div>
        <Header />
             <main className="mt-3 mb-3">
                <Outlet /> {/* nội dung thay đổi theo từng route */}
            </main>
        <Footer />
    </div>
  )
}

export default Layout