import { SvgIcon, SvgIconProps } from "@mui/material";

// Adapted from https://www.wtp.waw.pl/wp-content/themes/wtp-theme/images/wtp_logo.svg
const WTPIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <g>
      <path d="M15.74,14.37l-1.61-1.58v1.58c0,.86-.48,1.65-1.54,1.65s-1.54-.79-1.54-1.65v-3.47h6.31v-3.09h-6.31v-3.3l-6.41,6.4h3.05v3.34c0,2.85,2.06,4.85,4.9,4.85s4.77-1.99,4.77-4.85v-1.44l-1.61,1.58ZM12,2.17C6.58,2.17,2.19,6.57,2.19,12s4.39,9.83,9.81,9.83,9.81-4.44,9.81-9.83c0-5.43-4.39-9.83-9.81-9.83Zm0,21.83C5.38,24,0,18.6,0,12S5.38,0,12,0s12,5.36,12,12c0,6.6-5.38,12-12,12Z" />
    </g>
  </SvgIcon>
);

export default WTPIcon;
