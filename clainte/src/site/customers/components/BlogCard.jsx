import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

const BlogCard = ({ blog, imageHight = 260 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Card
      key={blog.slug}
      sx={{
        backgroundColor: colors.primary[400],
      }}
      className="shadow hover:drop-shadow-md"
    >
      {blog.thumbnail ? (
        <CardMedia
          sx={{ height: imageHight, width: "100%" }}
          title={`${blog.title + blog.thumbnail}`}
          image={blog.thumbnail}
        />
      ) : (
        <Box
          sx={{
            height: imageHight,
            width: "100%",
            backgroundColor: colors.grey[200],
          }}
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
            className={`text-xl md:text-2xl py-4 text-left hover:text-green-400`}
          >
            {blog.title}
          </Typography>
          <Typography variant="subtitle1">{blog.headline}</Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
