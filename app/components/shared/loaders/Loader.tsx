import React from "react";
import styles from "./Loader.module.css";
import classNames from "classnames";

const ThreeDotSpinner = ({styles}: any) => {
  return (
    <div style={styles}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className={styles.bounce3}></div>
    </div>
  );
};

const CircularLoader = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  return (
    <div className={classNames(styles.circularSpinner, className)} style={style} />
  );
};

export default function Loader({ 
  className, 
  circleStyle, 
  isCircular = false
}: { 
  className?: string; 
  circleStyle?: React.CSSProperties; 
  isCircular?: boolean 
}) {
  if(isCircular) {
    return <CircularLoader className={className} style={circleStyle} />
  }

  return (
    <div className={classNames(styles.spinner, className)}>
      <div className={styles.bounce1} style={circleStyle}></div>
      <div className={styles.bounce2} style={circleStyle}></div>
      <div className={styles.bounce3} style={circleStyle}></div>
    </div>
  );
}
