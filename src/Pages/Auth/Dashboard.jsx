import React, { useEffect } from 'react';
import { extendTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import PostsPublished from '../../Components/CategoryAdmin/PostsPublished';
import AddCategory from '../../Components/CategoryAdmin/AddPosts';
import UpdateCategory from '../../Components/CategoryAdmin/UpdateCategory';
import PostsDraft from '../../Components/CategoryAdmin/PostsDraft';

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'published-post',
        title: 'published-post',
        // icon: <CategoryIcon />,
    },
    {
        segment: 'draft-post',
        title: 'draft-post',
        // icon: <ProductionQuantityLimitsIcon />,
    },
    {
        segment: 'produk',
        title: 'Produk',
        // icon: <ProductionQuantityLimitsIcon />,
    },
    {
        segment: 'keranjang',
        title: 'Keranjang',
        // icon: <ShoppingCartIcon />,
    },
    {
        segment: 'transaksi',
        title: 'Transaksi',
        // icon: <PaidIcon />,
    },
    {
        segment: 'invoice',
        title: 'Invoice',
        // icon: <ReceiptIcon />,
    }
];

const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
            replace: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

export default function Dashboard(props) {
    const [content, setContent] = React.useState('');
    const { window } = props;

    const router = useDemoRouter('/dashboard');
    const demoWindow = window ? window() : undefined;

    useEffect(() => {
        const matchCategory = router.pathname.match(/^\/update-category\/(\d+)$/);
        const categoryId = matchCategory ? matchCategory[1] : null;
    
        switch (router.pathname) {
            case '/dashboard':
                setContent(<h1>Halo</h1>);
                break;
            case '/published-post':
                setContent(<PostsPublished router={router} />);
                break;
            case '/draft-post':
                setContent(<PostsDraft router={router} />);
                break;
            case '/add-category':
                setContent(<AddCategory router={router} />);
                break;
            case `/update-category/${categoryId}`:
                setContent(<UpdateCategory router={router} categoryId={categoryId} />);
                break;
            default:
                setContent(<h1>Not Found</h1>);
        }
    }, [router.pathname]);

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout>
                <PageContainer>
                    {content}
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}
