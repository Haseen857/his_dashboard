import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";
import logos from '../assets/images/app_icon.png'
import { logoNegative } from "src/assets/brand/logo-negative";
import { sygnet } from "src/assets/brand/sygnet";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
// import mylogo from '../../src/assets/images/ddd.png'
// sidebar nav config
import navigation from "../_nav";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => {
    return state.sideBarReducer.sidebarShow;
  });

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
      <img src= {logos} style = {{height:'50px'}}/>
        {/* <img
          src={mylogo}
          height="25"
          className="smallicon"
        /> */}
        {/* <CIcon
          className="sidebar-brand-full"
          icon="https://dmw-medicalgroup.com/wp-content/uploads/2019/11/dmw-logo.png"
          height={35}
        /> */}
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
        }
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
