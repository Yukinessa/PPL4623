import { extendTheme } from "@chakra-ui/react";

const Input = {
  parts: ["field"],
  variants: {
    outline: {
      field: {
        fontSize: "sm",
        color: "gray.600",
        _focus: {
          borderColor: "blue.500",
          boxShadow: "0 0 0 0.5px",
        },
        _invalid: {
          borderColor: "red.500",
          boxShadow: "0 0 0 0.5px",
        },
      },
    },
  },
  defaultProps: {
    variant: "outline",
  },
};

export default extendTheme({ components: { Input } });
