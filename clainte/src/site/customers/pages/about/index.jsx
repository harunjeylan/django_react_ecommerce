import React from "react";
import { useTheme } from "@emotion/react";
import { Box, CircularProgress } from "@mui/material";
import { tokens } from "../../../../theme";
import { about } from "../../../../data/staticData";
import Header2 from "../../../../components/Header2";
const About = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box className={`flex flex-col gap-4 md:gap-8 mt-20 md:mt-40`}>
      <Box className={`md:container w-full px-2 md:mx-auto md:px-auto my-4`}>
        <Box className={`w-full px-2 md:mx-auto md:px-auto`}>
          <Header2 title={about.title} subtitle={about.headline} />
        </Box>
        <Box className={`w-full px-2 md:mx-auto md:px-auto my-12`}>
          <div
            style={{ color: colors.neutral[400] }}
            className={`w-full prose lg:prose-xl `}
            dangerouslySetInnerHTML={{ __html: about.body }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default About;
