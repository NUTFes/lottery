import React from 'react';
import al from './AdminLayout.module.css';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
interface AdminLayoutProps {
  className?: string;
  align?: string;
  justify?: string;
  width?: string;
  height?: string;
  gap?: string;
  children?: React.ReactNode;
}
const AdminLayout = (props: AdminLayoutProps) => {
  return (
    <div className={`${al.AdminLayoutContainer}`}>
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <Header className="flex justify-between items-center py-4 md:py-8"></Header>
        {props.children}
        <Footer className="bg-white pt-4 sm:pt-10 lg:pt-12"></Footer>
      </div>
    </div>
  );
};
export default AdminLayout;