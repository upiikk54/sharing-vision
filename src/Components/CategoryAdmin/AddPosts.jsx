import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from '@mui/material'
import { useSnackbar } from 'notistack';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../Redux/slices/AdminReducer';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '25px',
    boxShadow: 24,
    textAlign: 'center',
    p: 4,
};

const modalContent = (
    <>
        <style>
            {`
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.2);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
            `}

        </style>
        <Typography sx={{ fontSize: '3rem', color: 'red', animation: 'pulse 1s infinite' }} >
            !
        </Typography>
        <Typography id="warning-modal-title" variant="h6" component="h2" color="error" sx={{ mt: 1, fontFamily: 'Axiforma' }} >
            Apakah Anda Yakin?
        </Typography>
        <Typography id="warning-modal-description" sx={{ mt: 2, fontFamily: 'Axiforma' }} >
            Tindakan ini tidak dapat dibatalkan.
        </Typography>
    </>
);

export default function AddPosts({ router }) {
    const [openSave, setOpenSave] = React.useState(false);
    const handleOpenSave = () => setOpenSave(true);
    const handleCloseSave = () => setOpenSave(false);

    const [createPostValue, setCreatePostValue] = React.useState({
        postTitleValue: "",
        postContentValue: "",
        postCategoryValue: "",
        postStatusValue: "",
    });

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const handleChangePost = (prop) => (event) => {
        setCreatePostValue({
            ...createPostValue,
            [prop]: event.target.value
        });
    };

    // Fungsi untuk membuat post tanpa memerlukan objek event
    const handleCreatePosts = async () => {
        const postPayload = {
            Title: createPostValue.postTitleValue,
            Content: createPostValue.postContentValue,
            Category: createPostValue.postCategoryValue,
            Status: createPostValue.postStatusValue,
        };

        try {
            const res = await dispatch(createPost(postPayload)).unwrap();

            if (res.status === true || res.statusCode === 201) {
                enqueueSnackbar(res.message, {
                    variant: "success",
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                    autoHideDuration: 3000,
                });
                setOpenSave(false);
                router.navigate("/published-post");
            } else {
                enqueueSnackbar(res.message || "Error occurred", {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                    autoHideDuration: 3000,
                });
            }
        } catch (err) {
            enqueueSnackbar(err.message || "Failed to create category", {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "center" },
                autoHideDuration: 3000,
            });
        }
    };

    // Fungsi untuk menangani klik status
    const handleStatusClick = (status) => {
        setCreatePostValue({
            ...createPostValue,
            postStatusValue: status,
        });
    };

    // Menggunakan useEffect untuk memanggil handleCreatePosts setelah postStatusValue berubah
    React.useEffect(() => {
        if (createPostValue.postStatusValue) {
            handleCreatePosts();
        }
    }, [createPostValue.postStatusValue]); // Memantau perubahan postStatusValue

    React.useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (openSave) {
                    handleCreatePosts();  // Tidak memerlukan event
                } else {
                    handleOpenSave();
                }
            }

            if (e.key === 'Escape') {
                e.preventDefault();
                if (openSave) {
                    handleCloseSave();
                } else {
                    router.navigate('/dashboard');
                }
            }
        };

        document.addEventListener('keydown', handleGlobalKeyDown);

        return () => {
            document.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [openSave, createPostValue]);

    return (
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleCreatePosts(); }}>
            <Box>
                {/* Modal Save */}
                <Modal
                    aria-labelledby="warning-modal-title"
                    aria-describedby="warning-modal-description"
                    open={openSave}
                    onClose={handleCloseSave}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={openSave}>
                        <Box sx={style}>
                            {modalContent}
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleCreatePosts}
                                >
                                    Ya, Saya Yakin
                                </Button>
                                <Button variant="contained" color="error" onClick={handleCloseSave}>
                                    Batal
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <Typography sx={{ fontWeight: 400, fontSize: "2.125rem" }}>
                    Create New Posts
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', gap: '2%' }}>
                <Button variant="contained" onClick={() => router.navigate('/kategori')}>Kembali</Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '50%', mt: '20px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Judul</Typography>
                    <TextField
                        fullWidth
                        label="Judul"
                        onChange={handleChangePost('postTitleValue')}
                        id="fullWidth"
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Kategori</Typography>
                    <TextField
                        fullWidth
                        label="Kategori"
                        onChange={handleChangePost('postCategoryValue')}
                        id="fullWidth"
                    />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <Typography sx={{ fontSize: "18px" }}>Konten</Typography>
                    <TextField label="Konten" multiline rows={5} onChange={handleChangePost('postContentValue')} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2%' }}>
                    <Button
                        sx={{ maxWidth: '20%' }}
                        onClick={() => handleStatusClick("draft")}
                        variant="contained"
                        color="warning"
                    >
                        Draft
                    </Button>
                    <Button
                        sx={{ maxWidth: '20%' }}
                        onClick={() => handleStatusClick("publish")}
                        variant="contained"
                        color="success"
                    >
                        Published
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
