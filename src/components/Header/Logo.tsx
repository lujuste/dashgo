import { Text } from '@chakra-ui/react'

export function Logo() {
    return (
        <Text
            fontSize={["2xl", "3xl"]}
            font-weight="bold"
            letterSpacing="tight"
            w="64"
        >
            dashgo
            <Text as="span" color="pink.500" >
                .
            </Text>
        </Text>
    )
}