import React, { useEffect } from 'react';
import { extendTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import PostsPublished from '../../Components/CategoryAdmin/PostsPublished';
import AddCategory from '../../Components/CategoryAdmin/AddPosts';
import UpdatePosts from '../../Components/CategoryAdmin/UpdatePosts';
import PostsDraft from '../../Components/CategoryAdmin/PostsDraft';
import PostsThrash from '../../Components/CategoryAdmin/PostsThrash';

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
        segment: 'thrash-post',
        title: 'thrash-post',
        // icon: <ProductionQuantityLimitsIcon />,
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
        const matchCategory = router.pathname.match(/^\/update-post\/(\d+)$/);
        const postId = matchCategory ? matchCategory[1] : null;
    
        switch (router.pathname) {
            case '/dashboard':
                setContent(<h1>Sharing Vision Test Fullstack</h1>);
                break;
            case '/published-post':
                setContent(<PostsPublished router={router} />);
                break;
            case '/draft-post':
                setContent(<PostsDraft router={router} />);
                break;
            case '/thrash-post':
                setContent(<PostsThrash router={router} />);
                break;
            case '/add-category':
                setContent(<AddCategory router={router} />);
                break;
            case `/update-post/${postId}`:
                setContent(<UpdatePosts router={router} postId={postId} />);
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
