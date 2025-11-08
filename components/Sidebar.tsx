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
      className={`flex items-center gap-3 rounded-r-md py-2.5 text-sm transition-colors border-l-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#00FFC0] font-medium
      ${isCollapsed ? 'justify-center px-2' : 'px-4'}
      ${isActive ? 'bg-[#00FFC0]/10 text-[#00FFC0] border-[#00FFC0]' : 'text-[#8d8c9e] hover:bg-[#1A1A1A] hover:text-white border-transparent'}`}
      {...props}
    >
      <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
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
    const SidebarContent = ({ showCollapsed, isMobile = false }: { showCollapsed: boolean, isMobile?: boolean }) => (
        <div className="flex flex-col h-full bg-[#0A0A0A]">
            {/* Sidebar Header (Logo) */}
            <div className={`flex h-16 shrink-0 items-center ${showCollapsed ? 'justify-center' : 'px-6'} transition-all duration-300 border-b border-[#333333]`}>
                <a href="#" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00FFC0] rounded-md" onClick={(e) => handleNavClick(e, 'Dashboard')} aria-label="Go to Dashboard">
                    <Icons.Zap className="h-7 w-7 flex-shrink-0 text-[#00FFC0]" />
                    <span className={`font-heading text-xl font-bold text-white tracking-wider ${showCollapsed ? 'hidden' : 'block'}`}>ZAP</span>
                </a>
            </div>
            
            {/* Scrollable Nav Links Area */}
            <div className={`flex-1 overflow-y-auto py-6 ${showCollapsed ? 'px-2' : 'px-0'} custom-scrollbar transition-all duration-300`}>
                <div className={`relative mb-6 px-4 ${showCollapsed ? 'flex justify-center px-0' : ''}`}>
                    <div className={showCollapsed ? 'hidden' : 'block w-full'}>
                        <label htmlFor="sidebar-search" className="sr-only">Search</label>
                        <Input id="sidebar-search" placeholder="SEARCH..." className="pl-10 bg-[#1A1A1A] border-[#333333] text-xs font-mono" />
                        <Icons.Search className="absolute left-7 top-1/2 -translate-y-1/2 text-[#8d8c9e] h-4 w-4" aria-hidden="true" />
                    </div>
                    <Button variant="ghost" size="icon" className={showCollapsed ? 'flex' : 'hidden'} aria-label="Search">
                        <Icons.Search className="h-5 w-5 text-[#8d8c9e]" aria-hidden="true" />
                    </Button>
                </div>
                
                <nav className="flex flex-col gap-6" role="navigation" aria-label="Main Navigation">
                    {sidebarNavItems.map((group) => (
                    <div key={group.group} role="group" aria-label={groupLabels[group.group] || group.group}>
                        {!showCollapsed && group.group !== 'DAS' && (
                        <h3 className={`font-mono text-[10px] uppercase tracking-widest text-[#666666] px-6 mb-2`} id={`group-${group.group}`}>
                            // {groupLabels[group.group] || group.group}
                        </h3>
                        )}
                        <div className="flex flex-col gap-[2px]" aria-labelledby={!showCollapsed && group.group !== 'DAS' ? `group-${group.group}` : undefined}>
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

            {/* Sidebar Footer (Collapse/Close Button) - Always visible at bottom */}
            <div className={`flex shrink-0 border-t border-[#333333] ${showCollapsed ? 'p-2 justify-center' : 'p-4'} transition-all duration-300 bg-[#0A0A0A]`}>
                {isMobile ? (
                    // Mobile Footer: Close Terminal Button
                    <Button
                        variant="secondary"
                        className="w-full font-heading uppercase text-xs tracking-wider border-[#333] hover:border-[#00FFC0] hover:text-white flex items-center justify-center gap-2 h-10"
                        onClick={() => setIsMobileOpen(false)}
                    >
                        <Icons.X className="h-4 w-4" /> CLOSE TERMINAL
                    </Button>
                ) : (
                    // Desktop Footer: Collapse Button
                    <Button
                        variant="ghost"
                        size={showCollapsed ? "icon" : "sm"}
                        className={`text-[#8d8c9e] hover:text-white ${!showCollapsed ? 'w-full flex gap-2 justify-start' : ''}`}
                        onClick={() => setIsCollapsed(!showCollapsed)}
                        aria-label={showCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                        aria-expanded={!showCollapsed}
                    >
                        {showCollapsed ? <Icons.ChevronRight className="h-5 w-5" aria-hidden="true" /> : (
                            <>
                                <Icons.ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                <span>COLLAPSE</span>
                            </>
                        )}
                    </Button>
                )}
            </div>
        </div>
    );

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm md:hidden transition-opacity duration-300 ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsMobileOpen(false)} 
        aria-hidden="true" 
      />

      {/* Mobile Drawer - Fixed to viewport */}
      <div className={`fixed inset-y-0 left-0 z-[100] w-80 md:hidden transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="h-full border-r border-[#333333] bg-[#0A0A0A] shadow-2xl relative">
             <SidebarContent showCollapsed={false} isMobile={true} />
             {/* Redundant close button for extra accessibility */}
             <button 
                  className="absolute top-3 right-3 p-2 text-[#8d8c9e] hover:text-white border border-transparent hover:border-[#333] rounded-md transition-all" 
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close Menu"
              >
               <Icons.X className="h-5 w-5" aria-hidden="true" />
             </button>
         </div>
      </div>

      {/* Desktop Sticky Sidebar */}
      <aside 
        className={`hidden md:flex flex-col flex-shrink-0 border-r border-[#333333] bg-[#0A0A0A] transition-all duration-300 sticky top-0 h-screen
        ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        <SidebarContent showCollapsed={isCollapsed} isMobile={false} />
      </aside>
    </>
  );
};