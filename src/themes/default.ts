export const theme: ThemeProps = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#00f',
    secondary: '#00a',
    highlight: '#ededff',
    accent: '#c0f',
    gray: '#eee',
    lightgray: '#fafafa',
    midgray: '#777',
    white: '#fff',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
};

export type ThemeProps = {
  colors: {
    text: string;
    background: string;
    primary: string;
    secondary: string;
    highlight: string;
    accent: string;
    gray: string;
    lightgray: string;
    midgray: string;
    white: string;
  };
  space: number[];
  sizes: number[];
  fonts: {
    body: string;
    monospace: string;
  };
  fontSizes: number[];
};

export type ThemeProviderProps = {
  theme: ThemeProps;
};

export default theme;
