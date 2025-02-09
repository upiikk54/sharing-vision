import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, updatePost } from "../../Redux/slices/AdminReducer";
import { enqueueSnackbar } from "notistack";

export default function UpdatePosts({ router, postId }) {
  const [postStatusValue, setPostStatusValue] = React.useState("");
  const dispatch = useDispatch();
  const dataPosts = useSelector((state) => state.admin.getDataPostById);

  const [postValue, setPostValue] = React.useState({
    postTitleValue: "",
    postContentValue: "",
    postCategoryValue: "",
  });

  React.useEffect(() => {
    if (postId) {
      dispatch(getPostById(postId));
    }
  }, [postId, dispatch]);

  React.useEffect(() => {
    if (dataPosts) {
      setPostValue({
        postTitleValue: dataPosts.Title || "",
        postContentValue: dataPosts.Content || "",
        postCategoryValue: dataPosts.Category || "",
      });
      setPostStatusValue(dataPosts.Status || "draft"); // Default status
    }
  }, [dataPosts]);

  const handleChange = (prop) => (event) => {
    setPostValue((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const handleUpdatePost = (status) => {
    const posts = {
      Title: postValue.postTitleValue.trim(),
      Content: postValue.postContentValue.trim(),
      Category: postValue.postCategoryValue.trim(),
      Status: status,
    };

    dispatch(updatePost({ postId, posts }))
      .then((res) => {
        if (res.payload?.status === 200 || res.payload?.status === true) {
            console.log(posts);
            console.log(postValue);
            
          enqueueSnackbar(`Post berhasil ${status}`, {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "center" },
            autoHideDuration: 3000,
          });
          router.navigate("/published-post");
        } else {
          enqueueSnackbar(res.payload?.message || "Gagal update post", {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "center" },
            autoHideDuration: 3000,
          });
        }
      })
      .catch(() => {
        enqueueSnackbar("Terjadi kesalahan, silakan coba lagi", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          autoHideDuration: 3000,
        });
      });
  };

  const handleSetStatusAndUpdate = (status) => {
    setPostStatusValue(status);
    handleUpdatePost(status);
  };

  return (
    <Box component="form">
      <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <Typography sx={{ fontWeight: 400, fontSize: "2.125rem" }}>
          Edit Post - {dataPosts?.Title || "-"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "2%" }}>
        <Button variant="contained" onClick={() => router.navigate("/published-post")}>
          Kembali
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "50%", mt: "20px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Typography sx={{ fontSize: "18px" }}>Kategori</Typography>
          <TextField fullWidth label="Kategori" onChange={handleChange("postCategoryValue")} value={postValue.postCategoryValue} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Typography sx={{ fontSize: "18px" }}>Judul</Typography>
          <TextField fullWidth label="Judul" onChange={handleChange("postTitleValue")} value={postValue.postTitleValue} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Typography sx={{ fontSize: "18px" }}>Konten</Typography>
          <TextField label="Konten" multiline rows={5} onChange={handleChange("postContentValue")} value={postValue.postContentValue} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "2%" }}>
          <Button sx={{ maxWidth: "20%" }} onClick={() => handleSetStatusAndUpdate("draft")} variant="contained" color="warning">
            Draft
          </Button>
          <Button sx={{ maxWidth: "20%" }} onClick={() => handleSetStatusAndUpdate("publish")} variant="contained" color="success">
            Published
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
