import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;

export const Loader = ({ theme, color, loading, size }) => {
  return (
    <main className={`layout min-height ${theme === "dark" && "layout-bg"}`}>
      <div className={"flex"}>
        <div className="loader-container">
          <ClipLoader
            color={color}
            loading={loading}
            css={override}
            size={size}
          />
        </div>
      </div>
    </main>
  );
};
