import { Stack } from '@chakra-ui/react'
import { NavLink } from './NavLink'
import { NavSection } from './NavSection'
import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine } from 'react-icons/ri'

export function SideBarNav() {
    return (
        <Stack spacing="12" align="flex-start">
            <NavSection title="GERAL">
                <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
                <NavLink icon={RiContactsLine} href="/users">Usuários</NavLink>
            </NavSection>

            <NavSection title="AUTOMAÇÃO">
                <NavLink href="/forms" icon={RiInputMethodLine}>Formulários</NavLink>
                <NavLink href="/automatic" icon={RiGitMergeLine}>Automação</NavLink>
            </NavSection>


        </Stack>
    )
}