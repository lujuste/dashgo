import { Box, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Button, FormControl } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import Link from 'next/link'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../components/Form/Input'
import { useMutation } from 'react-query'
import { api } from '../../services/api'
import { queryClient } from '../../services/queryClient'
import { useRouter } from 'next/router'



type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;

}


const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required().email('E-mail invalido'),
    password: yup.string().required('Senha obrigatória').min(6, 'A senha precisa ter no mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais.')
})

export default function CreateUser() {
    const router = useRouter()
    const createUser = useMutation(async (user: CreateUserFormData) => {
        const response = await api.post('users', {
            user: {
                ...user,
                created_at: new Date(),
            }
        })

        return response.data.user
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users' /*['users', 1]*/)
        }
    })
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const errors = formState.errors

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        // await new Promise(resolve => setTimeout(resolve, 2000))
        // console.log(values)

        await createUser.mutateAsync(values)

        router.push('/users')
    }

    return (
        <FormControl isInvalid={!!errors}>
            <Box>
                <Header />
                <Flex
                    w="100%"
                    my="6"
                    maxWidth={1480}
                    mx="auto"
                    px="6">

                    <Sidebar />

                    <Box
                        as="form"
                        flex="1"
                        borderRadius={8}
                        bg="gray.800"
                        p={["6", "8"]}
                        onSubmit={handleSubmit(handleCreateUser)}
                    >

                        <Heading size="lg" fontWeight="normal">Criar um usuário</Heading>


                        <Divider my="6" borderColor="gray.700" />

                        <VStack spacing="8">
                            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%" >
                                <Input
                                    name="name"
                                    placeholder="Nome completo"
                                    label="Nome Completo"
                                    error={errors.name}
                                    type="name"
                                    {...register('name')}
                                />
                                <Input
                                    name="email"
                                    placeholder="E-mail"
                                    type="email"
                                    label="Email"
                                    error={errors.email}
                                    {...register('email')} />
                            </SimpleGrid>
                            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Senha"
                                    label="Senha"
                                    error={errors.password}
                                    {...register('password')}
                                />
                                <Input
                                    name="password_confirmation"
                                    placeholder="Confirmação de senha"
                                    type="password"
                                    label="Confirme sua senha"
                                    error={errors.password_confirmation}
                                    {...register('password_confirmation')}
                                />
                            </SimpleGrid>
                        </VStack>

                        <Flex mt="8" justify="flex-end">
                            <HStack spacing="4">
                                <Link href="/users" passHref>
                                    <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                                </Link>
                                <Button
                                    type="submit"
                                    colorScheme="pink"
                                    isLoading={formState.isSubmitting}
                                >
                                    Salvar
                                </Button>
                            </HStack>
                        </Flex>

                    </Box>
                </Flex>
            </Box>
        </FormControl>
    )
}