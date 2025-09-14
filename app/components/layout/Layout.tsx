import classNames from "classnames";
import { useSelector } from "react-redux";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { RootState } from "../../redux/store";
import MatrixChat from "../main/matrix-chat/MatrixChat";
export default function Layout({ children, ...props }: any) {
  const location = useLocation();

  // Check if the current route is '/chat'
  const showMatrix = useSelector((state: RootState) => state.matrix.showMatrix);

  const shouldDisplayMatrixChat = useSelector(
    (state: RootState) => state.matrix.isChatVisible
  );

  return (
    <div className="cnv-wrapper cnv-theme-light">
      {props.from !== "orgDelete" ? <Sidebar /> : ""}
      <div className="cnv-content-area">
        <Header />
        <div
          className={classNames({
            "cnv-content-chat": showMatrix,
            "cnv-content": !showMatrix,
          })}
        >
          {/* {shouldDisplayMatrixChat && (
            <div className="cnv-chat-wrapper">
              <div
                style={showMatrix ? { display: "block" } : { display: "none" }}
              >
                <MatrixChat />
              </div>
            </div>
          )} */}
          <div id="portalForModal" style={{ position: "relative" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
