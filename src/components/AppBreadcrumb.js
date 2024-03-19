import React from "react";
import { useLocation } from "react-router-dom";

import routes from "../routes";
import swal from "sweetalert";

import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname;

  const getRouteName = (pathname, routes) => {
    let currentRoute = null;
    if (pathname === "/signOut") {
      swal({
        icon: "warning",
        title: "Are you sure?",
        text: "Do you want to signout",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Delete",
        cancelButtonText: "No",
        buttons: true,
      }).then((result) => {
        if (result) {
          localStorage.clear();
          window.location.reload();
        }
      });
    } else currentRoute = routes.find((route) => route.path === pathname);
    return currentRoute ? currentRoute.name : "";
  };

  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];
    location.split("/").reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      breadcrumbs.push({
        pathname: currentPathname,
        name: getRouteName(currentPathname, routes),
        active: index + 1 === array.length ? true : false,
      });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem href="/">HIS</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active
              ? { active: true }
              : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        );
      })}
    </CBreadcrumb>
  );
};

export default React.memo(AppBreadcrumb);
