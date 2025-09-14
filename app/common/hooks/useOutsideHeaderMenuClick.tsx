import React, { useEffect } from "react";

const useOutsideHeaderMenuClick = (
  onClickShowMainMenu: any,
  onClickShowProfileMenu: any,
  containerRef: any,
  clickRef: any,
  menuRef: any,
  burgerRef: any,
  windowWidth: number
) => {
  useEffect(() => {
    function onOutsideClick(event: any) {
      if (windowWidth > 768) {
        if (containerRef?.current?.style.display == "block") {
          if (!containerRef?.current?.contains(event.target)) {
            onClickShowProfileMenu(false);
          }
        } else {
          if (clickRef?.current?.contains(event.target)) {
            onClickShowProfileMenu(true);
          }
        }
      } else {
        if (menuRef?.current?.style?.display == "block") {
          if (!menuRef?.current?.contains(event.target)) {
            onClickShowMainMenu(false);
            onClickShowProfileMenu(false);
          } else {
            if (clickRef?.current?.contains(event.target)) {
              // alert("Hi");
              if (containerRef?.current?.style?.display == "none") {
                onClickShowProfileMenu(true);
              } else {
                onClickShowProfileMenu(false);
              }
            }
          }
        } else {
          if (burgerRef?.current?.contains(event.target)) {
            onClickShowMainMenu(false);
            if (containerRef?.current?.style?.display == "none") {
              onClickShowMainMenu(true);
              onClickShowProfileMenu(true);
            } else {
              onClickShowMainMenu(false);
              onClickShowProfileMenu(false);
            }
          }
        }
      }
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, [windowWidth]);
};

export default useOutsideHeaderMenuClick;
