import React, { useContext, createContext } from 'react';
import { Icons } from './icons';
import { AppContext } from '../context/AppContext';
import { sidebarNavItems } from '../constants/sidebar';
import { Button } from './Button';
import { Input } from './Input';

interface SidebarContextType {
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarContext = createContext<SidebarContextType>({
  isActive: false,
  isCollapsed: false,
});

const SidebarLink: React.FC<{ href: string; icon: React.FC<any>; children: React.ReactNode; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }> = ({ href, icon: Icon, children, onClick, ...props }) => {
  const { isActive, isCollapsed } = useContext(SidebarContext);
  return (
    <a
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-r-md py-2.5 text-sm transition-colors border-l-2
      ${isCollapsed ? 'justify-center px-2' : 'px-3'}
      ${isActive ? 'bg-[#183d2d] text-[#1ed760] font-semibold border-[#1ed760]' : 'text-[#8d8c9e] hover:bg-[#24232d] hover:text-white border-transparent'}`}
      {...props}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className={`whitespace-nowrap ${isCollapsed ? 'hidden' : 'block'}`}>{children}</span>
    </a>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
    const appContext = useContext(AppContext);
    
    const handleNavClick = (e: React.MouseEvent, page: string) => {
        e.preventDefault();
        if (appContext?.setCurrentPage) {
            appContext.setCurrentPage(page);
        }
        setIsMobileOpen(false);
    }

    const groupLabels: { [key: string]: string } = {
        COM: 'Community',
        CAS: 'Casinos',
        SUP: 'Support',
        TOOLS: 'Tools'
    };

    // The internal content of the sidebar, reused for both mobile and desktop views.
    // Accepts 'showCollapsed' prop to force expanded view on mobile.
    const SidebarContent = ({ showCollapsed }: { showCollapsed: boolean }) => (
        <div className="flex flex-col h-full">
            {/* Sidebar Header (Logo) */}
            <div className={`flex h-16 shrink-0 items-center ${showCollapsed ? 'justify-center' : 'px-6'} transition-all duration-300 border-b border-[#3a3846]/50`}>
                <a href="#" className="flex items-center gap-2" onClick={(e) => handleNavClick(e, 'Dashboard')}>
                    <Icons.Zap className="h-6 w-6 flex-shrink-0 text-[#1ed760]" />
                    <span className={`font-heading text-xl font-bold text-white ${showCollapsed ? 'hidden' : 'block'}`}>ZAP</span>
                </a>
            </div>
            
            {/* Scrollable Nav Links Area */}
            <div className={`flex-1 overflow-y-auto py-6 ${showCollapsed ? 'px-2' : 'px-4'} custom-scrollbar transition-all duration-300`}>
                <div className={`relative mb-6 ${showCollapsed ? 'flex justify-center' : ''}`}>
                    <div className={showCollapsed ? 'hidden' : 'block w-full'}>
                        <Input placeholder="Search..." className="pl-10 bg-[#14131c] border-[#3a3846]" />
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d8c9e] h-4 w-4" />
                    </div>
                    <Button variant="ghost" size="icon" className={showCollapsed ? 'flex' : 'hidden'}>
                        <Icons.Search className="h-5 w-5 text-[#8d8c9e]" />
                    </Button>
                </div>
                
                <nav className="flex flex-col gap-6">
                    {sidebarNavItems.map((group) => (
                    <div key={group.group}>
                        {!showCollapsed && group.group !== 'DAS' && (
                        <h3 className={`font-heading text-[10px] uppercase tracking-wider text-[#8d8c9e] px-3 mb-2 opacity-70`}>
                            {groupLabels[group.group] || group.group}
                        </h3>
                        )}
                        <div className="flex flex-col gap-[2px]">
                        {group.items.map((item) => (
                            <SidebarContext.Provider key={item.title} value={{ isActive: appContext?.currentPage === item.title, isCollapsed: showCollapsed }}>
                            <SidebarLink
                                href={item.href}
                                icon={item.icon}
                                onClick={(e) => handleNavClick(e, item.title)}
                            >
                                {item.title}
                            </SidebarLink>
                            </SidebarContext.Provider>
                        ))}
                        </div>
                    </div>
                    ))}
                </nav>
            </div>

            {/* Sidebar Footer (Collapse Button) - Hidden on mobile overlay */}
            <div className={`hidden md:flex shrink-0 border-t border-[#3a3846] ${showCollapsed ? 'p-2 justify-center' : 'p-4'} transition-all duration-300 bg-[#14131c]`}>
                <Button
                    variant="ghost"
                    size={showCollapsed ? "icon" : "sm"}
                    className={`text-[#8d8c9e] hover:text-white ${!showCollapsed ? 'w-full flex gap-2' : ''}`}
                    onClick={() => setIsCollapsed(!showCollapsed)}
                >
                    {showCollapsed ? <Icons.ChevronRight className="h-5 w-5" /> : (
                        <>
                            <Icons.ChevronLeft className="h-5 w-5" />
                            <span>Collapse Sidebar</span>
                        </>
                    )}
                </Button>
            </div>
        </div>
    );

  return (
    <>
      {/* Mobile Overlay Drawer */}
      <div className={`fixed inset-0 z-[100] flex md:hidden pointer-events-none ${isMobileOpen ? 'pointer-events-auto' : ''}`}>
        <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileOpen(false)} />
        <div className={`relative w-64 h-full flex-shrink-0 border-r border-[#3a3846] bg-[#14131c] shadow-2xl transform transition-transform duration-300 ease-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           {/* Force expanded view on mobile by passing showCollapsed={false} */}
           <SidebarContent showCollapsed={false} />
           <button className="absolute top-4 right-4 p-2 text-[#8d8c9e] hover:text-white bg-[#14131c]/50 rounded-full" onClick={() => setIsMobileOpen(false)}>
             <Icons.X className="h-5 w-5" />
           </button>
        </div>
      </div>

      {/* Desktop Sticky Sidebar */}
      <aside 
        className={`hidden md:flex flex-col flex-shrink-0 border-r border-[#3a3846] bg-[#14131c] transition-all duration-300 sticky top-0 h-screen
        ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        <SidebarContent showCollapsed={isCollapsed} />
      </aside>
    </>
  );
};
