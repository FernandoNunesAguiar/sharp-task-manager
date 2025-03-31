import { SidebarProvider, SidebarTrigger } from "@/components/dashboardui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export default async function Layout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('AutToken')?.value;
    if (!token) {
      redirect('/signin');
  }
    return (
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>

    )
  }