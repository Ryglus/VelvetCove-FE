import {Avatar, Box, Button, Container, Divider, Flex, Loader, Stack, Text, Title} from '@mantine/core';
import {useGetUserInfo} from '../../../lib/api/user.api';
import {useAuthStore} from '../../../store/auth-store';
import {useEffect} from 'react';
import MainLayout from '../../../layouts/index-layout';
import {IconLogout, IconUserEdit} from '@tabler/icons-react';
import {Link, useNavigate} from 'react-router-dom';
import OrderHistory from "../../orders/_components/order-history.component";


export default function AccountDetail() {
    const { mutate, isPending, isError } = useGetUserInfo();
    const user = useAuthStore((state) => state.user);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const navigate = useNavigate();

    useEffect(() => {
        mutate(1);
    }, [mutate]);

    const handleLogout = () => {
        clearAuth();
        navigate('/account/login');
    };

    if (isPending) {
        return (
            <MainLayout>
                <Container>
                    <Loader size="lg" />
                </Container>
            </MainLayout>
        );
    }

    if (isError) {
        return (
            <MainLayout>
                <Container>
                    <Text c="red" size="lg">
                        Error fetching user details.
                    </Text>
                </Container>
            </MainLayout>
        );
    }

    return (
        <Container size="sm">
            <Container p="xl" className="relative">
                <Button
                    component={Link}
                    to="/dashboard"
                    mb="lg"
                    fullWidth
                    size="md"
                    color="gray"
                    radius="md"
                >
                    Go to Admin
                </Button>
                <Flex justify="space-between">
                    <Button
                        leftSection={<IconUserEdit />}
                    >
                        Edit Account
                    </Button>
                    <Button onClick={handleLogout} rightSection={<IconLogout />}>
                        Logout
                    </Button>
                </Flex>
                <Box className="flex justify-center mb-10">
                    <Avatar
                        size={120}
                        radius="100%"
                        src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${user?.name.firstname}-${user?.name.lastname}`}
                        alt={`${user?.name.firstname} ${user?.name.lastname}`}
                    />
                </Box>

                <Title className="text-center" order={2} size={32} mb="lg">
                    {user?.name.firstname} {user?.name.lastname}
                </Title>

                <Divider mb="lg" />

                <Stack gap="xs" align="flex-start">
                    <Text size="lg" fw={500}>
                        <strong>Username:</strong> {user?.username}
                    </Text>
                    <Text size="lg" fw={500}>
                        <strong>Email:</strong> {user?.email}
                    </Text>
                    <Text size="lg" fw={500}>
                        <strong>Phone:</strong> {user?.phone}
                    </Text>
                    <Text size="lg" fw={500}>
                        <strong>Address:</strong> {user?.address?.street}, {user?.address?.city}
                    </Text>
                </Stack>
                <Divider my="lg" />

                <Box mt="xl">
                    <OrderHistory />
                </Box>
            </Container>
        </Container>
    );
}
