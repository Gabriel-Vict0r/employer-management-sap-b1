import { SidebarTrigger } from "../ui/sidebar"



export const Header = () => {

  return (
    <header className="w-full flex items-start justify-start gap-4  p-4 shadow-md z-10 max-h-16">
      <SidebarTrigger />
          <h1 className="text-2xl font-bold text-gray-600">Gestão de Colaboradores SAP</h1>
        </header>
  )
}