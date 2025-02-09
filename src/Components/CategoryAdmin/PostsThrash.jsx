import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '../../Redux/slices/AdminReducer';


function CustomNoRowsOverlay() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                textAlign: 'center',
                color: 'gray',
            }}
        >
            <Typography
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    mt: 3,
                    fontSize: { xs: '16px', md: '18px' },
                    color: '#666',
                }}
            >
                Data belum ada
            </Typography>
        </Box>
    );
}

export default function PostsThrash({ router }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const dataPosts = useSelector(state => state.admin.getDataPostAll)
    React.useEffect(() => {
        dispatch(getAllPosts({ limit: 50, offset: 0 }));
    }, [dispatch]);

    const loading = useSelector(state => state.admin.loading);
    const error = useSelector(state => state.admin.error);

    const rows = Array.isArray(dataPosts) && dataPosts.length > 0
        ? dataPosts
            .filter(item => item.Status === "thrash")
            .map((item, index) => ({
                no: index + 1,
                ...item,
                title: item.Title || '-',
                category: item.Category || '-',
            }))
        : [];



    const columns = [
        { field: 'no', headerName: 'No', width: 90 },
        { field: 'title', headerName: 'Judul', width: 150 },
        { field: 'category', headerName: 'Kategori', width: 150 },
        {
            field: 'detail',
            headerName: 'Detail',
            width: 100,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <IconButton
                        onClick={() => router.navigate(`/update-post/${params.row.id}`)}
                        color="primary"
                    >
                        <EditIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', gap: '2%' }}>
                <Button variant="contained" onClick={() => router.navigate('/add-category')}>Tambah</Button>
            </Box>
            {loading && <Box>Loading...</Box>}
            {error && <Box>{error}</Box>}
            <Box style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    loading={loading}
                    slots={{
                        noRowsOverlay: CustomNoRowsOverlay,
                    }}
                />
            </Box>
        </Box>
    );
}
