import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme } from "@emotion/react";
import { SERVER_HOST } from "../../../features/auth/authApi";
const LargeBlogCard = ({ blog }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Card
      sx={{
        backgroundColor: colors.primary[400],
      }}
      className="shadow md:col-span-2 flex flex-col md:flex-row items-center hover:drop-shadow-md"
    >
      {blog.thumbnail ? (
        <CardMedia
          sx={{ height: 360, width: "100%" }}
          title={`${blog.title + blog.thumbnail}`}
          image={blog.thumbnail}
        />
      ) : (
        <Box
          sx={{ height: 360, width: "100%", backgroundColor: colors.grey[200] }}
          className="flex justify-center items-center"
        >
          No Image
        </Box>
      )}

      <CardContent>
        <Link to={`/blogs/${blog.slug}`}>
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            className={`text-2xl md:text-3xl p-4 text-left hover:text-green-400`}
          >
            {blog.title}
          </Typography>
          <Typography variant="subtitle1">{blog.headline}</Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default LargeBlogCard;
