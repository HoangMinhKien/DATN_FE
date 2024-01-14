import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root{
    --white: #ffffff;
    --white-light: #f3f3f3;
    --light: #eaeaea;
    --grey-light: #d6d6d6;
    --grey-medium: #bfbfbf;
    --grey: #a9a9a9;
    --grey-dark: #929292;
    --grey-black: #424242;
    --black: #000000;
    --primary-1: #8224e3;
    --primary-2: #ffcf26;
    --primary-3: #9b51e0;
    --second-1: #ffdbd2;
    --second-2: #04b200;
    --second-3: #ff0000;
    --category-1:#F8351D;
    --category-2:#F26B3A;
    --category-3:#FFE359;
    --category-4:#12A89D;
    --category-5:#12A89D;
    --shadow:0px 2px 4px rgba(0, 0, 0, 0.3);
    --shadow-hover: 0px 2px 4px rgba(0, 0, 0, 0.15);
  }

  *,*::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    font-family: 'Quicksand', sans-serif !important;

  }

  *::-webkit-scrollbar {
    width: 0px;
  }
  *::-webkit-scrollbar-thumb {
    width: 0px;
  }
  *::-webkit-scrollbar-track {
    width: 0px;
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    line-height: 1.3;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  input {
    height:100% !important;
  }

  input[data-with-icon] {
    padding-left:45px !important;
  }
  
  /*text style*/ 
  .heading_1-bold {
    font-size: 64px;
    font-weight: 700;
  }
  .heading_2-regular {
    font-size: 64px;
    font-weight: 400;
  }
  .heading_3-bold {
    font-size: 48px;
    font-weight: 700;
  }
  .heading_4-regular {
    font-size: 48px;
    font-weight: 400;
  }
  .title_1-bold {
    font-size: 32px;
    font-weight: 700;
  }
  .title_2-semibold {
    font-size: 32px;
    font-weight: 600;
  }
  .title_3-regular {
    font-size: 32px;
    font-weight: 700;
  }
  .subtitle_1-bold {
    font-size: 24px;
    font-weight: 700;
  }
  .subtitle_2-semibold {
    font-size: 24px;
    font-weight: 600;
  }
  .subtitle_3-regular {
    font-size: 24px;
    font-weight: 400;
  }
  .body_1-bold {
    font-size: 18px;
    font-weight: 700;
  }
  .body_2-semibold {
    font-size: 18px;
    font-weight: 600;
  }
  .body_3-regular {
    font-size: 18px;
    font-weight: 400;
  }
  .body_4-bold {
    font-size: 16px;
    font-weight: 700;
  }
  .body_5-semibold {
    font-size: 16px;
    font-weight: 600;
  }
  .body_6-regular {
    font-size: 16px;
    font-weight: 400;
  }
  .small_1-bold {
    font-size: 14px;
    font-weight: 700;
  }
  .small_2-semibold {
    font-size: 14px;
    font-weight: 600;
  }
  .small_3-regular {
    font-size: 14px;
    font-weight: 400;
  }
  .small_4-bold {
    font-size: 12px;
    font-weight: 700;
  }
  .small_5-semibold {
    font-size: 12px;
    font-weight: 600;
  }
  .small_6-regular {
    font-size: 12px;
    font-weight: 400;
  }
  .small_7-regular {
    font-size: 10px;
    font-weight: 400;
  }

.hover {
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.1);
}
.default {
  box-shadow: ;
}


`;
