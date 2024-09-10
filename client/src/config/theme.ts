import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "white",
          outline: "1px solid white",
          margin: "20px 7px",
          '&.Mui-selected': {
            borderColor: "blue",
            outline: "none",  
            color: "white",   
          },
        },
      },
    },
  },
});

export default theme;
